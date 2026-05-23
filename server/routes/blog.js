const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, adminOnly } = require('../middleware/auth');
const uploadSingle = require('../middleware/upload');
const {
  listPublished, getBySlug, adminList, createBlogPost, updateBlogPost, deleteBlogPost,
} = require('../controllers/blogController');

const router = express.Router();

router.get('/', listPublished);
router.get('/admin', protect, adminOnly, adminList);
router.get('/:slug', getBySlug);

router.post(
  '/',
  protect, adminOnly,
  uploadSingle('coverImage'),
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('category').isIn(['news', 'stories', 'events', 'announcements', 'guides']).withMessage('Invalid category'),
  ],
  validate,
  createBlogPost
);

router.put('/:id', protect, adminOnly, uploadSingle('coverImage'), updateBlogPost);
router.delete('/:id', protect, adminOnly, deleteBlogPost);

module.exports = router;
