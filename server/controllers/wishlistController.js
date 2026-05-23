const Wishlist = require('../models/Wishlist');
const asyncHandler = require('../utils/asyncHandler');

const getWishlist = asyncHandler(async (req, res) => {
  const items = await Wishlist.find({ user: req.user._id })
    .populate({
      path: 'product',
      match: { deletedAt: null, isActive: true },
      select: 'title price compareAtPrice images stock',
    })
    .sort({ createdAt: -1 });

  // Filter out entries where product was soft-deleted (populate returns null)
  const filtered = items.filter((item) => item.product !== null);

  res.json({ success: true, data: filtered });
});

const toggleWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const existing = await Wishlist.findOne({ user: req.user._id, product: productId });

  if (existing) {
    await existing.deleteOne();
    return res.json({ success: true, data: { wishlisted: false }, message: 'Removed from wishlist' });
  }

  await Wishlist.create({ user: req.user._id, product: productId });
  res.status(201).json({ success: true, data: { wishlisted: true }, message: 'Added to wishlist' });
});

module.exports = { getWishlist, toggleWishlist };
