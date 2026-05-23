import { useState, useMemo } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useAdminMessages, useMarkMessageRead, useDeleteMessage } from '../../hooks/useContact';

export default function ContactMessages() {
  const [page, setPage] = useState(1);
  const [viewMsg, setViewMsg] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });

  const { data, isLoading } = useAdminMessages({ page });
  const markRead = useMarkMessageRead();
  const deleteMsg = useDeleteMessage();

  const messages = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handleView = (msg) => {
    setViewMsg(msg);
    if (!msg.isRead) markRead.mutate(msg._id);
  };

  const handleDelete = () => {
    if (!confirmDialog.id) return;
    deleteMsg.mutate(confirmDialog.id, { onSuccess: () => setConfirmDialog({ open: false, id: null }) });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-dark">Contact Messages</h2>
          <p className="text-sm text-gray-500 mt-1">Messages submitted through the contact form</p>
        </div>

        {isLoading ? <LoadingSpinner size="lg" className="py-20" /> : messages.length === 0 ? (
          <EmptyState title="No messages" description="Contact form submissions will appear here."
            icon={<svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>} />
        ) : (
          <div className="bg-white border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider w-8"></th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {messages.map((msg) => (
                    <tr key={msg._id} className={`hover:bg-gray-50 transition-colors ${!msg.isRead ? 'bg-[#FF6B9D]/5' : ''}`}>
                      <td className="px-4 py-3">
                        {!msg.isRead && <div className="w-2 h-2 rounded-full bg-[#FF6B9D]" />}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-dark">{msg.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{msg.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 line-clamp-1 max-w-[200px]">{msg.subject}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{new Date(msg.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" className="h-8 px-3 text-xs" onClick={() => handleView(msg)}>View</Button>
                          <Button variant="danger" className="h-8 px-3 text-xs" onClick={() => setConfirmDialog({ open: true, id: msg._id })}>Delete</Button>
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

      {/* View Message Modal */}
      <Modal isOpen={!!viewMsg} onClose={() => setViewMsg(null)} title="Message Details">
        {viewMsg && (
          <div className="space-y-3">
            <div><span className="text-xs font-semibold text-gray-500 uppercase">From</span><p className="text-sm text-dark">{viewMsg.name} ({viewMsg.email})</p></div>
            {viewMsg.phone && <div><span className="text-xs font-semibold text-gray-500 uppercase">Phone</span><p className="text-sm text-dark">+91 {viewMsg.phone}</p></div>}
            {viewMsg.company && <div><span className="text-xs font-semibold text-gray-500 uppercase">Company</span><p className="text-sm text-dark">{viewMsg.company}</p></div>}
            <div><span className="text-xs font-semibold text-gray-500 uppercase">Subject</span><p className="text-sm text-dark">{viewMsg.subject}</p></div>
            <div><span className="text-xs font-semibold text-gray-500 uppercase">Date</span><p className="text-sm text-gray-600">{new Date(viewMsg.createdAt).toLocaleString()}</p></div>
            <hr className="border-[#F0E6F6]" />
            <div><span className="text-xs font-semibold text-gray-500 uppercase">Message</span><p className="text-sm text-dark mt-1 leading-relaxed whitespace-pre-wrap">{viewMsg.message}</p></div>
          </div>
        )}
      </Modal>

      <ConfirmDialog isOpen={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, id: null })} onConfirm={handleDelete}
        title="Delete Message" message="Are you sure you want to delete this message?" confirmLabel="Delete" loading={deleteMsg.isPending} />
    </AdminLayout>
  );
}
