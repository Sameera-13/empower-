const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  title: { type: String, required: [true, 'Title is required'], trim: true },
  org: { type: String, required: [true, 'Organization is required'], trim: true },
  type: {
    type: String,
    enum: ['scholarship', 'internship', 'job', 'skill-development'],
    required: [true, 'Type is required'],
  },
  description: { type: String, required: [true, 'Description is required'] },
  eligibility: { type: String, default: '' },
  deadline: { type: Date },
  location: { type: String, default: '' },
  applyUrl: { type: String, required: [true, 'Apply URL is required'] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  deletedAt: { type: Date, default: null },
}, { timestamps: true });

opportunitySchema.index({ type: 1, deadline: -1 });

module.exports = mongoose.model('Opportunity', opportunitySchema);
