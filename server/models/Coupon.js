const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: [true, 'Coupon code is required'],
    unique: true,
    uppercase: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['percentage', 'flat'],
    required: [true, 'Coupon type is required'],
  },
  value: { type: Number, required: [true, 'Coupon value is required'], min: 0 },
  minOrderAmount: { type: Number, default: 0 },
  maxUses: { type: Number, default: 0 },
  usedCount: { type: Number, default: 0 },
  expiresAt: { type: Date, required: [true, 'Expiry date is required'] },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);
