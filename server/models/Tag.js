const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true, unique: true },
  color: { type: String, default: '#E53E3E' },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Tag', tagSchema);
