const variants = {
  primary: 'gradient-btn-pink text-white hover:shadow-lg hover:shadow-[#FF6B9D]/30 active:shadow-none',
  secondary: 'bg-white border-2 border-[#FFD93D] text-[#2D3436] hover:bg-[#FFFFF0] hover:border-[#6BCB77] active:bg-[#F0FFF0]',
  ghost: 'bg-transparent text-[#636E72] hover:bg-[#FFF0F5] hover:text-[#FF6B9D] active:bg-[#FFE8EF]',
  danger: 'bg-[#EF5350] text-white hover:bg-[#D32F2F] hover:shadow-lg hover:shadow-[#EF5350]/25 active:bg-[#C62828]',
  accent: 'gradient-btn-green text-white hover:shadow-lg hover:shadow-[#6BCB77]/30 active:shadow-none',
};

export default function Button({ variant = 'primary', children, className = '', disabled, ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 h-10 px-5 rounded-full font-medium text-sm transition-all duration-200 cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant] || variants.primary} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
