const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const rateLimit = require('express-rate-limit');
const { protect, adminOnly } = require('../middleware/auth');
const { subscribe, listSubscribers, deleteSubscriber } = require('../controllers/newsletterController');

const router = express.Router();

const subscribeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many requests, please try again later' },
});

router.post(
  '/',
  subscribeLimiter,
  [body('email').isEmail().withMessage('Valid email is required')],
  validate,
  subscribe
);

router.get('/', protect, adminOnly, listSubscribers);
router.delete('/:id', protect, adminOnly, deleteSubscriber);

module.exports = router;
