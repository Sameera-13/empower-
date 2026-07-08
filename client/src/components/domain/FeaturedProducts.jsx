import { Link } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import { useCart } from '../../context/CartContext';
import LoadingSpinner from '../common/LoadingSpinner';
import phoneCaseImg from '../../assets/phone-case-product.jpg';
import bowKeychainImg from '../../assets/bow-keychain-product.jpg';
import yellowBowKeychainImg from '../../assets/yellow-bow-keychain.jpg';
import daisyScrunchieImg from '../../assets/daisy-scrunchie.jpg';
import yellowRoseKeychainImg from '../../assets/yellow-rose-keychain.jpg';
import peachBowKeychainImg from '../../assets/peach-bow-keychain.jpg';
import pinkFlowerPinImg from '../../assets/pink-flower-pin.jpg';

const STATIC_PRODUCTS = [
  {
    _id: 'yellow-bow-keychain',
    title: 'Handcrafted Yellow Bow Keychain',
    price: 199,
    images: [yellowBowKeychainImg],
    stock: 15,
  },
  {
    _id: 'daisy-scrunchie',
    title: 'Handmade Crochet Daisy Scrunchie',
    price: 149,
    images: [daisyScrunchieImg],
    stock: 20,
  },
  {
    _id: 'yellow-rose-keychain',
    title: 'Yellow Rose Crochet Keychain',
    price: 229,
    images: [yellowRoseKeychainImg],
    stock: 12,
  },
  {
    _id: 'peach-bow-keychain',
    title: 'Peach Bow Crochet Keychain',
    price: 199,
    images: [peachBowKeychainImg],
    stock: 30,
  },
];

export default function FeaturedProducts() {
  const { data, isLoading } = useProducts({ featured: 'true', limit: 4 });
  const { addToCart } = useCart();
  
  const products = data?.data && data.data.length > 0 ? data.data : STATIC_PRODUCTS;

  if (isLoading && products === STATIC_PRODUCTS) {
    return (
      <section className="py-16 border-b border-[#F0E6F6]">
        <div className="max-w-6xl mx-auto px-4">
          <LoadingSpinner className="py-12" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 border-b border-[#F0E6F6]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-display gradient-text-pink-yellow mb-2 inline-block">Shop Our Collection</h2>
            <p className="text-[#2D3436]/40 text-sm">Handcrafted by women artisans — every purchase empowers.</p>
          </div>
          <Link to="/shop" className="text-sm font-medium text-[#FF6B9D] hover:underline hidden sm:block">View All →</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product._id} className="bg-white border border-[#F0E6F6] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#FF6B9D]/40 group">
              <Link to={`/shop/${product._id}`}>
                <div className="aspect-square bg-[#FAFAFA] overflow-hidden flex items-center justify-center p-2">
                  {product.images?.[0] ? (
                    <img src={product.images[0]} alt={product.title} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 rounded-xl" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#2D3436]/15">
                      <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                </div>
              </Link>
              <div className="p-3">
                <Link to={`/shop/${product._id}`}>
                  <h3 className="text-sm font-semibold text-[#2D3436] line-clamp-1 hover:text-[#FF6B9D]">{product.title}</h3>
                </Link>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-base font-bold text-[#FF6B9D]">&#8377;{product.price.toLocaleString('en-IN')}</span>
                  <button
                    onClick={() => product.stock > 0 && addToCart(product)}
                    disabled={product.stock <= 0}
                    className="text-xs font-semibold text-[#6BCB77] hover:text-[#4CAF50] disabled:text-gray-400 transition-colors"
                  >
                    {product.stock > 0 ? '+ Add' : 'Sold Out'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link to="/shop" className="block text-center text-sm font-medium text-[#FF6B9D] hover:underline mt-6 sm:hidden">View All →</Link>
      </div>
    </section>
  );
}
