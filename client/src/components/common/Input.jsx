import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-base font-medium text-[#2D3436] mb-2">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full h-12 px-4 rounded-xl border text-base text-[#2D3436] bg-[#FAFAFA] focus:bg-white placeholder:text-[#B2BEC3] transition-all duration-200 outline-none
          ${error
            ? 'border-[#EF5350] focus:ring-2 focus:ring-[#EF5350]/20 focus:shadow-lg focus:shadow-[#EF5350]/10'
            : 'border-[#F0E6F6] focus:border-[#FF6B9D] focus:ring-2 focus:ring-[#FF6B9D]/15 focus:shadow-lg focus:shadow-[#FF6B9D]/8'}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-[#EF5350]">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
