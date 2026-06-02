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
      <div className="max-w-7xl mx-auto relative min-h-[400px] md:min-h-[500px] flex rounded-[2rem] overflow-hidden ring-[6px] ring-[#2D3436]/10 shadow-[0_20px_60px_rgba(0,0,0,0.15),inset_0_2px_20px_rgba(0,0,0,0.1)]">
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
        <div className="relative z-10 max-w-7xl mx-auto px-10 md:px-16 py-12 flex-1 flex items-center">
          <div className="max-w-lg">
            <span className="inline-block text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-[#FFD93D] mb-4 bg-[#FFD93D]/15 px-3 py-1 rounded-full border border-[#FFD93D]/30 backdrop-blur-sm">
              Empower Stop
            </span>
            <h1 className="font-display text-4xl md:text-6xl text-white leading-[1.15] mb-4">
              Crafted with Purpose,
              <br />
              <span className="text-[#FFD93D]">Empowered</span> by Art
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-6 leading-relaxed max-w-sm md:max-w-md">
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
        <button onClick={() => setCurrent((p) => (p - 1 + heroImages.length) % heroImages.length)} className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-all" aria-label="Previous">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={() => setCurrent((p) => (p + 1) % heroImages.length)} className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center transition-all" aria-label="Next">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="py-24 relative bg-gradient-to-b from-[#FFFDF7] to-white overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FFD93D]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-4xl mb-4 block animate-bounce-slow">🪔</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#2D3436] mb-4 leading-tight">
            &ldquo;Crafted with Purpose,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4f8b] to-[#6BCB77]">Empowered by Art</span>&rdquo;
          </h2>
          <p className="text-[#2D3436]/50 max-w-lg mx-auto text-base">
            Every product tells a story. Every purchase creates impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p) => (
            <div key={p.title} className="group text-center bg-white/60 backdrop-blur-md border border-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(255,107,157,0.1)] transition-all duration-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <div className={`w-20 h-20 rounded-3xl ${p.color} mx-auto mb-6 flex items-center justify-center text-3xl shadow-lg relative z-10 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                {p.icon}
              </div>
              <h3 className="font-bold text-[#2D3436] text-xl mb-3 relative z-10">{p.title}</h3>
              <p className="text-sm text-[#2D3436]/60 leading-relaxed max-w-xs mx-auto relative z-10">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramsSection() {
  return (
    <section className="py-24 relative bg-white overflow-hidden">
      <div className="absolute top-40 left-10 w-72 h-72 bg-[#6BCB77]/5 rounded-full blur-3xl -z-0" />
      <div className="absolute bottom-10 right-20 w-80 h-80 bg-[#FF6B9D]/5 rounded-full blur-3xl -z-0" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff4f8b] to-[#FFD93D] mb-4 inline-block">How We Can Help</h2>
          <p className="text-[#2D3436]/50 max-w-md mx-auto text-base">From professional skill development to safety support — built for what women actually need.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {programs.map((p) => (
            <Link key={p.title} to={p.link} className="group block relative h-full">
              <div className={`absolute inset-0 bg-white border border-[#F0E6F6] ${p.border} rounded-3xl transition-all duration-300 group-hover:shadow-[0_20px_40px_rgb(0,0,0,0.06)] group-hover:-translate-y-1.5`} />
              <div className={`absolute inset-0 ${p.bg} rounded-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative p-8 flex flex-col h-full transition-transform duration-300 group-hover:-translate-y-1.5">
                <span className="text-4xl mb-6 block transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 origin-left">{p.emoji}</span>
                <h3 className="font-bold text-[#2D3436] text-lg mb-3">{p.title}</h3>
                <p className="text-sm text-[#2D3436]/60 leading-relaxed mb-6 flex-1">{p.desc}</p>
                <span className={`text-sm font-bold ${p.text} group-hover:translate-x-1 transition-transform inline-flex items-center gap-1`}>Learn more <span className="text-lg leading-none">&rarr;</span></span>
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
      <div className="bg-gradient-to-br from-[#ff4f8b] via-[#E8457A] to-[#FF8E71] py-20 md:py-28 relative">
        {/* Subtle overlay pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-sm">
            Buy with Purpose,<br />Empower with Love
          </h2>
          <p className="text-white/80 mb-10 text-lg max-w-xl mx-auto leading-relaxed">
            Every purchase directly supports women artisans, funds community programs, and creates opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop">
              <button className="h-14 px-10 rounded-full bg-white text-[#ff4f8b] font-bold text-lg hover:scale-105 hover:shadow-xl hover:shadow-[#ff4f8b]/30 active:scale-95 transition-all duration-300">
                Shop Now
              </button>
            </Link>
            <Link to="/services">
              <button className="h-14 px-10 rounded-full border-2 border-white/60 text-white font-bold text-lg hover:bg-white/10 hover:border-white active:scale-95 transition-all duration-300">
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
      <section className="py-24 relative bg-white">
        <div className="max-w-3xl mx-auto px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF7] to-white rounded-[3rem] border border-[#F0E6F6]/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] -z-10" />
          <div className="text-center py-16 px-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-[#2D3436] mb-4">Stay in the loop</h2>
            <p className="text-[#2D3436]/60 text-lg mb-10 max-w-md mx-auto leading-relaxed">
              New services, articles, and safety updates — straight to your inbox.
            </p>
            {subscribed ? (
              <div className="bg-[#6BCB77]/10 text-[#6BCB77] font-semibold py-4 px-6 rounded-full inline-block animate-fade-in">
                🎉 Thanks for subscribing!
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="flex-1 h-14 px-6 rounded-full text-base bg-white border border-[#F0E6F6] text-[#2D3436] placeholder:text-[#2D3436]/30 outline-none focus:border-[#ff4f8b] focus:ring-4 focus:ring-[#ff4f8b]/10 transition-all shadow-sm"
                />
                <Button type="submit" className="h-14 px-10 rounded-full text-base font-bold shadow-lg shadow-[#ff4f8b]/20 hover:shadow-xl hover:shadow-[#ff4f8b]/30">Subscribe</Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
