import { useState } from 'react';
import StarRating from '../common/StarRating';
import Button from '../common/Button';
import { useCreateReview } from '../../hooks/useReviews';

export default function ReviewForm({ productId }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const createReview = useCreateReview();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (rating === 0) { setError('Please select a rating'); return; }
    if (!text.trim()) { setError('Please write a review'); return; }

    try {
      await createReview.mutateAsync({ productId, rating, text: text.trim() });
      setRating(0);
      setText('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit review');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-[#F0E6F6] rounded-xl p-5">
      <h3 className="font-semibold text-[#2D3436] mb-3">Write a Review</h3>
      <div className="mb-3">
        <StarRating value={rating} onChange={setRating} size="lg" />
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share your experience..."
        maxLength={500}
        rows={3}
        className="w-full px-3 py-2 border border-[#F0E6F6] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B9D]/40 resize-none"
      />
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-[#2D3436]/40">{text.length}/500</span>
        {error && <span className="text-xs text-[#EF5350]">{error}</span>}
      </div>
      <Button type="submit" disabled={createReview.isPending} className="mt-3 h-9 text-sm">
        {createReview.isPending ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
}
