export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      <button onClick={() => onPageChange(page - 1)} disabled={page <= 1} className="px-3 py-1.5 rounded-md text-sm font-medium text-[#2D3436]/60 hover:bg-[#F0E6F6] disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Previous page">Prev</button>
      {start > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="px-3 py-1.5 rounded-md text-sm text-[#2D3436]/60 hover:bg-[#F0E6F6]">1</button>
          {start > 2 && <span className="px-1 text-[#2D3436]/30">...</span>}
        </>
      )}
      {pages.map((p) => (
        <button key={p} onClick={() => onPageChange(p)} className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${p === page ? 'bg-[#FF6B9D] text-white' : 'text-[#2D3436]/60 hover:bg-[#F0E6F6]'}`}>{p}</button>
      ))}
      {end < totalPages && (
        <>
          {end < totalPages - 1 && <span className="px-1 text-[#2D3436]/30">...</span>}
          <button onClick={() => onPageChange(totalPages)} className="px-3 py-1.5 rounded-md text-sm text-[#2D3436]/60 hover:bg-[#F0E6F6]">{totalPages}</button>
        </>
      )}
      <button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} className="px-3 py-1.5 rounded-md text-sm font-medium text-[#2D3436]/60 hover:bg-[#F0E6F6] disabled:opacity-30 disabled:cursor-not-allowed" aria-label="Next page">Next</button>
    </div>
  );
}
