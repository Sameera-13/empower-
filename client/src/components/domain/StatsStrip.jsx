import { useStats } from '../../hooks/useStats';

const STAT_CONFIG = [
  { key: 'totalUsers', label: 'Women Empowered', color: 'text-[#FF6B9D]', glow: 'bg-[#FF6B9D]/10' },
  { key: 'totalResources', label: 'Resources Available', color: 'text-[#6BCB77]', glow: 'bg-[#6BCB77]/10' },
  { key: 'totalPosts', label: 'Community Posts', color: 'text-[#E8A817]', glow: 'bg-[#FFD93D]/15' },
  { key: 'totalOpportunities', label: 'Opportunities Listed', color: 'text-[#FF6B9D]', glow: 'bg-[#FF6B9D]/10' },
];

export default function StatsStrip() {
  const { data, isLoading } = useStats();

  return (
    <section className="border-b border-[#F0E6F6] bg-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {isLoading
            ? STAT_CONFIG.map((stat) => (
                <div key={stat.label} className="text-center relative">
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className="h-9 w-24 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))
            : STAT_CONFIG.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div>
                    <p className={`text-3xl md:text-4xl font-bold tracking-tight ${stat.color}`}>
                      {(data?.data?.[stat.key] ?? 0).toLocaleString()}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-wider text-[#2D3436]/40 font-medium">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
