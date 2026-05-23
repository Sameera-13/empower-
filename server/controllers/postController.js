const Post = require('../models/Post');
const asyncHandler = require('../utils/asyncHandler');
const uploadToCloudinary = require('../utils/cloudinary');
const logAdminAction = require('../utils/auditLog');
const createNotification = require('../utils/createNotification');

/**
 * @desc    List posts (active only, with filters, sort, pagination)
 * @route   GET /api/posts
 * @access  Public
 */
const listPosts = asyncHandler(async (req, res) => {
  const { category, search, sort = 'latest', page = 1, limit = 20 } = req.query;
  const pageNum = parseInt(page, 10) || 1;
  const limitNum = parseInt(limit, 10) || 20;

  if (sort === 'trending') {
    // Trending: most liked posts in the last 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const matchStage = {
      status: 'active',
      createdAt: { $gte: sevenDaysAgo },
    };
    if (category) matchStage.category = category;
    if (search) matchStage.title = { $regex: search, $options: 'i' };

    const pipeline = [
      { $match: matchStage },
      { $addFields: { likesCount: { $size: '$likes' } } },
      { $sort: { likesCount: -1 } },
      {
        $facet: {
          metadata: [{ $count: 'totalCount' }],
          data: [
            { $skip: (pageNum - 1) * limitNum },
            { $limit: limitNum },
          ],
        },
      },
    ];

    const [result] = await Post.aggregate(pipeline);
    const totalCount = result.metadata[0] ? result.metadata[0].totalCount : 0;
    const posts = await Post.populate(result.data, { path: 'author', select: 'name avatar' });

    return res.json({
      success: true,
      data: posts,
      page: pageNum,
      totalPages: Math.ceil(totalCount / limitNum),
      totalCount,
    });
  }

  // Default: latest
  const filter = { status: 'active' };
  if (category) filter.category = category;
  if (search) filter.title = { $regex: search, $options: 'i' };

  const [posts, totalCount] = await Promise.all([
    Post.find(filter)
      .populate('author', 'name avatar')
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
 * @desc    Get single post
 * @route   GET /api/posts/:id
 * @access  Public
 */
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('author', 'name avatar')
    .populate('comments.author', 'name avatar');

  if (!post || post.status === 'deleted') {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }

  res.json({ success: true, data: post });
});

/**
 * @desc    Create a post
 * @route   POST /api/posts
 * @access  Auth
 */
const createPost = asyncHandler(async (req, res) => {
  const { title, body, category } = req.body;

  const postData = {
    author: req.user._id,
    title,
    body,
    category,
  };

  // Handle image upload
  if (req.file) {
    if (uploadToCloudinary) {
      const url = await uploadToCloudinary(req.file.buffer, 'womenrise/posts', {
        transformation: [{ width: 1200, quality: 'auto', fetch_format: 'auto' }],
      });
      postData.image = url;
    } else {
      postData.image = `/uploads/${req.file.filename}`;
    }
  }

  const post = await Post.create(postData);
  const populated = await post.populate('author', 'name avatar');

  res.status(201).json({ success: true, data: populated });
});

/**
 * @desc    Update a post
 * @route   PUT /api/posts/:id
 * @access  Auth (owner)
 */
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post || post.status === 'deleted') {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }

  if (post.author.toString() !== req.user._id.toString()) {
    return res.status(403).json({ success: false, message: 'Not authorized to update this post' });
  }

  const { title, body, category } = req.body;
  if (title !== undefined) post.title = title;
  if (body !== undefined) post.body = body;
  if (category !== undefined) post.category = category;

  // Handle image upload
  if (req.file) {
    if (uploadToCloudinary) {
      const url = await uploadToCloudinary(req.file.buffer, 'womenrise/posts', {
        transformation: [{ width: 1200, quality: 'auto', fetch_format: 'auto' }],
      });
      post.image = url;
    } else {
      post.image = `/uploads/${req.file.filename}`;
    }
  }

  await post.save();
  const populated = await post.populate('author', 'name avatar');

  res.json({ success: true, data: populated });
});

