const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, adminOnly } = require('../middleware/auth');
const {
  validateCoupon, listCoupons, createCoupon, updateCoupon, deleteCoupon,
} = require('../controllers/couponController');

const router = express.Router();

router.post(
  '/validate',
  protect,
  [
    body('code').trim().notEmpty().withMessage('Coupon code is required'),
    body('orderTotal').isFloat({ min: 0 }).withMessage('Order total is required'),
  ],
  validate,
  validateCoupon
);

router.get('/admin', protect, adminOnly, listCoupons);

router.post(
  '/admin',
  protect, adminOnly,
  [
    body('code').trim().notEmpty().withMessage('Coupon code is required'),
    body('type').isIn(['percentage', 'flat']).withMessage('Type must be percentage or flat'),
    body('value').isFloat({ min: 0 }).withMessage('Value must be a positive number'),
    body('expiresAt').isISO8601().withMessage('Valid expiry date is required'),
  ],
  validate,
  createCoupon
);

router.put('/admin/:id', protect, adminOnly, updateCoupon);
router.delete('/admin/:id', protect, adminOnly, deleteCoupon);

module.exports = router;
