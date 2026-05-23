const Coupon = require('../models/Coupon');
const asyncHandler = require('../utils/asyncHandler');
const logAdminAction = require('../utils/auditLog');

const validateCoupon = asyncHandler(async (req, res) => {
  const { code, orderTotal } = req.body;

  const coupon = await Coupon.findOne({ code: code.toUpperCase().trim() });
  if (!coupon) {
    return res.status(404).json({ success: false, message: 'Invalid coupon code' });
  }
  if (!coupon.isActive) {
    return res.status(400).json({ success: false, message: 'This coupon is no longer active' });
  }
  if (coupon.expiresAt < new Date()) {
    return res.status(400).json({ success: false, message: 'This coupon has expired' });
  }
  if (coupon.maxUses > 0 && coupon.usedCount >= coupon.maxUses) {
    return res.status(400).json({ success: false, message: 'This coupon has reached its usage limit' });
  }
  if (orderTotal < coupon.minOrderAmount) {
    return res.status(400).json({
      success: false,
      message: `Minimum order amount is ₹${coupon.minOrderAmount}`,
    });
  }

  let discount;
  if (coupon.type === 'percentage') {
    discount = Math.round((coupon.value / 100) * orderTotal);
  } else {
    discount = coupon.value;
  }
  discount = Math.min(discount, orderTotal);

  res.json({
    success: true,
    data: {
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      discount,
    },
  });
});

const listCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });
  res.json({ success: true, data: coupons });
});

const createCoupon = asyncHandler(async (req, res) => {
  const { code, type, value, minOrderAmount, maxUses, expiresAt } = req.body;
  const coupon = await Coupon.create({ code, type, value, minOrderAmount, maxUses, expiresAt });
  await logAdminAction(req.user._id, 'CREATE_COUPON', coupon._id, 'Coupon', `Created coupon: ${coupon.code}`);
  res.status(201).json({ success: true, data: coupon });
});

const updateCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!coupon) {
    return res.status(404).json({ success: false, message: 'Coupon not found' });
  }
  await logAdminAction(req.user._id, 'UPDATE_COUPON', coupon._id, 'Coupon', `Updated coupon: ${coupon.code}`);
  res.json({ success: true, data: coupon });
});

const deleteCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findByIdAndDelete(req.params.id);
  if (!coupon) {
    return res.status(404).json({ success: false, message: 'Coupon not found' });
  }
  await logAdminAction(req.user._id, 'DELETE_COUPON', coupon._id, 'Coupon', `Deleted coupon: ${coupon.code}`);
  res.json({ success: true, message: 'Coupon deleted' });
});

module.exports = { validateCoupon, listCoupons, createCoupon, updateCoupon, deleteCoupon };
