import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children, className = '' }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60" onClick={onClose} />
      <div className={`relative bg-[#FFFFFF] border border-[#F0E6F6] rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          {title && <h2 className="text-xl font-semibold text-[#2D3436]">{title}</h2>}
          <button onClick={onClose} className="ml-auto p-1 rounded-lg hover:bg-[#F0E6F6] transition-colors" aria-label="Close modal">
            <svg className="w-5 h-5 text-[#2D3436]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
