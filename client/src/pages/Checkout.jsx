import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useCreateOrder, useVerifyPayment } from '../hooks/useOrders';
import CouponInput from '../components/domain/CouponInput';

function loadRazorpay() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const createOrder = useCreateOrder();
  const verifyPayment = useVerifyPayment();

  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const [coupon, setCoupon] = useState(null);

  const shipping = cartTotal >= 999 ? 0 : 79;
  const discount = coupon?.discount || 0;
  const total = cartTotal + shipping - discount;

  const handleChange = (field, value) => {
    setAddress((prev) => ({ ...prev, [field]: value }));
  };

  const handlePay = async (e) => {
    e.preventDefault();
    setError('');
    setProcessing(true);

    try {
      const loaded = await loadRazorpay();
      if (!loaded) {
        setError('Payment gateway failed to load. Please try again.');
        setProcessing(false);
        return;
      }

      const orderData = {
        items: items.map((item) => ({ productId: item.productId, quantity: item.quantity })),
        shippingAddress: address,
        couponCode: coupon?.code || '',
      };

      const { data } = await createOrder.mutateAsync(orderData);

      const options = {
        key: data.keyId,
        amount: Math.round(total * 100),
        currency: data.currency,
        name: 'Empower Stop',
        description: 'Purchase from Empower Stop Shop',
        order_id: data.razorpayOrderId,
        handler: async (response) => {
          try {
            await verifyPayment.mutateAsync({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              orderId: data.orderId,
            });
            clearCart();
            navigate(`/order-success/${data.orderId}`);
          } catch {
            setError('Payment verification failed. Contact support.');
          }
        },
        prefill: {
          name: address.name,
          email: user?.email || '',
          contact: address.phone,
        },
        theme: { color: '#FF6B9D' },
        modal: {
          ondismiss: () => setProcessing(false),
        },
      };

      // For mock mode (no Razorpay configured), simulate success
      if (data.keyId === 'mock_key') {
        await verifyPayment.mutateAsync({
          razorpayOrderId: data.razorpayOrderId,
          razorpayPaymentId: 'mock_pay_' + Date.now(),
          razorpaySignature: 'mock_sig',
          orderId: data.orderId,
        });
        clearCart();
        navigate(`/order-success/${data.orderId}`);
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      setProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <PageContainer title="Checkout — Empower Stop">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-display text-[#2D3436] mb-6">Checkout</h1>

        <form onSubmit={handlePay}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Shipping Form */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="font-semibold text-[#2D3436] mb-2">Shipping Address</h3>
              <Input label="Full Name" value={address.name} onChange={(e) => handleChange('name', e.target.value)} required />
              <Input label="Phone Number" value={address.phone} onChange={(e) => handleChange('phone', e.target.value)} required placeholder="10-digit mobile number" />
              <Input label="Address" value={address.address} onChange={(e) => handleChange('address', e.target.value)} required placeholder="House no., Street, Area" />
              <div className="grid grid-cols-2 gap-3">
                <Input label="City" value={address.city} onChange={(e) => handleChange('city', e.target.value)} required />
                <Input label="State" value={address.state} onChange={(e) => handleChange('state', e.target.value)} required />
              </div>
              <Input label="Pincode" value={address.pincode} onChange={(e) => handleChange('pincode', e.target.value)} required placeholder="6-digit pincode" />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-[#F0E6F6] rounded-xl p-6 sticky top-20">
                <h3 className="font-semibold text-[#2D3436] mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-[#2D3436]/60 line-clamp-1 flex-1 mr-2">{item.title} x{item.quantity}</span>
                      <span className="text-[#2D3436] font-medium">&#8377;{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
                <div className="mb-3">
                  <CouponInput
                    orderTotal={cartTotal}
                    appliedCoupon={coupon}
                    onApply={setCoupon}
                    onRemove={() => setCoupon(null)}
                  />
                </div>
                <hr className="border-[#F0E6F6] mb-3" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-[#2D3436]/60">
                    <span>Subtotal</span><span>&#8377;{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-[#2D3436]/60">
                    <span>Shipping</span><span>{shipping === 0 ? <span className="text-[#6BCB77]">Free</span> : `₹${shipping}`}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#6BCB77]">
                      <span>Coupon ({coupon.code})</span><span>-&#8377;{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <hr className="border-[#F0E6F6]" />
                  <div className="flex justify-between font-bold text-[#2D3436] text-base">
                    <span>Total</span><span>&#8377;{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                {error && <p className="text-sm text-[#EF5350] mt-3">{error}</p>}
                <Button type="submit" disabled={processing} className="w-full h-12 mt-4">
                  {processing ? 'Processing...' : `Pay ₹${total.toLocaleString('en-IN')}`}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
