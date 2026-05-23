const express = require('express');
const { protect, adminOnly } = require('../middleware/auth');
const uploadSingle = require('../middleware/upload');
const {
  listPartners, adminListPartners, createPartner, updatePartner, deletePartner,
} = require('../controllers/partnerController');

const router = express.Router();

router.get('/', listPartners);
router.get('/admin', protect, adminOnly, adminListPartners);
router.post('/', protect, adminOnly, uploadSingle('logo'), createPartner);
router.put('/:id', protect, adminOnly, uploadSingle('logo'), updatePartner);
router.delete('/:id', protect, adminOnly, deletePartner);

module.exports = router;
