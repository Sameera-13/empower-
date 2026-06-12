import { usePartners } from '../../hooks/usePartners';

const DEFAULT_PARTNERS = [
  { _id: 'p7', name: 'Free Press Journal', logo: 'https://empowerstop.odoo.com/web/image/1419-e539955d/fpj-logo.png?height=256' },
  { _id: 'p8', name: 'Future', logo: 'https://empowerstop.odoo.com/web/image/1420-a72ee30d/Future.jpg?height=256' },
  { _id: 'p1', name: 'Erasustain', logo: 'https://empowerstop.odoo.com/web/image/885-8e204132/Erasustain.png?height=256' },
  { _id: 'p2', name: "L'Oreal India", logo: 'https://empowerstop.odoo.com/web/image/886-89d10b77/Lorealindia.png?height=256' },
  { _id: 'p3', name: 'Taj Lands End', logo: 'https://empowerstop.odoo.com/web/image/887-2782fd69/TajLandsEnd.png?height=256' },
  { _id: 'p4', name: 'Centcira', logo: 'https://empowerstop.odoo.com/web/image/888-f30335f2/Contetra.png?height=256' },
  { _id: 'p5', name: 'Drop of Change', logo: 'https://empowerstop.odoo.com/web/image/890-bda2a45b/dropofchange.png?height=256' },
];

const PARTNER_COLORS = {
  'Free Press Journal': 'bg-[#e31837]',
  'Future': 'bg-[#df2027]',
  'Erasustain': 'bg-[#22c55e]',
  "L'Oreal India": 'bg-[#1f2937]',
  'Taj Lands End': 'bg-[#b48d56]',
  'Centcira': 'bg-[#4338ca]',
  'Drop of Change': 'bg-[#f97316]',
  'Contetra': 'bg-[#4338ca]',
  'Shemaroo': 'bg-[#e31837]'
};

export default function PartnerCarousel() {
  const { data } = usePartners();
  const dbPartners = data?.data || [];
  const partners = dbPartners.length > 0 ? dbPartners : DEFAULT_PARTNERS;

  return (
    <section className="py-20 relative bg-[#FFFDF7] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-100/50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-100/40 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      {/* Floral Watermarks */}
      <div className="absolute top-20 left-0 w-64 h-64 opacity-50 pointer-events-none hidden md:block -translate-x-1/4">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-pink-300 fill-none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0,100 C20,70 50,50 100,30" />
          <path d="M30,80 C50,70 60,85 50,100 C40,85 20,85 30,80 Z" />
          <path d="M60,55 C80,45 90,60 80,75 C70,60 50,60 60,55 Z" />
        </svg>
      </div>
      <div className="absolute top-10 right-0 w-64 h-64 opacity-50 pointer-events-none hidden md:block translate-x-1/4 scale-x-[-1]">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-yellow-500/30 fill-none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0,100 C20,70 50,50 100,30" />
          <path d="M30,80 C50,70 60,85 50,100 C40,85 20,85 30,80 Z" />
          <path d="M60,55 C80,45 90,60 80,75 C70,60 50,60 60,55 Z" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 relative">
          
          <div className="inline-flex items-center justify-center gap-2 mb-4 relative">
             <span className="absolute -left-8 top-1 text-pink-300 text-lg animate-pulse">✨</span>
             <div className="w-14 h-14 rounded-full bg-orange-50/80 flex items-center justify-center text-2xl shadow-sm border border-white">
                🤝
             </div>
             <span className="absolute -right-8 top-1 text-pink-300 text-xl animate-pulse">✨</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-serif font-bold mb-4 tracking-tight bg-gradient-to-r from-[#ff4f8b] via-[#E8A817] to-[#6BCB77] bg-clip-text text-transparent">
            Partners
          </h2>
          
          <div className="flex items-center justify-center mb-6">
            <div className="text-[12px] text-[#ff4f8b]">♥</div>
          </div>

          <p className="text-[#4a5568]/80 text-lg font-medium">
            Our Valued Partners: Together, We Create Impact!
          </p>
        </div>

        {/* Partners Cards */}
        <div className="partner-scroll-container pb-10 pt-4 -mx-4 md:mx-0">
          <div className="partner-scroll-track gap-6 px-3">
            {[...partners, ...partners, ...partners].map((partner, idx) => {
              const lineColor = PARTNER_COLORS[partner.name] || 'bg-gray-300';
              return (
                <div
                  key={`${partner._id}-${idx}`}
                  className="flex-shrink-0 w-44 h-48 bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50/50 flex flex-col items-center justify-center gap-6 group hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(255,79,139,0.08)] transition-all duration-300 mx-3"
                >
                  <div className="flex-1 flex items-center justify-center w-full">
                    <img src={partner.logo} alt={partner.name} className="max-h-16 w-auto object-contain group-hover:scale-105 transition-transform" />
                  </div>
                  <div className={`w-8 h-[3px] rounded-full ${lineColor} opacity-70 group-hover:opacity-100 transition-opacity`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Features Strip */}
        <div className="mt-8 bg-white rounded-[2rem] md:rounded-full p-4 md:p-6 shadow-[0_8px_30px_rgb(255,79,139,0.06)] border border-pink-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            
            {/* Item 1 */}
            <div className="flex items-center gap-4 px-4 pt-4 sm:pt-0">
              <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center text-[#ff4f8b] flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-[#ff4f8b] text-sm mb-0.5">Stronger Together</h4>
                <p className="text-xs text-gray-500 leading-tight">Collaborating for<br/>greater change.</p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-4 px-4 pt-4 sm:pt-0 lg:pl-8">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-[#6BCB77] flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-[#6BCB77] text-sm mb-0.5">Shared Values</h4>
                <p className="text-xs text-gray-500 leading-tight">Uniting for empowerment<br/>and inclusion.</p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-4 px-4 pt-4 sm:pt-0 lg:pl-8">
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-[#E8A817] flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-[#E8A817] text-sm mb-0.5">Greater Impact</h4>
                <p className="text-xs text-gray-500 leading-tight">Creating sustainable<br/>change together.</p>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-center gap-4 px-4 pt-4 sm:pt-0 lg:pl-8">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-[#9370DB] flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-[#9370DB] text-sm mb-0.5">Lasting Partnerships</h4>
                <p className="text-xs text-gray-500 leading-tight">Building relationships<br/>that drive impact.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
