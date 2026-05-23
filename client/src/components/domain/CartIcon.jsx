import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function CartIcon() {
  const { cartCount } = useCart();

  return (
    <Link to="/cart" className="relative p-2 rounded-md hover:bg-[#F0E6F6] transition-colors" aria-label="Shopping cart">
      <svg className="w-5 h-5 text-[#2D3436]/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
      {cartCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 w-4.5 h-4.5 bg-[#FF6B9D] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
          {cartCount > 9 ? '9+' : cartCount}
        </span>
      )}
    </Link>
  );
}
