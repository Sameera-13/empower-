const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, adminOnly } = require('../middleware/auth');
const {
  listTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');

const router = express.Router();

// Public
router.get('/', listTestimonials);

// Admin only
router.use(protect, adminOnly);

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('quote').trim().notEmpty().withMessage('Quote is required'),
  ],
  validate,
  createTestimonial
);

router.put(
  '/:id',
  [
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
    body('quote').optional().trim().notEmpty().withMessage('Quote cannot be empty'),
  ],
  validate,
  updateTestimonial
);

router.delete('/:id', deleteTestimonial);

module.exports = router;
