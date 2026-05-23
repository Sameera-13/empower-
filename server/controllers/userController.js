const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const uploadToCloudinary = require('../utils/cloudinary');
const sendEmail = require('../utils/email');
const { accountBannedEmail } = require('../utils/emailTemplates');
const logAdminAction = require('../utils/auditLog');

/**
 * @desc    Get current user's profile
 * @route   GET /api/users/me
 * @access  Auth
 */
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('savedOpportunities');

  res.json({
    success: true,
    data: user,
  });
});

/**
 * @desc    Update current user's profile
 * @route   PUT /api/users/me
 * @access  Auth
 */
const updateMe = asyncHandler(async (req, res) => {
  const { name, bio, location, socialLinks } = req.body;

  const updateFields = {};
  if (name !== undefined) updateFields.name = name;
  if (bio !== undefined) updateFields.bio = bio;
  if (location !== undefined) updateFields.location = location;
  if (socialLinks !== undefined) {
    // Parse socialLinks if sent as JSON string (multipart form)
    const links = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;
    updateFields.socialLinks = links;
  }

  // Handle avatar upload
  if (req.file) {
    if (uploadToCloudinary) {
      const url = await uploadToCloudinary(req.file.buffer, 'womenrise/avatars', {
        transformation: [{ width: 200, height: 200, crop: 'fill', quality: 'auto', fetch_format: 'auto' }],
      });
      updateFields.avatar = url;
    } else {
      updateFields.avatar = `/uploads/${req.file.filename}`;
    }
  }

  const user = await User.findByIdAndUpdate(req.user._id, updateFields, {
    new: true,
    runValidators: true,
  });

  res.json({ success: true, data: user });
});

/**
 * @desc    Change password
 * @route   PUT /api/users/me/password
 * @access  Auth
 */
const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');

  const isMatch = await user.matchPassword(currentPassword);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Current password is incorrect' });
  }

  user.password = newPassword;
  await user.save();

  res.json({ success: true, message: 'Password updated successfully' });
});

/**
 * @desc    Delete own account
 * @route   DELETE /api/users/me
 * @access  Auth
 */
const deleteMe = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.user._id);

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.json({ success: true, message: 'Account deleted successfully' });
});

/**
 * @desc    Get a user's public profile
 * @route   GET /api/users/:id
 * @access  Public
 */
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('name avatar bio location socialLinks');

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.json({ success: true, data: user });
});

/**
 * @desc    List all users (admin)
 * @route   GET /api/users
 * @access  Admin
 */
const listUsers = asyncHandler(async (req, res) => {
  const { search, role, status, page = 1, limit = 20 } = req.query;

  const filter = {};

  if (search) {
    const regex = new RegExp(search, 'i');
    filter.$or = [{ name: regex }, { email: regex }];
  }

  if (role) {
    filter.role = role;
  }

  if (status === 'banned') {
    filter.isBanned = true;
  } else if (status === 'active') {
    filter.isBanned = false;
  }

  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 20;
  const skip = (pageNum - 1) * limitNum;

  const [users, totalCount] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    User.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: users,
    page: pageNum,
    totalPages: Math.ceil(totalCount / limitNum),
    totalCount,
  });
});

/**
 * @desc    Toggle ban status for a user (admin)
 * @route   PUT /api/users/:id/ban
 * @access  Admin
 */
const toggleBan = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  user.isBanned = !user.isBanned;

  if (user.isBanned) {
    // Clear all refresh tokens to force logout on all sessions
    user.refreshTokens = [];

    // Send account banned email (non-blocking)
    const { subject, html } = accountBannedEmail(user.name);
    sendEmail({ to: user.email, subject, html });
  }

  await user.save({ validateBeforeSave: false });

  await logAdminAction(
    req.user._id,
    user.isBanned ? 'BAN_USER' : 'UNBAN_USER',
    user._id,
    'User',
    `${user.isBanned ? 'Banned' : 'Unbanned'} user: ${user.email}`
  );

  res.json({
    success: true,
    message: `User ${user.isBanned ? 'banned' : 'unbanned'} successfully`,
    data: { isBanned: user.isBanned },
  });
});

/**
 * @desc    Delete a user (admin)
 * @route   DELETE /api/users/:id
 * @access  Admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  await logAdminAction(
    req.user._id,
    'DELETE_USER',
    user._id,
    'User',
    `Deleted user: ${user.email}`
  );

  await User.findByIdAndDelete(req.params.id);

  res.json({ success: true, message: 'User deleted successfully' });
});

module.exports = {
  getMe,
  updateMe,
  changePassword,
  deleteMe,
  getUser,
  listUsers,
  toggleBan,
  deleteUser,
};
