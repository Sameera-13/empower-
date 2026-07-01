const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const sendEmail = require('../utils/email');
const { welcomeEmail, passwordResetEmail } = require('../utils/emailTemplates');

/**
 * Generate a JWT access token.
 */
const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

/**
 * Generate a refresh token, hash it, save to user, and set cookie.
 */
const generateRefreshToken = async (user, res) => {
  const plainToken = crypto.randomBytes(40).toString('hex');
  const hashed = crypto.createHash('sha256').update(plainToken).digest('hex');

  user.refreshTokens.push({
    token: hashed,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  await user.save({ validateBeforeSave: false });

  res.cookie('refreshToken', plainToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ success: false, message: 'Email already in use' });
  }

  const user = await User.create({ name, email, password });

  const accessToken = generateAccessToken(user._id);
  await generateRefreshToken(user, res);

  // Send welcome email (non-blocking)
  const { subject, html } = welcomeEmail(user.name);
  sendEmail({ to: user.email, subject, html });

  res.status(201).json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      accessToken,
    },
  });
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  if (user.isBanned) {
    return res.status(403).json({ success: false, message: 'Your account has been suspended' });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const accessToken = generateAccessToken(user._id);
  await generateRefreshToken(user, res);

  res.json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      accessToken,
    },
  });
});

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Auth
 */
const logout = asyncHandler(async (req, res) => {
  const plainToken = req.cookies.refreshToken;
  if (plainToken) {
    const hashed = crypto.createHash('sha256').update(plainToken).digest('hex');
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { refreshTokens: { token: hashed } },
    });
  }

  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
  });

  res.json({ success: true, message: 'Logged out successfully' });
});

/**
 * @desc    Refresh access token
 * @route   POST /api/auth/refresh
 * @access  Public (cookie)
 */
const refresh = asyncHandler(async (req, res) => {
  const plainToken = req.cookies.refreshToken;
  if (!plainToken) {
    return res.status(401).json({ success: false, message: 'No refresh token provided' });
  }

  const hashed = crypto.createHash('sha256').update(plainToken).digest('hex');

  const user = await User.findOne({
    'refreshTokens.token': hashed,
    'refreshTokens.expiresAt': { $gt: new Date() },
  });

  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid or expired refresh token' });
  }

  // Clean expired tokens from array
  user.refreshTokens = user.refreshTokens.filter(
    (rt) => rt.expiresAt > new Date()
  );
  await user.save({ validateBeforeSave: false });

  const accessToken = generateAccessToken(user._id);

  res.json({ success: true, data: { accessToken } });
});

/**
 * @desc    Forgot password — send reset email
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashed = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetPasswordToken = hashed;
    user.resetPasswordExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await user.save({ validateBeforeSave: false });

    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const resetUrl = `${clientUrl}/reset-password?token=${resetToken}`;

    const { subject, html } = passwordResetEmail(user.name, resetUrl);
    sendEmail({ to: user.email, subject, html });
  }

  // Always return generic message regardless of whether user exists
  res.json({
    success: true,
    message: 'If an account exists with this email, a reset link has been sent.',
  });
});

/**
 * @desc    Reset password with token
 * @route   POST /api/auth/reset-password
 * @access  Public
 */
const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  const hashed = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashed,
    resetPasswordExpiry: { $gt: new Date() },
  });

  if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
  }

  user.password = password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpiry = undefined;
  await user.save();

  res.json({ success: true, message: 'Password has been reset successfully' });
});

module.exports = {
  register,
  login,
  logout,
  refresh,
  forgotPassword,
  resetPassword,
};
