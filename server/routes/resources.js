const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, adminOnly } = require('../middleware/auth');
const {
  listResources,
  getResource,
  createResource,
  updateResource,
  deleteResource,
} = require('../controllers/resourceController');

const router = express.Router();

router.get('/', listResources);

router.get('/:id', getResource);

router.post(
  '/',
  protect,
  adminOnly,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('category')
      .isIn(['legal', 'health', 'self-defense', 'govt-scheme', 'emergency'])
      .withMessage('Invalid category'),
  ],
  validate,
  createResource
);

router.put(
  '/:id',
  protect,
  adminOnly,
  [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
    body('category')
      .optional()
      .isIn(['legal', 'health', 'self-defense', 'govt-scheme', 'emergency'])
      .withMessage('Invalid category'),
  ],
  validate,
  updateResource
);

router.delete('/:id', protect, adminOnly, deleteResource);

module.exports = router;
