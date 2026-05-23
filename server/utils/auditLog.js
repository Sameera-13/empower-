const AuditLog = require('../models/AuditLog');

/**
 * Log an admin action to the audit trail.
 * @param {string} adminId - The admin user's ObjectId
 * @param {string} action - Description of the action performed
 * @param {string} targetId - The ObjectId of the affected document
 * @param {string} targetModel - The model name (User, Post, Resource, Opportunity)
 * @param {string} details - Additional details about the action
 */
const logAdminAction = async (adminId, action, targetId, targetModel, details) => {
  try {
    await AuditLog.create({
      admin: adminId,
      action,
      targetId,
      targetModel,
      details,
    });
  } catch (error) {
    console.error('Failed to create audit log:', error.message);
  }
};

module.exports = logAdminAction;
