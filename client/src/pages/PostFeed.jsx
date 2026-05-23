import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { usePosts, useCreatePost } from '../hooks/usePosts';
import PageContainer from '../components/layout/PageContainer';
import SearchBar from '../components/common/SearchBar';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import PostCard from '../components/domain/PostCard';
import RichTextEditor from '../components/domain/RichTextEditor';
import ImageUpload from '../components/domain/ImageUpload';

const sortTabs = [
  { value: 'trending', label: 'Trending' },
  { value: 'latest', label: 'Latest' },
  { value: 'my', label: 'My Posts' },
];

const categoryOptions = [
  { value: '', label: 'All Categories' },
  { value: 'legal', label: 'Legal' },
  { value: 'health', label: 'Health' },
  { value: 'career', label: 'Career' },
  { value: 'general', label: 'General' },
  { value: 'safety', label: 'Safety' },
];

const createCategoryOptions = [
  { value: 'general', label: 'General' },
  { value: 'legal', label: 'Legal' },
  { value: 'health', label: 'Health' },
  { value: 'career', label: 'Career' },
  { value: 'safety', label: 'Safety' },
];

export default function PostFeed() {
  const { isAuthenticated, user } = useAuth();
  const createPost = useCreatePost();

  const [sort, setSort] = useState('trending');
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showCreate, setShowCreate] = useState(false);

  // Create form state
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newCategory, setNewCategory] = useState('general');
  const [newImage, setNewImage] = useState(null);
  const [createError, setCreateError] = useState('');

  const params = {
    sort: sort === 'my' ? 'latest' : sort,
    category: category || undefined,
    search: search || undefined,
    page,
    limit: 12,
  };
  if (sort === 'my' && user) {
    params.author = user._id || user.id;
  }

  const { data, isLoading } = usePosts(params);
  const posts = data?.data || [];
  const totalPages = data?.totalPages || 1;

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
      setCreateError(
        err.response?.data?.message || 'Failed to create post.'
      );
    }
  };

  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-display text-dark">Community</h1>
          {isAuthenticated && (
            <Button onClick={() => setShowCreate(true)}>Create Post</Button>
          )}
        </div>

        {/* Filter row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          {/* Sort tabs */}
          <div className="flex gap-2">
            {sortTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setSort(tab.value);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sort === tab.value
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 border border-border hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category dropdown */}
          <Select
            options={categoryOptions}
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="max-w-[180px]"
          />

          {/* Search */}
          <SearchBar
            value={search}
            onChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            placeholder="Search posts..."
            className="sm:ml-auto max-w-xs"
          />
        </div>

        {/* Content */}
        {isLoading ? (
          <LoadingSpinner className="py-20" />
        ) : posts.length === 0 ? (
          <EmptyState
            title="No posts yet"
            description={
              sort === 'my'
                ? "You haven't created any posts yet."
                : 'Be the first to start a conversation!'
            }
            actionLabel={isAuthenticated ? 'Create Post' : undefined}
            onAction={isAuthenticated ? () => setShowCreate(true) : undefined}
            icon={
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>

      {/* Create Post Modal */}
      <Modal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        title="Create Post"
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
            options={createCategoryOptions}
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
              {createPost.isPending ? 'Publishing...' : 'Publish'}
            </Button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}
