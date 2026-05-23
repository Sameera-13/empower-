const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  description: { type: String, required: [true, 'Description is required'] },
  category: {
    type: String,
    enum: ['legal', 'health', 'self-defense', 'govt-scheme', 'emergency'],
    required: [true, 'Category is required'],
  },
  sourceUrl: { type: String, default: '' },
  state: { type: String, default: '' },
  language: { type: String, default: 'English' },
  isPinned: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deletedAt: { type: Date, default: null },
}, { timestamps: true });

resourceSchema.index({ title: 'text', description: 'text' });

module.exports = mongoose.model('Resource', resourceSchema);
