const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, adminOnly } = require('../middleware/auth');
const {
  listOpportunities,
  getOpportunity,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  toggleSave,
} = require('../controllers/opportunityController');

const router = express.Router();

router.get('/', listOpportunities);

router.get('/:id', getOpportunity);

router.post(
  '/',
  protect,
  adminOnly,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('org').trim().notEmpty().withMessage('Organization is required'),
    body('type')
      .isIn(['scholarship', 'internship', 'job', 'skill-development'])
      .withMessage('Invalid opportunity type'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('applyUrl').trim().notEmpty().withMessage('Apply URL is required').isURL().withMessage('Apply URL must be a valid URL'),
    body('deadline').optional().isISO8601().withMessage('Deadline must be a valid date'),
  ],
  validate,
  createOpportunity
);

router.put(
  '/:id',
  protect,
  adminOnly,
  [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty'),
    body('org').optional().trim().notEmpty().withMessage('Organization cannot be empty'),
    body('type')
      .optional()
      .isIn(['scholarship', 'internship', 'job', 'skill-development'])
      .withMessage('Invalid opportunity type'),
    body('description').optional().trim().notEmpty().withMessage('Description cannot be empty'),
    body('applyUrl').optional().trim().isURL().withMessage('Apply URL must be a valid URL'),
    body('deadline').optional().isISO8601().withMessage('Deadline must be a valid date'),
  ],
  validate,
  updateOpportunity
);

router.delete('/:id', protect, adminOnly, deleteOpportunity);

router.post('/:id/save', protect, toggleSave);

module.exports = router;
