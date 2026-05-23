const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  slug: { type: String, unique: true, required: true },
  body: { type: String, default: '' },
  excerpt: { type: String, maxlength: 300, default: '' },
  coverImage: { type: String, default: '' },
  category: { type: String, trim: true, default: '' },
  tags: [{ type: String, trim: true }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date, default: null },
}, { timestamps: true });

blogPostSchema.index({ isPublished: 1, publishedAt: -1 });

module.exports = mongoose.model('BlogPost', blogPostSchema);
