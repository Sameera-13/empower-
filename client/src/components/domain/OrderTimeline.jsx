const STEPS = [
  { key: 'pending', label: 'Ordered' },
  { key: 'paid', label: 'Paid' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
];

export default function OrderTimeline({ status, statusHistory = [] }) {
  if (status === 'cancelled') {
    return (
      <div className="flex items-center gap-2 text-sm text-[#EF5350] font-medium">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        Order Cancelled
      </div>
    );
  }

  const currentIndex = STEPS.findIndex((s) => s.key === status);

  const getTimestamp = (stepKey) => {
    const entry = statusHistory.find((h) => h.status === stepKey);
    if (!entry) return null;
    return new Date(entry.changedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex items-center gap-0">
      {STEPS.map((step, idx) => {
        const isComplete = idx <= currentIndex;
        const isCurrent = idx === currentIndex;
        const timestamp = getTimestamp(step.key);

        return (
          <div key={step.key} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                isComplete
                  ? 'bg-[#6BCB77] border-[#6BCB77] text-white'
                  : 'bg-white border-gray-300 text-gray-400'
              } ${isCurrent ? 'ring-4 ring-[#6BCB77]/20' : ''}`}>
                {isComplete ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                ) : idx + 1}
              </div>
              <span className={`text-xs mt-1 font-medium ${isComplete ? 'text-[#2D3436]' : 'text-gray-400'}`}>{step.label}</span>
              {timestamp && <span className="text-[10px] text-[#2D3436]/40">{timestamp}</span>}
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 ${idx < currentIndex ? 'bg-[#6BCB77]' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
