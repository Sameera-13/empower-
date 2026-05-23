import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import SearchBar from '../../components/common/SearchBar';
import Select from '../../components/common/Select';
import Badge from '../../components/common/Badge';
import Button from '../../components/common/Button';
import Pagination from '../../components/common/Pagination';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import { useAdminUsers, useToggleBan, useDeleteUser } from '../../hooks/useAdmin';

const ROLE_OPTIONS = [
  { value: '', label: 'All Roles' },
  { value: 'user', label: 'User' },
  { value: 'admin', label: 'Admin' },
];

const STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'active', label: 'Active' },
  { value: 'banned', label: 'Banned' },
];

export default function UserManagement() {
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, type: null, userId: null });

  const params = useMemo(() => {
    const p = { page, limit: 20 };
    if (search) p.search = search;
    if (role) p.role = role;
    if (status) p.status = status;
    return p;
  }, [search, role, status, page]);

  const { data, isLoading } = useAdminUsers(params);
  const toggleBan = useToggleBan();
  const deleteUser = useDeleteUser();

  const users = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handleSearchChange = useCallback((val) => {
    setSearch(val);
    setPage(1);
  }, []);

  const handleRoleChange = useCallback((e) => {
    setRole(e.target.value);
    setPage(1);
  }, []);

  const handleStatusChange = useCallback((e) => {
    setStatus(e.target.value);
    setPage(1);
  }, []);

  const toggleSelectAll = () => {
    if (selectedIds.length === users.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(users.map((u) => u._id));
    }
  };

  const toggleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleBan = (userId) => {
    toggleBan.mutate(userId, {
      onSuccess: () => setSelectedIds((prev) => prev.filter((id) => id !== userId)),
    });
  };

  const handleDelete = () => {
    if (!confirmDialog.userId) return;
    deleteUser.mutate(confirmDialog.userId, {
      onSuccess: () => {
        setConfirmDialog({ open: false, type: null, userId: null });
        setSelectedIds((prev) => prev.filter((id) => id !== confirmDialog.userId));
      },
    });
  };

  const handleBulkBan = () => {
    selectedIds.forEach((id) => toggleBan.mutate(id));
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    setConfirmDialog({ open: true, type: 'bulkDelete', userId: null });
  };

  const confirmBulkDelete = () => {
    selectedIds.forEach((id) => deleteUser.mutate(id));
    setSelectedIds([]);
    setConfirmDialog({ open: false, type: null, userId: null });
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '--';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-dark">User Management</h2>
          <p className="text-sm text-gray-500 mt-1">Manage platform users and moderation</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchBar
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by name or email..."
            className="flex-1"
          />
          <Select
            options={ROLE_OPTIONS}
            value={role}
            onChange={handleRoleChange}
            className="sm:w-40"
          />
          <Select
            options={STATUS_OPTIONS}
            value={status}
            onChange={handleStatusChange}
            className="sm:w-40"
          />
        </div>

        {/* Bulk Actions Toolbar */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-lg px-4 py-3">
            <span className="text-sm font-medium text-primary">
              {selectedIds.length} user(s) selected
            </span>
            <div className="flex-1" />
            <Button
              variant="secondary"
              className="h-8 px-3 text-xs"
              onClick={handleBulkBan}
              disabled={toggleBan.isPending}
            >
              Ban Selected
            </Button>
            <Button
              variant="danger"
              className="h-8 px-3 text-xs"
              onClick={handleBulkDelete}
              disabled={deleteUser.isPending}
            >
              Delete Selected
            </Button>
          </div>
        )}

        {/* Data Table */}
        {isLoading ? (
          <LoadingSpinner size="lg" className="py-20" />
        ) : users.length === 0 ? (
          <EmptyState
            title="No users found"
            description="Try adjusting your search or filters."
            icon={
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          />
        ) : (
          <div className="bg-white border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.length === users.length && users.length > 0}
                        onChange={toggleSelectAll}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                        aria-label="Select all users"
                      />
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(user._id)}
                          onChange={() => toggleSelectOne(user._id)}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                          aria-label={`Select ${user.name}`}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-[#FF6B9D] text-white flex items-center justify-center text-sm font-semibold">
                              {user.name?.[0]?.toUpperCase() || '?'}
                            </div>
                          )}
                          <span className="text-sm font-medium text-dark">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-600">{user.email}</span>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={user.role}>{user.role}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={user.isBanned ? 'banned' : 'active'}>
                          {user.isBanned ? 'Banned' : 'Active'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-500">{formatDate(user.createdAt)}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/profile/${user._id}`}
                            className="inline-flex items-center h-8 px-3 rounded-lg text-xs font-medium text-primary hover:bg-primary/5 transition-colors"
                          >
                            View
                          </Link>
                          <Button
                            variant={user.isBanned ? 'secondary' : 'ghost'}
                            className="h-8 px-3 text-xs"
                            onClick={() => handleBan(user._id)}
                            disabled={toggleBan.isPending}
                          >
                            {user.isBanned ? 'Unban' : 'Ban'}
                          </Button>
                          <Button
                            variant="danger"
                            className="h-8 px-3 text-xs"
                            onClick={() =>
                              setConfirmDialog({ open: true, type: 'singleDelete', userId: user._id })
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

      {/* Confirm Dialogs */}
      <ConfirmDialog
        isOpen={confirmDialog.open && confirmDialog.type === 'singleDelete'}
        onClose={() => setConfirmDialog({ open: false, type: null, userId: null })}
        onConfirm={handleDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        confirmLabel="Delete"
        loading={deleteUser.isPending}
      />

      <ConfirmDialog
        isOpen={confirmDialog.open && confirmDialog.type === 'bulkDelete'}
        onClose={() => setConfirmDialog({ open: false, type: null, userId: null })}
        onConfirm={confirmBulkDelete}
        title="Delete Selected Users"
        message={`Are you sure you want to delete ${selectedIds.length} user(s)? This action cannot be undone.`}
        confirmLabel="Delete All"
        loading={deleteUser.isPending}
      />
    </AdminLayout>
  );
}
