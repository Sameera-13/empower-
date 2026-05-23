import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import WishlistButton from '../components/domain/WishlistButton';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../context/CartContext';

export default function Wishlist() {
  const { data, isLoading } = useWishlist();
  const { addToCart } = useCart();
  const items = data?.data || [];

  return (
    <PageContainer title="Wishlist — Empower Stop">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-display text-[#2D3436] mb-6">My Wishlist</h1>

        {isLoading ? (
          <LoadingSpinner size="lg" className="py-20" />
        ) : items.length === 0 ? (
          <EmptyState
            title="Your wishlist is empty"
            description="Browse the shop and save items you love."
            actionLabel="Browse Shop"
            onAction={() => window.location.href = '/shop'}
            icon={<svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {items.map((item) => {
              const product = item.product;
              const outOfStock = product.stock <= 0;
              return (
                <div key={item._id} className="bg-white border border-[#F0E6F6] rounded-2xl overflow-hidden group relative">
                  <div className="absolute top-3 right-3 z-10">
                    <WishlistButton productId={product._id} />
                  </div>
                  <Link to={`/shop/${product._id}`} className="block">
                    <div className="aspect-square bg-[#FAFAFA] overflow-hidden">
                      {product.images?.[0] ? (
                        <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#2D3436]/20">
                          <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link to={`/shop/${product._id}`}>
                      <h3 className="font-semibold text-[#2D3436] text-sm line-clamp-2 mb-2 hover:text-[#FF6B9D] transition-colors">{product.title}</h3>
                    </Link>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg font-bold text-[#FF6B9D]">&#8377;{product.price.toLocaleString('en-IN')}</span>
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <span className="text-sm text-[#2D3436]/40 line-through">&#8377;{product.compareAtPrice.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                    <button
                      onClick={() => !outOfStock && addToCart(product)}
                      disabled={outOfStock}
                      className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                        outOfStock ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'gradient-btn-pink text-white hover:shadow-lg'
                      }`}
                    >
                      {outOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