/**
 * @desc    Delete a post (soft delete — sets status to 'deleted')
 * @route   DELETE /api/posts/:id
 * @access  Auth (owner or admin)
 */
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post || post.status === 'deleted') {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }

  const isOwner = post.author.toString() === req.user._id.toString();
  const isAdmin = req.user.role === 'admin';

  if (!isOwner && !isAdmin) {
    return res.status(403).json({ success: false, message: 'Not authorized to delete this post' });
  }

  post.status = 'deleted';
  await post.save();

  if (isAdmin && !isOwner) {
    await logAdminAction(
      req.user._id,
      'DELETE_POST',
      post._id,
      'Post',
      `Deleted post: ${post.title}`
    );
  }

  res.json({ success: true, message: 'Post deleted successfully' });
});

/**
 * @desc    Toggle like on a post
 * @route   POST /api/posts/:id/like
 * @access  Auth
 */
const toggleLike = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post || post.status === 'deleted') {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }

  const userId = req.user._id;
  const alreadyLiked = post.likes.some((id) => id.toString() === userId.toString());

  if (alreadyLiked) {
    await Post.findByIdAndUpdate(req.params.id, { $pull: { likes: userId } });
  } else {
    await Post.findByIdAndUpdate(req.params.id, { $addToSet: { likes: userId } });
    // Notify post author (don't notify self)
    if (post.author.toString() !== userId.toString()) {
      await createNotification(
        post.author,
        'post_like',
        'Post Liked',
        `${req.user.name} liked your post`,
        `/community/${post._id}`
      );
    }
  }

  const updated = await Post.findById(req.params.id);

  res.json({ success: true, data: { likesCount: updated.likes.length } });
});

/**
 * @desc    Report a post (idempotent, auto-hides at 5 reports)
 * @route   POST /api/posts/:id/report
 * @access  Auth
 */
const reportPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post || post.status === 'deleted') {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }

  // $addToSet ensures idempotent
  await Post.findByIdAndUpdate(req.params.id, {
    $addToSet: { reports: req.user._id },
  });

  const updated = await Post.findById(req.params.id);

  if (updated.reports.length >= 5) {
    updated.status = 'hidden';
    await updated.save();
  }

  res.json({ success: true, message: 'Post reported successfully' });
});

/**
 * @desc    Add a comment to a post
 * @route   POST /api/posts/:id/comments
 * @access  Auth
 */
const addComment = asyncHandler(async (req, res) => {
  const { text } = req.body;

  const post = await Post.findById(req.params.id);

  if (!post || post.status === 'deleted') {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }

  post.comments.push({ author: req.user._id, text });
  await post.save();

  // Notify post author (don't notify self)
  if (post.author.toString() !== req.user._id.toString()) {
    await createNotification(
      post.author,
      'comment_reply',
      'New Comment',
      `${req.user.name} commented on your post`,
      `/community/${post._id}`
    );
  }

  const populated = await post.populate('comments.author', 'name avatar');

  res.status(201).json({ success: true, data: populated.comments });
});

/**
 * @desc    Delete a comment from a post
 * @route   DELETE /api/posts/:id/comments/:cid
 * @access  Auth (comment author or admin)
 */
const deleteComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post || post.status === 'deleted') {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }

  const comment = post.comments.id(req.params.cid);

  if (!comment) {
    return res.status(404).json({ success: false, message: 'Comment not found' });
  }

  const isCommentAuthor = comment.author.toString() === req.user._id.toString();
  const isAdmin = req.user.role === 'admin';

  if (!isCommentAuthor && !isAdmin) {
    return res.status(403).json({ success: false, message: 'Not authorized to delete this comment' });
  }

  post.comments.pull({ _id: req.params.cid });
  await post.save();

  res.json({ success: true, message: 'Comment deleted successfully' });
});

module.exports = {
  listPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  reportPost,
  addComment,
  deleteComment,
};
