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
import workshopGirlsImg from '../assets/workshop-girls.jpg';
import crochetEarringsImg from '../assets/crochet-earrings.jpg';
import daisyKeychainImg from '../assets/daisy-keychain.jpg';
import pinkFlowerPinImg from '../assets/pink-flower-pin.jpg';
import cherryKeychainImg from '../assets/cherry-keychain.jpg';
import giantSunflowerImg from '../assets/giant-sunflower.jpg';


/* ── Hero images (auto-rotate) ── */
const heroImages = [
  workshopGirlsImg,
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
  {
    icon: '🤲',
    title: 'Handmade with Love',
    desc: 'Every product is crafted by skilled women artisans preserving traditional art forms.',
    iconBg: 'bg-[#FF6B9D]',
    textColor: 'text-[#FF6B9D]',
    waveSvg: <svg viewBox="0 0 1440 320" className="absolute bottom-0 left-0 w-full h-auto" preserveAspectRatio="none"><path fill="#FF6B9D" fillOpacity="0.15" d="M0,224L80,234.7C160,245,320,267,480,250.7C640,235,800,181,960,170.7C1120,160,1280,192,1360,208L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path><path fill="#FF6B9D" fillOpacity="0.3" d="M0,160L80,181.3C160,203,320,245,480,245.3C640,245,800,203,960,186.7C1120,171,1280,181,1360,186.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
  },
  {
    icon: '🎨',
    title: 'Art That Empowers',
    desc: 'Each purchase funds education, safety programs, and livelihood training.',
    iconBg: 'bg-[#6BCB77]',
    textColor: 'text-[#6BCB77]',
    waveSvg: <svg viewBox="0 0 1440 320" className="absolute bottom-0 left-0 w-full h-auto" preserveAspectRatio="none"><path fill="#6BCB77" fillOpacity="0.15" d="M0,192L80,181.3C160,171,320,149,480,154.7C640,160,800,192,960,202.7C1120,213,1280,203,1360,197.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path><path fill="#6BCB77" fillOpacity="0.3" d="M0,96L80,122.7C160,149,320,203,480,208C640,213,800,171,960,160C1120,149,1280,171,1360,181.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
  },
  {
    icon: '🌿',
    title: 'Style with Purpose',
    desc: 'Sustainable, eco-friendly products that look beautiful and do good.',
    iconBg: 'bg-[#FFD93D]',
    textColor: 'text-[#E8A817]',
    waveSvg: <svg viewBox="0 0 1440 320" className="absolute bottom-0 left-0 w-full h-auto" preserveAspectRatio="none"><path fill="#FFD93D" fillOpacity="0.15" d="M0,128L80,149.3C160,171,320,213,480,213.3C640,213,800,171,960,160C1120,149,1280,171,1360,181.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path><path fill="#FFD93D" fillOpacity="0.3" d="M0,256L80,245.3C160,235,320,213,480,208C640,203,800,213,960,224C1120,235,1280,245,1360,250.7L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
  },
];

