import { useState } from 'react';
import { useValidateCoupon } from '../../hooks/useCoupons';

export default function CouponInput({ orderTotal, onApply, onRemove, appliedCoupon }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const validate = useValidateCoupon();

  const handleApply = async () => {
    setError('');
    if (!code.trim()) { setError('Enter a coupon code'); return; }

    try {
      const result = await validate.mutateAsync({ code: code.trim(), orderTotal });
      onApply(result.data);
      setCode('');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid coupon');
    }
  };

  if (appliedCoupon) {
    return (
      <div className="flex items-center justify-between bg-[#6BCB77]/10 border border-[#6BCB77]/30 rounded-lg px-4 py-2.5">
        <div>
          <span className="text-sm font-semibold text-[#6BCB77]">{appliedCoupon.code}</span>
          <span className="text-sm text-[#2D3436]/60 ml-2">
            -&#8377;{appliedCoupon.discount.toLocaleString('en-IN')} off
          </span>
        </div>
        <button onClick={onRemove} className="text-xs text-[#EF5350] hover:underline">Remove</button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Coupon code"
          className="flex-1 h-10 px-3 border border-[#F0E6F6] rounded-lg text-sm uppercase focus:outline-none focus:ring-2 focus:ring-[#FF6B9D]/40"
        />
        <button
          onClick={handleApply}
          disabled={validate.isPending}
          className="h-10 px-4 text-sm font-semibold text-[#FF6B9D] border border-[#FF6B9D] rounded-lg hover:bg-[#FF6B9D]/5 transition-colors disabled:opacity-50"
        >
          {validate.isPending ? '...' : 'Apply'}
        </button>
      </div>
      {error && <p className="text-xs text-[#EF5350] mt-1">{error}</p>}
    </div>
  );
}
