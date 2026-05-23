const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const asyncHandler = require('../utils/asyncHandler');
const logAdminAction = require('../utils/auditLog');

const subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const existing = await NewsletterSubscriber.findOne({ email: email.toLowerCase().trim() });

  if (existing) {
    if (existing.status === 'unsubscribed') {
      existing.status = 'active';
      await existing.save();
      return res.json({ success: true, message: 'Welcome back! You have been re-subscribed.' });
    }
    return res.json({ success: true, message: 'You are already subscribed!' });
  }

  await NewsletterSubscriber.create({ email });
  res.status(201).json({ success: true, message: 'Subscribed successfully!' });
});

const listSubscribers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status } = req.query;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 20;

  const filter = {};
  if (status) filter.status = status;

  const [subscribers, totalCount] = await Promise.all([
    NewsletterSubscriber.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    NewsletterSubscriber.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: subscribers,
    page: pageNum,
    totalPages: Math.ceil(totalCount / limitNum),
    totalCount,
  });
});

const deleteSubscriber = asyncHandler(async (req, res) => {
  const sub = await NewsletterSubscriber.findById(req.params.id);
  if (!sub) return res.status(404).json({ success: false, message: 'Subscriber not found' });

  await NewsletterSubscriber.findByIdAndDelete(req.params.id);
  await logAdminAction(req.user._id, 'DELETE_SUBSCRIBER', sub._id, 'NewsletterSubscriber', `Deleted subscriber: ${sub.email}`);
  res.json({ success: true, message: 'Subscriber deleted' });
});

module.exports = { subscribe, listSubscribers, deleteSubscriber };
