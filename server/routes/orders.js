const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, adminOnly } = require('../middleware/auth');
const {
  createOrder, verifyPayment, getMyOrders, listOrders, updateOrderStatus,
} = require('../controllers/orderController');

const router = express.Router();

router.post(
  '/create',
  protect,
  [
    body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
    body('shippingAddress.name').trim().notEmpty().withMessage('Name is required'),
    body('shippingAddress.phone').trim().notEmpty().withMessage('Phone is required'),
    body('shippingAddress.address').trim().notEmpty().withMessage('Address is required'),
    body('shippingAddress.city').trim().notEmpty().withMessage('City is required'),
    body('shippingAddress.state').trim().notEmpty().withMessage('State is required'),
    body('shippingAddress.pincode').trim().notEmpty().withMessage('Pincode is required'),
  ],
  validate,
  createOrder
);

router.post('/verify', protect, verifyPayment);
router.get('/my', protect, getMyOrders);
router.get('/', protect, adminOnly, listOrders);
router.put(
  '/:id/status',
  protect, adminOnly,
  [body('status').isIn(['pending', 'paid', 'shipped', 'delivered', 'cancelled']).withMessage('Invalid status')],
  validate,
  updateOrderStatus
);

module.exports = router;
