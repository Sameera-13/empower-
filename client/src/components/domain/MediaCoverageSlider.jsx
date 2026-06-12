import { useState } from 'react';
import { useMediaCoverage } from '../../hooks/useMediaCoverage';

const DEFAULT_ITEMS = [
  {
    _id: 'mc1',
    title: 'Opt for diya Free Press Journal',
    source: 'Free Press Journal',
    url: 'https://www.freepressjournal.in/mumbai/angels-of-mumbai-a-diwali-invitation-to-support-the-journey-of-our-angels',
    image: 'https://www.empowerstop.com/web/image/1190-24a8b9dd/Angels%20of%20Mumbai.jpg',
    desc: 'Gully Classes Foundation has been running the Diwali A Hope project for two years, empowering women from underprivileged communities by equipping them with skills and platforms to sell handmade products.',
    icon: '📰',
    theme: 'pink'
  },
  {
    _id: 'mc2',
    title: 'Art for Cause – Mid Day India',
    source: 'Mid Day',
    url: 'https://www.mid-day.com/mumbai/mumbai-news/article/mumbai-diary-friday-dossier-23409148',
    image: 'https://www.empowerstop.com/web/image/1255-59abc55b/Midday%20EmpowerStop.webp',
    icon: '⭐',
    theme: 'green',
    hasDivider: true
  },
  {
    _id: 'mc3',
    title: 'Joyful Creation – Mid Day India',
    source: 'Mid Day',
    url: 'https://www.mid-day.com/mumbai/mumbai-news/article/mumbai-diary-wednesday-dossier-23428099',
    image: 'https://www.empowerstop.com/web/image/1234-20f67857/Chrismas.webp',
    subtitle: '| A child paints a Christmas ornament',
    desc: 'A few kids from lesser privileged backgrounds in Ghatkopar attended a workshop organised by Gully Classes Foundation.',
    icon: '♥',
    theme: 'purple'
  },
  {
    _id: 'mc4',
    title: 'Successful Beach Cleanup Drive',
    source: 'Free Press Journal',
    url: 'https://www.freepressjournal.in/press-release/gully-classes-foundation-and-river-cleanup-collaborate-for-a-successful-beach-cleanup-drive',
    image: 'https://empowerstop.odoo.com/web/image/2592-961fef80/DSC03870.JPG?height=256',
    icon: '📰',
    theme: 'pink'
  },
  {
    _id: 'mc5',
    title: 'Special Mention at IIT Bombay',
    source: 'Free Press Journal',
    url: 'https://www.freepressjournal.in/press-release/gully-classes-foundation-kids-receive-special-mention-at-dance-competition-organised-by-nss-unit-of-iit-bombay',
    image: 'https://empowerstop.odoo.com/web/image/2595-2043f05f/1707659043463.jpeg?height=256',
    icon: '⭐',
    theme: 'green'
  },
];

const THEMES = {
  pink: {
    text: 'text-[#ff4f8b]',
    badge: 'bg-[#FF6B9D]/10 text-[#ff4f8b] border-[#ff4f8b]/20',
    shadow: 'hover:shadow-[0_20px_40px_rgb(255,79,139,0.15)]'
  },
  green: {
    text: 'text-[#6BCB77]',
    badge: 'bg-[#6BCB77]/10 text-[#6BCB77] border-[#6BCB77]/20',
    shadow: 'hover:shadow-[0_20px_40px_rgb(107,203,119,0.15)]'
  },
  purple: {
    text: 'text-[#9370DB]',
    badge: 'bg-[#9370DB]/10 text-[#9370DB] border-[#9370DB]/20',
    shadow: 'hover:shadow-[0_20px_40px_rgb(147,112,219,0.15)]'
  }
};

