const mongoose = require('mongoose');

const safetyTipSchema = new mongoose.Schema({
  category: { type: String, required: [true, 'Category is required'], trim: true },
  tips: [{
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  }],
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('SafetyTip', safetyTipSchema);
