import { useState } from 'react';
import StarRating from '../common/StarRating';
import Pagination from '../common/Pagination';
import LoadingSpinner from '../common/LoadingSpinner';
import { useReviews } from '../../hooks/useReviews';

export default function ReviewList({ productId }) {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useReviews(productId, { page });
  const reviews = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const totalCount = data?.totalCount || 0;

  if (isLoading) return <LoadingSpinner className="py-8" />;

  if (totalCount === 0) {
    return <p className="text-sm text-[#2D3436]/40 py-4">No reviews yet. Be the first to review!</p>;
  }

  return (
    <div>
      <p className="text-sm text-[#2D3436]/60 mb-4">{totalCount} review{totalCount !== 1 ? 's' : ''}</p>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="border-b border-[#F0E6F6] pb-4">
            <div className="flex items-center gap-3 mb-1">
              <span className="text-sm font-semibold text-[#2D3436]">{review.user?.name || 'User'}</span>
              <StarRating value={review.rating} size="sm" />
            </div>
            <p className="text-sm text-[#2D3436]/60">{review.text}</p>
            <p className="text-xs text-[#2D3436]/30 mt-1">
              {new Date(review.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
            </p>
          </div>
        ))}
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