export default function MediaCoverageSlider() {
  const { data } = useMediaCoverage();
  const dbItems = data?.data || [];
  
  // Merge fetched items with hardcoded designs/icons to preserve aesthetic
  const items = (dbItems.length > 0 ? dbItems : DEFAULT_ITEMS).map((item, i) => ({
    ...item,
    icon: item.icon || DEFAULT_ITEMS[i % DEFAULT_ITEMS.length].icon,
    theme: item.theme || DEFAULT_ITEMS[i % DEFAULT_ITEMS.length].theme,
    desc: item.desc || DEFAULT_ITEMS[i % DEFAULT_ITEMS.length].desc,
    subtitle: item.subtitle || DEFAULT_ITEMS[i % DEFAULT_ITEMS.length].subtitle,
    hasDivider: item.hasDivider || DEFAULT_ITEMS[i % DEFAULT_ITEMS.length].hasDivider,
  }));

  const [scrollIdx, setScrollIdx] = useState(0);
  const visibleCount = 3;
  const maxIdx = Math.max(0, items.length - visibleCount);

  const prev = () => setScrollIdx((p) => Math.max(0, p - 1));
  const next = () => setScrollIdx((p) => Math.min(maxIdx, p + 1));

  return (
    <section className="py-20 relative bg-[#FFFDF7] overflow-hidden">
      {/* Decorative Blurs & Florals */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-100/50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-50/50 rounded-full blur-[100px] translate-x-1/2 translate-y-1/4 pointer-events-none" />
      
      <div className="absolute top-10 right-10 w-96 h-96 opacity-30 pointer-events-none hidden lg:block">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-pink-300">
          <path d="M80,20 C60,40 40,60 20,80 C30,90 50,70 80,40 C90,30 100,10 80,20 Z" />
          <path d="M70,30 C50,50 30,70 10,90 C20,100 40,80 70,50 C80,40 90,20 70,30 Z" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-[1.25rem] bg-pink-50 flex items-center justify-center border-2 border-pink-100 shadow-sm relative">
                <span className="text-3xl filter drop-shadow-sm text-[#ff4f8b]">📰</span>
                <span className="absolute -right-4 -top-4 text-pink-300 text-lg animate-pulse">✨</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a202c] flex items-center gap-3">
                Media <span className="text-[#ff4f8b]">Coverage</span>
              </h2>
            </div>
            
            <div className="flex items-center gap-4 mb-6 pl-4">
              <div className="text-[12px] text-[#ff4f8b]">♥</div>
              <div className="w-32 h-px bg-pink-200" />
            </div>

            <p className="text-[#4a5568]/80 text-lg max-w-md font-medium leading-relaxed pl-4">
              From local features to national recognition, our journey is making waves.
            </p>
          </div>
          
          {/* Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={prev}
              disabled={scrollIdx === 0}
              className="w-12 h-12 rounded-full border border-pink-100 bg-white flex items-center justify-center text-[#ff4f8b] hover:bg-pink-50 shadow-sm disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={next}
              disabled={scrollIdx >= maxIdx}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-[#ff4f8b] to-[#ff758c] flex items-center justify-center text-white shadow-md shadow-[#ff4f8b]/30 hover:shadow-lg hover:shadow-[#ff4f8b]/40 hover:-translate-y-0.5 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Desktop: sliding cards */}
        <div className="hidden md:block overflow-hidden pb-10">
          <div
            className="flex gap-6 transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${scrollIdx * (100 / visibleCount)}%)` }}
          >
            {items.map((item) => {
              const theme = THEMES[item.theme || 'pink'];
              return (
                <a
                  key={item._id}
                  href={item.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 group"
                  style={{ width: `calc((100% - 3rem) / 3)` }}
                >
                  <div className={`bg-white border border-[#F0E6F6] rounded-3xl overflow-hidden h-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 group-hover:-translate-y-2 ${theme.shadow}`}>
                    {/* Thumbnail */}
                    <div className="relative h-60 overflow-hidden bg-[#FAFAFA]">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#2D3436]/15">
                          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                        </div>
                      )}
                      {/* Floating Badge */}
                      <div className={`absolute top-4 left-4 w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-md text-xl filter drop-shadow-sm ${theme.text}`}>
                        {item.icon}
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-8 flex flex-col items-start min-h-[280px]">
                      
                      {item.subtitle && (
                        <p className="text-[13px] text-gray-500 mb-4 italic font-medium border-l-2 border-gray-200 pl-2">{item.subtitle.replace('|', '').trim()}</p>
                      )}
                      
                      {item.desc && (
                        <p className="text-[14px] text-gray-600 mb-6 leading-relaxed">{item.desc}</p>
                      )}

                      <span className={`inline-block text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border mb-4 mt-auto ${theme.badge}`}>
                        {item.source}
                      </span>
                      
                      <h3 className="font-serif font-bold text-[#1a202c] text-xl leading-snug mb-6">{item.title}</h3>
                      
                      {item.hasDivider && (
                        <div className="flex items-center justify-center gap-4 w-full mb-6">
                          <div className="flex-1 h-px bg-gray-100" />
                          <div className={`text-[10px] ${theme.text}`}>♥</div>
                          <div className="flex-1 h-px bg-gray-100" />
                        </div>
                      )}

                      <div className={`flex items-center gap-2 text-[15px] font-bold ${theme.text} group-hover:opacity-80 transition-opacity mt-auto`}>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        <span>Read article</span>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden overflow-x-auto pb-8 -mx-4 px-4 flex gap-4 snap-x snap-mandatory scrollbar-hide">
          {items.map((item) => {
             const theme = THEMES[item.theme || 'pink'];
             return (
              <a
                key={item._id}
                href={item.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[85vw] max-w-[320px] snap-start group"
              >
                <div className={`bg-white border border-[#F0E6F6] rounded-3xl overflow-hidden h-full shadow-[0_8px_30px_rgb(0,0,0,0.04)]`}>
                  <div className="relative h-48 overflow-hidden bg-[#FAFAFA]">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#2D3436]/15">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                      </div>
                    )}
                    <div className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md text-lg filter drop-shadow-sm ${theme.text}`}>
                      {item.icon}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col items-start min-h-[220px]">
                    <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border mb-4 mt-auto ${theme.badge}`}>
                      {item.source}
                    </span>
                    <h3 className="font-serif font-bold text-[#1a202c] text-lg leading-snug mb-6">{item.title}</h3>
                    <div className={`flex items-center gap-2 text-sm font-bold ${theme.text} mt-auto`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      <span>Read article</span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="mt-8 text-center">
          <button className="inline-flex items-center justify-center gap-2 h-14 px-10 rounded-full border border-pink-200 bg-white shadow-[0_4px_20px_rgb(255,79,139,0.08)] hover:shadow-[0_8px_30px_rgb(255,79,139,0.15)] hover:-translate-y-0.5 transition-all text-[#ff4f8b] font-bold text-[15px]">
            <span>✨</span> View all media coverage
          </button>
        </div>
      </div>
    </section>
  );
}
