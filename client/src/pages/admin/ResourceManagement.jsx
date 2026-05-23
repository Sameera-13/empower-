import { useState, useMemo, useCallback, useEffect } from 'react';
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
import {
  useResources,
  useCreateResource,
  useUpdateResource,
  useDeleteResource,
} from '../../hooks/useResources';

const CATEGORY_OPTIONS = [
  { value: '', label: 'All Categories' },
  { value: 'legal', label: 'Legal' },
  { value: 'health', label: 'Health' },
  { value: 'self-defense', label: 'Self Defense' },
  { value: 'govt-scheme', label: 'Govt Scheme' },
  { value: 'emergency', label: 'Emergency' },
];

const CATEGORY_FORM_OPTIONS = [
  { value: 'legal', label: 'Legal' },
  { value: 'health', label: 'Health' },
  { value: 'self-defense', label: 'Self Defense' },
  { value: 'govt-scheme', label: 'Govt Scheme' },
  { value: 'emergency', label: 'Emergency' },
];

const INITIAL_FORM = {
  title: '',
  description: '',
  category: 'legal',
  sourceUrl: '',
  state: '',
  language: 'English',
  isPinned: false,
};

export default function ResourceManagement() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(1);
  const [slideOpen, setSlideOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, resourceId: null });

  const params = useMemo(() => {
    const p = { page, limit: 20 };
    if (search) p.search = search;
    if (categoryFilter) p.category = categoryFilter;
    return p;
  }, [search, categoryFilter, page]);

  const { data, isLoading } = useResources(params);
  const createResource = useCreateResource();
  const updateResource = useUpdateResource();
  const deleteResource = useDeleteResource();

  const resources = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handleSearchChange = useCallback((val) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handleCategoryFilterChange = useCallback((e) => {
    setCategoryFilter(e.target.value);
    setPage(1);
  }, []);

  const openAdd = () => {
    setForm(INITIAL_FORM);
    setEditingId(null);
    setSlideOpen(true);
  };

  const openEdit = (resource) => {
    setForm({
      title: resource.title || '',
      description: resource.description || '',
      category: resource.category || 'legal',
      sourceUrl: resource.sourceUrl || '',
      state: resource.state || '',
      language: resource.language || 'English',
      isPinned: resource.isPinned || false,
    });
    setEditingId(resource._id);
    setSlideOpen(true);
  };

  const closeSlide = () => {
    setSlideOpen(false);
    setEditingId(null);
    setForm(INITIAL_FORM);
  };

  const handleFormChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateResource.mutate(
        { id: editingId, ...form },
        { onSuccess: closeSlide }
      );
    } else {
      createResource.mutate(form, { onSuccess: closeSlide });
    }
  };

  const handleDelete = () => {
    if (!confirmDialog.resourceId) return;
    deleteResource.mutate(confirmDialog.resourceId, {
      onSuccess: () => setConfirmDialog({ open: false, resourceId: null }),
    });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '--';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isSaving = createResource.isPending || updateResource.isPending;

  // Close popover on outside click
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && slideOpen) closeSlide();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [slideOpen]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-dark">Resource Management</h2>
            <p className="text-sm text-gray-500 mt-1">Manage platform resources and guides</p>
          </div>
          <Button onClick={openAdd}>Add Resource</Button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar
            value={search}
            onChange={handleSearchChange}
            placeholder="Search resources..."
            className="flex-1"
          />
          <Select
            options={CATEGORY_OPTIONS}
            value={categoryFilter}
            onChange={handleCategoryFilterChange}
            className="sm:w-44"
          />
        </div>

        {/* Data Table */}
        {isLoading ? (
          <LoadingSpinner size="lg" className="py-20" />
        ) : resources.length === 0 ? (
          <EmptyState
            title="No resources found"
            description="Create your first resource or adjust your search."
            actionLabel="Add Resource"
            onAction={openAdd}
            icon={
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
          />
        ) : (
          <div className="bg-white border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">State</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Language</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Pinned</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {resources.map((resource) => (
                    <tr key={resource._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium text-dark line-clamp-1 max-w-[220px] block">
                          {resource.title}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={resource.category}>{resource.category}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600">{resource.state || '--'}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600">{resource.language || 'English'}</span>
                      </td>
                      <td className="px-4 py-3">
                        {resource.isPinned ? (
                          <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ) : (
                          <span className="text-sm text-gray-400">--</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-500">{formatDate(resource.createdAt)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            className="h-8 px-3 text-xs"
                            onClick={() => openEdit(resource)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            className="h-8 px-3 text-xs"
                            onClick={() =>
                              setConfirmDialog({ open: true, resourceId: resource._id })
                            }
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      {/* SlideOver Panel */}
      {slideOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50" onClick={closeSlide} />

          {/* Panel */}
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-[400px] bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-dark">
                  {editingId ? 'Edit Resource' : 'Add Resource'}
                </h3>
                <button
                  onClick={closeSlide}
                  className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Close panel"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Title"
                  value={form.title}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  required
                  placeholder="Resource title"
                />

                <Textarea
                  label="Description"
                  value={form.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  required
                  placeholder="Describe this resource..."
                />

                <Select
                  label="Category"
                  options={CATEGORY_FORM_OPTIONS}
                  value={form.category}
                  onChange={(e) => handleFormChange('category', e.target.value)}
                />

                <Input
                  label="Source URL"
                  type="url"
                  value={form.sourceUrl}
                  onChange={(e) => handleFormChange('sourceUrl', e.target.value)}
                  placeholder="https://example.com"
                />

                <Input
                  label="State"
                  value={form.state}
                  onChange={(e) => handleFormChange('state', e.target.value)}
                  placeholder="e.g., Maharashtra"
                />

                <Input
                  label="Language"
                  value={form.language}
                  onChange={(e) => handleFormChange('language', e.target.value)}
                  placeholder="e.g., English"
                />

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isPinned"
                    checked={form.isPinned}
                    onChange={(e) => handleFormChange('isPinned', e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="isPinned" className="text-sm font-medium text-dark">
                    Pin this resource
                  </label>
                </div>

                <div className="pt-4 flex gap-3">
                  <Button variant="ghost" type="button" onClick={closeSlide} className="flex-1">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSaving} className="flex-1">
                    {isSaving ? 'Saving...' : editingId ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={confirmDialog.open}
        onClose={() => setConfirmDialog({ open: false, resourceId: null })}
        onConfirm={handleDelete}
        title="Delete Resource"
        message="Are you sure you want to delete this resource? It will be soft-deleted and permanently removed after 30 days."
        confirmLabel="Delete"
        loading={deleteResource.isPending}
      />
    </AdminLayout>
  );
}
