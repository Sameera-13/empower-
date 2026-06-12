import { useStats } from '../../hooks/useStats';

const STAT_CONFIG = [
  { key: 'totalUsers', label: 'Women Empowered', desc: 'Real women. Real stories. Real change.', icon: '👭', color: 'text-[#ff4f8b]', bg: 'bg-pink-50' },
  { key: 'totalResources', label: 'Resources Available', desc: 'Tools and guides to grow skills and confidence.', icon: '📗', color: 'text-[#6BCB77]', bg: 'bg-green-50' },
  { key: 'totalPosts', label: 'Community Posts', desc: 'Stories, updates, and conversations that inspire.', icon: '👨‍👩‍👧‍👦', color: 'text-[#FFA07A]', bg: 'bg-orange-50' },
  { key: 'totalOpportunities', label: 'Opportunities Listed', desc: 'Discover programs and opportunities to thrive.', icon: '💼', color: 'text-[#9370DB]', bg: 'bg-purple-50' },
];

export default function StatsStrip() {
  const { data, isLoading } = useStats();

  return (
    <section className="px-4 pb-12 max-w-[1400px] mx-auto -mt-6">
      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(255,79,139,0.08)] border border-pink-50 p-6 md:p-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 md:divide-x divide-gray-100">
          {isLoading
            ? STAT_CONFIG.map((stat) => (
                <div key={stat.label} className="p-4 flex flex-col gap-4 animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100" />
                    <div className="h-8 w-16 bg-gray-100 rounded" />
                  </div>
                  <div>
                    <div className="h-4 w-32 bg-gray-100 rounded mb-2" />
                    <div className="h-3 w-full bg-gray-100 rounded" />
                  </div>
                </div>
              ))
            : STAT_CONFIG.map((stat, idx) => (
                <div key={stat.label} className={`p-4 ${idx !== 0 ? 'md:pl-8' : ''}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-[52px] h-[52px] rounded-full ${stat.bg} flex items-center justify-center text-2xl shadow-sm border border-white`}>
                      {stat.icon}
                    </div>
                    <span className={`text-4xl font-bold ${stat.color}`}>
                      {(data?.data?.[stat.key] ?? 0).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.1em] mb-2">
                      {stat.label}
                    </h4>
                    <p className="text-[13px] text-gray-400 leading-relaxed pr-4">
                      {stat.desc}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
