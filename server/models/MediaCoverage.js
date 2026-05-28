const mongoose = require('mongoose');

const mediaCoverageSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  source: { type: String, required: [true, 'Source is required'], trim: true },
  url: { type: String, default: '' },
  logo: { type: String, default: '' },
  image: { type: String, default: '' },
  date: { type: Date, default: Date.now },
  order: { type: Number, default: 0 },
}, { timestamps: true });

mediaCoverageSchema.index({ order: 1 });

module.exports = mongoose.model('MediaCoverage', mediaCoverageSchema);
