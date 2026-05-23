const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, adminOnly } = require('../middleware/auth');
const { listCategories, createCategory } = require('../controllers/categoryController');

const router = express.Router();

router.get('/', listCategories);
router.post('/', protect, adminOnly,
  [body('name').trim().notEmpty().withMessage('Category name is required')],
  validate,
  createCategory
);

module.exports = router;
