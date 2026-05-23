import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import Badge from '../../components/common/Badge';
import { useAdminSubscribers, useDeleteSubscriber } from '../../hooks/useNewsletter';

export default function NewsletterSubscribers() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });

  const { data, isLoading } = useAdminSubscribers({ page, ...(statusFilter && { status: statusFilter }) });
  const deleteSub = useDeleteSubscriber();

  const subscribers = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const totalCount = data?.totalCount || 0;

  const handleDelete = () => {
    if (!confirmDialog.id) return;
    deleteSub.mutate(confirmDialog.id, { onSuccess: () => setConfirmDialog({ open: false, id: null }) });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold text-dark">Newsletter Subscribers</h2>
            <p className="text-sm text-gray-500 mt-1">{totalCount} total subscriber{totalCount !== 1 ? 's' : ''}</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              className="h-9 px-3 rounded-lg border border-border text-sm bg-white text-dark outline-none focus:border-[#FF6B9D] focus:ring-2 focus:ring-[#FF6B9D]/20"
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="unsubscribed">Unsubscribed</option>
            </select>
          </div>
        </div>

        {isLoading ? <LoadingSpinner size="lg" className="py-20" /> : subscribers.length === 0 ? (
          <EmptyState title="No subscribers" description="Newsletter subscribers will appear here."
            icon={<svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} />
        ) : (
          <div className="bg-white border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subscribed On</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {subscribers.map((sub) => (
                    <tr key={sub._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-dark">{sub.email}</td>
                      <td className="px-4 py-3">
                        <Badge variant={sub.status === 'active' ? 'success' : 'default'}>
                          {sub.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{new Date(sub.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end">
                          <Button variant="danger" className="h-8 px-3 text-xs" onClick={() => setConfirmDialog({ open: true, id: sub._id })}>Delete</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      <ConfirmDialog isOpen={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, id: null })} onConfirm={handleDelete}
        title="Delete Subscriber" message="Are you sure you want to remove this subscriber?" confirmLabel="Delete" loading={deleteSub.isPending} />
    </AdminLayout>
  );
}
