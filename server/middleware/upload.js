const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadToCloudinary = require('../utils/cloudinary');

// Allowed MIME types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

// File filter shared by both storage modes
const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, PNG, and WebP images are allowed'), false);
  }
};

let storage;

if (uploadToCloudinary) {
  // Cloudinary is configured - use memory storage so we can upload the buffer
  storage = multer.memoryStorage();
} else if (process.env.VERCEL) {
  // On Vercel serverless - filesystem is read-only, use memory storage
  storage = multer.memoryStorage();
} else {
  // Fallback - save to disk
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    },
  });
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_SIZE },
});

/**
 * Returns multer middleware for a single file upload.
 * @param {string} fieldName - The form field name for the file
 */
const uploadSingle = (fieldName) => upload.single(fieldName);

module.exports = uploadSingle;
