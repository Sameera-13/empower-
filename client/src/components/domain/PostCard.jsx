import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../common/Card';
import Badge from '../common/Badge';

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

export default function PostCard({ post }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    _id,
    author,
    title,
    category,
    likes = [],
    comments = [],
    createdAt,
  } = post;

  const authorName = author?.name || 'Anonymous';
  const authorInitial = authorName[0]?.toUpperCase() || '?';
  const userLiked = user && likes.includes(user._id || user.id);

  return (
    <Card
      className="cursor-pointer"
      onClick={() => navigate(`/community/${_id}`)}
      role="article"
    >
      {/* Author row */}
      <div className="flex items-center gap-3 mb-3">
        {author?.avatar ? (
          <img
            src={author.avatar}
            alt={authorName}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-[#FF6B9D] text-white flex items-center justify-center text-sm font-semibold">
            {authorInitial}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-dark truncate">{authorName}</p>
          <p className="text-xs text-gray-400">{timeAgo(createdAt)}</p>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-dark mb-2 line-clamp-2">{title}</h3>

      {/* Footer */}
      <div className="flex items-center gap-4 mt-3">
        <Badge variant={category}>{category}</Badge>

        <div className="flex items-center gap-1 ml-auto text-sm text-gray-500">
          <svg
            className={`w-4 h-4 ${userLiked ? 'text-danger fill-danger' : ''}`}
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
          <span>{likes.length}</span>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500">
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
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span>{comments.length}</span>
        </div>
      </div>
    </Card>
  );
}
