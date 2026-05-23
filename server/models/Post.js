const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: [true, 'Comment text is required'] },
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'Author is required'] },
  title: { type: String, required: [true, 'Title is required'], maxlength: 200 },
  body: { type: String, default: '' },
  category: {
    type: String,
    enum: ['legal', 'health', 'career', 'general', 'safety'],
    default: 'general',
  },
  image: { type: String, default: '' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema],
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: {
    type: String,
    enum: ['active', 'hidden', 'deleted'],
    default: 'active',
  },
}, { timestamps: true });

postSchema.index({ status: 1, createdAt: -1 });
postSchema.index({ author: 1 });

module.exports = mongoose.model('Post', postSchema);
