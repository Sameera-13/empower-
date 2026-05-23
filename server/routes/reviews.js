const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, adminOnly } = require('../middleware/auth');
const { listReviews, createReview, deleteReview } = require('../controllers/reviewController');

const router = express.Router();

router.get('/products/:productId/reviews', listReviews);

router.post(
  '/products/:productId/reviews',
  protect,
  [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('text').trim().notEmpty().withMessage('Review text is required')
      .isLength({ max: 500 }).withMessage('Review must be 500 characters or less'),
  ],
  validate,
  createReview
);

router.delete('/reviews/:id', protect, adminOnly, deleteReview);

module.exports = router;
