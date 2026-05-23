import { useState, useMemo } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Select from '../../components/common/Select';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { useAdminOrders, useUpdateOrderStatus } from '../../hooks/useOrders';

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

const STATUS_COLORS = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  paid: 'bg-blue-50 text-blue-700 border-blue-200',
  shipped: 'bg-purple-50 text-purple-700 border-purple-200',
  delivered: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
};

const STATUS_UPDATE_OPTIONS = [
  { value: 'pending', label: 'Pending' },
  { value: 'paid', label: 'Paid' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function OrderManagement() {
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState(null);

  const params = useMemo(() => {
    const p = { page, limit: 20 };
    if (statusFilter) p.status = statusFilter;
    return p;
  }, [statusFilter, page]);

  const { data, isLoading } = useAdminOrders(params);
  const updateStatus = useUpdateOrderStatus();

  const orders = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handleStatusChange = (orderId, newStatus) => {
    updateStatus.mutate({ id: orderId, status: newStatus });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-dark">Order Management</h2>
          <p className="text-sm text-gray-500 mt-1">View and manage customer orders</p>
        </div>

        <div className="flex gap-3">
          <Select options={STATUS_OPTIONS} value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="w-48" />
        </div>

        {isLoading ? <LoadingSpinner size="lg" className="py-20" /> : orders.length === 0 ? (
          <EmptyState title="No orders found" description="Orders will appear here once customers make purchases."
            icon={<svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>} />
        ) : (
          <div className="bg-white border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {orders.map((order) => (
                    <>
                      <tr key={order._id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setExpandedId(expandedId === order._id ? null : order._id)}>
                        <td className="px-4 py-3 text-xs font-mono text-gray-500">{order._id.slice(-8)}</td>
                        <td className="px-4 py-3 text-sm text-dark">{order.user?.name || 'N/A'}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{order.items?.length || 0} items</td>
                        <td className="px-4 py-3 text-sm font-semibold text-[#FF6B9D]">&#8377;{order.totalAmount?.toLocaleString('en-IN')}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <select
                            value={order.status}
                            onChange={(e) => { e.stopPropagation(); handleStatusChange(order._id, e.target.value); }}
                            onClick={(e) => e.stopPropagation()}
                            className={`text-xs font-semibold px-2 py-1 rounded-full border cursor-pointer ${STATUS_COLORS[order.status]}`}
                          >
                            {STATUS_UPDATE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                          </select>
                        </td>
                      </tr>
                      {expandedId === order._id && (
                        <tr key={order._id + '-detail'}>
                          <td colSpan="6" className="px-4 py-4 bg-gray-50">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Items</h4>
                                {order.items?.map((item, idx) => (
                                  <div key={idx} className="flex items-center gap-2 mb-2">
                                    {item.image && <img src={item.image} alt="" className="w-8 h-8 rounded object-cover" />}
                                    <span className="text-sm">{item.title} x{item.quantity} — &#8377;{item.price}</span>
                                  </div>
                                ))}
                              </div>
                              <div>
                                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Shipping Address</h4>
                                <p className="text-sm text-gray-600">
                                  {order.shippingAddress?.name}<br />
                                  {order.shippingAddress?.address}<br />
                                  {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}<br />
                                  Phone: {order.shippingAddress?.phone}
                                </p>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </AdminLayout>
  );
}
