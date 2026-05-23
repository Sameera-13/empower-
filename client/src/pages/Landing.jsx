import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';
import StatsStrip from '../components/domain/StatsStrip';
import TestimonialCarousel from '../components/domain/TestimonialCarousel';
import FeaturedProducts from '../components/domain/FeaturedProducts';
import MediaCoverageSlider from '../components/domain/MediaCoverageSlider';
import PartnerCarousel from '../components/domain/PartnerCarousel';
import { useSubscribeNewsletter } from '../hooks/useNewsletter';

/* ── Hero images (auto-rotate) ── */
const heroImages = [
  'https://www.empowerstop.com/web/image/3906-a00d891f/Untitled%20design%20%282%29.webp',
  'https://www.empowerstop.com/web/image/1704-6e9b1b32/Rj%20Stall%208.webp',
  'https://www.empowerstop.com/web/image/2168-70101d90/ChatGPT%20Image%20Apr%202%2C%202025%2C%2009_13_45%20AM.webp',
  'https://www.empowerstop.com/web/image/1996-3a4e04be/IMG20241029143159.webp',
  'https://www.empowerstop.com/web/image/1615-4683471f/Rj%20Stall%202.webp',
  'https://www.empowerstop.com/web/image/1699-f640b13b/WhatsApp%20Image%202024-09-29%20at%2023.57.02_3c9cf618.webp',
  'https://www.empowerstop.com/web/image/1702-f6b05544/WhatsApp%20Image%202024-09-29%20at%2000.37.58_c0bdae39.webp',
];

/* ── Mission pillars ── */
const pillars = [
  { icon: '🤲', title: 'Handmade with Love', desc: 'Every product is crafted by skilled women artisans preserving traditional art forms.', color: 'bg-[#FF6B9D]' },
  { icon: '🎨', title: 'Art That Empowers', desc: 'Each purchase funds education, safety programs, and livelihood training.', color: 'bg-[#6BCB77]' },
  { icon: '🌿', title: 'Style with Purpose', desc: 'Sustainable, eco-friendly products that look beautiful and do good.', color: 'bg-[#FFD93D]' },
];

/* ── Programs ── */
const programs = [
  { title: 'Premium Services', desc: 'Beauty services, professional mehndi art, and website designing classes.', link: '/services', emoji: '💅', bg: 'bg-[#FF6B9D]/5', border: 'hover:border-[#FF6B9D]', text: 'text-[#FF6B9D]' },
  { title: 'About Us', desc: 'Learn more about our mission, our journey, and the impact we create.', link: '/about', emoji: '🤝', bg: 'bg-[#6BCB77]/5', border: 'hover:border-[#6BCB77]', text: 'text-[#6BCB77]' },
  { title: 'Artisan Shop', desc: 'Handcrafted products made by skilled women artisans to support their livelihood.', link: '/shop', emoji: '🛍️', bg: 'bg-[#FFD93D]/5', border: 'hover:border-[#FFD93D]', text: 'text-[#E8A817]' },
  { title: 'Inspiring Blog', desc: 'Explore stories of change, updates, and events about women\'s empowerment.', link: '/blog', emoji: '📝', bg: 'bg-[#A78BFA]/5', border: 'hover:border-[#A78BFA]', text: 'text-[#7C3AED]' },
];

