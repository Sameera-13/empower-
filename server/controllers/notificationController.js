const jwt = require('jsonwebtoken');
const Notification = require('../models/Notification');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const createNotification = require('../utils/createNotification');
const { addClient, removeClient } = require('../utils/sseManager');

const listNotifications = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 20;

  const [notifications, totalCount] = await Promise.all([
    Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Notification.countDocuments({ user: req.user._id }),
  ]);

  res.json({
    success: true,
    data: notifications,
    page: pageNum,
    totalPages: Math.ceil(totalCount / limitNum),
    totalCount,
  });
});

const getUnreadCount = asyncHandler(async (req, res) => {
  const count = await Notification.countDocuments({ user: req.user._id, isRead: false });
  res.json({ success: true, data: { count } });
});

const markRead = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { isRead: true },
    { new: true }
  );
  if (!notification) {
    return res.status(404).json({ success: false, message: 'Notification not found' });
  }
  res.json({ success: true, data: notification });
});

const markAllRead = asyncHandler(async (req, res) => {
  await Notification.updateMany({ user: req.user._id, isRead: false }, { isRead: true });
  res.json({ success: true, message: 'All notifications marked as read' });
});

const stream = (req, res) => {
  // Authenticate via query param token (EventSource can't set headers)
  const token = req.query.token;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Token required' });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }

  const userId = decoded.id;

  // Set SSE headers
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  // Send initial keepalive
  res.write(':keepalive\n\n');

  // Register this client
  addClient(userId, res);

  // Heartbeat every 30 seconds
  const heartbeat = setInterval(() => {
    res.write(':heartbeat\n\n');
  }, 30000);

  // Cleanup on disconnect
  req.on('close', () => {
    clearInterval(heartbeat);
    removeClient(userId, res);
  });
};

const announce = asyncHandler(async (req, res) => {
  const { title, message, link } = req.body;
  await createNotification('all', 'announcement', title, message, link || '');
  res.status(201).json({ success: true, message: 'Announcement sent to all users' });
});

module.exports = { listNotifications, getUnreadCount, markRead, markAllRead, stream, announce };
