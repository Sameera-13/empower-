const mongoose = require('mongoose');

const newsletterSubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  status: {
    type: String,
    enum: ['active', 'unsubscribed'],
    default: 'active',
  },
}, { timestamps: true });

newsletterSubscriberSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('NewsletterSubscriber', newsletterSubscriberSchema);
