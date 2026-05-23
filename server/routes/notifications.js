const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, adminOnly } = require('../middleware/auth');
const {
  listNotifications, getUnreadCount, markRead, markAllRead, stream, announce,
} = require('../controllers/notificationController');

const router = express.Router();

router.get('/', protect, listNotifications);
router.get('/unread', protect, getUnreadCount);
router.get('/stream', stream);
router.put('/read-all', protect, markAllRead);
router.put('/:id/read', protect, markRead);

router.post(
  '/announce',
  protect, adminOnly,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  validate,
  announce
);

module.exports = router;
