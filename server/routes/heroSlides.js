const express = require('express');
const { protect, adminOnly } = require('../middleware/auth');
const uploadSingle = require('../middleware/upload');
const {
  listSlides, adminListSlides, createSlide, updateSlide, deleteSlide,
} = require('../controllers/heroSlideController');

const router = express.Router();

router.get('/', listSlides);
router.get('/admin', protect, adminOnly, adminListSlides);
router.post('/', protect, adminOnly, uploadSingle('image'), createSlide);
router.put('/:id', protect, adminOnly, uploadSingle('image'), updateSlide);
router.delete('/:id', protect, adminOnly, deleteSlide);

module.exports = router;
