import { useState, useMemo, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import SearchBar from '../../components/common/SearchBar';
import Select from '../../components/common/Select';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Textarea from '../../components/common/Textarea';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useAdminProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from '../../hooks/useProducts';

const INITIAL_FORM = {
  title: '', description: '', price: '', stock: '0', isFeatured: false, isActive: true, images: [],
};

export default function ProductManagement() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [slideOpen, setSlideOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [files, setFiles] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });

  const params = useMemo(() => {
    const p = { page, limit: 20 };
    if (search) p.search = search;
    return p;
  }, [search, page]);

  const { data, isLoading } = useAdminProducts(params);
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const products = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const openAdd = () => { setForm(INITIAL_FORM); setEditingId(null); setFiles([]); setSlideOpen(true); };
  const openEdit = (p) => {
    setForm({
      title: p.title || '', description: p.description || '', price: String(p.price || ''),
      stock: String(p.stock || '0'), isFeatured: p.isFeatured || false, isActive: p.isActive !== false,
      images: p.images || [],
    });
    setEditingId(p._id); setFiles([]); setSlideOpen(true);
  };
  const closeSlide = () => { setSlideOpen(false); setEditingId(null); setForm(INITIAL_FORM); setFiles([]); };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('description', form.description);
    fd.append('price', form.price);
    fd.append('stock', form.stock);
    fd.append('isFeatured', form.isFeatured);
    fd.append('isActive', form.isActive);
    files.forEach((f) => fd.append('images', f));
    if (editingId) {
      fd.append('keepExistingImages', (form.images && form.images.length > 0) ? 'true' : 'false');
      updateProduct.mutate({ id: editingId, formData: fd }, { onSuccess: closeSlide });
    } else {
      createProduct.mutate(fd, { onSuccess: closeSlide });
    }
  };

  const handleDelete = () => {
    if (!confirmDialog.id) return;
    deleteProduct.mutate(confirmDialog.id, { onSuccess: () => setConfirmDialog({ open: false, id: null }) });
  };

  const isSaving = createProduct.isPending || updateProduct.isPending;

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape' && slideOpen) closeSlide(); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [slideOpen]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-dark">Product Management</h2>
            <p className="text-sm text-gray-500 mt-1">Manage shop products</p>
          </div>
          <Button onClick={openAdd}>Add Product</Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search products..." className="flex-1" />
        </div>

        {isLoading ? <LoadingSpinner size="lg" className="py-20" /> : products.length === 0 ? (
          <EmptyState title="No products found" description="Create your first product." actionLabel="Add Product" onAction={openAdd}
            icon={<svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>} />
        ) : (
          <div className="bg-white border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {products.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                            {p.images?.[0] ? <img src={p.images[0]} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full" />}
                          </div>
                          <span className="text-sm font-medium text-dark line-clamp-1 max-w-[180px]">{p.title}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm font-semibold text-[#FF6B9D]">&#8377;{p.price}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{p.stock}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${p.isActive ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {p.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" className="h-8 px-3 text-xs" onClick={() => openEdit(p)}>Edit</Button>
                          <Button variant="danger" className="h-8 px-3 text-xs" onClick={() => setConfirmDialog({ open: true, id: p._id })}>Delete</Button>
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

      {slideOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/50" onClick={closeSlide} />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-[420px] bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-dark">{editingId ? 'Edit Product' : 'Add Product'}</h3>
                <button onClick={closeSlide} className="p-1 rounded-lg hover:bg-gray-100" aria-label="Close"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Title" value={form.title} onChange={(e) => setForm(f => ({...f, title: e.target.value}))} required />
                <Textarea label="Description" value={form.description} onChange={(e) => setForm(f => ({...f, description: e.target.value}))} required />
                <div className="grid grid-cols-2 gap-3">
                  <Input label="Price" type="number" min="0" step="0.01" value={form.price} onChange={(e) => setForm(f => ({...f, price: e.target.value}))} required />
                  <Input label="Stock" type="number" min="0" value={form.stock} onChange={(e) => setForm(f => ({...f, stock: e.target.value}))} />
                </div>

                {/* Product Image Option with visual preview and remove option */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Product Image</label>
                  {form.images && form.images.length > 0 && (
                    <div className="mb-3 relative w-32 h-32 rounded-xl overflow-hidden border border-border group shadow-sm bg-gray-50">
                      <img src={form.images[0]} alt="Product preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setForm(f => ({ ...f, images: [] }));
                          setFiles([]);
                        }}
                        className="absolute top-1.5 right-1.5 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all shadow-md opacity-90 hover:scale-105"
                        title="Remove image"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-[#FF6B9D] transition-colors relative cursor-pointer group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          const file = e.target.files[0];
                          setFiles([file]);
                          const previewUrl = URL.createObjectURL(file);
                          setForm(f => ({ ...f, images: [previewUrl] }));
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-10 w-10 text-gray-400 group-hover:text-[#FF6B9D] transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600 justify-center">
                        <span className="relative rounded-md font-semibold text-[#FF6B9D] group-hover:underline">
                          Upload product image
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 5MB</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm(f => ({...f, isFeatured: e.target.checked}))} className="rounded border-gray-300" />
                    Featured
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={form.isActive} onChange={(e) => setForm(f => ({...f, isActive: e.target.checked}))} className="rounded border-gray-300" />
                    Active
                  </label>
                </div>
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
        title="Delete Product" message="Are you sure? This product will be soft-deleted." confirmLabel="Delete" loading={deleteProduct.isPending} />
    </AdminLayout>
  );
}
