const Category = require('../models/Category');
const asyncHandler = require('../utils/asyncHandler');

const listCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isActive: true }).sort({ name: 1 });
  res.json({ success: true, data: categories });
});

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const existing = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
  if (existing) {
    return res.json({ success: true, data: existing });
  }
  const category = await Category.create({ name: name.trim() });
  res.status(201).json({ success: true, data: category });
});

module.exports = { listCategories, createCategory };
