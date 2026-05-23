import { useAuth } from '../../context/AuthContext';
import { useWishlist, useToggleWishlist } from '../../hooks/useWishlist';

export default function WishlistButton({ productId, className = '' }) {
  const { isAuthenticated } = useAuth();
  const { data } = useWishlist();
  const toggle = useToggleWishlist();

  const isWishlisted = data?.data?.some((item) => item.product?._id === productId) || false;

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) return;
    toggle.mutate(productId);
  };

  if (!isAuthenticated) return null;

  return (
    <button
      onClick={handleClick}
      disabled={toggle.isPending}
      className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${className}`}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24"
        fill={isWishlisted ? '#EF5350' : 'none'}
        stroke={isWishlisted ? '#EF5350' : '#9CA3AF'}
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    </button>
  );
}
