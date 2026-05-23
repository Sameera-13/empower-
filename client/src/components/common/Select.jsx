export default function Select({ label, options, error, className = '', ...props }) {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-sm font-medium text-[#2D3436]/80 mb-1.5">{label}</label>}
      <select
        className={`w-full h-10 px-3 rounded-lg border text-sm bg-[#FFFFFF] text-[#2D3436] transition-colors duration-150 outline-none
          ${error ? 'border-[#EF5350] focus:ring-2 focus:ring-[#EF5350]/20' : 'border-[#F0E6F6] focus:border-[#FF6B9D] focus:ring-2 focus:ring-[#FF6B9D]/20'}
        `}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-[#EF5350]">{error}</p>}
    </div>
  );
}
