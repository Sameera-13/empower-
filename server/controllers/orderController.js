const crypto = require('crypto');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');
const asyncHandler = require('../utils/asyncHandler');
const logAdminAction = require('../utils/auditLog');
const createNotification = require('../utils/createNotification');

let razorpayInstance = null;
try {
  const Razorpay = require('razorpay');
  if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
  }
} catch (e) {
  console.log('Razorpay not configured — orders will work in mock mode');
}

const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, couponCode } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'No items in order' });
  }

  // Validate products and calculate total
  let totalAmount = 0;
  const orderItems = [];

  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product || product.deletedAt || !product.isActive) {
      return res.status(400).json({ success: false, message: `Product not found: ${item.productId}` });
    }
    if (product.stock < item.quantity) {
      return res.status(400).json({ success: false, message: `Insufficient stock for ${product.title}` });
    }
    const lineTotal = product.price * item.quantity;
    totalAmount += lineTotal;
    orderItems.push({
      product: product._id,
      title: product.title,
      price: product.price,
      quantity: item.quantity,
      image: product.images?.[0] || '',
    });
  }

  // Apply coupon if provided
  let couponDiscount = 0;
  let appliedCouponCode = '';
  if (couponCode) {
    const coupon = await Coupon.findOne({ code: couponCode.toUpperCase().trim() });
    if (coupon && coupon.isActive && coupon.expiresAt > new Date() &&
        (coupon.maxUses === 0 || coupon.usedCount < coupon.maxUses) &&
        totalAmount >= coupon.minOrderAmount) {
      if (coupon.type === 'percentage') {
        couponDiscount = Math.round((coupon.value / 100) * totalAmount);
      } else {
        couponDiscount = coupon.value;
      }
      couponDiscount = Math.min(couponDiscount, totalAmount);
      appliedCouponCode = coupon.code;
      coupon.usedCount += 1;
      await coupon.save();
    }
  }

  const finalAmount = totalAmount - couponDiscount;

  // Create Razorpay order
  let razorpayOrderId = '';
  if (razorpayInstance) {
    const rzpOrder = await razorpayInstance.orders.create({
      amount: Math.round(finalAmount * 100),
      currency: 'INR',
      receipt: `order_${Date.now()}`,
    });
    razorpayOrderId = rzpOrder.id;
  } else {
    razorpayOrderId = `mock_${Date.now()}`;
  }

  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    totalAmount: finalAmount,
    shippingAddress,
    razorpayOrderId,
    couponCode: appliedCouponCode,
    couponDiscount,
    statusHistory: [{ status: 'pending', changedAt: new Date() }],
  });

  res.status(201).json({
    success: true,
    data: {
      orderId: order._id,
      razorpayOrderId,
      amount: finalAmount,
      currency: 'INR',
      keyId: process.env.RAZORPAY_KEY_ID || 'mock_key',
    },
  });
});

const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  if (razorpayInstance && process.env.RAZORPAY_KEY_SECRET) {
    const expectedSig = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    if (expectedSig !== razorpaySignature) {
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
  }

  order.razorpayPaymentId = razorpayPaymentId || 'mock_payment';
  order.razorpaySignature = razorpaySignature || 'mock_sig';
  order.status = 'paid';
  await order.save();

  // Deduct stock
  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
  }

  res.json({ success: true, data: order });
});

const getMyOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;

  const [orders, totalCount] = await Promise.all([
    Order.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Order.countDocuments({ user: req.user._id }),
  ]);

  res.json({
    success: true,
    data: orders,
    page: pageNum,
    totalPages: Math.ceil(totalCount / limitNum),
    totalCount,
  });
});

const listOrders = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 20;

  const filter = {};
  if (status) filter.status = status;

  const [orders, totalCount] = await Promise.all([
    Order.find(filter)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Order.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: orders,
    page: pageNum,
    totalPages: Math.ceil(totalCount / limitNum),
    totalCount,
  });
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  order.status = status;
  order.statusHistory.push({ status, changedAt: new Date() });
  await order.save();

  // Notify order owner
  const statusLabel = status.charAt(0).toUpperCase() + status.slice(1);
  await createNotification(
    order.user,
    'order_update',
    `Order ${statusLabel}`,
    `Your order has been ${status}`,
    '/orders'
  );

  await logAdminAction(req.user._id, 'UPDATE_ORDER_STATUS', order._id, 'Order', `Updated order status to: ${status}`);
  res.json({ success: true, data: order });
});

module.exports = { createOrder, verifyPayment, getMyOrders, listOrders, updateOrderStatus };
