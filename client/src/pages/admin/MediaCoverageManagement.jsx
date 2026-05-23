import { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useMediaCoverage, useCreateMediaCoverage, useUpdateMediaCoverage, useDeleteMediaCoverage } from '../../hooks/useMediaCoverage';

const INITIAL_FORM = { title: '', source: '', url: '', date: '', order: '0' };

export default function MediaCoverageManagement() {
  const [slideOpen, setSlideOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [logoFile, setLogoFile] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });

  const { data, isLoading } = useMediaCoverage();
  const createItem = useCreateMediaCoverage();
  const updateItem = useUpdateMediaCoverage();
  const deleteItem = useDeleteMediaCoverage();

  const items = data?.data || [];

  const openAdd = () => { setForm(INITIAL_FORM); setEditingId(null); setLogoFile(null); setSlideOpen(true); };
  const openEdit = (item) => {
    setForm({ title: item.title || '', source: item.source || '', url: item.url || '', date: item.date ? item.date.split('T')[0] : '', order: String(item.order || 0) });
    setEditingId(item._id); setLogoFile(null); setSlideOpen(true);
  };
  const closeSlide = () => { setSlideOpen(false); setEditingId(null); setForm(INITIAL_FORM); setLogoFile(null); };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (logoFile) fd.append('logo', logoFile);
    if (editingId) {
      updateItem.mutate({ id: editingId, formData: fd }, { onSuccess: closeSlide });
    } else {
      createItem.mutate(fd, { onSuccess: closeSlide });
    }
  };

  const handleDelete = () => {
    if (!confirmDialog.id) return;
    deleteItem.mutate(confirmDialog.id, { onSuccess: () => setConfirmDialog({ open: false, id: null }) });
  };

  const isSaving = createItem.isPending || updateItem.isPending;

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape' && slideOpen) closeSlide(); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [slideOpen]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div><h2 className="text-2xl font-bold text-dark">Media Coverage</h2><p className="text-sm text-gray-500 mt-1">Manage press mentions and media coverage</p></div>
          <Button onClick={openAdd}>Add Coverage</Button>
        </div>

        {isLoading ? <LoadingSpinner size="lg" className="py-20" /> : items.length === 0 ? (
          <EmptyState title="No media coverage" description="Add press mentions to display on the homepage." actionLabel="Add Coverage" onAction={openAdd}
            icon={<svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>} />
        ) : (
          <div className="bg-white border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Source</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {items.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-medium text-dark">{item.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.source}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{item.date ? new Date(item.date).toLocaleDateString() : '--'}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{item.order}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" className="h-8 px-3 text-xs" onClick={() => openEdit(item)}>Edit</Button>
                          <Button variant="danger" className="h-8 px-3 text-xs" onClick={() => setConfirmDialog({ open: true, id: item._id })}>Delete</Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {slideOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/50" onClick={closeSlide} />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-[400px] bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-dark">{editingId ? 'Edit Coverage' : 'Add Coverage'}</h3>
                <button onClick={closeSlide} className="p-1 rounded-lg hover:bg-gray-100" aria-label="Close"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Title" value={form.title} onChange={(e) => setForm(f => ({...f, title: e.target.value}))} required placeholder="Article headline" />
                <Input label="Source" value={form.source} onChange={(e) => setForm(f => ({...f, source: e.target.value}))} required placeholder="Publication name" />
                <Input label="URL" type="url" value={form.url} onChange={(e) => setForm(f => ({...f, url: e.target.value}))} placeholder="https://..." />
                <Input label="Date" type="date" value={form.date} onChange={(e) => setForm(f => ({...f, date: e.target.value}))} />
                <Input label="Order" type="number" value={form.order} onChange={(e) => setForm(f => ({...f, order: e.target.value}))} />
                <div><label className="block text-sm font-medium text-dark mb-1">Logo</label><input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} className="text-sm text-gray-500" /></div>
                <div className="pt-4 flex gap-3">
                  <Button variant="ghost" type="button" onClick={closeSlide} className="flex-1">Cancel</Button>
                  <Button type="submit" disabled={isSaving} className="flex-1">{isSaving ? 'Saving...' : editingId ? 'Update' : 'Create'}</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog isOpen={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, id: null })} onConfirm={handleDelete}
        title="Delete Coverage" message="Are you sure?" confirmLabel="Delete" loading={deleteItem.isPending} />
    </AdminLayout>
  );
}
