const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const logAdminAction = require('../utils/auditLog');
const uploadToCloudinary = require('../utils/cloudinary');

const listProducts = asyncHandler(async (req, res) => {
  const { category, tags, search, featured, minPrice, maxPrice, page = 1, limit = 20 } = req.query;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 20;

  const filter = { deletedAt: null, isActive: true };
  if (category) filter.category = category;
  if (tags) filter.tags = { $in: tags.split(',') };
  if (featured === 'true') filter.isFeatured = true;
  if (search) filter.$text = { $search: search };
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  const [products, totalCount] = await Promise.all([
    Product.find(filter)
      .populate('category', 'name')
      .populate('tags', 'name color')
      .sort({ isFeatured: -1, createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Product.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: products,
    page: pageNum,
    totalPages: Math.ceil(totalCount / limitNum),
    totalCount,
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('category', 'name')
    .populate('tags', 'name color');
  if (!product || product.deletedAt) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

const adminListProducts = asyncHandler(async (req, res) => {
  const { category, search, page = 1, limit = 20 } = req.query;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 20;

  const filter = { deletedAt: null };
  if (category) filter.category = category;
  if (search) filter.$text = { $search: search };

  const [products, totalCount] = await Promise.all([
    Product.find(filter)
      .populate('category', 'name')
      .populate('tags', 'name color')
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Product.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: products,
    page: pageNum,
    totalPages: Math.ceil(totalCount / limitNum),
    totalCount,
  });
});

const createProduct = asyncHandler(async (req, res) => {
  const { title, description, price, compareAtPrice, category, tags, stock, isFeatured, isActive } = req.body;

  let images = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      if (uploadToCloudinary) {
        const url = await uploadToCloudinary(file.buffer, 'products');
        images.push(url);
      } else {
        images.push(`/uploads/${file.filename}`);
      }
    }
  }

  const parsedTags = tags ? (typeof tags === 'string' ? JSON.parse(tags) : tags) : [];

  const product = await Product.create({
    title, description, price, compareAtPrice,
    category: category || null,
    tags: parsedTags,
    images, stock, isFeatured, isActive,
    createdBy: req.user._id,
  });

  const populated = await Product.findById(product._id)
    .populate('category', 'name')
    .populate('tags', 'name color');

  await logAdminAction(req.user._id, 'CREATE_PRODUCT', product._id, 'Product', `Created product: ${product.title}`);
  res.status(201).json({ success: true, data: populated });
});

const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product || product.deletedAt) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const updates = { ...req.body };

  if (updates.tags) {
    updates.tags = typeof updates.tags === 'string' ? JSON.parse(updates.tags) : updates.tags;
  }

  if (updates.category === '') {
    updates.category = null;
  }

  if (req.files && req.files.length > 0) {
    const newImages = [];
    for (const file of req.files) {
      if (uploadToCloudinary) {
        const url = await uploadToCloudinary(file.buffer, 'products');
        newImages.push(url);
      } else {
        newImages.push(`/uploads/${file.filename}`);
      }
    }
    if (req.body.keepExistingImages === 'true') {
      updates.images = [...(product.images || []), ...newImages];
    } else {
      updates.images = newImages;
    }
  }

  delete updates.keepExistingImages;

  const updated = await Product.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true })
    .populate('category', 'name')
    .populate('tags', 'name color');
  await logAdminAction(req.user._id, 'UPDATE_PRODUCT', updated._id, 'Product', `Updated product: ${updated.title}`);
  res.json({ success: true, data: updated });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product || product.deletedAt) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  product.deletedAt = new Date();
  await product.save();
  await logAdminAction(req.user._id, 'DELETE_PRODUCT', product._id, 'Product', `Soft-deleted product: ${product.title}`);
  res.json({ success: true, message: 'Product deleted successfully' });
});

const getPriceRange = asyncHandler(async (req, res) => {
  const result = await Product.aggregate([
    { $match: { deletedAt: null, isActive: true } },
    { $group: { _id: null, min: { $min: '$price' }, max: { $max: '$price' } } },
  ]);
  const range = result[0] || { min: 0, max: 10000 };
  res.json({ success: true, data: { min: range.min, max: range.max } });
});

module.exports = { listProducts, getProduct, adminListProducts, createProduct, updateProduct, deleteProduct, getPriceRange };
