import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Card from '../common/Card';
import Badge from '../common/Badge';

export default function OpportunityCard({ opportunity, onToggleSave }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const {
    _id,
    title,
    org,
    type,
    deadline,
    location,
  } = opportunity;

  const deadlineDate = deadline ? new Date(deadline) : null;
  const now = new Date();
  const isPast = deadlineDate && deadlineDate < now;
  const daysUntil = deadlineDate
    ? Math.ceil((deadlineDate - now) / (1000 * 60 * 60 * 24))
    : null;
  const isUrgent = daysUntil !== null && daysUntil >= 0 && daysUntil < 7;

  const savedOpps = user?.savedOpportunities || [];
  const isSaved = savedOpps.some(
    (s) => (typeof s === 'string' ? s : s?._id || s?.id) === _id
  );

  const handleBookmark = (e) => {
    e.stopPropagation();
    if (onToggleSave) onToggleSave(_id);
  };

  return (
    <Card
      className="cursor-pointer flex flex-col h-full"
      onClick={() => navigate(`/opportunities/${_id}`)}
      role="article"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-dark leading-snug line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">{org}</p>
        </div>

        {user && (
          <button
            onClick={handleBookmark}
            className="shrink-0 p-1 rounded hover:bg-gray-100 transition-colors"
            aria-label={isSaved ? 'Remove bookmark' : 'Bookmark opportunity'}
          >
            <svg
              className={`w-5 h-5 ${isSaved ? 'text-primary fill-primary' : 'text-gray-400'}`}
              fill={isSaved ? 'currentColor' : 'none'}
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={isSaved ? 0 : 2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="flex items-center flex-wrap gap-2 mt-auto pt-3">
        <Badge variant={type}>
          {type?.replace('-', ' ')}
        </Badge>

        {isPast && (
          <Badge variant="deleted">Closed</Badge>
        )}

        {deadlineDate && !isPast && (
          <span
            className={`text-xs font-medium ${isUrgent ? 'text-danger' : 'text-gray-500'}`}
          >
            Due{' '}
            {deadlineDate.toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        )}

        {location && (
          <span className="text-xs text-gray-400 ml-auto flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {location}
          </span>
        )}
      </div>
    </Card>
  );
}
