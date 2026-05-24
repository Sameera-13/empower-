import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import Button from '../components/common/Button';

// Hook for simple count-up animation
function useCountUp(end, duration = 2000, trigger = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const increment = end / (duration / 16); // ~60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, trigger]);

  return count;
}

export default function Services() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [statsTriggered, setStatsTriggered] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    document.title = 'Services — Empower Stop';
    
    // Intersection Observer to trigger counter animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsTriggered(true);
        }
      },
      { threshold: 0.2 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Animated counters
  const womenCount = useCountUp(1200, 2000, statsTriggered);
  const workshopCount = useCountUp(15, 1500, statsTriggered);
  const successRate = useCountUp(98, 1500, statsTriggered);
  const livelihoodCount = useCountUp(500, 2000, statsTriggered);

  const services = [
    {
      title: 'Mehndi Services',
      description: 'We provide professional mehndi application services for weddings, festivals, parties, and special occasions with elegant and customized designs.',
      startingPrice: '₹999',
      icon: (
        <svg className="w-9 h-9 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15M7.5 7.5L16.5 16.5M16.5 7.5L7.5 16.5" />
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth={1} strokeDasharray="2 2" />
        </svg>
      ),
      packages: [
        { name: 'Bridal Mehndi', price: '₹5,000+' },
        { name: 'Arabic Mehndi', price: '₹1,500+' },
        { name: 'Festival Mehndi', price: '₹799+' },
        { name: 'Custom Designs', price: '₹2,000+' },
        { name: 'Home Service Available', price: 'Free' }
      ],
      features: [
        'Bridal Mehndi',
        'Arabic Mehndi',
        'Festival Designs',
        'Custom Mehndi Art',
        'Home Service',
        'Mehndi Classes'
      ],
      buttonText: 'Book Mehndi Now',
      buttonLink: '/contact?inquiry=mehndi',
      accentColor: 'border-[#FFD93D]/25 hover:border-[#FFD93D] hover:shadow-[0_20px_40px_rgba(255,217,61,0.12)] hover:shadow-[#FFD93D]/10 bg-white/70 backdrop-blur-md',
      tagColor: 'bg-[#FFD93D]/10 text-[#B8860B] border border-[#FFD93D]/20',
      btnVariant: 'golden'
    },
    {
      title: 'Beauty & Personal Care',
      description: 'We provide professional salon and self-care services that help women feel confident, stylish, and beautiful with expert treatments.',
      startingPrice: '₹499',
      icon: (
        <svg className="w-9 h-9 text-[#FF6B9D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 9.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 12h5.5m-5.5 2.5h3.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 19.5v-3a1.5 1.5 0 011.5-1.5h4a1.5 1.5 0 011.5 1.5v3" />
        </svg>
      ),
      packages: [
        { name: 'Facial Treatment', price: '₹999+' },
        { name: 'Hair Spa', price: '₹1,499+' },
        { name: 'Hair Coloring', price: '₹2,500+' },
        { name: 'Bleach & Cleanup', price: '₹699+' },
        { name: 'Bridal Makeup', price: '₹8,000+' }
      ],
      features: [
        'Facial Treatment',
        'Bleach & Cleanup',
        'Hair Spa',
        'Hair Coloring',
        'Bridal Makeup',
        'Makeup Services',
        'Skin Care Guidance',
        'Home Beauty Service'
      ],
      buttonText: 'Book Beauty Service',
      buttonLink: '/contact?inquiry=beauty',
      accentColor: 'border-[#FF6B9D]/25 hover:border-[#FF6B9D] hover:shadow-[0_20px_40px_rgba(255,107,157,0.12)] hover:shadow-[#FF6B9D]/10 bg-white/70 backdrop-blur-md',
      tagColor: 'bg-[#FF6B9D]/10 text-[#FF6B9D] border border-[#FF6B9D]/20',
      btnVariant: 'pink'
    },
    {
      title: 'Full Stack Web Dev',
      description: 'We create responsive, SEO-friendly, and modern websites for businesses, startups, personal brands, and online services.',
      startingPrice: '₹9,999',
      icon: (
        <svg className="w-9 h-9 text-[#6BCB77]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 8.25l-2.25 2.25L8 12.75M16 8.25l2.25 2.25-2.25 2.25" />
        </svg>
      ),
      packages: [
        { name: 'Portfolio Website', price: '₹9,999+' },
        { name: 'Business Website', price: '₹15,000+' },
        { name: 'E-Commerce Website', price: '₹25,000+' },
        { name: 'Custom Web App', price: '₹40,000+' },
        { name: 'Website Maintenance', price: '₹2,000/mo' }
      ],
      features: [
        'Responsive Design',
        'Frontend Development',
        'Backend Development',
        'Full Stack Solutions',
        'SEO Friendly',
        'Admin Dashboard',
        'Website Maintenance',
        'Fast Performance'
      ],
      buttonText: 'Create Your Website',
      buttonLink: '/contact?inquiry=webdesign',
      accentColor: 'border-[#6BCB77]/25 hover:border-[#6BCB77] hover:shadow-[0_20px_40px_rgba(107,203,119,0.12)] hover:shadow-[#6BCB77]/10 bg-white/70 backdrop-blur-md',
      tagColor: 'bg-[#6BCB77]/10 text-[#2E7D32] border border-[#6BCB77]/20',
      btnVariant: 'green'
    }
  ];

  const features = [
    {
      title: 'Women Empowerment',
      description: 'Fostering financial independence and leadership capacity to elevate women in society.',
      icon: '✊',
      bg: 'bg-gradient-to-br from-[#ff4f8b]/5 to-[#ff4f8b]/15'
    },
    {
      title: 'Skill Development',
      description: 'Hands-on practical training that matches both local artistry and global digital needs.',
      icon: '🧠',
      bg: 'bg-gradient-to-br from-[#FFD93D]/5 to-[#FFD93D]/20'
    },
    {
      title: 'Creative Opportunities',
      description: 'A platform to launch creative services, showcase portfolios, and connect with clients.',
      icon: '🎨',
      bg: 'bg-gradient-to-br from-[#6BCB77]/5 to-[#6BCB77]/15'
    },
    {
      title: 'Supportive Community',
      description: 'A secure, collaborative circle where women share experiences and grow together.',
      icon: '🤝',
      bg: 'bg-gradient-to-br from-purple-500/5 to-purple-500/15'
    }
  ];

  const testimonials = [
    {
      quote: 'EmpowerStop helped me learn website designing and start freelancing from home.',
      author: 'Kavita M.',
      role: 'Web Design Graduate',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120&h=120'
    },
    {
      quote: 'I learned bridal mehndi art and business basics here. Now I receive regular client bookings for festival celebrations.',
      author: 'Riya Sharma',
      role: 'Mehndi Artist & Instructor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120'
    },
    {
      quote: 'The beauty workshops gave me professional grooming knowledge. I recently opened my own home salon service and have a loyal client base.',
      author: 'Priya S.',
      role: 'Beauty Service Entrepreneur',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120'
    }
  ];

  const handleScrollToServices = () => {
    document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageContainer>
      {/* SECTION 1 — HERO SECTION */}
      <section className="py-6 px-4">
        <div className="max-w-5xl mx-auto relative h-[400px] md:h-[480px] rounded-[2.5rem] overflow-hidden ring-[6px] ring-[#2D3436]/5 shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
          {/* Background Image */}
          <img
            src="/services_hero.png"
            alt="Women learning skills together"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Hero Content */}
          <div className="relative z-10 h-full flex items-center px-6 md:px-16">
            <div className="max-w-2xl text-white">
              <span className="inline-block text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-[#FFD93D] mb-4 bg-[#FFD93D]/20 px-3 py-1 rounded-full border border-[#FFD93D]/30 backdrop-blur-sm">
                EmpowerStop Services
              </span>
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl mb-4 leading-tight">
                Empowering Women Through <span className="text-[#FFD93D]">Skills & Creativity</span>
              </h1>
              <p className="text-sm md:text-base text-white/80 mb-8 max-w-lg leading-relaxed">
                Helping women grow through beauty, traditional art, and digital opportunities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={handleScrollToServices} className="h-11 md:h-12 px-7 text-sm font-semibold rounded-full shadow-lg shadow-[#ff4f8b]/30">
                  Explore Services
                </Button>
                <Link to="/signup">
                  <button className="h-11 md:h-12 px-7 text-sm font-semibold rounded-full border-2 border-white/40 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-200">
                    Join Community
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — SERVICES CARDS */}
      <section id="services-section" className="py-24 px-4 bg-gradient-to-b from-[#FFFDF7] via-[#FDF8FF] to-[#FFFDF7]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B9D] bg-[#FF6B9D]/15 px-4 py-1.5 rounded-full border border-[#FF6B9D]/20">
              Our Offerings
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-[#2D3436] mt-5 mb-5 leading-[1.15]">
              Professional Services We Offer
            </h2>
            <p className="text-[#2D3436]/50 max-w-xl mx-auto text-sm leading-relaxed md:text-base">
              We provide premium beauty care, professional mehndi artistry, and modern website development solutions at affordable pricing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`rounded-[2.25rem] p-8 border ${service.accentColor} transition-all duration-300 hover:-translate-y-2.5 flex flex-col justify-between h-full`}
              >
                <div>
                  {/* Top Line & Icon */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md shadow-[#F0E6F6] border border-[#F0E6F6]">
                      {service.icon}
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full ${service.tagColor}`}>
                      Premium
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-display text-2xl text-[#2D3436] mb-3">{service.title}</h3>
                  <p className="text-xs text-[#2D3436]/60 leading-relaxed mb-6 pb-6 border-b border-[#F0E6F6]">{service.description}</p>
                  
                  {/* Popular Packages */}
                  <div className="mb-6">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#2D3436]/40 mb-3">Popular Packages</h4>
                    <div className="space-y-2 bg-[#FFFDF7]/50 rounded-2xl p-4 border border-[#F0E6F6]">
                      {service.packages.map((pkg, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-[#2D3436]/80 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B9D]" />
                          {pkg.name}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Included Features */}
                  <div className="mb-8">
                    <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-[#2D3436]/40 mb-3">Included Features</h4>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                      {service.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-[11px] text-[#2D3436]/70 font-medium">
                          <span className="w-4 h-4 rounded-full bg-[#6BCB77]/15 flex items-center justify-center shrink-0 border border-[#6BCB77]/20">
                            <svg className="w-2.5 h-2.5 text-[#6BCB77]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="truncate">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* CTA Button */}
                <Link to={service.buttonLink} className="w-full">
                  <button
                    className={`w-full py-3.5 px-6 rounded-2xl text-xs font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] ${
                      service.btnVariant === 'golden'
                        ? 'bg-[#FFD93D] text-[#2D3436] hover:bg-[#FFD93D]/90 shadow-md shadow-[#FFD93D]/25'
                        : service.btnVariant === 'pink'
                        ? 'bg-[#FF6B9D] text-white hover:bg-[#FF6B9D]/90 shadow-md shadow-[#FF6B9D]/25'
                        : 'bg-[#6BCB77] text-white hover:bg-[#6BCB77]/90 shadow-md shadow-[#6BCB77]/25'
                    }`}
                  >
                    {service.buttonText}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHY CHOOSE EMPOWERSTOP */}
      <section ref={statsRef} className="py-20 bg-gradient-to-b from-[#FFFDF7] to-white border-t border-b border-[#F0E6F6] px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-bold uppercase tracking-widest text-[#FFD93D]">Why Choose Us</span>
            <h2 className="font-display text-3xl md:text-4xl text-[#2D3436] mt-2 mb-4">Dedicated to Uplifting Lives</h2>
            <p className="text-[#2D3436]/50 max-w-lg mx-auto text-sm leading-relaxed">
              We provide the tools, support, and networks to bridge the gap between creative skill development and financial freedom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <div key={index} className={`rounded-2xl p-6 ${feature.bg} border border-[#F0E6F6]/50 shadow-sm hover:shadow-md transition-all duration-300`}>
                <span className="text-3xl mb-4 block">{feature.icon}</span>
                <h3 className="font-semibold text-sm text-[#2D3436] mb-2">{feature.title}</h3>
                <p className="text-xs text-[#2D3436]/60 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Interactive Counters Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-[#FFFDF7] border border-[#F0E6F6] rounded-3xl p-8 shadow-sm">
            <div className="text-center">
              <span className="block font-display text-3xl md:text-4xl text-[#ff4f8b] font-bold">
                {statsTriggered ? `${womenCount}+` : '0+'}
              </span>
              <span className="text-xs text-[#2D3436]/50 uppercase font-semibold tracking-wider">Women Empowered</span>
            </div>
            <div className="text-center border-l border-[#F0E6F6]">
              <span className="block font-display text-3xl md:text-4xl text-[#FFD93D] font-bold">
                {statsTriggered ? `${workshopCount}+` : '0+'}
              </span>
              <span className="text-xs text-[#2D3436]/50 uppercase font-semibold tracking-wider">Skill Workshops</span>
            </div>
            <div className="text-center border-l border-[#F0E6F6]">
              <span className="block font-display text-3xl md:text-4xl text-[#6BCB77] font-bold">
                {statsTriggered ? `${successRate}%` : '0%'}
              </span>
              <span className="text-xs text-[#2D3436]/50 uppercase font-semibold tracking-wider">Success Rate</span>
            </div>
            <div className="text-center border-l border-[#F0E6F6]">
              <span className="block font-display text-3xl md:text-4xl text-purple-600 font-bold">
                {statsTriggered ? `${livelihoodCount}+` : '0+'}
              </span>
              <span className="text-xs text-[#2D3436]/50 uppercase font-semibold tracking-wider">Livelihoods Created</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — TESTIMONIALS */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-widest text-[#6BCB77]">Impact Stories</span>
            <h2 className="font-display text-3xl md:text-4xl text-[#2D3436] mt-2 mb-4">Stories of Change</h2>
          </div>

          {/* Testimonial card slider */}
          <div className="relative bg-white border border-[#F0E6F6] rounded-3xl p-8 md:p-12 shadow-sm max-w-3xl mx-auto overflow-hidden">
            <div className="flex flex-col items-center text-center">
              <span className="text-5xl text-[#ff4f8b]/20 mb-6">“</span>
              <p className="font-display text-lg md:text-xl text-[#2D3436] mb-8 italic leading-relaxed">
                {testimonials[activeTestimonial].quote}
              </p>
              
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].author}
                  className="w-14 h-14 rounded-full object-cover ring-4 ring-[#ff4f8b]/15"
                />
                <div className="text-left">
                  <h4 className="font-bold text-sm text-[#2D3436]">{testimonials[activeTestimonial].author}</h4>
                  <span className="text-xs text-[#2D3436]/50 font-medium">{testimonials[activeTestimonial].role}</span>
                </div>
              </div>
            </div>

            {/* Slider Navigation Controls */}
            <div className="flex justify-between items-center mt-10 max-w-xs mx-auto">
              <button
                onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                className="w-9 h-9 rounded-full bg-[#FFFDF7] border border-[#F0E6F6] hover:bg-[#ff4f8b]/10 hover:text-[#ff4f8b] hover:border-[#ff4f8b]/20 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous story"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              


              <button
                onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                className="w-9 h-9 rounded-full bg-[#FFFDF7] border border-[#F0E6F6] hover:bg-[#ff4f8b]/10 hover:text-[#ff4f8b] hover:border-[#ff4f8b]/20 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next story"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — CALL TO ACTION */}
      <section className="relative overflow-hidden mb-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative bg-gradient-to-r from-[#ff4f8b] to-[#FF8E71] rounded-[2.5rem] py-16 px-8 md:px-16 text-center text-white overflow-hidden shadow-xl shadow-[#ff4f8b]/15">
            {/* Background elements */}
            <div className="absolute -left-12 -top-12 w-48 h-48 rounded-full bg-white/5 blur-2xl" />
            <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-white/10 blur-2xl" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight">
                Start Your Journey With EmpowerStop Today
              </h2>
              <p className="text-white/80 mb-8 max-w-md mx-auto text-sm md:text-base leading-relaxed">
                Learn skills, build confidence, and create opportunities.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/signup">
                  <button className="h-12 px-8 rounded-full bg-white text-[#ff4f8b] font-semibold text-sm hover:bg-white/95 hover:shadow-xl transition-all duration-200 cursor-pointer">
                    Join Now
                  </button>
                </Link>
                <Link to="/contact">
                  <button className="h-12 px-8 rounded-full border-2 border-white/40 text-white font-semibold text-sm hover:bg-white/10 transition-all duration-200 cursor-pointer">
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
