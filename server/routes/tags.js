const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, adminOnly } = require('../middleware/auth');
const { listTags, createTag } = require('../controllers/tagController');

const router = express.Router();

router.get('/', listTags);
router.post('/', protect, adminOnly,
  [body('name').trim().notEmpty().withMessage('Tag name is required')],
  validate,
  createTag
);

module.exports = router;
