import { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useAdminPartners, useCreatePartner, useUpdatePartner, useDeletePartner } from '../../hooks/usePartners';

const INITIAL_FORM = { name: '', url: '', order: '0', isActive: true };

export default function PartnerManagement() {
  const [slideOpen, setSlideOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [logoFile, setLogoFile] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });

  const { data, isLoading } = useAdminPartners();
  const createPartner = useCreatePartner();
  const updatePartner = useUpdatePartner();
  const deletePartner = useDeletePartner();

  const partners = data?.data || [];

  const openAdd = () => { setForm(INITIAL_FORM); setEditingId(null); setLogoFile(null); setSlideOpen(true); };
  const openEdit = (p) => {
    setForm({ name: p.name || '', url: p.url || '', order: String(p.order || 0), isActive: p.isActive !== false });
    setEditingId(p._id); setLogoFile(null); setSlideOpen(true);
  };
  const closeSlide = () => { setSlideOpen(false); setEditingId(null); setForm(INITIAL_FORM); setLogoFile(null); };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (logoFile) fd.append('logo', logoFile);
    if (editingId) {
      updatePartner.mutate({ id: editingId, formData: fd }, { onSuccess: closeSlide });
    } else {
      createPartner.mutate(fd, { onSuccess: closeSlide });
    }
  };

  const handleDelete = () => {
    if (!confirmDialog.id) return;
    deletePartner.mutate(confirmDialog.id, { onSuccess: () => setConfirmDialog({ open: false, id: null }) });
  };

  const isSaving = createPartner.isPending || updatePartner.isPending;

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape' && slideOpen) closeSlide(); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [slideOpen]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div><h2 className="text-2xl font-bold text-dark">Partner Management</h2><p className="text-sm text-gray-500 mt-1">Manage partner logos for homepage</p></div>
          <Button onClick={openAdd}>Add Partner</Button>
        </div>

        {isLoading ? <LoadingSpinner size="lg" className="py-20" /> : partners.length === 0 ? (
          <EmptyState title="No partners" description="Add partners to display on the homepage." actionLabel="Add Partner" onAction={openAdd}
            icon={<svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {partners.map((p) => (
              <div key={p._id} className="bg-white border border-border rounded-xl p-4 text-center">
                <div className="h-16 flex items-center justify-center mb-3">
                  {p.logo ? <img src={p.logo} alt={p.name} className="max-h-full max-w-full object-contain" /> : <span className="text-2xl text-gray-300">LOGO</span>}
                </div>
                <p className="text-sm font-medium text-dark">{p.name}</p>
                <span className={`inline-block text-xs mt-1 px-2 py-0.5 rounded-full ${p.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{p.isActive ? 'Active' : 'Inactive'}</span>
                <div className="flex gap-2 justify-center mt-3">
                  <Button variant="ghost" className="h-7 px-2 text-xs" onClick={() => openEdit(p)}>Edit</Button>
                  <Button variant="danger" className="h-7 px-2 text-xs" onClick={() => setConfirmDialog({ open: true, id: p._id })}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {slideOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/50" onClick={closeSlide} />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-[400px] bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-dark">{editingId ? 'Edit Partner' : 'Add Partner'}</h3>
                <button onClick={closeSlide} className="p-1 rounded-lg hover:bg-gray-100" aria-label="Close"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Name" value={form.name} onChange={(e) => setForm(f => ({...f, name: e.target.value}))} required />
                <Input label="Website URL" type="url" value={form.url} onChange={(e) => setForm(f => ({...f, url: e.target.value}))} placeholder="https://..." />
                <Input label="Order" type="number" value={form.order} onChange={(e) => setForm(f => ({...f, order: e.target.value}))} />
                <div><label className="block text-sm font-medium text-dark mb-1">Logo</label><input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} className="text-sm text-gray-500" /></div>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm(f => ({...f, isActive: e.target.checked}))} className="rounded border-gray-300" />Active</label>
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
        title="Delete Partner" message="Are you sure?" confirmLabel="Delete" loading={deletePartner.isPending} />
    </AdminLayout>
  );
}
