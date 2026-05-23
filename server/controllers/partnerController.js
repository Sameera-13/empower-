const Partner = require('../models/Partner');
const asyncHandler = require('../utils/asyncHandler');
const logAdminAction = require('../utils/auditLog');
const uploadToCloudinary = require('../utils/cloudinary');

const listPartners = asyncHandler(async (req, res) => {
  const partners = await Partner.find({ isActive: true }).sort({ order: 1 });
  res.json({ success: true, data: partners });
});

const adminListPartners = asyncHandler(async (req, res) => {
  const partners = await Partner.find().sort({ order: 1 });
  res.json({ success: true, data: partners });
});

const createPartner = asyncHandler(async (req, res) => {
  const { name, url, order, isActive } = req.body;

  let logo = '';
  if (req.file) {
    if (uploadToCloudinary) {
      logo = await uploadToCloudinary(req.file.buffer, 'partners');
    } else {
      logo = `/uploads/${req.file.filename}`;
    }
  }

  const partner = await Partner.create({ name, url, logo, order, isActive });
  await logAdminAction(req.user._id, 'CREATE_PARTNER', partner._id, 'Partner', `Created partner: ${partner.name}`);
  res.status(201).json({ success: true, data: partner });
});

const updatePartner = asyncHandler(async (req, res) => {
  const partner = await Partner.findById(req.params.id);
  if (!partner) return res.status(404).json({ success: false, message: 'Partner not found' });

  const updates = { ...req.body };
  if (req.file) {
    if (uploadToCloudinary) {
      updates.logo = await uploadToCloudinary(req.file.buffer, 'partners');
    } else {
      updates.logo = `/uploads/${req.file.filename}`;
    }
  }

  const updated = await Partner.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
  await logAdminAction(req.user._id, 'UPDATE_PARTNER', updated._id, 'Partner', `Updated partner: ${updated.name}`);
  res.json({ success: true, data: updated });
});

const deletePartner = asyncHandler(async (req, res) => {
  const partner = await Partner.findById(req.params.id);
  if (!partner) return res.status(404).json({ success: false, message: 'Partner not found' });
  await Partner.findByIdAndDelete(req.params.id);
  await logAdminAction(req.user._id, 'DELETE_PARTNER', partner._id, 'Partner', `Deleted partner: ${partner.name}`);
  res.json({ success: true, message: 'Partner deleted' });
});

module.exports = { listPartners, adminListPartners, createPartner, updatePartner, deletePartner };
