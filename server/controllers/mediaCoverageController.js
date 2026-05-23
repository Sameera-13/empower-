const MediaCoverage = require('../models/MediaCoverage');
const asyncHandler = require('../utils/asyncHandler');
const logAdminAction = require('../utils/auditLog');
const uploadToCloudinary = require('../utils/cloudinary');

const listCoverage = asyncHandler(async (req, res) => {
  const items = await MediaCoverage.find().sort({ order: 1 });
  res.json({ success: true, data: items });
});

const createCoverage = asyncHandler(async (req, res) => {
  const { title, source, url, date, order } = req.body;

  let logo = '';
  if (req.file) {
    if (uploadToCloudinary) {
      logo = await uploadToCloudinary(req.file.buffer, 'media');
    } else {
      logo = `/uploads/${req.file.filename}`;
    }
  }

  const item = await MediaCoverage.create({ title, source, url, logo, date, order });
  await logAdminAction(req.user._id, 'CREATE_MEDIA_COVERAGE', item._id, 'MediaCoverage', `Created: ${item.title}`);
  res.status(201).json({ success: true, data: item });
});

const updateCoverage = asyncHandler(async (req, res) => {
  const item = await MediaCoverage.findById(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });

  const updates = { ...req.body };
  if (req.file) {
    if (uploadToCloudinary) {
      updates.logo = await uploadToCloudinary(req.file.buffer, 'media');
    } else {
      updates.logo = `/uploads/${req.file.filename}`;
    }
  }

  const updated = await MediaCoverage.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
  await logAdminAction(req.user._id, 'UPDATE_MEDIA_COVERAGE', updated._id, 'MediaCoverage', `Updated: ${updated.title}`);
  res.json({ success: true, data: updated });
});

const deleteCoverage = asyncHandler(async (req, res) => {
  const item = await MediaCoverage.findById(req.params.id);
  if (!item) return res.status(404).json({ success: false, message: 'Not found' });
  await MediaCoverage.findByIdAndDelete(req.params.id);
  await logAdminAction(req.user._id, 'DELETE_MEDIA_COVERAGE', item._id, 'MediaCoverage', `Deleted: ${item.title}`);
  res.json({ success: true, message: 'Deleted' });
});

module.exports = { listCoverage, createCoverage, updateCoverage, deleteCoverage };
