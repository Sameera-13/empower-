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
import { useCategories, useCreateCategory } from '../../hooks/useCategories';
import { useTags, useCreateTag } from '../../hooks/useTags';

const INITIAL_FORM = {
  title: '', description: '', price: '', compareAtPrice: '',
  category: '', tags: [], stock: '0', isFeatured: false, isActive: true,
};

export default function ProductManagement() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(1);
  const [slideOpen, setSlideOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [files, setFiles] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });
  const [newCatName, setNewCatName] = useState('');
  const [showNewCat, setShowNewCat] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('#E53E3E');
  const [showNewTag, setShowNewTag] = useState(false);

  const { data: categoriesData } = useCategories();
  const { data: tagsData } = useTags();
  const createCategory = useCreateCategory();
  const createTag = useCreateTag();

  const categories = categoriesData?.data || [];
  const allTags = tagsData?.data || [];

  const categoryOptions = [
    { value: '', label: 'All Categories' },
    ...categories.map((c) => ({ value: c._id, label: c.name })),
  ];
  const categoryFormOptions = categories.map((c) => ({ value: c._id, label: c.name }));

  const params = useMemo(() => {
    const p = { page, limit: 20 };
    if (search) p.search = search;
    if (categoryFilter) p.category = categoryFilter;
    return p;
  }, [search, categoryFilter, page]);

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
      compareAtPrice: String(p.compareAtPrice || ''),
      category: p.category?._id || p.category || '',
      tags: (p.tags || []).map((t) => t._id || t),
      stock: String(p.stock || '0'), isFeatured: p.isFeatured || false, isActive: p.isActive !== false,
    });
    setEditingId(p._id); setFiles([]); setSlideOpen(true);
  };
  const closeSlide = () => { setSlideOpen(false); setEditingId(null); setForm(INITIAL_FORM); setFiles([]); setShowNewCat(false); setShowNewTag(false); };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('description', form.description);
    fd.append('price', form.price);
    fd.append('compareAtPrice', form.compareAtPrice);
    fd.append('category', form.category);
    fd.append('tags', JSON.stringify(form.tags));
    fd.append('stock', form.stock);
    fd.append('isFeatured', form.isFeatured);
    fd.append('isActive', form.isActive);
    files.forEach((f) => fd.append('images', f));
    if (editingId) {
      fd.append('keepExistingImages', 'true');
      updateProduct.mutate({ id: editingId, formData: fd }, { onSuccess: closeSlide });
    } else {
      createProduct.mutate(fd, { onSuccess: closeSlide });
    }
  };

  const handleDelete = () => {
    if (!confirmDialog.id) return;
    deleteProduct.mutate(confirmDialog.id, { onSuccess: () => setConfirmDialog({ open: false, id: null }) });
  };

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    createCategory.mutate(newCatName.trim(), {
      onSuccess: (data) => {
        setForm((f) => ({ ...f, category: data.data._id }));
        setNewCatName('');
        setShowNewCat(false);
      },
    });
  };

  const handleAddTag = () => {
    if (!newTagName.trim()) return;
    createTag.mutate({ name: newTagName.trim(), color: newTagColor }, {
      onSuccess: (data) => {
        setForm((f) => ({ ...f, tags: [...f.tags, data.data._id] }));
        setNewTagName('');
        setNewTagColor('#E53E3E');
        setShowNewTag(false);
      },
    });
  };

  const toggleFormTag = (tagId) => {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tagId) ? f.tags.filter((t) => t !== tagId) : [...f.tags, tagId],
    }));
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
          <Select options={categoryOptions} value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }} className="sm:w-44" />
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
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tags</th>
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
                        <Badge>{p.category?.name || 'None'}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {(p.tags || []).map((t) => (
                            <span key={t._id} className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-gray-100">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                              {t.name}
                            </span>
                          ))}
                        </div>
                      </td>
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
                  <Input label="Compare Price" type="number" min="0" step="0.01" value={form.compareAtPrice} onChange={(e) => setForm(f => ({...f, compareAtPrice: e.target.value}))} />
                </div>

                {/* Category with inline create */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-dark">Category</label>
                    <button type="button" onClick={() => setShowNewCat(!showNewCat)} className="text-xs text-[#FF6B9D] hover:underline">+ New</button>
                  </div>
                  {showNewCat && (
                    <div className="flex gap-2 mb-2">
                      <input
                        value={newCatName}
                        onChange={(e) => setNewCatName(e.target.value)}
                        placeholder="Category name"
                        className="flex-1 h-9 px-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B9D]/40"
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                      />
                      <button type="button" onClick={handleAddCategory} disabled={createCategory.isPending}
                        className="h-9 px-3 rounded-lg bg-[#FF6B9D] text-white text-sm font-medium hover:bg-[#e85a8a] disabled:opacity-50">
                        Add
                      </button>
                    </div>
                  )}
                  <select
                    value={form.category}
                    onChange={(e) => setForm(f => ({...f, category: e.target.value}))}
                    className="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6B9D]/40"
                  >
                    <option value="">Select category</option>
                    {categoryFormOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                {/* Tags with inline create */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-sm font-medium text-dark">Tags</label>
                    <button type="button" onClick={() => setShowNewTag(!showNewTag)} className="text-xs text-[#FF6B9D] hover:underline">+ New</button>
                  </div>
                  {showNewTag && (
                    <div className="flex gap-2 mb-2">
                      <input
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.target.value)}
                        placeholder="Tag name"
                        className="flex-1 h-9 px-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B9D]/40"
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      />
                      <input
                        type="color"
                        value={newTagColor}
                        onChange={(e) => setNewTagColor(e.target.value)}
                        className="w-9 h-9 rounded-lg border border-border cursor-pointer"
                      />
                      <button type="button" onClick={handleAddTag} disabled={createTag.isPending}
                        className="h-9 px-3 rounded-lg bg-[#FF6B9D] text-white text-sm font-medium hover:bg-[#e85a8a] disabled:opacity-50">
                        Add
                      </button>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 p-2 border border-border rounded-lg min-h-[40px]">
                    {allTags.length === 0 ? (
                      <span className="text-sm text-gray-400">No tags yet — create one above</span>
                    ) : allTags.map((tag) => (
                      <button
                        key={tag._id}
                        type="button"
                        onClick={() => toggleFormTag(tag._id)}
                        className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-colors ${
                          form.tags.includes(tag._id)
                            ? 'border-[#FF6B9D] bg-[#FF6B9D]/10 text-[#FF6B9D]'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tag.color }} />
                        {tag.name}
                      </button>
                    ))}
                  </div>
                </div>

                <Input label="Stock" type="number" min="0" value={form.stock} onChange={(e) => setForm(f => ({...f, stock: e.target.value}))} />

                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Images</label>
                  <input type="file" accept="image/*" multiple onChange={(e) => setFiles(Array.from(e.target.files))} className="text-sm text-gray-500" />
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
