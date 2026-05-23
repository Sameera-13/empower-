const Review = require('../models/Review');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');

async function updateProductRating(productId) {
  const result = await Review.aggregate([
    { $match: { product: productId } },
    { $group: { _id: null, avgRating: { $avg: '$rating' }, reviewCount: { $sum: 1 } } },
  ]);
  const stats = result[0] || { avgRating: 0, reviewCount: 0 };
  await Product.findByIdAndUpdate(productId, {
    avgRating: Math.round(stats.avgRating * 10) / 10,
    reviewCount: stats.reviewCount,
  });
}

const listReviews = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 10;

  const filter = { product: req.params.productId };

  const [reviews, totalCount] = await Promise.all([
    Review.find(filter)
      .populate('user', 'name')
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Review.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: reviews,
    page: pageNum,
    totalPages: Math.ceil(totalCount / limitNum),
    totalCount,
  });
});

const createReview = asyncHandler(async (req, res) => {
  const { rating, text } = req.body;

  const existing = await Review.findOne({ user: req.user._id, product: req.params.productId });
  if (existing) {
    return res.status(400).json({ success: false, message: 'You have already reviewed this product' });
  }

  const product = await Product.findById(req.params.productId);
  if (!product || product.deletedAt) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  const review = await Review.create({
    user: req.user._id,
    product: req.params.productId,
    rating,
    text,
  });

  await updateProductRating(product._id);

  const populated = await Review.findById(review._id).populate('user', 'name');
  res.status(201).json({ success: true, data: populated });
});

const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    return res.status(404).json({ success: false, message: 'Review not found' });
  }

  const productId = review.product;
  await review.deleteOne();
  await updateProductRating(productId);

  res.json({ success: true, message: 'Review deleted' });
});

module.exports = { listReviews, createReview, deleteReview };
