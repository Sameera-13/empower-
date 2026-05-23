const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, adminOnly } = require('../middleware/auth');
const {
  listEmergencyNumbers,
  createEmergencyNumber,
  updateEmergencyNumber,
  deleteEmergencyNumber,
  listSafetyTips,
  createSafetyTip,
  updateSafetyTip,
  deleteSafetyTip,
  listNationalOrgs,
  createNationalOrg,
  updateNationalOrg,
  deleteNationalOrg,
} = require('../controllers/safetyController');

const router = express.Router();

// ─── Public routes ────────────────────────────────────────────────────────────

router.get('/emergency-numbers', listEmergencyNumbers);
router.get('/tips', listSafetyTips);
router.get('/organizations', listNationalOrgs);

// ─── Admin routes ─────────────────────────────────────────────────────────────

router.post(
  '/emergency-numbers',
  protect,
  adminOnly,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('number').trim().notEmpty().withMessage('Number is required'),
  ],
  validate,
  createEmergencyNumber
);

router.put('/emergency-numbers/:id', protect, adminOnly, updateEmergencyNumber);
router.delete('/emergency-numbers/:id', protect, adminOnly, deleteEmergencyNumber);

router.post(
  '/tips',
  protect,
  adminOnly,
  [
    body('category').trim().notEmpty().withMessage('Category is required'),
    body('tips').isArray({ min: 1 }).withMessage('Tips array is required'),
  ],
  validate,
  createSafetyTip
);

router.put('/tips/:id', protect, adminOnly, updateSafetyTip);
router.delete('/tips/:id', protect, adminOnly, deleteSafetyTip);

router.post(
  '/organizations',
  protect,
  adminOnly,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('url').trim().notEmpty().withMessage('URL is required'),
  ],
  validate,
  createNationalOrg
);

router.put('/organizations/:id', protect, adminOnly, updateNationalOrg);
router.delete('/organizations/:id', protect, adminOnly, deleteNationalOrg);

module.exports = router;
