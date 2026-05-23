import { useAuth } from '../../context/AuthContext';

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

export default function CommentList({ comments = [], postId, onDelete }) {
  const { user, isAdmin } = useAuth();

  if (comments.length === 0) {
    return (
      <p className="text-sm text-gray-400 py-4 text-center">
        No comments yet. Be the first to share your thoughts.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => {
        const authorName = comment.author?.name || 'Anonymous';
        const authorInitial = authorName[0]?.toUpperCase() || '?';
        const authorId = comment.author?._id || comment.author?.id;
        const currentUserId = user?._id || user?.id;
        const canDelete = currentUserId && (authorId === currentUserId || isAdmin);

        return (
          <div
            key={comment._id}
            className="flex gap-3 p-3 rounded-lg bg-surface"
          >
            {comment.author?.avatar ? (
              <img
                src={comment.author.avatar}
                alt={authorName}
                className="w-8 h-8 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#FF6B9D] text-white flex items-center justify-center text-xs font-semibold shrink-0">
                {authorInitial}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-dark">
                  {authorName}
                </span>
                <span className="text-xs text-gray-400">
                  {timeAgo(comment.createdAt)}
                </span>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-wrap break-words">
                {comment.text}
              </p>
            </div>

            {canDelete && (
              <button
                onClick={() => onDelete(comment._id)}
                className="shrink-0 p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-danger transition-colors"
                aria-label="Delete comment"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
