const HeroSlide = require('../models/HeroSlide');
const asyncHandler = require('../utils/asyncHandler');
const logAdminAction = require('../utils/auditLog');
const uploadToCloudinary = require('../utils/cloudinary');

const listSlides = asyncHandler(async (req, res) => {
  const slides = await HeroSlide.find({ isActive: true }).sort({ order: 1 });
  res.json({ success: true, data: slides });
});

const adminListSlides = asyncHandler(async (req, res) => {
  const slides = await HeroSlide.find().sort({ order: 1 });
  res.json({ success: true, data: slides });
});

const createSlide = asyncHandler(async (req, res) => {
  const { title, subtitle, ctaText, ctaLink, order, isActive } = req.body;

  let image = '';
  if (req.file) {
    if (uploadToCloudinary) {
      image = await uploadToCloudinary(req.file.buffer, 'hero');
    } else {
      image = `/uploads/${req.file.filename}`;
    }
  }

  const slide = await HeroSlide.create({ title, subtitle, ctaText, ctaLink, image, order, isActive });
  await logAdminAction(req.user._id, 'CREATE_HERO_SLIDE', slide._id, 'HeroSlide', `Created hero slide: ${slide.title}`);
  res.status(201).json({ success: true, data: slide });
});

const updateSlide = asyncHandler(async (req, res) => {
  const slide = await HeroSlide.findById(req.params.id);
  if (!slide) return res.status(404).json({ success: false, message: 'Slide not found' });

  const updates = { ...req.body };
  if (req.file) {
    if (uploadToCloudinary) {
      updates.image = await uploadToCloudinary(req.file.buffer, 'hero');
    } else {
      updates.image = `/uploads/${req.file.filename}`;
    }
  }

  const updated = await HeroSlide.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
  await logAdminAction(req.user._id, 'UPDATE_HERO_SLIDE', updated._id, 'HeroSlide', `Updated hero slide: ${updated.title}`);
  res.json({ success: true, data: updated });
});

const deleteSlide = asyncHandler(async (req, res) => {
  const slide = await HeroSlide.findById(req.params.id);
  if (!slide) return res.status(404).json({ success: false, message: 'Slide not found' });
  await HeroSlide.findByIdAndDelete(req.params.id);
  await logAdminAction(req.user._id, 'DELETE_HERO_SLIDE', slide._id, 'HeroSlide', `Deleted hero slide: ${slide.title}`);
  res.json({ success: true, message: 'Slide deleted' });
});

module.exports = { listSlides, adminListSlides, createSlide, updateSlide, deleteSlide };
