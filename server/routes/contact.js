const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const rateLimit = require('express-rate-limit');
const { protect, adminOnly } = require('../middleware/auth');
const {
  submitMessage, listMessages, markAsRead, deleteMessage,
} = require('../controllers/contactController');

const router = express.Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many messages, please try again later' },
});

router.post(
  '/',
  contactLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('subject').trim().notEmpty().withMessage('Subject is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  validate,
  submitMessage
);

router.get('/', protect, adminOnly, listMessages);
router.put('/:id/read', protect, adminOnly, markAsRead);
router.delete('/:id', protect, adminOnly, deleteMessage);

module.exports = router;
