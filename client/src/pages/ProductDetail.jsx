import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Badge from '../components/common/Badge';
import { useProduct } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import StarRating from '../components/common/StarRating';
import ReviewList from '../components/domain/ReviewList';
import ReviewForm from '../components/domain/ReviewForm';
import WishlistButton from '../components/domain/WishlistButton';
import { useAuth } from '../context/AuthContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useProduct(id);
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated } = useAuth();

  if (isLoading) return <PageContainer><LoadingSpinner size="lg" className="py-32" /></PageContainer>;

  const product = data?.data;
  if (!product) {
    return (
      <PageContainer>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-xl font-semibold text-[#2D3436] mb-2">Product not found</h2>
          <Link to="/shop" className="text-[#FF6B9D] hover:underline">Back to Shop</Link>
        </div>
      </PageContainer>
    );
  }

  const outOfStock = product.stock <= 0;
  const images = product.images?.length > 0 ? product.images : [];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  return (
    <PageContainer title={`${product.title} — Empower Stop Shop`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-[#2D3436]/50 hover:text-[#FF6B9D] mb-6 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square bg-[#FAFAFA] rounded-2xl overflow-hidden border border-[#F0E6F6] mb-3 flex items-center justify-center p-4">
              {images.length > 0 ? (
                <img src={images[selectedImage]} alt={product.title} className="max-w-full max-h-full object-contain rounded-xl" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#2D3436]/20">
                  <svg className="w-24 h-24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-[#FF6B9D]' : 'border-[#F0E6F6] hover:border-[#FF6B9D]/40'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <Badge variant={product.category}>{product.category}</Badge>
            <div className="flex items-center justify-between mt-3 mb-4">
              <h1 className="text-2xl md:text-3xl font-display text-[#2D3436]">{product.title}</h1>
              <WishlistButton productId={product._id} />
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-[#FF6B9D]">&#8377;{product.price.toLocaleString('en-IN')}</span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <>
                  <span className="text-lg text-[#2D3436]/40 line-through">&#8377;{product.compareAtPrice.toLocaleString('en-IN')}</span>
                  <span className="text-sm font-semibold text-[#6BCB77] bg-[#6BCB77]/10 px-2 py-0.5 rounded-full">
                    {Math.round((1 - product.price / product.compareAtPrice) * 100)}% off
                  </span>
                </>
              )}
            </div>

            {product.reviewCount > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <StarRating value={Math.round(product.avgRating)} size="sm" />
                <span className="text-sm text-[#2D3436]/60">{product.avgRating} ({product.reviewCount} review{product.reviewCount !== 1 ? 's' : ''})</span>
              </div>
            )}

            <div className="mb-6">
              {outOfStock ? (
                <span className="text-sm font-medium text-[#EF5350]">Out of Stock</span>
              ) : (
                <span className="text-sm font-medium text-[#6BCB77]">In Stock ({product.stock} available)</span>
              )}
            </div>

            <p className="text-[#2D3436]/60 leading-relaxed mb-8">{product.description}</p>

            {!outOfStock && (
              <div className="flex items-center gap-3 mb-6">
                <span className="text-sm font-medium text-[#2D3436]/60">Qty:</span>
                <div className="flex items-center border border-[#F0E6F6] rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-[#2D3436]/60 hover:text-[#2D3436]">-</button>
                  <span className="px-4 py-2 text-sm font-semibold border-x border-[#F0E6F6]">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-3 py-2 text-[#2D3436]/60 hover:text-[#2D3436]">+</button>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button onClick={handleAddToCart} disabled={outOfStock} className="flex-1 h-12">
                Add to Cart
              </Button>
              <Button onClick={handleBuyNow} disabled={outOfStock} variant="secondary" className="flex-1 h-12">
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 border-t border-[#F0E6F6] pt-8">
          <h2 className="text-xl font-display text-[#2D3436] mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <ReviewList productId={id} />
            </div>
            {isAuthenticated && (
              <div>
                <ReviewForm productId={id} />
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
