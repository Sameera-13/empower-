const User = require('../models/User');
const Post = require('../models/Post');
const ContactMessage = require('../models/ContactMessage');
const Order = require('../models/Order');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const asyncHandler = require('../utils/asyncHandler');
const logAdminAction = require('../utils/auditLog');

/**
 * @desc    Get platform analytics
 * @route   GET /api/admin/analytics
 * @access  Admin
 */
const getAnalytics = asyncHandler(async (req, res) => {
  const now = new Date();

  // Start of today (midnight)
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // 7 days ago
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // 30 days ago
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  // Start of current week (Monday)
  const dayOfWeek = now.getDay();
  const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - mondayOffset);

  const [
    totalUsers,
    postsToday,
    pendingReports,
    newSignups7d,
    unreadMessages,
    totalOrders,
    totalSubscribers,
    userGrowth30d,
    postsByCategory,
    recentMessages,
  ] = await Promise.all([
    // Total users
    User.countDocuments(),

    // Posts created today
    Post.countDocuments({ createdAt: { $gte: startOfToday } }),

    // Posts with at least one report and still active
    Post.countDocuments({ 'reports.0': { $exists: true }, status: 'active' }),

    // New signups in the last 7 days
    User.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),

    // Unread contact messages
    ContactMessage.countDocuments({ isRead: false }),

    // Total orders
    Order.countDocuments(),

    // Active newsletter subscribers
    NewsletterSubscriber.countDocuments({ status: 'active' }),

    // User growth over last 30 days (aggregation by date)
    User.aggregate([
      { $match: { createdAt: { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { _id: 0, date: '$_id', count: 1 } },
    ]),

    // Posts by category this week
    Post.aggregate([
      { $match: { createdAt: { $gte: startOfWeek }, status: { $ne: 'deleted' } } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      { $project: { _id: 0, category: '$_id', count: 1 } },
    ]),

    // 5 most recent contact messages
    ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .lean(),
  ]);

  res.json({
    success: true,
    data: {
      totalUsers,
      postsToday,
      pendingReports,
      newSignups7d,
      unreadMessages,
      totalOrders,
      totalSubscribers,
      userGrowth30d,
      postsByCategory,
      recentMessages,
    },
  });
});

/**
 * @desc    Get reported posts
 * @route   GET /api/admin/reports
 * @access  Admin
 */
const getReports = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 20;

  const filter = {
    'reports.0': { $exists: true },
    status: 'active',
  };

  const [posts, totalCount] = await Promise.all([
    Post.find(filter)
      .populate('author', 'name avatar email')
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Post.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: posts,
    page: pageNum,
    totalPages: Math.ceil(totalCount / limitNum),
    totalCount,
  });
});

/**
 * @desc    Resolve a reported post (dismiss or hide)
 * @route   PUT /api/admin/reports/:id/resolve
 * @access  Admin
 */
const resolveReport = asyncHandler(async (req, res) => {
  const { action } = req.body;

  if (!['dismiss', 'hide'].includes(action)) {
    return res.status(400).json({ success: false, message: 'Action must be "dismiss" or "hide"' });
  }

  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }

  if (action === 'dismiss') {
    post.reports = [];
  } else {
    post.status = 'hidden';
  }

  await post.save();

  await logAdminAction(
    req.user._id,
    action === 'dismiss' ? 'DISMISS_REPORT' : 'HIDE_POST',
    post._id,
    'Post',
    `${action === 'dismiss' ? 'Dismissed reports on' : 'Hid'} post: ${post.title}`
  );

  res.json({ success: true, message: `Report ${action === 'dismiss' ? 'dismissed' : 'resolved — post hidden'}` });
});

module.exports = {
  getAnalytics,
  getReports,
  resolveReport,
};
