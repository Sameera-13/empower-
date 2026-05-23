const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, adminOnly } = require('../middleware/auth');
const uploadSingle = require('../middleware/upload');
const {
  listCoverage, createCoverage, updateCoverage, deleteCoverage,
} = require('../controllers/mediaCoverageController');

const router = express.Router();

router.get('/', listCoverage);

router.post(
  '/',
  protect, adminOnly,
  uploadSingle('logo'),
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('source').trim().notEmpty().withMessage('Source is required'),
  ],
  validate,
  createCoverage
);

router.put('/:id', protect, adminOnly, uploadSingle('logo'), updateCoverage);
router.delete('/:id', protect, adminOnly, deleteCoverage);

module.exports = router;
