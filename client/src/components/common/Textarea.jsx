import { forwardRef } from 'react';

const Textarea = forwardRef(({ label, error, maxLength, value = '', className = '', ...props }, ref) => {
  return (
    <div className={`w-full ${className}`}>
      {label && <label className="block text-sm font-medium text-[#2D3436]/80 mb-1.5">{label}</label>}
      <textarea
        ref={ref}
        value={value}
        maxLength={maxLength}
        className={`w-full px-3 py-2 rounded-lg border text-sm text-[#2D3436] bg-[#FFFFFF] placeholder:text-[#2D3436]/30 transition-colors duration-150 outline-none resize-y min-h-[80px]
          ${error ? 'border-[#EF5350] focus:ring-2 focus:ring-[#EF5350]/20' : 'border-[#F0E6F6] focus:border-[#FF6B9D] focus:ring-2 focus:ring-[#FF6B9D]/20'}
        `}
        {...props}
      />
      <div className="flex justify-between mt-1">
        {error && <p className="text-xs text-[#EF5350]">{error}</p>}
        {maxLength && (
          <p className={`text-xs ml-auto ${value.length > maxLength * 0.9 ? 'text-[#EF5350]' : 'text-[#2D3436]/30'}`}>
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
});

Textarea.displayName = 'Textarea';
export default Textarea;