/* ── Programs ── */
const programs = [
  {
    title: 'Premium Services',
    desc: 'Beauty services, professional mehndi art, and website designing classes.',
    link: '/services',
    emoji: '💄',
    textColor: 'text-[#ff4f8b]',
    iconBg: 'bg-gradient-to-br from-pink-100 to-pink-50',
    waveSvg: <svg viewBox="0 0 1440 320" className="absolute bottom-0 left-0 w-full h-auto" preserveAspectRatio="none"><path fill="#ff4f8b" fillOpacity="0.15" d="M0,224L80,234.7C160,245,320,267,480,250.7C640,235,800,181,960,170.7C1120,160,1280,192,1360,208L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path><path fill="#ff4f8b" fillOpacity="0.25" d="M0,160L80,181.3C160,203,320,245,480,245.3C640,245,800,203,960,186.7C1120,171,1280,181,1360,186.7L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
  },
  {
    title: 'About Us',
    desc: 'Learn more about our mission, our journey, and the impact we create.',
    link: '/about',
    emoji: '🤝',
    textColor: 'text-[#6BCB77]',
    iconBg: 'bg-gradient-to-br from-green-100 to-green-50',
    waveSvg: <svg viewBox="0 0 1440 320" className="absolute bottom-0 left-0 w-full h-auto" preserveAspectRatio="none"><path fill="#6BCB77" fillOpacity="0.15" d="M0,192L80,181.3C160,171,320,149,480,154.7C640,160,800,192,960,202.7C1120,213,1280,203,1360,197.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path><path fill="#6BCB77" fillOpacity="0.25" d="M0,96L80,122.7C160,149,320,203,480,208C640,213,800,171,960,160C1120,149,1280,171,1360,181.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
  },
  {
    title: 'Artisan Shop',
    desc: 'Handcrafted products made by skilled women artisans to support their livelihood.',
    link: '/shop',
    emoji: '🛍️',
    textColor: 'text-[#FF9F43]',
    iconBg: 'bg-gradient-to-br from-orange-100 to-orange-50',
    waveSvg: <svg viewBox="0 0 1440 320" className="absolute bottom-0 left-0 w-full h-auto" preserveAspectRatio="none"><path fill="#FF9F43" fillOpacity="0.15" d="M0,128L80,149.3C160,171,320,213,480,213.3C640,213,800,171,960,160C1120,149,1280,171,1360,181.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path><path fill="#FF9F43" fillOpacity="0.25" d="M0,256L80,245.3C160,235,320,213,480,208C640,203,800,213,960,224C1120,235,1280,245,1360,250.7L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
  },
  {
    title: 'Inspiring Blog',
    desc: 'Explore stories of change, updates, and events about women\'s empowerment.',
    link: '/blog',
    emoji: '📝',
    textColor: 'text-[#9370DB]',
    iconBg: 'bg-gradient-to-br from-purple-100 to-purple-50',
    waveSvg: <svg viewBox="0 0 1440 320" className="absolute bottom-0 left-0 w-full h-auto" preserveAspectRatio="none"><path fill="#9370DB" fillOpacity="0.15" d="M0,224L80,213.3C160,203,320,181,480,181.3C640,181,800,203,960,208C1120,213,1280,203,1360,197.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path><path fill="#9370DB" fillOpacity="0.25" d="M0,160L80,149.3C160,139,320,117,480,122.7C640,128,800,160,960,181.3C1120,203,1280,213,1360,218.7L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
  },
];

