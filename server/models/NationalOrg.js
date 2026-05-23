const mongoose = require('mongoose');

const nationalOrgSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  url: { type: String, required: [true, 'URL is required'], trim: true },
  description: { type: String, default: '', trim: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('NationalOrg', nationalOrgSchema);
