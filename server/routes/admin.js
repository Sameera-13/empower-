const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, adminOnly } = require('../middleware/auth');
const {
  getAnalytics,
  getReports,
  resolveReport,
} = require('../controllers/adminController');

const router = express.Router();

// All admin routes require authentication + admin role
router.use(protect, adminOnly);

router.get('/analytics', getAnalytics);

router.get('/reports', getReports);

router.put(
  '/reports/:id/resolve',
  [
    body('action').isIn(['dismiss', 'hide']).withMessage('Action must be "dismiss" or "hide"'),
  ],
  validate,
  resolveReport
);

module.exports = router;
