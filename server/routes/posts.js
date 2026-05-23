const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect } = require('../middleware/auth');
const uploadSingle = require('../middleware/upload');
const {
  listPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  reportPost,
  addComment,
  deleteComment,
} = require('../controllers/postController');

const router = express.Router();

router.get('/', listPosts);

router.get('/:id', getPost);

router.post(
  '/',
  protect,
  uploadSingle('image'),
  [
    body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }).withMessage('Title must be at most 200 characters'),
    body('category').optional().isIn(['legal', 'health', 'career', 'general', 'safety']).withMessage('Invalid category'),
  ],
  validate,
  createPost
);

router.put(
  '/:id',
  protect,
  uploadSingle('image'),
  [
    body('title').optional().trim().isLength({ max: 200 }).withMessage('Title must be at most 200 characters'),
    body('category').optional().isIn(['legal', 'health', 'career', 'general', 'safety']).withMessage('Invalid category'),
  ],
  validate,
  updatePost
);

router.delete('/:id', protect, deletePost);

router.post('/:id/like', protect, toggleLike);

router.post('/:id/report', protect, reportPost);

router.post(
  '/:id/comments',
  protect,
  [
    body('text').trim().notEmpty().withMessage('Comment text is required'),
  ],
  validate,
  addComment
);

router.delete('/:id/comments/:cid', protect, deleteComment);

module.exports = router;
