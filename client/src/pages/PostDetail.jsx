import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  usePost,
  useToggleLike,
  useReportPost,
  useAddComment,
  useDeleteComment,
} from '../hooks/usePosts';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import CommentList from '../components/domain/CommentList';

function timeAgo(dateStr) {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const seconds = Math.floor((now - then) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const { data, isLoading, error } = usePost(id);
  const toggleLike = useToggleLike();
  const reportPost = useReportPost();
  const addComment = useAddComment();
  const deleteComment = useDeleteComment();

  const [commentText, setCommentText] = useState('');
  const [reported, setReported] = useState(false);

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingSpinner className="py-32" />
      </PageContainer>
    );
  }

  if (error || !data?.data) {
    return (
      <PageContainer>
        <div className="max-w-3xl mx-auto px-4 py-8 text-center">
          <h2 className="text-xl font-semibold text-dark mb-2">
            Post not found
          </h2>
          <p className="text-gray-500 mb-4">
            This post may have been removed or does not exist.
          </p>
          <Button onClick={() => navigate('/community')}>
            Back to Community
          </Button>
        </div>
      </PageContainer>
    );
  }

  const post = data.data;
  const {
    author,
    title,
    body,
    image,
    category,
    likes = [],
    comments = [],
    createdAt,
  } = post;

  const userId = user?._id || user?.id;
  const userLiked = userId && likes.includes(userId);
  const authorName = author?.name || 'Anonymous';
  const authorInitial = authorName[0]?.toUpperCase() || '?';

  const handleLike = () => {
    if (!isAuthenticated) return navigate('/login');
    toggleLike.mutate(id);
  };

  const handleReport = async () => {
    if (!isAuthenticated) return navigate('/login');
    try {
      await reportPost.mutateAsync(id);
      setReported(true);
    } catch {
      // already reported or error
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;
    try {
      await addComment.mutateAsync({ postId: id, text: commentText.trim() });
      setCommentText('');
    } catch {
      // handle error silently
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment.mutateAsync({ postId: id, commentId });
    } catch {
      // handle error silently
    }
  };

  return (
    <PageContainer>
      <article className="max-w-3xl mx-auto px-4 py-8">
        {/* Back button */}
        <button
          onClick={() => navigate('/community')}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Community
        </button>

        {/* Author info */}
        <div className="flex items-center gap-3 mb-4">
          {author?.avatar ? (
            <img
              src={author.avatar}
              alt={authorName}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#FF6B9D] text-white flex items-center justify-center text-sm font-semibold">
              {authorInitial}
            </div>
          )}
          <div>
            <p className="font-medium text-dark">{authorName}</p>
            <p className="text-xs text-gray-400">{timeAgo(createdAt)}</p>
          </div>
          <Badge variant={category} className="ml-auto">
            {category}
          </Badge>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-display text-dark mb-4">
          {title}
        </h1>

        {/* Image */}
        {image && (
          <img
            src={image}
            alt={title}
            className="w-full rounded-xl mb-6 max-h-[400px] object-cover"
          />
        )}

        {/* Body */}
        <div
          className="prose prose-sm max-w-none mb-6"
          dangerouslySetInnerHTML={{ __html: body }}
        />

        {/* Actions */}
        <div className="flex items-center gap-4 py-4 border-t border-b border-border">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
              userLiked
                ? 'text-danger'
                : 'text-gray-500 hover:text-danger'
            }`}
            aria-label={userLiked ? 'Unlike post' : 'Like post'}
          >
            <svg
              className="w-5 h-5"
              fill={userLiked ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={userLiked ? 0 : 2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
          </button>

          <span className="text-sm text-gray-400">
            {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
          </span>

          {isAuthenticated && (
            <button
              onClick={handleReport}
              disabled={reported}
              className={`ml-auto text-sm font-medium transition-colors ${
                reported
                  ? 'text-gray-400 cursor-default'
                  : 'text-gray-500 hover:text-danger'
              }`}
              aria-label="Report post"
            >
              {reported ? 'Reported' : 'Report'}
            </button>
          )}
        </div>

        {/* Comments section */}
        <section className="mt-6">
          <h2 className="text-lg font-semibold text-dark mb-4">Comments</h2>

          {isAuthenticated && (
            <div className="flex gap-3 mb-6">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts..."
                className="flex-1 px-3 py-2 rounded-lg border border-border text-sm outline-none resize-none min-h-[60px] focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <Button
                onClick={handleAddComment}
                disabled={!commentText.trim() || addComment.isPending}
                className="self-end"
              >
                {addComment.isPending ? 'Posting...' : 'Post'}
              </Button>
            </div>
          )}

          <CommentList
            comments={comments}
            postId={id}
            onDelete={handleDeleteComment}
          />
        </section>
      </article>
    </PageContainer>
  );
}
