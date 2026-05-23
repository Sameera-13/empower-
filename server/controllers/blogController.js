const BlogPost = require('../models/BlogPost');
const asyncHandler = require('../utils/asyncHandler');
const logAdminAction = require('../utils/auditLog');
const uploadToCloudinary = require('../utils/cloudinary');

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    + '-' + Date.now().toString(36);
}

const listPublished = asyncHandler(async (req, res) => {
  const { category, tag, search, sort = 'newest', page = 1, limit = 12 } = req.query;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 12;

  const filter = { isPublished: true };
  if (category) filter.category = category;
  if (tag) filter.tags = tag;
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
    ];
  }

  const sortOption = sort === 'oldest' ? { publishedAt: 1 } : { publishedAt: -1 };

  const [posts, totalCount] = await Promise.all([
    BlogPost.find(filter)
      .populate('author', 'name avatar')
      .sort(sortOption)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    BlogPost.countDocuments(filter),
  ]);

  res.json({
    success: true,
    data: posts,
    page: pageNum,
    totalPages: Math.ceil(totalCount / limitNum),
    totalCount,
  });
});

const getBySlug = asyncHandler(async (req, res) => {
  const post = await BlogPost.findOne({ slug: req.params.slug, isPublished: true })
    .populate('author', 'name avatar');

  if (!post) {
    return res.status(404).json({ success: false, message: 'Blog post not found' });
  }
  res.json({ success: true, data: post });
});

const adminList = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 20;

  const [posts, totalCount] = await Promise.all([
    BlogPost.find()
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 })
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum),
    BlogPost.countDocuments(),
  ]);

  res.json({
    success: true,
    data: posts,
    page: pageNum,
    totalPages: Math.ceil(totalCount / limitNum),
    totalCount,
  });
});

const createBlogPost = asyncHandler(async (req, res) => {
  const { title, body, excerpt, category, tags, isPublished } = req.body;

  let coverImage = '';
  if (req.file) {
    if (uploadToCloudinary) {
      coverImage = await uploadToCloudinary(req.file.buffer, 'blog');
    } else {
      coverImage = `/uploads/${req.file.filename}`;
    }
  }

  const slug = generateSlug(title);
  const parsedTags = typeof tags === 'string' ? tags.split(',').map(t => t.trim()).filter(Boolean) : (tags || []);

  const post = await BlogPost.create({
    title, slug, body, excerpt, coverImage, category,
    tags: parsedTags,
    author: req.user._id,
    isPublished: isPublished === 'true' || isPublished === true,
    publishedAt: (isPublished === 'true' || isPublished === true) ? new Date() : null,
  });

  await logAdminAction(req.user._id, 'CREATE_BLOG_POST', post._id, 'BlogPost', `Created blog post: ${post.title}`);
  res.status(201).json({ success: true, data: post });
});

const updateBlogPost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ success: false, message: 'Blog post not found' });
  }

  const updates = { ...req.body };

  if (req.file) {
    if (uploadToCloudinary) {
      updates.coverImage = await uploadToCloudinary(req.file.buffer, 'blog');
    } else {
      updates.coverImage = `/uploads/${req.file.filename}`;
    }
  }

  if (updates.tags && typeof updates.tags === 'string') {
    updates.tags = updates.tags.split(',').map(t => t.trim()).filter(Boolean);
  }

  if (updates.isPublished === 'true' || updates.isPublished === true) {
    updates.isPublished = true;
    if (!post.publishedAt) updates.publishedAt = new Date();
  } else if (updates.isPublished === 'false' || updates.isPublished === false) {
    updates.isPublished = false;
  }

  const updated = await BlogPost.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
  await logAdminAction(req.user._id, 'UPDATE_BLOG_POST', updated._id, 'BlogPost', `Updated blog post: ${updated.title}`);
  res.json({ success: true, data: updated });
});

const deleteBlogPost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ success: false, message: 'Blog post not found' });
  }
  await BlogPost.findByIdAndDelete(req.params.id);
  await logAdminAction(req.user._id, 'DELETE_BLOG_POST', post._id, 'BlogPost', `Deleted blog post: ${post.title}`);
  res.json({ success: true, message: 'Blog post deleted' });
});

module.exports = { listPublished, getBySlug, adminList, createBlogPost, updateBlogPost, deleteBlogPost };
