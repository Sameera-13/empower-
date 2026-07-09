import { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import RichTextEditor from '../../components/domain/RichTextEditor';
import { useAdminBlogPosts, useCreateBlogPost, useUpdateBlogPost, useDeleteBlogPost } from '../../hooks/useBlog';

const CATEGORY_OPTIONS = [
  { value: 'news', label: 'News' },
  { value: 'stories', label: 'Stories' },
  { value: 'events', label: 'Events' },
  { value: 'announcements', label: 'Announcements' },
  { value: 'guides', label: 'Guides' },
];

const INITIAL_FORM = { title: '', body: '', category: 'news', tags: '', isPublished: false };

export default function BlogManagement() {
  const [page, setPage] = useState(1);
  const [slideOpen, setSlideOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [coverFile, setCoverFile] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, id: null });

  const { data, isLoading } = useAdminBlogPosts({ page });
  const createPost = useCreateBlogPost();
  const updatePost = useUpdateBlogPost();
  const deletePost = useDeleteBlogPost();

  const posts = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const openAdd = () => { setForm(INITIAL_FORM); setEditingId(null); setCoverFile(null); setSlideOpen(true); };
  const openEdit = (p) => {
    setForm({
      title: p.title || '', body: p.body || '',
      category: p.category || 'news', tags: p.tags?.join(', ') || '', isPublished: p.isPublished || false,
    });
    setEditingId(p._id); setCoverFile(null); setSlideOpen(true);
  };
  const closeSlide = () => { setSlideOpen(false); setEditingId(null); setForm(INITIAL_FORM); setCoverFile(null); };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (coverFile) fd.append('coverImage', coverFile);
    if (editingId) {
      updatePost.mutate({ id: editingId, formData: fd }, { onSuccess: closeSlide });
    } else {
      createPost.mutate(fd, { onSuccess: closeSlide });
    }
  };

  const handleDelete = () => {
    if (!confirmDialog.id) return;
    deletePost.mutate(confirmDialog.id, { onSuccess: () => setConfirmDialog({ open: false, id: null }) });
  };

  const isSaving = createPost.isPending || updatePost.isPending;

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
            <h2 className="text-2xl font-bold text-dark">Blog Management</h2>
            <p className="text-sm text-gray-500 mt-1">Create and manage blog articles</p>
          </div>
          <Button onClick={openAdd}>New Article</Button>
        </div>

        {isLoading ? <LoadingSpinner size="lg" className="py-20" /> : posts.length === 0 ? (
          <EmptyState title="No blog posts" description="Write your first article." actionLabel="New Article" onAction={openAdd}
            icon={<svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>} />
        ) : (
          <div className="bg-white border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {posts.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3"><span className="text-sm font-medium text-dark line-clamp-1 max-w-[250px] block">{p.title}</span></td>
                      <td className="px-4 py-3"><Badge variant={p.category}>{p.category}</Badge></td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${p.isPublished ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {p.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : '--'}</td>
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
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-[520px] bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-dark">{editingId ? 'Edit Article' : 'New Article'}</h3>
                <button onClick={closeSlide} className="p-1 rounded-lg hover:bg-gray-100" aria-label="Close"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input label="Title" value={form.title} onChange={(e) => setForm(f => ({...f, title: e.target.value}))} required />
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Body</label>
                  <RichTextEditor content={form.body} onChange={(html) => setForm(f => ({...f, body: html}))} />
                </div>
                <Select label="Category" options={CATEGORY_OPTIONS} value={form.category} onChange={(e) => setForm(f => ({...f, category: e.target.value}))} />
                <Input label="Tags (comma-separated)" value={form.tags} onChange={(e) => setForm(f => ({...f, tags: e.target.value}))} placeholder="e.g., empowerment, news" />
                <div>
                  <label className="block text-sm font-medium text-dark mb-1">Cover Image</label>
                  <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0])} className="text-sm text-gray-500" />
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm(f => ({...f, isPublished: e.target.checked}))} className="rounded border-gray-300" />
                  Publish immediately
                </label>
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
        title="Delete Article" message="Are you sure you want to delete this blog post?" confirmLabel="Delete" loading={deletePost.isPending} />
    </AdminLayout>
  );
}
