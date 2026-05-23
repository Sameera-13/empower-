import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHeroSlides } from '../../hooks/useHeroSlides';
import Button from '../common/Button';

export default function HeroCarousel({ fallback }) {
  const { data, isLoading } = useHeroSlides();
  const slides = data?.data || [];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (isLoading) return fallback;
  if (slides.length === 0) return fallback;

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden border-b border-[#F0E6F6]">
      <div className="relative h-[400px] md:h-[500px]">
        {/* Background Image */}
        {slide.image ? (
          <img
            src={slide.image}
            alt={slide.title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          />
        ) : (
          <div className="absolute inset-0 gradient-hero" />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D3436]/70 via-[#2D3436]/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 h-full flex items-center">
          <div className="max-w-lg">
            <h1 className="text-3xl md:text-5xl font-display text-white mb-4 leading-tight">{slide.title}</h1>
            {slide.subtitle && <p className="text-lg text-white/80 mb-6 leading-relaxed">{slide.subtitle}</p>}
            {slide.ctaText && slide.ctaLink && (
              <Link to={slide.ctaLink}>
                <Button className="h-12 px-8 text-base">{slide.ctaText}</Button>
              </Link>
            )}
          </div>
        </div>

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center transition-colors"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button
              onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center transition-colors"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </>
        )}

        {/* Dots */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${idx === current ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/70'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
