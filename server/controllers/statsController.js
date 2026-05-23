const User = require('../models/User');
const Post = require('../models/Post');
const Resource = require('../models/Resource');
const Opportunity = require('../models/Opportunity');
const asyncHandler = require('../utils/asyncHandler');

const getPublicStats = asyncHandler(async (req, res) => {
  const [totalUsers, totalPosts, totalResources, totalOpportunities] = await Promise.all([
    User.countDocuments(),
    Post.countDocuments({ status: 'active' }),
    Resource.countDocuments({ deletedAt: null }),
    Opportunity.countDocuments({ deletedAt: null }),
  ]);

  res.json({
    success: true,
    data: { totalUsers, totalPosts, totalResources, totalOpportunities },
  });
});

module.exports = { getPublicStats };