function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % heroImages.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-6 px-4">
      <div className="max-w-5xl mx-auto relative h-[300px] md:h-[380px] rounded-[2rem] overflow-hidden ring-[6px] ring-[#2D3436]/10 shadow-[0_20px_60px_rgba(0,0,0,0.15),inset_0_2px_20px_rgba(0,0,0,0.1)]">
        {/* Background images with crossfade */}
        {heroImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D3436]/80 via-[#2D3436]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D3436]/50 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 h-full flex items-center">
          <div className="max-w-lg">
            <span className="inline-block text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-[#FFD93D] mb-4 bg-[#FFD93D]/15 px-3 py-1 rounded-full border border-[#FFD93D]/30 backdrop-blur-sm">
              Empower Stop
            </span>
            <h1 className="font-display text-2xl md:text-4xl lg:text-5xl text-white leading-[1.15] mb-3">
              Crafted with Purpose,
              <br />
              <span className="text-[#FFD93D]">Empowered</span> by Art
            </h1>
            <p className="text-sm md:text-base text-white/70 mb-6 leading-relaxed max-w-sm">
              Supporting women artisans through handcrafted products, community, and opportunities.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/shop">
                <Button className="h-10 md:h-11 px-6 text-sm font-semibold">Shop Collection</Button>
              </Link>
              <Link to="/about">
                <button className="h-10 md:h-11 px-6 text-sm font-semibold rounded-full border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all">
                  Our Story →
                </button>
              </Link>
            </div>
          </div>
        </div>



        {/* Arrows */}
        <button onClick={() => setCurrent((p) => (p - 1 + heroImages.length) % heroImages.length)} className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-all" aria-label="Previous">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={() => setCurrent((p) => (p + 1) % heroImages.length)} className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-all" aria-label="Next">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-14">
          <span className="text-4xl mb-4 block">🪔</span>
          <h2 className="font-display text-2xl md:text-4xl text-[#2D3436] mb-3 leading-tight">
            &ldquo;Crafted with Purpose,
            <br />
            <span className="gradient-text-pink-green">Empowered by Art</span>&rdquo;
          </h2>
          <p className="text-[#2D3436]/40 max-w-lg mx-auto text-sm">
            Every product tells a story. Every purchase creates impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div key={p.title} className="group text-center">
              <div className={`w-16 h-16 rounded-2xl ${p.color} mx-auto mb-5 flex items-center justify-center text-2xl`}>
                {p.icon}
              </div>
              <h3 className="font-semibold text-[#2D3436] text-lg mb-2">{p.title}</h3>
              <p className="text-sm text-[#2D3436]/50 leading-relaxed max-w-xs mx-auto">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramsSection() {
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-2xl md:text-3xl font-display gradient-text-pink-yellow mb-3 inline-block">How We Can Help</h2>
          <p className="text-[#2D3436]/40 max-w-md mx-auto text-sm">From professional skill development to safety support — built for what women actually need.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {programs.map((p) => (
            <Link key={p.title} to={p.link} className="group block">
              <div className={`${p.bg} border border-[#F0E6F6] ${p.border} rounded-3xl p-6 h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg`}>
                <span className="text-3xl mb-4 block">{p.emoji}</span>
                <h3 className="font-semibold text-[#2D3436] text-base mb-2">{p.title}</h3>
                <p className="text-xs text-[#2D3436]/50 leading-relaxed mb-3">{p.desc}</p>
                <span className={`text-xs font-semibold ${p.text} group-hover:underline`}>Learn more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="relative overflow-hidden">
      <div className="gradient-btn-pink py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-display text-2xl md:text-4xl text-white mb-4 leading-tight">
            Buy with Purpose,<br />Empower with Love
          </h2>
          <p className="text-white/70 mb-8 max-w-lg mx-auto text-sm">
            Every purchase directly supports women artisans, funds community programs, and creates opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/shop">
              <button className="h-12 px-8 rounded-full bg-white text-[#FF6B9D] font-semibold text-base hover:bg-white/90 hover:shadow-xl transition-all">
                Shop Now
              </button>
            </Link>
            <Link to="/services">
              <button className="h-12 px-8 rounded-full border-2 border-white/40 text-white font-semibold text-base hover:bg-white/10 transition-all">
                Our Services
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Landing() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const subscribeMutation = useSubscribeNewsletter();

  const handleNewsletter = (e) => {
    e.preventDefault();
    subscribeMutation.mutate(email, {
      onSuccess: () => {
        setEmail('');
        setSubscribed(true);
        setTimeout(() => setSubscribed(false), 3000);
      },
    });
  };

  return (
    <PageContainer>
      {/* 1. Hero image carousel */}
      <HeroSection />

      {/* 2. Stats */}
      <StatsStrip />

      {/* 3. Mission / Purpose */}
      <MissionSection />

      {/* 4. Programs */}
      <ProgramsSection />

      {/* 6. Featured Products (from shop) */}
      <FeaturedProducts />

      {/* 7. CTA Banner */}
      <CTABanner />

      {/* 8. Media Coverage */}
      <MediaCoverageSlider />

      {/* 9. Testimonials */}
      <TestimonialCarousel />

      {/* 10. Partners */}
      <PartnerCarousel />

      {/* 11. Newsletter */}
      <section className="border-t border-[#F0E6F6] py-16">
        <div className="max-w-lg mx-auto px-4 text-center">
          <h2 className="text-2xl font-display gradient-text-green-yellow mb-2 inline-block">Stay in the loop</h2>
          <p className="text-[#2D3436]/40 text-sm mb-6">
            New services, articles, and safety updates — straight to your inbox.
          </p>
          {subscribed ? (
            <p className="text-sm text-[#6BCB77] font-medium py-3">Thanks for subscribing!</p>
          ) : (
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 h-11 px-4 rounded-full text-sm bg-white border border-[#F0E6F6] text-[#2D3436] placeholder:text-[#2D3436]/30 outline-none focus:border-[#FF6B9D] focus:ring-2 focus:ring-[#FF6B9D]/20 transition-all"
              />
              <Button type="submit" className="h-11 shrink-0 rounded-full">Subscribe</Button>
            </form>
          )}
        </div>
      </section>
    </PageContainer>
  );
}
