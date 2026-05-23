const mongoose = require('mongoose');

const heroSlideSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  subtitle: { type: String, default: '' },
  ctaText: { type: String, default: '' },
  ctaLink: { type: String, default: '' },
  image: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

heroSlideSchema.index({ order: 1, isActive: 1 });

module.exports = mongoose.model('HeroSlide', heroSlideSchema);
