const Opportunity = require('../models/Opportunity');
const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const logAdminAction = require('../utils/auditLog');
const createNotification = require('../utils/createNotification');

/**
 * @desc    List opportunities (excludes soft-deleted)
 * @route   GET /api/opportunities
 * @access  Public
 */
const listOpportunities = asyncHandler(async (req, res) => {
  const { type, status, search, page = 1, limit = 20 } = req.query;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 20;

  const filter = { deletedAt: null };

  if (type) filter.type = type;

  if (status === 'active') {
    filter.deadline = { $gte: new Date() };
  } else if (status === 'expired') {
    filter.deadline = { $lt: new Date() };
  }

  if (search) {
    const regex = new RegExp(search, 'i');
    filter.$or = [{ title: regex }, { org: regex }];
  }

  const [opportunities, totalCount] = await Promise.all([
    Opportunity.find(filter)
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Opportunity.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: opportunities,
    page: pageNum,
    totalPages: Math.ceil(totalCount / limitNum),
    totalCount,
  });
});

/**
 * @desc    Get single opportunity
 * @route   GET /api/opportunities/:id
 * @access  Public
 */
const getOpportunity = asyncHandler(async (req, res) => {
  const opportunity = await Opportunity.findById(req.params.id);

  if (!opportunity || opportunity.deletedAt) {
    return res.status(404).json({ success: false, message: 'Opportunity not found' });
  }

  res.json({ success: true, data: opportunity });
});

/**
 * @desc    Create an opportunity (admin)
 * @route   POST /api/opportunities
 * @access  Admin
 */
const createOpportunity = asyncHandler(async (req, res) => {
  const { title, org, type, description, eligibility, deadline, location, applyUrl } = req.body;

  const opportunity = await Opportunity.create({
    title,
    org,
    type,
    description,
    eligibility,
    deadline,
    location,
    applyUrl,
    createdBy: req.user._id,
  });

  await logAdminAction(
    req.user._id,
    'CREATE_OPPORTUNITY',
    opportunity._id,
    'Opportunity',
    `Created opportunity: ${opportunity.title}`
  );

  // Notify all users about new opportunity
  await createNotification(
    'all',
    'new_opportunity',
    'New Opportunity',
    opportunity.title,
    `/opportunities/${opportunity._id}`
  );

  res.status(201).json({ success: true, data: opportunity });
});

/**
 * @desc    Update an opportunity (admin)
 * @route   PUT /api/opportunities/:id
 * @access  Admin
 */
const updateOpportunity = asyncHandler(async (req, res) => {
  const opportunity = await Opportunity.findById(req.params.id);

  if (!opportunity || opportunity.deletedAt) {
    return res.status(404).json({ success: false, message: 'Opportunity not found' });
  }

  const { title, org, type, description, eligibility, deadline, location, applyUrl } = req.body;

  if (title !== undefined) opportunity.title = title;
  if (org !== undefined) opportunity.org = org;
  if (type !== undefined) opportunity.type = type;
  if (description !== undefined) opportunity.description = description;
  if (eligibility !== undefined) opportunity.eligibility = eligibility;
  if (deadline !== undefined) opportunity.deadline = deadline;
  if (location !== undefined) opportunity.location = location;
  if (applyUrl !== undefined) opportunity.applyUrl = applyUrl;

  await opportunity.save();

  await logAdminAction(
    req.user._id,
    'UPDATE_OPPORTUNITY',
    opportunity._id,
    'Opportunity',
    `Updated opportunity: ${opportunity.title}`
  );

  res.json({ success: true, data: opportunity });
});

/**
 * @desc    Soft delete an opportunity (admin)
 * @route   DELETE /api/opportunities/:id
 * @access  Admin
 */
const deleteOpportunity = asyncHandler(async (req, res) => {
  const opportunity = await Opportunity.findById(req.params.id);

  if (!opportunity || opportunity.deletedAt) {
    return res.status(404).json({ success: false, message: 'Opportunity not found' });
  }

  opportunity.deletedAt = new Date();
  await opportunity.save();

  await logAdminAction(
    req.user._id,
    'DELETE_OPPORTUNITY',
    opportunity._id,
    'Opportunity',
    `Soft-deleted opportunity: ${opportunity.title}`
  );

  res.json({ success: true, message: 'Opportunity deleted successfully' });
});

/**
 * @desc    Toggle save/bookmark an opportunity
 * @route   POST /api/opportunities/:id/save
 * @access  Auth
 */
const toggleSave = asyncHandler(async (req, res) => {
  const opportunity = await Opportunity.findById(req.params.id);

  if (!opportunity || opportunity.deletedAt) {
    return res.status(404).json({ success: false, message: 'Opportunity not found' });
  }

  const user = await User.findById(req.user._id);
  const alreadySaved = user.savedOpportunities.some(
    (id) => id.toString() === req.params.id
  );

  if (alreadySaved) {
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { savedOpportunities: opportunity._id },
    });
  } else {
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { savedOpportunities: opportunity._id },
    });
  }

  res.json({ success: true, data: { saved: !alreadySaved } });
});

module.exports = {
  listOpportunities,
  getOpportunity,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
  toggleSave,
};
