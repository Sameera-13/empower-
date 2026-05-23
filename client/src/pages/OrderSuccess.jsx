import { Link, useParams } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';

export default function OrderSuccess() {
  const { id } = useParams();

  return (
    <PageContainer title="Order Confirmed — Empower Stop">
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-[#6BCB77]/15 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-[#6BCB77]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-display text-[#2D3436] mb-2">Order Confirmed!</h1>
        <p className="text-[#2D3436]/50 mb-2">Thank you for your purchase. Your order has been placed successfully.</p>
        <p className="text-sm text-[#2D3436]/40 mb-8">Order ID: <span className="font-mono text-[#FF6B9D]">{id}</span></p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/orders"><Button variant="secondary">View My Orders</Button></Link>
          <Link to="/shop"><Button>Continue Shopping</Button></Link>
        </div>
      </div>
    </PageContainer>
  );
}
