const Tag = require('../models/Tag');
const asyncHandler = require('../utils/asyncHandler');

const listTags = asyncHandler(async (req, res) => {
  const tags = await Tag.find({ isActive: true }).sort({ name: 1 });
  res.json({ success: true, data: tags });
});

const createTag = asyncHandler(async (req, res) => {
  const { name, color } = req.body;
  const existing = await Tag.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
  if (existing) {
    return res.json({ success: true, data: existing });
  }
  const tag = await Tag.create({ name: name.trim(), color: color || '#E53E3E' });
  res.status(201).json({ success: true, data: tag });
});

module.exports = { listTags, createTag };
