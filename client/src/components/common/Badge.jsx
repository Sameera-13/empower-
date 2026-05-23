const colorMap = {
  legal: 'bg-[#FF6B9D]/12 text-[#E8457A] border border-[#FF6B9D]/20',
  health: 'bg-[#6BCB77]/12 text-[#3DA548] border border-[#6BCB77]/20',
  career: 'bg-[#FFD93D]/15 text-[#B8960F] border border-[#FFD93D]/30',
  general: 'bg-[#DDD6FE]/30 text-[#7C3AED] border border-[#DDD6FE]/50',
  safety: 'bg-[#EF5350]/10 text-[#EF5350] border border-[#EF5350]/20',
  'self-defense': 'bg-[#6BCB77]/12 text-[#3DA548] border border-[#6BCB77]/20',
  'govt-scheme': 'bg-[#FF6B9D]/12 text-[#E8457A] border border-[#FF6B9D]/20',
  emergency: 'bg-[#EF5350]/10 text-[#EF5350] border border-[#EF5350]/20',
  scholarship: 'bg-[#FFD93D]/15 text-[#B8960F] border border-[#FFD93D]/30',
  internship: 'bg-[#6BCB77]/12 text-[#3DA548] border border-[#6BCB77]/20',
  job: 'bg-[#FF6B9D]/12 text-[#E8457A] border border-[#FF6B9D]/20',
  'skill-development': 'bg-[#6BCB77]/12 text-[#3DA548] border border-[#6BCB77]/20',
  active: 'bg-[#6BCB77]/12 text-[#3DA548] border border-[#6BCB77]/20',
  hidden: 'bg-[#FFD93D]/15 text-[#B8960F] border border-[#FFD93D]/30',
  deleted: 'bg-[#EF5350]/10 text-[#EF5350] border border-[#EF5350]/20',
  banned: 'bg-[#EF5350]/10 text-[#EF5350] border border-[#EF5350]/20',
  admin: 'bg-[#FF6B9D]/12 text-[#E8457A] border border-[#FF6B9D]/20',
  user: 'bg-[#F0E6F6]/50 text-[#636E72] border border-[#F0E6F6]',
};

export default function Badge({ variant, children, className = '' }) {
  const colors = colorMap[variant] || 'bg-[#F0E6F6]/50 text-[#636E72] border border-[#F0E6F6]';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors} ${className}`}>
      {children}
    </span>
  );
}
