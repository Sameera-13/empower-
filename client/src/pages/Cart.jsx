import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <PageContainer title="Cart — Empower Stop">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <svg className="w-20 h-20 text-[#2D3436]/15 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" /></svg>
          <h2 className="text-xl font-display text-[#2D3436] mb-2">Your cart is empty</h2>
          <p className="text-[#2D3436]/50 mb-6">Looks like you haven't added anything yet.</p>
          <Link to="/shop"><Button>Continue Shopping</Button></Link>
        </div>
      </PageContainer>
    );
  }

  const shipping = cartTotal >= 999 ? 0 : 79;
  const total = cartTotal + shipping;

  return (
    <PageContainer title="Cart — Empower Stop">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-display text-[#2D3436] mb-6">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="flex gap-4 bg-white border border-[#F0E6F6] rounded-xl p-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#FAFAFA] flex-shrink-0">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#2D3436]/20">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Link to={`/shop/${item.productId}`} className="text-sm font-semibold text-[#2D3436] hover:text-[#FF6B9D] line-clamp-1">{item.title}</Link>
                  <p className="text-[#FF6B9D] font-bold mt-1">&#8377;{item.price.toLocaleString('en-IN')}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-[#F0E6F6] rounded-lg">
                      <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="px-2 py-1 text-xs text-[#2D3436]/60 hover:text-[#2D3436]">-</button>
                      <span className="px-3 py-1 text-xs font-semibold border-x border-[#F0E6F6]">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="px-2 py-1 text-xs text-[#2D3436]/60 hover:text-[#2D3436]">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item.productId)} className="text-xs text-[#EF5350] hover:underline">Remove</button>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-[#2D3436]">&#8377;{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white border border-[#F0E6F6] rounded-xl p-6 h-fit">
            <h3 className="font-semibold text-[#2D3436] mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-[#2D3436]/60">
                <span>Subtotal</span>
                <span>&#8377;{cartTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#2D3436]/60">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-[#6BCB77]">Free</span> : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-[#6BCB77]">Free shipping on orders above &#8377;999</p>
              )}
              <hr className="border-[#F0E6F6]" />
              <div className="flex justify-between font-bold text-[#2D3436]">
                <span>Total</span>
                <span>&#8377;{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
            <Link to="/checkout">
              <Button className="w-full h-12">Proceed to Checkout</Button>
            </Link>
            <Link to="/shop" className="block text-center text-sm text-[#2D3436]/50 hover:text-[#FF6B9D] mt-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
