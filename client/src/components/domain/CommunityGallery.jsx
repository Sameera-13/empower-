const images = [
  {
    src: 'https://www.empowerstop.com/web/image/3906-a00d891f/Untitled%20design%20%282%29.webp',
    alt: 'Empower Stop community event',
  },
  {
    src: 'https://www.empowerstop.com/web/image/1704-6e9b1b32/Rj%20Stall%208.webp',
    alt: 'RJ College stall showcase',
  },
  {
    src: 'https://www.empowerstop.com/web/image/2168-70101d90/ChatGPT%20Image%20Apr%202%2C%202025%2C%2009_13_45%20AM.webp',
    alt: 'Women artisans at work',
  },
  {
    src: 'https://www.empowerstop.com/web/image/1996-3a4e04be/IMG20241029143159.webp',
    alt: 'Community gathering',
  },
  {
    src: 'https://www.empowerstop.com/web/image/1615-4683471f/Rj%20Stall%202.webp',
    alt: 'RJ College stall',
  },
  {
    src: 'https://www.empowerstop.com/web/image/1699-f640b13b/WhatsApp%20Image%202024-09-29%20at%2023.57.02_3c9cf618.webp',
    alt: 'Empower Stop team',
  },
  {
    src: 'https://www.empowerstop.com/web/image/1702-f6b05544/WhatsApp%20Image%202024-09-29%20at%2000.37.58_c0bdae39.webp',
    alt: 'Women empowerment workshop',
  },
];

// Duplicate for seamless infinite scroll
const allImages = [...images, ...images];

export default function CommunityGallery() {
  return (
    <section className="py-16 border-b border-[#F0E6F6]">
      <div>
        <div className="text-center mb-10 px-4">
          <h2 className="text-2xl md:text-3xl font-display gradient-text-pink-green mb-2 inline-block">
            Our Community in Action
          </h2>
          <p className="text-[#2D3436]/40 text-sm max-w-md mx-auto">
            Real moments from events, workshops, and the women who make it all possible.
          </p>
        </div>

        {/* Desktop: masonry-style grid */}
        <div className="hidden md:block max-w-6xl mx-auto px-4">
          <div className="columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((img, idx) => (
              <div
                key={idx}
                className="break-inside-avoid group rounded-2xl overflow-hidden border border-[#F0E6F6] hover:border-[#FF6B9D]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF6B9D]/10"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D3436]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: horizontal auto-scroll */}
        <div className="md:hidden">
          <div className="gallery-scroll-container">
            <div className="gallery-scroll-track">
              {allImages.map((img, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-64 h-44 rounded-2xl overflow-hidden border border-[#F0E6F6] mx-2"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
