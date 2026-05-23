const Notification = require('../models/Notification');
const User = require('../models/User');
const { sendToUser, sendToAll } = require('./sseManager');

/**
 * Create a notification and push it via SSE.
 * @param {string|'all'} userId - recipient user ID, or 'all' for broadcast
 * @param {string} type - notification type enum value
 * @param {string} title - notification title
 * @param {string} message - notification message
 * @param {string} link - optional link
 */
async function createNotification(userId, type, title, message, link = '') {
  try {
    if (userId === 'all') {
      const users = await User.find({ isBanned: { $ne: true } }).select('_id');
      const docs = users.map((u) => ({
        user: u._id,
        type,
        title,
        message,
        link,
      }));
      const notifications = await Notification.insertMany(docs);
      sendToAll({ type: 'notification', title, message, link });
      return notifications;
    }

    const notification = await Notification.create({ user: userId, type, title, message, link });
    sendToUser(userId, { type: 'notification', id: notification._id, title, message, link });
    return notification;
  } catch (error) {
    console.error('Failed to create notification:', error.message);
  }
}

module.exports = createNotification;
