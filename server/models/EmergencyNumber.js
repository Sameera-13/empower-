const mongoose = require('mongoose');

const emergencyNumberSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'], trim: true },
  number: { type: String, required: [true, 'Number is required'], trim: true },
  description: { type: String, default: '', trim: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('EmergencyNumber', emergencyNumberSchema);