function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % heroImages.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-4 px-4 max-w-[1400px] mx-auto">
      <div className="relative min-h-[460px] bg-white rounded-[2.5rem] shadow-[0_12px_40px_rgb(255,79,139,0.12)] border border-pink-50 overflow-hidden flex flex-col md:flex-row">
        
        {/* Right Side: Image Slider */}
        <div className="absolute right-0 top-0 w-full md:w-[60%] h-full z-0">
          {heroImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>

        {/* Left Side: Content Overlay with Curved Edge */}
        <div className="relative z-10 w-full md:w-[55%] flex bg-white/95 md:bg-transparent">
          {/* The white background with SVG curve on desktop */}
          <div className="absolute inset-0 bg-white md:bg-gradient-to-br from-white to-pink-50/40"></div>
          <svg className="hidden md:block absolute top-0 -right-[148px] h-full w-[150px] text-pink-50/40 fill-current drop-shadow-[5px_0_15px_rgba(255,79,139,0.1)] z-0" viewBox="0 0 100 800" preserveAspectRatio="none">
            <path d="M0,0 C100,200 -50,600 100,800 L0,800 Z" />
          </svg>
          <div className="hidden md:block absolute top-0 -right-[148px] h-full w-[150px] z-10 pointer-events-none">
             <span className="absolute top-1/4 left-1/3 text-pink-300 text-3xl animate-pulse filter drop-shadow-sm">✨</span>
             <span className="absolute bottom-1/3 left-1/2 text-pink-400 text-2xl animate-pulse filter drop-shadow-sm">✨</span>
          </div>

          <div className="relative z-20 flex-1 flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12 overflow-hidden">
            {/* Subtle floral/leaf decorations */}
            <div className="absolute bottom-0 left-0 w-48 h-48 opacity-20 pointer-events-none -translate-x-1/4 translate-y-1/4">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-pink-400">
                 <path d="M50,100 C30,80 10,60 10,40 C10,20 30,10 50,20 C70,10 90,20 90,40 C90,60 70,80 50,100 Z" />
                 <path d="M0,100 C20,90 40,70 30,40 C40,60 70,60 80,40 C70,70 60,90 100,100 Z" />
              </svg>
            </div>
            
            <span className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.15em] uppercase text-[#ff4f8b] mb-4 px-4 py-1.5 rounded-full border border-pink-200 bg-pink-50/50 w-max shadow-sm">
              <span className="text-[12px]">♥</span> EMPOWER STOP
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[52px] font-bold text-[#1a202c] leading-[1.1] mb-5 tracking-tight">
              Crafted with Purpose,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4f8b] via-[#ff758c] to-[#FFA07A] pr-2">Empowered by Art</span>
            </h1>
            
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-px bg-pink-200" />
              <div className="text-[12px] text-[#ff4f8b]">♥</div>
              <div className="w-12 h-px bg-pink-200" />
            </div>

            <p className="text-base text-gray-500 mb-8 leading-relaxed font-medium max-w-md">
              Supporting women artisans through handcrafted products, community, and opportunities.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <Button className="h-11 px-6 rounded-full text-[14px] font-bold text-white bg-gradient-to-r from-[#ff4f8b] to-[#ff758c] shadow-lg shadow-[#ff4f8b]/30 hover:shadow-xl hover:shadow-[#ff4f8b]/40 hover:-translate-y-0.5 transition-all">
                  Shop Collection &rarr;
                </Button>
              </Link>
              <Link to="/about">
                <button className="h-11 px-6 rounded-full text-[14px] font-bold text-[#ff4f8b] border-2 border-pink-200 hover:bg-pink-50 hover:border-[#ff4f8b] transition-all bg-white shadow-sm">
                  Our Story &rarr;
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Controls Over Image */}
        <button onClick={() => setCurrent((p) => (p - 1 + heroImages.length) % heroImages.length)} className="absolute left-4 md:left-[55%] lg:left-[58%] top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-pink-500 shadow-md flex items-center justify-center transition-all" aria-label="Previous">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button onClick={() => setCurrent((p) => (p + 1) % heroImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-pink-500 shadow-md flex items-center justify-center transition-all" aria-label="Next">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="py-12 relative bg-[#FFFDF7] overflow-hidden">
      {/* Decorative blurred backgrounds to mock watercolor stains */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-pink-100/60 rounded-full blur-[120px] -translate-y-1/4 -translate-x-1/4 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/60 rounded-full blur-[120px] -translate-y-1/4 translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-pink-300" />
            <span className="text-3xl filter drop-shadow-md">🪔</span>
            <div className="w-12 h-px bg-pink-300" />
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-[#1a202c] mb-3 leading-tight tracking-tight">
            &ldquo;Crafted with Purpose,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4f8b] via-[#6BCB77] to-[#FFA07A]">Empowered by Art</span>&rdquo;
          </h2>
          
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-px bg-pink-200" />
            <div className="text-[12px] text-[#ff4f8b]">♥</div>
            <div className="w-16 h-px bg-pink-200" />
          </div>

          <p className="text-[#4a5568]/80 max-w-xl mx-auto text-lg">
            Every product tells a story. Every purchase creates impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p) => (
            <div key={p.title} className="group relative bg-white/90 backdrop-blur-xl rounded-[2.5rem] h-[320px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col items-center text-center">
              
              {/* Background Wave */}
              {p.waveSvg}

              <div className="relative z-10 p-8 flex flex-col items-center h-full w-full">
                {/* Icon Circle */}
                <div className={`w-[76px] h-[76px] rounded-full ${p.iconBg} flex items-center justify-center mb-5 shadow-sm relative`}>
                  <span className="text-3xl relative z-10">{p.icon}</span>
                </div>

                <h3 className="font-serif font-bold text-[#1a202c] text-[22px] mb-1">{p.title}</h3>
                <div className={`text-[12px] mb-2 ${p.textColor}`}>♥</div>
                <p className="text-[15px] text-[#4a5568] leading-relaxed mb-4 px-2">{p.desc}</p>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramsSection() {
  return (
    <section className="py-24 relative bg-gradient-to-br from-[#FFF0F5]/60 via-white to-[#FFF8DC]/60 overflow-hidden">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-pink-100/50 rounded-full blur-[100px] -z-0 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-purple-100/50 rounded-full blur-[100px] -z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-pink-300" />
            <svg className="w-5 h-5 text-pink-400 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <div className="w-12 h-px bg-pink-300" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff4f8b] via-[#ff758c] to-[#FFA07A] mb-6 inline-block">How We Can Help</h2>
          <p className="text-[#2D3436]/70 max-w-lg mx-auto text-base">From professional skill development to safety support — <br className="hidden md:block"/>built for what women actually need.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {programs.map((p) => (
            <Link key={p.title} to={p.link} className="group block h-[420px]">
              {/* Card Container */}
              <div className="relative bg-white/80 backdrop-blur-xl rounded-[2.5rem] h-full shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_rgb(0,0,0,0.1)] transition-all duration-300 flex flex-col items-center text-center">
                
                {/* Background Wave */}
                {p.waveSvg}

                <div className="relative z-10 p-8 flex flex-col items-center h-full w-full">
                  {/* Icon Circle */}
                  <div className={`w-[84px] h-[84px] rounded-full ${p.iconBg} flex items-center justify-center mb-6 shadow-sm border-4 border-white relative`}>
                    <span className="text-3xl relative z-10">{p.emoji}</span>
                  </div>

                  <h3 className="font-serif font-bold text-[#1a202c] text-[22px] mb-2">{p.title}</h3>
                  <div className={`text-[10px] mb-4 ${p.textColor}`}>♥</div>
                  <p className="text-[15px] text-[#4a5568] leading-relaxed mb-6 px-2">{p.desc}</p>
                  
                  {/* Learn more container pinned to bottom */}
                  <div className="mt-auto pb-4">
                    <span className={`text-sm font-bold ${p.textColor} group-hover:opacity-80 transition-opacity inline-flex items-center gap-1`}>Learn more <span className="text-lg leading-none">&rarr;</span></span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 mt-20">
          <div className="w-16 h-px bg-pink-300" />
          <span className="text-2xl text-pink-400">🌸</span>
          <div className="w-16 h-px bg-pink-300" />
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

const instagramPosts = [
  {
    id: 1,
    image: workshopGirlsImg,
    likes: '342',
    comments: '45',
    caption: 'Creating safe, equal, and confident communities through skill training workshops! 🛠️💪 #womenempowerment'
  },
  {
    id: 2,
    image: crochetEarringsImg,
    likes: '286',
    comments: '38',
    caption: 'Crafted with precision, worn with pride. Check out our latest handmade crochet earrings collection! 🌸✨'
  },
  {
    id: 3,
    image: daisyKeychainImg,
    likes: '194',
    comments: '29',
    caption: 'Little daisies of joy. Hand-knit keychain by our master artisan, Meena. 🌻💛 #handmadewithlove'
  },
  {
    id: 4,
    image: pinkFlowerPinImg,
    likes: '215',
    comments: '31',
    caption: 'Adding a touch of hope to every outfit. Shop our new flower pins today! 🎀🌷 #artisanmade'
  },
  {
    id: 5,
    image: cherryKeychainImg,
    likes: '260',
    comments: '34',
    caption: 'Life is sweet, especially when it supports a cause! Hand-crocheted cherries. 🍒🧶'
  },
  {
    id: 6,
    image: giantSunflowerImg,
    likes: '312',
    comments: '42',
    caption: 'Blooming together. Standing tall, proud, and confident. 🌻✨ #empowerstop'
  }
];

function InstagramSection() {
  const instagramUrl = "https://www.instagram.com/empowerstop?igsh=dzNteXR0bW1vNjFz";

  return (
    <section className="py-20 relative bg-gradient-to-br from-white via-pink-50/20 to-orange-50/10 overflow-hidden">
      {/* Decorative blurred backgrounds */}
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-pink-100/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-purple-100/30 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-px bg-pink-300" />
            <span className="text-3xl filter drop-shadow-sm">📸</span>
            <div className="w-12 h-px bg-pink-300" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff4f8b] via-[#E8457A] to-[#FF8E71] mb-4 inline-block">
            Follow Our Journey
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto text-base">
            See the real stories, artisan spotlights, and behind-the-scenes moments of our community on Instagram.
          </p>
        </div>

        {/* Instagram Profile Header Box */}
        <div className="bg-white/90 backdrop-blur-xl border border-pink-100/60 shadow-[0_8px_30px_rgb(255,79,139,0.04)] rounded-[2.5rem] p-6 md:p-8 mb-12 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-6 md:gap-8">
          {/* Profile Picture with Instagram Circle Gradient */}
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="relative group shrink-0">
            <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#fccc63] via-[#fbad50] to-[#cd486b] rounded-full blur-sm opacity-75 group-hover:opacity-100 transition duration-300" />
            <div className="relative w-20 h-20 rounded-full bg-white p-1">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#ff758c] to-[#ff4f8b] text-white flex items-center justify-center shadow-md">
                <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v6M9 15h6" />
                </svg>
              </div>
            </div>
          </a>

          {/* Profile Details */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3 justify-center sm:justify-start">
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="font-serif text-xl font-bold text-gray-800 hover:text-[#ff4f8b] transition-colors flex items-center justify-center sm:justify-start gap-1">
                empowerstop
                {/* Verified Check Icon */}
                <svg className="w-5 h-5 text-blue-500 fill-current" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
              </a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#ff4f8b] via-[#E8457A] to-[#FF8E71] shadow-md shadow-pink-500/20 hover:shadow-lg transition-all hover:scale-105 active:scale-95">
                Follow
              </a>
            </div>

            {/* Profile Stats */}
            <div className="flex items-center justify-center sm:justify-start gap-6 mb-3 text-sm text-gray-600 font-medium">
              <div><span className="font-bold text-gray-800">6</span> posts</div>
              <div><span className="font-bold text-gray-800">5.4k</span> followers</div>
              <div><span className="font-bold text-gray-800">189</span> following</div>
            </div>

            {/* Bio */}
            <p className="text-sm text-gray-500 font-medium leading-relaxed">
              <span className="font-semibold text-gray-700">EmpowerStop</span><br />
              Empowering women. Building skills. Creating safe, equal, and confident communities.
            </p>
          </div>
        </div>

        {/* Spotlight Post Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 mb-12">
          {instagramPosts.map((post) => (
            <a
              key={post.id}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square bg-gray-100 rounded-[2rem] overflow-hidden border border-pink-50 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                {/* Top: Instagram Logo */}
                <div className="flex justify-end">
                  <svg className="w-5 h-5 text-white/90" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
                {/* Middle: Caption */}
                <p className="text-[11px] font-medium leading-relaxed line-clamp-4 text-gray-100 text-center px-1">
                  {post.caption}
                </p>
                {/* Bottom: Likes & Comments */}
                <div className="flex items-center justify-center gap-4 text-xs font-bold pt-2 border-t border-white/20">
                  <span className="flex items-center gap-1">❤️ {post.likes}</span>
                  <span className="flex items-center gap-1">💬 {post.comments}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Follow CTA Button */}
        <div className="text-center">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#ff4f8b] via-[#E8457A] to-[#FF8E71] shadow-lg shadow-pink-500/20 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300"
          >
            {/* Instagram Glyph */}
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            Follow @empowerstop on Instagram
          </a>
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

      {/* Instagram Spotlight */}
      <InstagramSection />

      {/* 11. Newsletter */}
      {/* 11. Newsletter */}
      <section className="relative pt-24 pb-32 bg-[#FFFDF7] overflow-hidden">
        {/* Background Decorative Stains */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-200/50 rounded-full blur-[120px] -translate-x-1/4 -translate-y-1/4 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/60 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4 pointer-events-none" />
        
        {/* Wavy shape at bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg viewBox="0 0 1440 320" className="relative block w-full h-[180px] md:h-[280px]" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffb6c1" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#ffc0cb" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ffe4b5" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff69b4" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ffd700" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            <path fill="url(#waveGradient2)" d="M0,256L48,261.3C96,267,192,277,288,256C384,235,480,181,576,170.7C672,160,768,192,864,213.3C960,235,1056,245,1152,240C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            <path fill="url(#waveGradient)" d="M0,192L48,208C96,224,192,256,288,245.3C384,235,480,181,576,144C672,107,768,85,864,96C960,107,1056,149,1152,176C1248,203,1344,213,1392,218.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center py-10 px-6">
            
            {/* Mail Icon Top */}
            <div className="flex justify-center mb-6 relative inline-block">
              <span className="text-5xl filter drop-shadow-md relative z-10 animate-bounce-slow">💌</span>
              {/* Decorative stars */}
              <span className="absolute -left-10 top-0 text-pink-400 text-2xl animate-pulse">✨</span>
              <span className="absolute -right-12 top-4 text-pink-300 text-xl animate-pulse">✨</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 flex items-center justify-center flex-wrap gap-x-3 gap-y-2">
              <span className="text-[#ff4f8b]">Stay</span>
              <span className="text-[#1a202c]">in the</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4f8b] via-[#FFA07A] to-[#FFD93D]">loop</span>
              <span className="text-[#ff4f8b] text-3xl md:text-4xl -mt-2">♥</span>
            </h2>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-px bg-pink-200" />
              <div className="text-[12px] text-[#ff4f8b]">♥</div>
              <div className="w-12 h-px bg-pink-200" />
            </div>

            <p className="text-[#4a5568] text-lg md:text-xl mb-10 max-w-lg mx-auto leading-relaxed font-medium">
              New services, articles, and safety updates — <br className="hidden md:block"/>straight to your inbox.
            </p>
            
            {subscribed ? (
              <div className="bg-[#6BCB77]/10 text-[#6BCB77] font-bold py-4 px-8 rounded-full inline-flex items-center gap-2 border border-[#6BCB77]/20">
                <span>🎉</span> Thanks for subscribing!
              </div>
            ) : (
              <div className="max-w-[550px] mx-auto">
                <form onSubmit={handleNewsletter} className="relative flex flex-col sm:flex-row items-center bg-white/90 backdrop-blur-xl border border-pink-100 p-2 rounded-full shadow-[0_8px_30px_rgb(255,107,157,0.12)] hover:shadow-[0_15px_40px_rgb(255,79,139,0.15)] transition-all duration-300">
                  <div className="flex items-center flex-1 w-full pl-6 pr-2 py-2">
                    <svg className="w-5 h-5 text-pink-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      required
                      className="w-full bg-transparent text-base text-[#2D3436] placeholder:text-gray-400 outline-none focus:ring-0 border-none font-medium"
                    />
                  </div>
                  <button type="submit" className="w-full sm:w-auto h-12 px-8 rounded-full text-[15px] font-bold text-white bg-gradient-to-r from-[#ff4f8b] to-[#ff758c] shadow-md shadow-[#ff4f8b]/30 hover:shadow-lg hover:shadow-[#ff4f8b]/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                    Subscribe <span>&rarr;</span>
                  </button>
                </form>
                <div className="flex items-center justify-center gap-2 mt-5 text-[13px] font-semibold text-gray-500">
                  <svg className="w-4 h-4 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  We respect your privacy. No spam, ever.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features strip below newsletter */}
      <section className="bg-white py-12 relative z-20 border-b border-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-gray-100">
            {/* Instant Updates */}
            <div className="flex items-center gap-5 p-4 justify-center md:justify-start md:pl-6">
              <div className="w-14 h-14 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0 shadow-inner border border-white">
                <span className="text-2xl text-pink-500 filter drop-shadow-sm">🔔</span>
              </div>
              <div className="text-left">
                <h4 className="font-bold text-[#ff4f8b] mb-1">Instant Updates</h4>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[180px]">Be the first to know about new services.</p>
              </div>
            </div>
            
            {/* Safety First */}
            <div className="flex items-center gap-5 p-4 justify-center md:justify-start md:pl-12">
              <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 shadow-inner border border-white">
                <span className="text-2xl text-green-500 filter drop-shadow-sm">🛡️</span>
              </div>
              <div className="text-left">
                <h4 className="font-bold text-[#6BCB77] mb-1">Safety First</h4>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[180px]">Important safety tips and resources.</p>
              </div>
            </div>

            {/* Impact Stories */}
            <div className="flex items-center gap-5 p-4 justify-center md:justify-start md:pl-12">
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0 shadow-inner border border-white">
                <span className="text-2xl text-orange-500 filter drop-shadow-sm">🧡</span>
              </div>
              <div className="text-left">
                <h4 className="font-bold text-[#FF9F43] mb-1">Impact Stories</h4>
                <p className="text-sm text-gray-500 leading-relaxed max-w-[180px]">Real stories. Real change. Real impact.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
