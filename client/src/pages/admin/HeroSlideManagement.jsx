import { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useAdminHeroSlides, useCreateHeroSlide, useUpdateHeroSlide, useDeleteHeroSlide } from '../../hooks/useHeroSlides';

const INITIAL_FORM = { title: '', subtitle: '', ctaText: '', ctaLink: '', order: '0', isActive: true };

export default function HeroSlideManagement() {
  const [slideOpen, setSlideOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [imageFile, setImageFile] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });

  const { data, isLoading } = useAdminHeroSlides();
  const createSlide = useCreateHeroSlide();
  const updateSlide = useUpdateHeroSlide();
  const deleteSlide = useDeleteHeroSlide();

  const slides = data?.data || [];

  const openAdd = () => { setForm(INITIAL_FORM); setEditingId(null); setImageFile(null); setSlideOpen(true); };
  const openEdit = (s) => {
    setForm({ title: s.title || '', subtitle: s.subtitle || '', ctaText: s.ctaText || '', ctaLink: s.ctaLink || '', order: String(s.order || 0), isActive: s.isActive !== false });
    setEditingId(s._id); setImageFile(null); setSlideOpen(true);
  };
  const closeSlide = () => { setSlideOpen(false); setEditingId(null); setForm(INITIAL_FORM); setImageFile(null); };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (imageFile) fd.append('image', imageFile);
    if (editingId) {
      updateSlide.mutate({ id: editingId, formData: fd }, { onSuccess: closeSlide });
    } else {
      createSlide.mutate(fd, { onSuccess: closeSlide });
    }
  };

  const handleDelete = () => {
    if (!confirmDialog.id) return;
    deleteSlide.mutate(confirmDialog.id, { onSuccess: () => setConfirmDialog({ open: false, id: null }) });
  };

  const isSaving = createSlide.isPending || updateSlide.isPending;

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape' && slideOpen) closeSlide(); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [slideOpen]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div><h2 className="text-2xl font-bold text-dark">Hero Slides</h2><p className="text-sm text-gray-500 mt-1">Manage homepage hero carousel</p></div>
          <Button onClick={openAdd}>Add Slide</Button>
        </div>

        {isLoading ? <LoadingSpinner size="lg" className="py-20" /> : slides.length === 0 ? (
          <EmptyState title="No hero slides" description="Add slides to create a homepage carousel." actionLabel="Add Slide" onAction={openAdd}
            icon={<svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {slides.map((s) => (
              <div key={s._id} className="bg-white border border-border rounded-xl overflow-hidden">
                <div className="aspect-video bg-gray-100">
                  {s.image ? <img src={s.image} alt={s.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>}
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-dark text-sm">{s.title}</h4>
                  {s.subtitle && <p className="text-xs text-gray-500 mt-1">{s.subtitle}</p>}
                  <div className="flex items-center justify-between mt-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${s.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{s.isActive ? 'Active' : 'Inactive'}</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" className="h-7 px-2 text-xs" onClick={() => openEdit(s)}>Edit</Button>
                      <Button variant="danger" className="h-7 px-2 text-xs" onClick={() => setConfirmDialog({ open: true, id: s._id })}>Delete</Button>
                    </div>
                  </div>
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
                <h3 className="text-lg font-semibold text-dark">{editingId ? 'Edit Slide' : 'Add Slide'}</h3>
                <button onClick={closeSlide} className="p-1 rounded-lg hover:bg-gray-100" aria-label="Close"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Title" value={form.title} onChange={(e) => setForm(f => ({...f, title: e.target.value}))} required />
                <Input label="Subtitle" value={form.subtitle} onChange={(e) => setForm(f => ({...f, subtitle: e.target.value}))} />
                <Input label="CTA Text" value={form.ctaText} onChange={(e) => setForm(f => ({...f, ctaText: e.target.value}))} placeholder="e.g. Shop Now" />
                <Input label="CTA Link" value={form.ctaLink} onChange={(e) => setForm(f => ({...f, ctaLink: e.target.value}))} placeholder="/shop" />
                <Input label="Order" type="number" value={form.order} onChange={(e) => setForm(f => ({...f, order: e.target.value}))} />
                <div><label className="block text-sm font-medium text-dark mb-1">Image</label><input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="text-sm text-gray-500" /></div>
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
        title="Delete Slide" message="Are you sure?" confirmLabel="Delete" loading={deleteSlide.isPending} />
    </AdminLayout>
  );
}
