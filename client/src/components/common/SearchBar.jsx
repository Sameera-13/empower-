import { useState, useEffect } from 'react';

export default function SearchBar({ value = '', onChange, placeholder = 'Search...', className = '' }) {
  const [local, setLocal] = useState(value);

  useEffect(() => { setLocal(value); }, [value]);
  useEffect(() => {
    const timer = setTimeout(() => { if (local !== value) onChange(local); }, 300);
    return () => clearTimeout(timer);
  }, [local]);

  return (
    <div className={`relative ${className}`}>
      <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D3436]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 pl-10 pr-3 rounded-lg border border-[#F0E6F6] bg-[#FFFFFF] text-sm text-[#2D3436] placeholder:text-[#2D3436]/30 outline-none transition-colors focus:border-[#FF6B9D] focus:ring-2 focus:ring-[#FF6B9D]/20"
      />
    </div>
  );
}
