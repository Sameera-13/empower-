import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import Badge from '../components/common/Badge';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { useMyOrders } from '../hooks/useOrders';
import OrderTimeline from '../components/domain/OrderTimeline';
import InvoiceDownload from '../components/domain/InvoiceDownload';

const STATUS_COLORS = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  paid: 'bg-blue-50 text-blue-700 border-blue-200',
  shipped: 'bg-purple-50 text-purple-700 border-purple-200',
  delivered: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
};

export default function MyOrders() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useMyOrders({ page });
  const orders = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <PageContainer title="My Orders — Empower Stop">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-display text-[#2D3436] mb-6">My Orders</h1>

        {isLoading ? (
          <LoadingSpinner size="lg" className="py-20" />
        ) : orders.length === 0 ? (
          <EmptyState
            title="No orders yet"
            description="Start shopping to see your orders here."
            actionLabel="Browse Shop"
            onAction={() => window.location.href = '/shop'}
            icon={<svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
          />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white border border-[#F0E6F6] rounded-xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="text-xs text-[#2D3436]/40 font-mono">#{order._id}</p>
                    <p className="text-sm text-[#2D3436]/60">{new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${STATUS_COLORS[order.status]}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                    <span className="text-lg font-bold text-[#2D3436]">&#8377;{order.totalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-[#FAFAFA] rounded-lg px-3 py-2">
                      {item.image && <img src={item.image} alt="" className="w-8 h-8 rounded object-cover" />}
                      <div>
                        <p className="text-xs font-medium text-[#2D3436] line-clamp-1">{item.title}</p>
                        <p className="text-xs text-[#2D3436]/40">x{item.quantity} &middot; &#8377;{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-[#F0E6F6]">
                  <OrderTimeline status={order.status} statusHistory={order.statusHistory || []} />
                </div>
                {order.status !== 'pending' && (
                  <div className="mt-3 flex justify-end">
                    <InvoiceDownload order={order} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </PageContainer>
  );
}
