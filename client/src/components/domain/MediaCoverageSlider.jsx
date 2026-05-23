import { useState } from 'react';
import { useMediaCoverage } from '../../hooks/useMediaCoverage';

const DEFAULT_ITEMS = [
  {
    _id: 'mc1',
    title: 'Opt for Diyas — Angels of Mumbai',
    source: 'Free Press Journal',
    url: 'https://www.freepressjournal.in/mumbai/angels-of-mumbai-a-diwali-invitation-to-support-the-journey-of-our-angels',
    image: 'https://www.empowerstop.com/web/image/1190-24a8b9dd/Angels%20of%20Mumbai.jpg',
  },
  {
    _id: 'mc2',
    title: 'Art for Cause — Mumbai Diary',
    source: 'Mid Day',
    url: 'https://www.mid-day.com/mumbai/mumbai-news/article/mumbai-diary-friday-dossier-23409148',
    image: 'https://www.empowerstop.com/web/image/1255-59abc55b/Midday%20EmpowerStop.webp',
  },
  {
    _id: 'mc3',
    title: 'Joyful Creation — Mumbai Diary',
    source: 'Mid Day',
    url: 'https://www.mid-day.com/mumbai/mumbai-news/article/mumbai-diary-wednesday-dossier-23428099',
    image: 'https://www.empowerstop.com/web/image/1234-20f67857/Chrismas.webp',
  },
  {
    _id: 'mc4',
    title: 'Successful Beach Cleanup Drive',
    source: 'Free Press Journal',
    url: 'https://www.freepressjournal.in/press-release/gully-classes-foundation-and-river-cleanup-collaborate-for-a-successful-beach-cleanup-drive',
    image: 'https://empowerstop.odoo.com/web/image/2592-961fef80/DSC03870.JPG?height=256',
  },
  {
    _id: 'mc5',
    title: 'Special Mention at IIT Bombay',
    source: 'Free Press Journal',
    url: 'https://www.freepressjournal.in/press-release/gully-classes-foundation-kids-receive-special-mention-at-dance-competition-organised-by-nss-unit-of-iit-bombay',
    image: 'https://empowerstop.odoo.com/web/image/2595-2043f05f/1707659043463.jpeg?height=256',
  },
];

const SOURCE_BADGE = {
  'Free Press Journal': 'bg-[#FF6B9D]/10 text-[#FF6B9D] border-[#FF6B9D]/20',
  'Mid Day': 'bg-[#6BCB77]/10 text-[#6BCB77] border-[#6BCB77]/20',
};

export default function MediaCoverageSlider() {
  const { data } = useMediaCoverage();
  const dbItems = data?.data || [];
  const items = dbItems.length > 0 ? dbItems : DEFAULT_ITEMS;
  const [scrollIdx, setScrollIdx] = useState(0);

  const visibleCount = 3;
  const maxIdx = Math.max(0, items.length - visibleCount);

  const prev = () => setScrollIdx((p) => Math.max(0, p - 1));
  const next = () => setScrollIdx((p) => Math.min(maxIdx, p + 1));

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-display gradient-text-pink-yellow mb-2 inline-block">Media Coverage</h2>
            <p className="text-[#2D3436]/40 text-sm max-w-md">From local features to national recognition, our journey is making waves.</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={prev}
              disabled={scrollIdx === 0}
              className="w-10 h-10 rounded-full border border-[#F0E6F6] flex items-center justify-center text-[#2D3436]/40 hover:bg-[#FF6B9D]/10 hover:text-[#FF6B9D] hover:border-[#FF6B9D]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Previous"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={next}
              disabled={scrollIdx >= maxIdx}
              className="w-10 h-10 rounded-full border border-[#F0E6F6] flex items-center justify-center text-[#2D3436]/40 hover:bg-[#FF6B9D]/10 hover:text-[#FF6B9D] hover:border-[#FF6B9D]/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              aria-label="Next"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Desktop: sliding cards */}
        <div className="hidden md:block overflow-hidden">
          <div
            className="flex gap-5 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${scrollIdx * (100 / visibleCount)}%)` }}
          >
            {items.map((item) => {
              const badge = SOURCE_BADGE[item.source] || 'bg-[#FF6B9D]/10 text-[#FF6B9D] border-[#FF6B9D]/20';
              return (
                <a
                  key={item._id}
                  href={item.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 group"
                  style={{ width: `calc((100% - 2.5rem) / 3)` }}
                >
                  <div className="bg-white border border-[#F0E6F6] rounded-2xl overflow-hidden h-full transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-[#FF6B9D]/10 group-hover:border-[#FF6B9D]/30">
                    {/* Thumbnail */}
                    <div className="h-44 overflow-hidden bg-[#FAFAFA]">
                      {item.image ? (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#2D3436]/15">
                          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                        </div>
                      )}
                    </div>
                    {/* Content */}
                    <div className="p-5">
                      <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border mb-3 ${badge}`}>
                        {item.source}
                      </span>
                      <h3 className="font-semibold text-[#2D3436] text-sm leading-snug mb-3 line-clamp-2 group-hover:text-[#FF6B9D] transition-colors">{item.title}</h3>
                      <div className="flex items-center gap-1.5 text-[#2D3436]/30 text-xs group-hover:text-[#FF6B9D]/60 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
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
        <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 flex gap-4 snap-x snap-mandatory scrollbar-hide">
          {items.map((item) => {
            const badge = SOURCE_BADGE[item.source] || 'bg-[#FF6B9D]/10 text-[#FF6B9D] border-[#FF6B9D]/20';
            return (
              <a
                key={item._id}
                href={item.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-[72vw] max-w-[270px] snap-start"
              >
                <div className="bg-white border border-[#F0E6F6] rounded-2xl overflow-hidden h-full shadow-sm">
                  <div className="h-36 overflow-hidden bg-[#FAFAFA]">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#2D3436]/15">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full border mb-2 ${badge}`}>
                      {item.source}
                    </span>
                    <h3 className="font-semibold text-[#2D3436] text-sm leading-snug line-clamp-2">{item.title}</h3>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
