import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import AdminLayout from '../../components/layout/AdminLayout';
import Select from '../../components/common/Select';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import RichTextEditor from '../../components/domain/RichTextEditor';
import ImageUpload from '../../components/domain/ImageUpload';
import { usePosts, useCreatePost } from '../../hooks/usePosts';
import api from '../../services/api';

const STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'hidden', label: 'Hidden' },
  { value: 'reported', label: 'Reported' },
];

const CATEGORY_OPTIONS = [
  { value: '', label: 'All Categories' },
  { value: 'legal', label: 'Legal' },
  { value: 'health', label: 'Health' },
  { value: 'career', label: 'Career' },
  { value: 'general', label: 'General' },
  { value: 'safety', label: 'Safety' },
];

const CREATE_CATEGORY_OPTIONS = [
  { value: 'general', label: 'General' },
  { value: 'legal', label: 'Legal' },
  { value: 'health', label: 'Health' },
  { value: 'career', label: 'Career' },
  { value: 'safety', label: 'Safety' },
];

export default function PostManagement() {
  const queryClient = useQueryClient();
  const createPost = useCreatePost();
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, postId: null });
  const [actionLoading, setActionLoading] = useState(null);
  const [popoverId, setPopoverId] = useState(null);

  // Create post state
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newCategory, setNewCategory] = useState('general');
  const [newImage, setNewImage] = useState(null);
  const [createError, setCreateError] = useState('');

  const params = useMemo(() => {
    const p = { page, limit: 20 };
    if (status) p.status = status;
    if (category) p.category = category;
    return p;
  }, [status, category, page]);

  const { data, isLoading } = usePosts(params);

  const posts = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handleStatusChange = useCallback((e) => {
    setStatus(e.target.value);
    setPage(1);
  }, []);

  const handleCategoryChange = useCallback((e) => {
    setCategory(e.target.value);
    setPage(1);
  }, []);

  const handleHide = async (postId) => {
    setActionLoading(postId);
    try {
      await api.put(`/posts/${postId}`, { status: 'hidden' });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    } catch (err) {
      console.error('Failed to hide post:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async () => {
    if (!confirmDialog.postId) return;
    setActionLoading(confirmDialog.postId);
    try {
      await api.delete(`/posts/${confirmDialog.postId}`);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setConfirmDialog({ open: false, postId: null });
    } catch (err) {
      console.error('Failed to delete post:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const togglePopover = (postId) => {
    setPopoverId((prev) => (prev === postId ? null : postId));
  };

  const handleCreate = async () => {
    setCreateError('');
    if (!newTitle.trim()) {
      setCreateError('Title is required');
      return;
    }

    const formData = new FormData();
    formData.append('title', newTitle);
    formData.append('body', newBody);
    formData.append('category', newCategory);
    if (newImage) formData.append('image', newImage);

    try {
      await createPost.mutateAsync(formData);
      setShowCreate(false);
      setNewTitle('');
      setNewBody('');
      setNewCategory('general');
      setNewImage(null);
    } catch (err) {
      setCreateError(err.response?.data?.message || 'Failed to create post.');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '--';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-dark">Post Management</h2>
            <p className="text-sm text-gray-500 mt-1">Review and moderate community posts</p>
          </div>
          <Button onClick={() => setShowCreate(true)}>
            <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Post
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            options={STATUS_OPTIONS}
            value={status}
            onChange={handleStatusChange}
            className="sm:w-44"
          />
          <Select
            options={CATEGORY_OPTIONS}
            value={category}
            onChange={handleCategoryChange}
            className="sm:w-44"
          />
        </div>

        {/* Data Table */}
        {isLoading ? (
          <LoadingSpinner size="lg" className="py-20" />
        ) : posts.length === 0 ? (
          <EmptyState
            title="No posts found"
            description="Try adjusting your filters."
            icon={
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            }
          />
        ) : (
          <div className="bg-white border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Author</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Likes</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Reports</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {posts.map((post) => {
                    const reportsCount = post.reports?.length || 0;
                    const authorName = post.author?.name || 'Unknown';
                    return (
                      <tr key={post._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <span className="text-sm font-medium text-dark line-clamp-1 max-w-[200px] block">
                            {post.title}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-600">{authorName}</span>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={post.category}>{post.category}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-600">{post.likes?.length || 0}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="relative">
                            <button
                              onClick={() => reportsCount > 0 && togglePopover(post._id)}
                              className={`text-sm font-medium ${
                                reportsCount > 0
                                  ? 'text-danger cursor-pointer hover:underline'
                                  : 'text-gray-400 cursor-default'
                              }`}
                              aria-label={`${reportsCount} reports`}
                            >
                              {reportsCount}
                            </button>
                            {/* Reports Popover */}
                            {popoverId === post._id && reportsCount > 0 && (
                              <div className="absolute z-20 top-full left-0 mt-1 bg-white border border-border rounded-lg shadow-lg p-3 min-w-[180px]">
                                <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
                                  Reported by
                                </p>
                                <ul className="space-y-1">
                                  {post.reports.map((reporter, idx) => (
                                    <li key={idx} className="text-sm text-gray-700">
                                      {typeof reporter === 'object'
                                        ? reporter.name || reporter.email || `User ${idx + 1}`
                                        : `Reporter ${idx + 1}`}
                                    </li>
                                  ))}
                                </ul>
                                <button
                                  onClick={() => setPopoverId(null)}
                                  className="mt-2 text-xs text-primary hover:underline"
                                >
                                  Close
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={post.status || 'active'}>{post.status || 'active'}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-500">{formatDate(post.createdAt)}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/community/${post._id}`}
                              className="inline-flex items-center h-8 px-3 rounded-lg text-xs font-medium text-primary hover:bg-primary/5 transition-colors"
                            >
                              View
                            </Link>
                            {post.status !== 'hidden' && (
                              <Button
                                variant="ghost"
                                className="h-8 px-3 text-xs"
                                onClick={() => handleHide(post._id)}
                                disabled={actionLoading === post._id}
                              >
                                Hide
                              </Button>
                            )}
                            <Button
                              variant="danger"
                              className="h-8 px-3 text-xs"
                              onClick={() =>
                                setConfirmDialog({ open: true, postId: post._id })
                              }
                              disabled={actionLoading === post._id}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, postId: null })}
        onConfirm={handleDelete}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmLabel="Delete"
        loading={actionLoading === confirmDialog.postId}
      />

      {/* Create Post Modal */}
      <Modal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        title="Add New Post"
        className="max-w-2xl"
      >
        <div className="space-y-4">
          {createError && (
            <div className="p-3 rounded-lg bg-danger/10 text-danger text-sm">
              {createError}
            </div>
          )}
          <Input
            label="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Give your post a title"
          />
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Content
            </label>
            <RichTextEditor content={newBody} onChange={setNewBody} />
          </div>
          <Select
            label="Category"
            options={CREATE_CATEGORY_OPTIONS}
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium text-dark mb-1.5">
              Image (optional)
            </label>
            <ImageUpload onFileSelect={setNewImage} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setShowCreate(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={createPost.isPending}
            >
              {createPost.isPending ? 'Publishing...' : 'Publish Post'}
            </Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
