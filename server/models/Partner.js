const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  logo: { type: String, default: '' },
  url: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

partnerSchema.index({ order: 1 });

module.exports = mongoose.model('Partner', partnerSchema);
