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
  useOpportunities,
  useCreateOpportunity,
  useUpdateOpportunity,
  useDeleteOpportunity,
} from '../../hooks/useOpportunities';

const TYPE_FILTER_OPTIONS = [
  { value: '', label: 'All Types' },
  { value: 'scholarship', label: 'Scholarship' },
  { value: 'internship', label: 'Internship' },
  { value: 'job', label: 'Job' },
  { value: 'skill-development', label: 'Skill Development' },
];

const TYPE_FORM_OPTIONS = [
  { value: 'scholarship', label: 'Scholarship' },
  { value: 'internship', label: 'Internship' },
  { value: 'job', label: 'Job' },
  { value: 'skill-development', label: 'Skill Development' },
];

const INITIAL_FORM = {
  title: '',
  org: '',
  type: 'scholarship',
  description: '',
  eligibility: '',
  deadline: '',
  location: '',
  applyUrl: '',
};

export default function OpportunityManagement() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [page, setPage] = useState(1);
  const [slideOpen, setSlideOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, opportunityId: null });

  const params = useMemo(() => {
    const p = { page, limit: 20 };
    if (search) p.search = search;
    if (typeFilter) p.type = typeFilter;
    return p;
  }, [search, typeFilter, page]);

  const { data, isLoading } = useOpportunities(params);
  const createOpportunity = useCreateOpportunity();
  const updateOpportunity = useUpdateOpportunity();
  const deleteOpportunity = useDeleteOpportunity();

  const opportunities = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handleSearchChange = useCallback((val) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handleTypeFilterChange = useCallback((e) => {
    setTypeFilter(e.target.value);
    setPage(1);
  }, []);

  const openAdd = () => {
    setForm(INITIAL_FORM);
    setEditingId(null);
    setSlideOpen(true);
  };

  const openEdit = (opportunity) => {
    setForm({
      title: opportunity.title || '',
      org: opportunity.org || '',
      type: opportunity.type || 'scholarship',
      description: opportunity.description || '',
      eligibility: opportunity.eligibility || '',
      deadline: opportunity.deadline
        ? new Date(opportunity.deadline).toISOString().split('T')[0]
        : '',
      location: opportunity.location || '',
      applyUrl: opportunity.applyUrl || '',
    });
    setEditingId(opportunity._id);
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
    const payload = { ...form };
    if (payload.deadline) {
      payload.deadline = new Date(payload.deadline).toISOString();
    } else {
      delete payload.deadline;
    }

    if (editingId) {
      updateOpportunity.mutate(
        { id: editingId, ...payload },
        { onSuccess: closeSlide }
      );
    } else {
      createOpportunity.mutate(payload, { onSuccess: closeSlide });
    }
  };

  const handleDelete = () => {
    if (!confirmDialog.opportunityId) return;
    deleteOpportunity.mutate(confirmDialog.opportunityId, {
      onSuccess: () => setConfirmDialog({ open: false, opportunityId: null }),
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

  const isSaving = createOpportunity.isPending || updateOpportunity.isPending;

  // Handle escape key to close slide
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
            <h2 className="text-2xl font-bold text-dark">Opportunity Management</h2>
            <p className="text-sm text-gray-500 mt-1">Manage scholarships, jobs, and programs</p>
          </div>
          <Button onClick={openAdd}>Add Opportunity</Button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar
            value={search}
            onChange={handleSearchChange}
            placeholder="Search opportunities..."
            className="flex-1"
          />
          <Select
            options={TYPE_FILTER_OPTIONS}
            value={typeFilter}
            onChange={handleTypeFilterChange}
            className="sm:w-48"
          />
        </div>

        {/* Data Table */}
        {isLoading ? (
          <LoadingSpinner size="lg" className="py-20" />
        ) : opportunities.length === 0 ? (
          <EmptyState
            title="No opportunities found"
            description="Create your first opportunity or adjust your search."
            actionLabel="Add Opportunity"
            onAction={openAdd}
            icon={
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
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
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Organization</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Deadline</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {opportunities.map((opp) => {
                    const isExpired = opp.deadline && new Date(opp.deadline) < new Date();
                    return (
                      <tr key={opp._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <span className="text-sm font-medium text-dark line-clamp-1 max-w-[200px] block">
                            {opp.title}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-600">{opp.org || '--'}</span>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={opp.type}>{opp.type}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-sm ${isExpired ? 'text-danger' : 'text-gray-600'}`}>
                            {formatDate(opp.deadline)}
                            {isExpired && (
                              <span className="ml-1 text-xs text-danger">(expired)</span>
                            )}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-600">{opp.location || '--'}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-500">{formatDate(opp.createdAt)}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              className="h-8 px-3 text-xs"
                              onClick={() => openEdit(opp)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="danger"
                              className="h-8 px-3 text-xs"
                              onClick={() =>
                                setConfirmDialog({ open: true, opportunityId: opp._id })
                              }
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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
                  {editingId ? 'Edit Opportunity' : 'Add Opportunity'}
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
                  placeholder="Opportunity title"
                />

                <Input
                  label="Organization"
                  value={form.org}
                  onChange={(e) => handleFormChange('org', e.target.value)}
                  required
                  placeholder="Organization name"
                />

                <Select
                  label="Type"
                  options={TYPE_FORM_OPTIONS}
                  value={form.type}
                  onChange={(e) => handleFormChange('type', e.target.value)}
                />

                <Textarea
                  label="Description"
                  value={form.description}
                  onChange={(e) => handleFormChange('description', e.target.value)}
                  required
                  placeholder="Describe this opportunity..."
                />

                <Textarea
                  label="Eligibility"
                  value={form.eligibility}
                  onChange={(e) => handleFormChange('eligibility', e.target.value)}
                  placeholder="Who can apply..."
                />

                <Input
                  label="Deadline"
                  type="date"
                  value={form.deadline}
                  onChange={(e) => handleFormChange('deadline', e.target.value)}
                />

                <Input
                  label="Location"
                  value={form.location}
                  onChange={(e) => handleFormChange('location', e.target.value)}
                  placeholder="e.g., Remote, Mumbai"
                />

                <Input
                  label="Apply URL"
                  type="url"
                  value={form.applyUrl}
                  onChange={(e) => handleFormChange('applyUrl', e.target.value)}
                  required
                  placeholder="https://example.com/apply"
                />

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
        onClose={() => setConfirmDialog({ open: false, opportunityId: null })}
        onConfirm={handleDelete}
        title="Delete Opportunity"
        message="Are you sure you want to delete this opportunity? It will be soft-deleted and permanently removed after 30 days."
        confirmLabel="Delete"
        loading={deleteOpportunity.isPending}
      />
    </AdminLayout>
  );
}
