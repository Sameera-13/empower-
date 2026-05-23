const Resource = require('../models/Resource');
const asyncHandler = require('../utils/asyncHandler');
const logAdminAction = require('../utils/auditLog');

/**
 * @desc    List resources (excludes soft-deleted)
 * @route   GET /api/resources
 * @access  Public
 */
const listResources = asyncHandler(async (req, res) => {
  const { category, state, language, search, page = 1, limit = 20 } = req.query;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 20;

  const filter = { deletedAt: null };

  if (category) filter.category = category;
  if (state) filter.state = state;
  if (language) filter.language = language;
  if (search) {
    filter.$text = { $search: search };
  }

  const [resources, totalCount] = await Promise.all([
    Resource.find(filter)
      .sort({ isPinned: -1, createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    Resource.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: resources,
    page: pageNum,
    totalPages: Math.ceil(totalCount / limitNum),
    totalCount,
  });
});

/**
 * @desc    Get single resource
 * @route   GET /api/resources/:id
 * @access  Public
 */
const getResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (!resource || resource.deletedAt) {
    return res.status(404).json({ success: false, message: 'Resource not found' });
  }

  res.json({ success: true, data: resource });
});

/**
 * @desc    Create a resource (admin)
 * @route   POST /api/resources
 * @access  Admin
 */
const createResource = asyncHandler(async (req, res) => {
  const { title, description, category, sourceUrl, state, language, isPinned } = req.body;

  const resource = await Resource.create({
    title,
    description,
    category,
    sourceUrl,
    state,
    language,
    isPinned,
    createdBy: req.user._id,
  });

  await logAdminAction(
    req.user._id,
    'CREATE_RESOURCE',
    resource._id,
    'Resource',
    `Created resource: ${resource.title}`
  );

  res.status(201).json({ success: true, data: resource });
});

/**
 * @desc    Update a resource (admin)
 * @route   PUT /api/resources/:id
 * @access  Admin
 */
const updateResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (!resource || resource.deletedAt) {
    return res.status(404).json({ success: false, message: 'Resource not found' });
  }

  const updated = await Resource.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  await logAdminAction(
    req.user._id,
    'UPDATE_RESOURCE',
    updated._id,
    'Resource',
    `Updated resource: ${updated.title}`
  );

  res.json({ success: true, data: updated });
});

/**
 * @desc    Soft delete a resource (admin)
 * @route   DELETE /api/resources/:id
 * @access  Admin
 */
const deleteResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (!resource || resource.deletedAt) {
    return res.status(404).json({ success: false, message: 'Resource not found' });
  }

  resource.deletedAt = new Date();
  await resource.save();

  await logAdminAction(
    req.user._id,
    'DELETE_RESOURCE',
    resource._id,
    'Resource',
    `Soft-deleted resource: ${resource.title}`
  );

  res.json({ success: true, message: 'Resource deleted successfully' });
});

module.exports = {
  listResources,
  getResource,
  createResource,
  updateResource,
  deleteResource,
};
