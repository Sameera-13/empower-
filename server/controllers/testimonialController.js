const Testimonial = require('../models/Testimonial');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    List all active testimonials
 * @route   GET /api/testimonials
 * @access  Public
 */
const listTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await Testimonial.find({ isActive: true })
    .sort({ order: 1, createdAt: -1 });

  res.json({ success: true, data: testimonials });
});

/**
 * @desc    Create a testimonial
 * @route   POST /api/testimonials
 * @access  Admin
 */
const createTestimonial = asyncHandler(async (req, res) => {
  const { name, quote, isActive, order } = req.body;

  const testimonial = await Testimonial.create({ name, quote, isActive, order });

  res.status(201).json({ success: true, data: testimonial });
});

/**
 * @desc    Update a testimonial
 * @route   PUT /api/testimonials/:id
 * @access  Admin
 */
const updateTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return res.status(404).json({ success: false, message: 'Testimonial not found' });
  }

  const { name, quote, isActive, order } = req.body;

  if (name !== undefined) testimonial.name = name;
  if (quote !== undefined) testimonial.quote = quote;
  if (isActive !== undefined) testimonial.isActive = isActive;
  if (order !== undefined) testimonial.order = order;

  await testimonial.save();

  res.json({ success: true, data: testimonial });
});

/**
 * @desc    Delete a testimonial
 * @route   DELETE /api/testimonials/:id
 * @access  Admin
 */
const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (!testimonial) {
    return res.status(404).json({ success: false, message: 'Testimonial not found' });
  }

  await testimonial.deleteOne();

  res.json({ success: true, data: {} });
});

module.exports = {
  listTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
