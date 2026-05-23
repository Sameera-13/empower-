const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const { protect, adminOnly } = require('../middleware/auth');
const multer = require('multer');
const uploadToCloudinary = require('../utils/cloudinary');
const {
  listProducts, getProduct, adminListProducts, createProduct, updateProduct, deleteProduct, getPriceRange,
} = require('../controllers/productController');

const router = express.Router();

const storage = uploadToCloudinary ? multer.memoryStorage() : multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, 'product-' + Date.now() + '-' + Math.round(Math.random() * 1e9) + require('path').extname(file.originalname)),
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.get('/', listProducts);
router.get('/price-range', getPriceRange);
router.get('/admin', protect, adminOnly, adminListProducts);
router.get('/:id', getProduct);

router.post(
  '/',
  protect, adminOnly,
  upload.array('images', 5),
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').trim().notEmpty().withMessage('Description is required'),
    body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  ],
  validate,
  createProduct
);

router.put('/:id', protect, adminOnly, upload.array('images', 5), updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;
