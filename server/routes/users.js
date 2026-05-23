const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, adminOnly } = require('../middleware/auth');
const uploadSingle = require('../middleware/upload');
const {
  getMe,
  updateMe,
  changePassword,
  deleteMe,
  getUser,
  listUsers,
  toggleBan,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

// --- /me routes (MUST be before /:id) ---

router.get('/me', protect, getMe);

router.put('/me', protect, uploadSingle('avatar'), updateMe);

router.put(
  '/me/password',
  protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 8 }).withMessage('New password must be at least 8 characters'),
    body('confirmNewPassword').custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  ],
  validate,
  changePassword
);

router.delete('/me', protect, deleteMe);

// --- Admin routes ---

router.get('/', protect, adminOnly, listUsers);

router.put('/:id/ban', protect, adminOnly, toggleBan);

router.delete('/:id', protect, adminOnly, deleteUser);

// --- Public routes ---

router.get('/:id', getUser);

module.exports = router;
