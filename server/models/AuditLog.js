const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: [true, 'Action is required'] },
  targetId: { type: mongoose.Schema.Types.ObjectId },
  targetModel: {
    type: String,
    enum: ['User', 'Post', 'Resource', 'Opportunity', 'ContactMessage', 'NewsletterSubscriber'],
  },
  details: { type: String, default: '' },
}, { timestamps: true });

auditLogSchema.index({ admin: 1, createdAt: -1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
