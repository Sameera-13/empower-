import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOpportunity, useToggleSave } from '../hooks/useOpportunities';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import LoadingSpinner from '../components/common/LoadingSpinner';

export default function OpportunityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isLoading, error } = useOpportunity(id);
  const toggleSave = useToggleSave();

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
            Opportunity not found
          </h2>
          <p className="text-gray-500 mb-4">
            This opportunity may have been removed or does not exist.
          </p>
          <Button onClick={() => navigate('/opportunities')}>
            Back to Opportunities
          </Button>
        </div>
      </PageContainer>
    );
  }

  const opp = data.data;
  const {
    title,
    org,
    type,
    description,
    eligibility,
    deadline,
    location,
    applyUrl,
  } = opp;

  const deadlineDate = deadline ? new Date(deadline) : null;
  const now = new Date();
  const isPast = deadlineDate && deadlineDate < now;

  const savedOpps = user?.savedOpportunities || [];
  const isSaved = savedOpps.some(
    (s) => (typeof s === 'string' ? s : s?._id || s?.id) === id
  );

  const handleBookmark = () => {
    toggleSave.mutate(id);
  };

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back */}
        <button
          onClick={() => navigate('/opportunities')}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary mb-6 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Opportunities
        </button>

        {/* Closed banner */}
        {isPast && (
          <div className="mb-4 p-3 rounded-lg bg-danger/10 text-danger text-sm font-medium">
            This opportunity has passed its deadline and is no longer accepting applications.
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-display text-dark mb-1">
              {title}
            </h1>
            <p className="text-gray-500">{org}</p>
          </div>
          {user && (
            <button
              onClick={handleBookmark}
              className="shrink-0 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={isSaved ? 'Remove bookmark' : 'Bookmark'}
            >
              <svg
                className={`w-6 h-6 ${isSaved ? 'text-primary fill-primary' : 'text-gray-400'}`}
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

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Badge variant={type}>{type?.replace('-', ' ')}</Badge>
          {isPast && <Badge variant="deleted">Closed</Badge>}
          {location && (
            <span className="text-sm text-gray-500 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {location}
            </span>
          )}
          {deadlineDate && (
            <span className={`text-sm font-medium ${isPast ? 'text-danger' : 'text-gray-500'}`}>
              Deadline:{' '}
              {deadlineDate.toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          )}
        </div>

        {/* Description */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-dark mb-2">Description</h2>
          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
            {description}
          </p>
        </section>

        {/* Eligibility */}
        {eligibility && (
          <section className="mb-6">
            <h2 className="text-lg font-semibold text-dark mb-2">
              Eligibility
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">
              {eligibility}
            </p>
          </section>
        )}

        {/* Apply */}
        {applyUrl && !isPast && (
          <a href={applyUrl} target="_blank" rel="noopener noreferrer">
            <Button className="h-12 px-8 text-base">Apply Now</Button>
          </a>
        )}
      </div>
    </PageContainer>
  );
}
