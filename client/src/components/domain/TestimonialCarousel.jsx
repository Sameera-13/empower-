import { useState } from 'react';

const VIDEOS = [
  { 
    id: '_4dTJ9R5zmw', 
    title: 'Beneficiary Story', 
    desc: 'How Gully Classes changed my life.' 
  },
  { 
    id: 'aSQW0-aoPWQ', 
    title: 'Volunteer Story', 
    desc: 'Why I chose to be part of this journey.' 
  },
];

function VideoCard({ videoId, title, desc }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="bg-white rounded-[2.5rem] p-3 border border-pink-100 shadow-[0_10px_40px_rgb(255,79,139,0.08)] hover:shadow-[0_15px_50px_rgb(255,79,139,0.15)] transition-all duration-300 group">
      <div className="relative rounded-[2rem] overflow-hidden bg-black aspect-[16/9]">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button onClick={() => setPlaying(true)} className="absolute inset-0 w-full h-full cursor-pointer overflow-hidden">
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              onError={(e) => { e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; }}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#ff4f8b] flex items-center justify-center shadow-[0_8px_30px_rgb(255,79,139,0.4)] border-[4px] border-white/90 group-hover:scale-110 transition-transform duration-300 z-10">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            
            {/* Leaf Illustration Overlay */}
            <div className="absolute bottom-0 left-0 w-32 h-32 opacity-80 pointer-events-none translate-y-2 -translate-x-4">
               <svg viewBox="0 0 100 100" className="w-full h-full stroke-white fill-none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20,100 C20,60 50,40 90,20" />
                  <path d="M40,75 C60,70 70,80 65,95 C60,80 40,80 40,75 Z" />
                  <path d="M60,45 C80,40 90,50 85,65 C80,50 60,50 60,45 Z" />
                  <path d="M30,55 C45,50 55,60 50,75 C45,60 30,60 30,55 Z" />
               </svg>
            </div>
          </button>
        )}
      </div>

      <div className="p-6 md:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 md:gap-6">
          {/* Quote Icon */}
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-pink-50 flex items-center justify-center text-[#ff4f8b] text-2xl font-serif font-bold shadow-sm border border-white flex-shrink-0">
            &ldquo;
          </div>
          <div>
            <h3 className="font-bold text-[#1a202c] text-lg md:text-xl mb-1">{title}</h3>
            <p className="text-gray-500 text-sm md:text-[15px]">{desc}</p>
          </div>
        </div>
        
        <button onClick={() => setPlaying(true)} className="text-[#ff4f8b] font-bold text-sm md:text-[15px] flex items-center gap-2 group-hover:opacity-80 transition-opacity whitespace-nowrap self-start sm:self-center">
          Watch Story <span className="text-xl leading-none">&rarr;</span>
        </button>
      </div>
    </div>
  );
}

export default function TestimonialCarousel() {
  return (
    <section className="py-24 relative bg-[#FFFDF7] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-pink-100/50 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-50/50 rounded-full blur-[120px] translate-x-1/2 translate-y-1/4 pointer-events-none" />
      
      {/* Floral Watermark Left */}
      <div className="absolute top-32 left-0 w-64 h-64 opacity-40 pointer-events-none hidden md:block -translate-x-1/4">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#ff4f8b]/30 fill-none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0,100 C20,70 50,50 100,30" />
          <path d="M30,80 C50,70 60,85 50,100 C40,85 20,85 30,80 Z" />
          <path d="M60,55 C80,45 90,60 80,75 C70,60 50,60 60,55 Z" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 relative">
          
          <div className="inline-flex items-center justify-center gap-2 mb-4 relative">
             <span className="absolute -left-6 top-0 text-pink-300 text-lg animate-pulse">✨</span>
             <div className="text-[#ff4f8b] font-serif text-3xl font-bold flex items-center justify-center gap-3">
                <div className="w-6 h-px bg-[#ff4f8b]/40" />
                <span className="text-4xl leading-none mt-2">&ldquo;</span>
                <div className="w-6 h-px bg-[#ff4f8b]/40" />
             </div>
             <span className="absolute -right-6 top-2 text-pink-300 text-xl animate-pulse">✨</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-serif font-bold text-[#ff4f8b] mb-6 tracking-tight">
            Testimonials
          </h2>
          
          <p className="text-[#4a5568]/80 text-lg md:text-xl max-w-xl mx-auto font-medium mb-8">
            From heartfelt words to powerful stories, their voices reflect our impact.
          </p>

          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-[#ff4f8b]/20" />
            <div className="text-[12px] text-[#ff4f8b]">♥</div>
            <div className="w-16 h-px bg-[#ff4f8b]/20" />
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-20">
          {VIDEOS.map((v) => (
            <VideoCard key={v.id} videoId={v.id} title={v.title} desc={v.desc} />
          ))}
        </div>

        {/* Features Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-pink-100/50 pt-10 border-t border-pink-100/50">
          
          <div className="flex items-center sm:justify-center gap-4 pt-4 sm:pt-0 pl-4 sm:pl-0">
            <div className="w-14 h-14 rounded-full bg-pink-50 flex items-center justify-center text-[#ff4f8b] shadow-inner border border-white flex-shrink-0">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </div>
            <div className="text-left">
              <h4 className="font-bold text-[#ff4f8b] mb-1">Real Stories</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Voices of women,<br/>volunteers & partners.</p>
            </div>
          </div>

          <div className="flex items-center sm:justify-center gap-4 pt-4 sm:pt-0 lg:pl-8">
            <div className="w-14 h-14 rounded-full bg-pink-50 flex items-center justify-center text-[#ff4f8b] shadow-inner border border-white flex-shrink-0">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <div className="text-left">
              <h4 className="font-bold text-[#ff4f8b] mb-1">Real Impact</h4>
              <p className="text-xs text-gray-500 leading-relaxed">See how lives are<br/>being transformed.</p>
            </div>
          </div>

          <div className="flex items-center sm:justify-center gap-4 pt-4 sm:pt-0 lg:pl-8">
            <div className="w-14 h-14 rounded-full bg-pink-50 flex items-center justify-center text-[#ff4f8b] shadow-inner border border-white flex-shrink-0">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
            </div>
            <div className="text-left">
              <h4 className="font-bold text-[#ff4f8b] mb-1">Real Inspiration</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Stories that inspire<br/>change every day.</p>
            </div>
          </div>

          <div className="flex items-center sm:justify-center gap-4 pt-4 sm:pt-0 lg:pl-8">
            <div className="w-14 h-14 rounded-full bg-pink-50 flex items-center justify-center text-[#ff4f8b] shadow-inner border border-white flex-shrink-0">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div className="text-left">
              <h4 className="font-bold text-[#ff4f8b] mb-1">Real Connection</h4>
              <p className="text-xs text-gray-500 leading-relaxed">Building a community<br/>that empowers.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
