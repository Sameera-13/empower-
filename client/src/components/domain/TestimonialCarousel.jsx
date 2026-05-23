import { useState } from 'react';

const VIDEOS = [
  { id: '_4dTJ9R5zmw', title: 'Voices of Impact' },
  { id: 'aSQW0-aoPWQ', title: 'Stories That Inspire' },
];

function VideoCard({ videoId, title }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="rounded-2xl overflow-hidden border border-[#F0E6F6] hover:border-[#FF6B9D]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF6B9D]/10 bg-white">
      <div className="relative aspect-video bg-black">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <button onClick={() => setPlaying(true)} className="absolute inset-0 w-full h-full group cursor-pointer">
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#FF6B9D] flex items-center justify-center shadow-lg shadow-[#FF6B9D]/30 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}

export default function TestimonialCarousel() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-display gradient-text-pink-yellow mb-3 inline-block">Testimonials</h2>
          <p className="text-[#2D3436]/40 max-w-lg mx-auto text-sm">
            From heartfelt words to powerful stories, their voices reflect our impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {VIDEOS.map((v) => (
            <VideoCard key={v.id} videoId={v.id} title={v.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
