import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Modal from '../../components/common/Modal';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ConfirmDialog from '../../components/common/ConfirmDialog';
import EmptyState from '../../components/common/EmptyState';
import { useAdminCoupons, useCreateCoupon, useUpdateCoupon, useDeleteCoupon } from '../../hooks/useCoupons';

const EMPTY = { code: '', type: 'percentage', value: '', minOrderAmount: '', maxUses: '', expiresAt: '' };

export default function CouponManagement() {
  const { data, isLoading } = useAdminCoupons();
  const createCoupon = useCreateCoupon();
  const updateCoupon = useUpdateCoupon();
  const deleteCoupon = useDeleteCoupon();
  const coupons = data?.data || [];

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [deleteId, setDeleteId] = useState(null);
  const [error, setError] = useState('');

  const openCreate = () => { setEditing(null); setForm(EMPTY); setError(''); setShowForm(true); };
  const openEdit = (c) => {
    setEditing(c._id);
    setForm({
      code: c.code,
      type: c.type,
      value: String(c.value),
      minOrderAmount: String(c.minOrderAmount || ''),
      maxUses: String(c.maxUses || ''),
      expiresAt: c.expiresAt ? c.expiresAt.split('T')[0] : '',
    });
    setError('');
    setShowForm(true);
  };

  const handleSave = async () => {
    setError('');
    const payload = {
      code: form.code,
      type: form.type,
      value: Number(form.value),
      minOrderAmount: Number(form.minOrderAmount) || 0,
      maxUses: Number(form.maxUses) || 0,
      expiresAt: form.expiresAt,
    };

    try {
      if (editing) {
        await updateCoupon.mutateAsync({ id: editing, ...payload });
      } else {
        await createCoupon.mutateAsync(payload);
      }
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save coupon');
    }
  };

  const handleDelete = async () => {
    await deleteCoupon.mutateAsync(deleteId);
    setDeleteId(null);
  };

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  if (isLoading) return <AdminLayout><LoadingSpinner size="lg" className="py-20" /></AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-dark">Coupons</h2>
            <p className="text-sm text-gray-500 mt-1">Create and manage discount coupons</p>
          </div>
          <Button onClick={openCreate}>+ New Coupon</Button>
        </div>

        {coupons.length === 0 ? (
          <EmptyState
            title="No coupons yet"
            description="Create your first coupon to offer discounts to customers."
            icon={<svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>}
            actionLabel="+ New Coupon"
            onAction={openCreate}
          />
        ) : (
          <div className="bg-white border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-border">
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Code</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Value</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Min Order</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Usage</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Expires</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {coupons.map((c) => {
                    const expired = new Date(c.expiresAt) < new Date();
                    const maxedOut = c.maxUses > 0 && c.usedCount >= c.maxUses;
                    return (
                      <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-mono font-semibold text-dark">{c.code}</td>
                        <td className="px-4 py-3 text-sm text-gray-600 capitalize">{c.type}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-[#FF6B9D]">{c.type === 'percentage' ? `${c.value}%` : `₹${c.value}`}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{c.minOrderAmount > 0 ? `₹${c.minOrderAmount}` : '-'}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{c.usedCount}{c.maxUses > 0 ? `/${c.maxUses}` : '/∞'}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{new Date(c.expiresAt).toLocaleDateString('en-IN')}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${
                            !c.isActive || expired || maxedOut
                              ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-600 border-green-200'
                          }`}>
                            {!c.isActive ? 'Inactive' : expired ? 'Expired' : maxedOut ? 'Maxed' : 'Active'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-3">
                            <button onClick={() => openEdit(c)} className="text-sm text-[#FF6B9D] hover:text-[#e5558a] font-medium">Edit</button>
                            <button onClick={() => setDeleteId(c._id)} className="text-sm text-red-500 hover:text-red-700 font-medium">Delete</button>
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
      </div>

      {/* Create/Edit Modal */}
      <Modal open={showForm} onClose={() => setShowForm(false)} title={editing ? 'Edit Coupon' : 'New Coupon'}>
        <div className="space-y-4">
          <Input label="Code" value={form.code} onChange={(e) => set('code', e.target.value.toUpperCase())} placeholder="e.g. WELCOME20" />
          <div>
            <label className="text-sm font-medium text-[#2D3436] block mb-1">Type</label>
            <select value={form.type} onChange={(e) => set('type', e.target.value)} className="w-full h-10 px-3 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B9D]/40">
              <option value="percentage">Percentage</option>
              <option value="flat">Flat Amount</option>
            </select>
          </div>
          <Input label={form.type === 'percentage' ? 'Value (%)' : 'Value (₹)'} type="number" value={form.value} onChange={(e) => set('value', e.target.value)} />
          <Input label="Min Order Amount (₹)" type="number" value={form.minOrderAmount} onChange={(e) => set('minOrderAmount', e.target.value)} placeholder="0 = no minimum" />
          <Input label="Max Uses" type="number" value={form.maxUses} onChange={(e) => set('maxUses', e.target.value)} placeholder="0 = unlimited" />
          <Input label="Expires On" type="date" value={form.expiresAt} onChange={(e) => set('expiresAt', e.target.value)} />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button onClick={handleSave} disabled={createCoupon.isPending || updateCoupon.isPending} className="w-full h-10">
            {editing ? 'Update Coupon' : 'Create Coupon'}
          </Button>
        </div>
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Coupon"
        message="Are you sure you want to delete this coupon? This cannot be undone."
        confirmLabel="Delete"
        loading={deleteCoupon.isPending}
      />
    </AdminLayout>
  );
}
