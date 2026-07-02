import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

// Inline SVG Icon Selector for Category Filter Pills
function getCategoryIcon(catId, isActive) {
  const colorClass = isActive ? 'text-white' : {
    all: 'text-[#ff4f8b]',
    personal: 'text-[#FF6B9D]',
    web: 'text-[#6BCB77]',
    docs: 'text-[#3B82F6]',
    social: 'text-[#A855F7]',
    business: 'text-[#FFD93D]',
    ngo: 'text-[#4F46E5]',
    digital: 'text-[#EC4899]'
  }[catId] || 'text-[#ff4f8b]';

  switch (catId) {
    case 'all':
      return (
        <svg className={`w-4.5 h-4.5 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      );
    case 'personal':
      return (
        <svg className={`w-4.5 h-4.5 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case 'web':
      return (
        <svg className={`w-4.5 h-4.5 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case 'docs':
      return (
        <svg className={`w-4.5 h-4.5 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    case 'social':
      return (
        <svg className={`w-4.5 h-4.5 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
    case 'business':
      return (
        <svg className={`w-4.5 h-4.5 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4.674 12.03a2.007 2.007 0 001.326-.79l.526-.656a2.007 2.007 0 012.336-.572M16 8H8m0 0v10m0-10H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2h-2" />
        </svg>
      );
    case 'ngo':
      return (
        <svg className={`w-4.5 h-4.5 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      );
    case 'digital':
      return (
        <svg className={`w-4.5 h-4.5 ${colorClass}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Services() {
  const navigate = useNavigate();
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
      { threshold: 0.1 }
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

  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Services', services: ['mehndi', 'beauty', 'webdev', 'docs', 'social'], color: 'from-[#ff4f8b] to-[#ff8e71]' },
    { id: 'personal', label: 'Personal Care', services: ['mehndi', 'beauty'], color: 'from-[#FF6B9D] to-[#EC4899]' },
    { id: 'web', label: 'Web Development', services: ['webdev'], color: 'from-[#6BCB77] to-[#4CAF50]' },
    { id: 'docs', label: 'Documentation & Registration', services: ['docs'], color: 'from-[#3B82F6] to-[#2563EB]' },
    { id: 'social', label: 'Social Media Management', services: ['social'], color: 'from-[#A855F7] to-[#EC4899]' },
    { id: 'business', label: 'Business Solutions', services: ['webdev', 'docs'], color: 'from-[#FFD93D] to-[#FF8E71]' },
    { id: 'ngo', label: 'NGO Services', services: ['docs'], color: 'from-[#4F46E5] to-[#3B82F6]' },
    { id: 'digital', label: 'Digital Marketing', services: ['social'], color: 'from-[#EC4899] to-[#8B5CF6]' }
  ];

  const services = [
    {
      id: 'mehndi',
      title: 'Mehndi Services',
      description: 'We provide professional mehndi application services for weddings, festivals, parties, and special occasions with elegant and customized designs.',
      icon: (
        <svg className="w-9 h-9 text-[#D4AF37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15M7.5 7.5L16.5 16.5M16.5 7.5L7.5 16.5" />
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth={1} strokeDasharray="2 2" />
        </svg>
      ),
      packages: [
        { name: 'Bridal Mehndi' },
        { name: 'Arabic Mehndi' },
        { name: 'Festival Mehndi' },
        { name: 'Custom Designs' },
        { name: 'Home Service Available' }
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
      buttonLink: '/book-service?service=mehndi',
      accentColor: 'border-[#FFD93D]/25 hover:border-[#FFD93D] hover:shadow-[0_20px_40px_rgba(255,217,61,0.12)] hover:shadow-[#FFD93D]/10 bg-white/70 backdrop-blur-md',
      tagColor: 'bg-[#FFD93D]/10 text-[#B8860B] border border-[#FFD93D]/20',
      btnVariant: 'golden'
    },
    {
      id: 'beauty',
      title: 'Beauty & Personal Care',
      description: 'We provide professional salon and self-care services that help women feel confident, stylish, and beautiful with expert treatments.',
      icon: (
        <svg className="w-9 h-9 text-[#FF6B9D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 9.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 16.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 12h5.5m-5.5 2.5h3.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 19.5v-3a1.5 1.5 0 011.5-1.5h4a1.5 1.5 0 011.5 1.5v3" />
        </svg>
      ),
      packages: [
        { name: 'Facial Treatment' },
        { name: 'Hair Spa' },
        { name: 'Hair Coloring' },
        { name: 'Bleach & Cleanup' },
        { name: 'Bridal Makeup' }
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
      buttonLink: '/book-service?service=beauty',
      accentColor: 'border-[#FF6B9D]/25 hover:border-[#FF6B9D] hover:shadow-[0_20px_40px_rgba(255,107,157,0.12)] hover:shadow-[#FF6B9D]/10 bg-white/70 backdrop-blur-md',
      tagColor: 'bg-[#FF6B9D]/10 text-[#FF6B9D] border border-[#FF6B9D]/20',
      btnVariant: 'pink'
    },
    {
      id: 'webdev',
      title: 'Full Stack Web Dev',
      description: 'We create responsive, SEO-friendly, and modern websites for businesses, startups, personal brands, and online services.',
      icon: (
        <svg className="w-9 h-9 text-[#6BCB77]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 8.25l-2.25 2.25L8 12.75M16 8.25l2.25 2.25-2.25 2.25" />
        </svg>
      ),
      packages: [
        { name: 'Portfolio Website' },
        { name: 'Business Website' },
        { name: 'E-Commerce Website' },
        { name: 'Custom Web App' },
        { name: 'Website Maintenance' }
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
      buttonLink: '/book-service?service=webdev',
      accentColor: 'border-[#6BCB77]/25 hover:border-[#6BCB77] hover:shadow-[0_20px_40px_rgba(107,203,119,0.12)] hover:shadow-[#6BCB77]/10 bg-white/70 backdrop-blur-md',
      tagColor: 'bg-[#6BCB77]/10 text-[#2E7D32] border border-[#6BCB77]/20',
      btnVariant: 'green'
    },
    {
      id: 'docs',
      title: 'Documentation & Registration Services',
      description: 'We provide reliable documentation, online registration, NGO compliance, and government support services for individuals, startups, NGOs, and businesses with fast processing and professional assistance.',
      icon: (
        <svg className="w-9 h-9 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      packages: [
        { name: 'Online Registration' },
        { name: 'GST Registration' },
        { name: 'NGO Registration' },
        { name: 'Business Registration' },
        { name: '80G Registration' },
        { name: 'MSME/Udyam Registration' },
        { name: '12A Registration' },
        { name: 'Income Certificate' },
        { name: 'PAN Card Application' },
        { name: 'Online Form Filling' },
        { name: 'Food License (FSSAI)' },
        { name: 'Government Scheme Applications' },
        { name: 'CSR Registration Support' },
        { name: 'Document Verification Support' }
      ],
      features: [
        'Fast Processing',
        'Professional Guidance',
        'Online & Offline Support',
        'NGO Compliance Support',
        'Government Registration Help',
        'Secure Documentation',
        'Affordable Service Packages'
      ],
      buttonText: 'Get Documentation Help',
      buttonLink: '/book-service?service=docs',
      accentColor: 'border-[#3B82F6]/25 hover:border-[#3B82F6] hover:shadow-[0_20px_40px_rgba(59,130,246,0.12)] hover:shadow-[#3B82F6]/10 bg-white/70 backdrop-blur-md',
      tagColor: 'bg-[#3B82F6]/10 text-[#2563EB] border border-[#3B82F6]/20',
      btnVariant: 'blue'
    },
    {
      id: 'social',
      title: 'Social Media Management',
      description: 'We help brands grow online with creative social media management, content creation, audience engagement, and marketing strategies for businesses, creators, startups, and organizations.',
      icon: (
        <svg className="w-9 h-9 text-[#A855F7]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      packages: [
        { name: 'Instagram Management' },
        { name: 'Brand Promotion' },
        { name: 'Facebook Page Handling' },
        { name: 'Content Creation' },
        { name: 'Post & Reel Designing' },
        { name: 'Audience Engagement' },
        { name: 'Content Planning' },
        { name: 'Monthly Growth Strategy' },
        { name: 'Social Media Marketing' }
      ],
      features: [
        'Daily Post Uploads',
        'Creative Captions',
        'Hashtag Research',
        'Reel Content Ideas',
        'Audience Interaction',
        'Monthly Analytics Report',
        'Brand Growth Strategy',
        'Trend-Based Content'
      ],
      buttonText: 'Manage My Social Media',
      buttonLink: '/book-service?service=social',
      accentColor: 'border-[#A855F7]/25 hover:border-[#A855F7] hover:shadow-[0_20px_40px_rgba(168,85,247,0.12)] hover:shadow-[#A855F7]/10 bg-white/70 backdrop-blur-md',
      tagColor: 'bg-[#A855F7]/10 text-[#7E22CE] border border-[#A855F7]/20',
      btnVariant: 'purple'
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

  const activeCategoryData = categories.find(c => c.id === activeCategory);
  const filteredServices = services.filter(service => activeCategoryData.services.includes(service.id));

  const getGridSpan = (serviceId, index, total) => {
    if (total === 1) return 'lg:col-span-6 max-w-2xl mx-auto';
    if (total === 2) return 'lg:col-span-3';
    if (total === 3) return 'lg:col-span-2';
    // For all 5 cards: 3 on first row, 2 on second row
    if (index < 3) return 'lg:col-span-2';
    return 'lg:col-span-3';
  };

  return (
    <PageContainer>
      {/* SECTION 1 — HERO SECTION */}
      <section className="pt-8 pb-12 md:pt-10 md:pb-16 px-4 relative overflow-hidden bg-transparent">
        {/* Floating background blur shapes for SaaS aesthetic */}
        <div className="absolute top-10 left-10 w-44 h-44 rounded-full bg-[#FF6B9D]/10 blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-10 right-1/3 w-64 h-64 rounded-full bg-[#6BCB77]/10 blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Text & Content */}
          <div className="lg:col-span-6 relative z-10 text-left">
            {/* Sparkle Star icon decoration */}
            <div className="absolute -top-10 -left-6 text-[#FFD93D] text-2xl select-none animate-pulse">✦</div>
            
            <span className="inline-block text-[10px] md:text-xs font-extrabold tracking-[0.2em] uppercase text-[#B8860B] bg-[#FFD93D]/10 px-4 py-1.5 rounded-full border border-[#FFD93D]/20 backdrop-blur-sm mb-2">
              EMPOWERSTOP SERVICES
            </span>
            
            <h1 className="text-5xl lg:text-[56px] font-serif font-bold text-gray-800 mb-6 tracking-tight leading-tight">
              Empowering Women <br />
              Through <span className="text-[#ff4f8b]">Skills &</span> <br />
              <span className="text-[#ff4f8b]">Creativity</span>
            </h1>

            <p className="text-[17px] text-[#4a5568] font-medium leading-[1.8] max-w-lg mb-8">
              Helping women grow through beauty, traditional art, digital opportunities, and professional services.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={handleScrollToServices}
                className="h-12 px-8 text-xs font-bold rounded-full text-white bg-gradient-to-r from-[#ff4f8b] to-[#ff8e71] shadow-lg shadow-[#ff4f8b]/20 hover:shadow-xl hover:shadow-[#ff4f8b]/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Explore Services <span className="text-sm">→</span>
              </button>
              
              <button
                onClick={() => navigate('/signup')}
                className="h-12 px-8 text-xs font-bold rounded-full border border-[#F0E6F6] text-[#2D3436]/80 bg-white hover:bg-[#F0E6F6]/10 hover:border-[#ff4f8b]/30 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4 text-[#ff4f8b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                Join Community
              </button>
            </div>
          </div>

          {/* Right Column: Beautiful Banner Image with floating badge */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            {/* Outer pink sparkle decorator */}
            <div className="absolute top-1/2 -right-8 text-[#ff4f8b] text-2xl select-none animate-pulse">✦</div>
            
            <div className="relative rounded-[2.5rem] overflow-hidden p-1 bg-white shadow-xl shadow-black/5 ring-1 ring-black/5">
              <img
                src="/services_hero.jpg"
                alt="Women learning skills together"
                className="w-full max-w-[500px] h-[360px] md:h-[400px] object-cover rounded-[2.3rem] ring-4 ring-white"
              />
            </div>
            
            {/* Floating Glassmorphic Badge */}
            <div className="absolute bottom-4 -left-6 bg-white border border-[#F0E6F6] rounded-2xl p-4 shadow-lg shadow-black/5 flex items-center gap-3.5 animate-bounce-slow">
              <div className="w-11 h-11 rounded-xl bg-[#ff4f8b]/10 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#ff4f8b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="text-left leading-none">
                <span className="block text-xl font-extrabold text-[#2D3436] mb-0.5">1200+</span>
                <span className="text-[9px] font-bold text-[#2D3436]/40 uppercase tracking-wider">Women Empowered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — SERVICES CARDS */}
      <section id="services-section" className="py-12 md:py-16 px-4 bg-transparent relative overflow-hidden">
        {/* Floating background blur shapes for SaaS aesthetic */}
        <div className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-[#FF6B9D]/10 blur-3xl -z-10" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full bg-[#6BCB77]/10 blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          {/* Centered Heading */}
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff4f8b] bg-[#ff4f8b]/10 px-4 py-1.5 rounded-full border border-[#ff4f8b]/20">
              BROWSE BY CATEGORY
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1a202c] mt-5 mb-4 leading-tight tracking-tight">
              Professional Services We Offer
            </h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px bg-pink-200" />
              <div className="text-[14px] text-[#ff4f8b]">♥</div>
              <div className="w-12 h-px bg-pink-200" />
            </div>
            <p className="text-[17px] text-[#4a5568] font-medium max-w-xl mx-auto leading-[1.8]">
              We provide premium beauty care, professional mehndi artistry, and modern website development solutions at affordable pricing.
            </p>
          </div>

          {/* Interactive Category Filter Pill Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16 max-w-5xl mx-auto px-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative flex items-center gap-2.5 px-5 py-3 rounded-full text-[11px] font-bold transition-all duration-300 transform active:scale-95 cursor-pointer border ${
                    isActive
                      ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-md shadow-black/10 scale-[1.02]`
                      : 'bg-white hover:bg-white/95 text-[#2D3436]/65 border-[#F0E6F6] hover:border-[#ff4f8b]/30 shadow-sm'
                  }`}
                >
                  {getCategoryIcon(cat.id, isActive)}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Filtered Services Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 min-h-[400px]">
            {filteredServices.map((service, index) => {
              // Color-matched bullets for each service
              const dotColorClass = {
                mehndi: 'bg-[#FFD93D]',
                beauty: 'bg-[#FF6B9D]',
                webdev: 'bg-[#6BCB77]',
                docs: 'bg-[#3B82F6]',
                social: 'bg-[#A855F7]'
              }[service.id] || 'bg-[#ff4f8b]';

              return (
                <div
                  key={service.id}
                  className={`rounded-3xl p-5 md:p-6 border-2 ${service.accentColor} transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between h-full bg-white/60 backdrop-blur-md shadow-sm hover:shadow-xl hover:scale-[1.01] animate-scale-in col-span-1 md:col-span-2 ${getGridSpan(service.id, index, filteredServices.length)}`}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <div>
                    {/* Top Line & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md shadow-[#F0E6F6] border border-[#F0E6F6]">
                        <div className="scale-90">{service.icon}</div>
                      </div>
                      <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${service.tagColor}`}>
                        Premium
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-serif text-xl md:text-2xl font-bold text-[#1a202c] mb-2">{service.title}</h3>
                    <p className="text-[15px] font-medium text-[#4a5568] leading-[1.7] mb-5 pb-5 border-b border-pink-100/50">{service.description}</p>
                    
                    {/* Popular Packages */}
                    <div className="mb-5">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2D3436]/40 mb-3">
                        {service.id === 'social' ? 'Popular Services' : 'Popular Packages'}
                      </h4>
                      <div className="bg-[#FFFDF7]/50 rounded-xl p-4 border border-[#F0E6F6] grid grid-cols-2 gap-x-4 gap-y-2.5">
                        {service.packages.map((pkg, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-[#2D3436]/80 font-bold truncate">
                            <span className={`w-2 h-2 rounded-full ${dotColorClass} shrink-0`} />
                            <span className="truncate">{pkg.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Included Features */}
                    <div className="mb-6">
                      <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#2D3436]/40 mb-3">Included Features</h4>
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                        {service.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-[#2D3436]/70 font-semibold">
                            <span className="w-4 h-4 rounded-full bg-[#6BCB77]/15 flex items-center justify-center shrink-0 border border-[#6BCB77]/20">
                              <svg className="w-2.5 h-2.5 text-[#6BCB77]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={5}>
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
                  <button
                    onClick={() => navigate(service.buttonLink)}
                    className={`w-full py-3 px-5 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-1.5 mt-3 ${
                      service.btnVariant === 'golden'
                        ? 'bg-[#FFD93D] text-[#2D3436] hover:bg-[#FFD93D]/90 shadow-md shadow-[#FFD93D]/25'
                        : service.btnVariant === 'pink'
                        ? 'bg-[#FF6B9D] text-white hover:bg-[#FF6B9D]/90 shadow-md shadow-[#FF6B9D]/25'
                        : service.btnVariant === 'blue'
                        ? 'bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white hover:opacity-95 shadow-md shadow-[#3B82F6]/25'
                        : service.btnVariant === 'purple'
                        ? 'bg-gradient-to-r from-[#A855F7] to-[#EC4899] text-white hover:opacity-95 shadow-md shadow-[#A855F7]/25'
                        : 'bg-[#6BCB77] text-white hover:bg-[#6BCB77]/90 shadow-md shadow-[#6BCB77]/25'
                    }`}
                  >
                    {service.buttonText}
                    <span className="text-base">→</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Dedicated Horizontal Stats Divider Bar */}
          <div className="mt-20 max-w-7xl mx-auto bg-white border border-[#F0E6F6] rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Stat 1 */}
              <div className="flex items-center gap-4 px-2">
                <div className="w-12 h-12 rounded-full bg-[#ff4f8b]/10 flex items-center justify-center shrink-0 border border-[#ff4f8b]/20">
                  <svg className="w-5 h-5 text-[#ff4f8b]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-left leading-none">
                  <span className="block font-display text-2xl md:text-3xl text-[#ff4f8b] font-bold mb-1">
                    {statsTriggered ? `${womenCount}+` : '0+'}
                  </span>
                  <span className="text-[9px] text-[#2D3436]/40 uppercase font-extrabold tracking-wider">Women Empowered</span>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-4 px-2 border-t sm:border-t-0 sm:border-l border-[#F0E6F6] pt-4 sm:pt-0">
                <div className="w-12 h-12 rounded-full bg-[#FFD93D]/10 flex items-center justify-center shrink-0 border border-[#FFD93D]/20">
                  <svg className="w-5 h-5 text-[#B8860B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" />
                  </svg>
                </div>
                <div className="text-left leading-none">
                  <span className="block font-display text-2xl md:text-3xl text-[#B8860B] font-bold mb-1">
                    {statsTriggered ? `${workshopCount}+` : '0+'}
                  </span>
                  <span className="text-[9px] text-[#2D3436]/40 uppercase font-extrabold tracking-wider">Skill Workshops</span>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-4 px-2 border-t lg:border-t-0 lg:border-l border-[#F0E6F6] pt-4 lg:pt-0">
                <div className="w-12 h-12 rounded-full bg-[#6BCB77]/10 flex items-center justify-center shrink-0 border border-[#6BCB77]/20">
                  <svg className="w-5 h-5 text-[#2E7D32]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-left leading-none">
                  <span className="block font-display text-2xl md:text-3xl text-[#2E7D32] font-bold mb-1">
                    {statsTriggered ? `${successRate}%` : '0%'}
                  </span>
                  <span className="text-[9px] text-[#2D3436]/40 uppercase font-extrabold tracking-wider">Success Rate</span>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex items-center gap-4 px-2 border-t lg:border-t-0 lg:border-l border-[#F0E6F6] pt-4 lg:pt-0">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0 border border-purple-200">
                  <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div className="text-left leading-none">
                  <span className="block font-display text-2xl md:text-3xl text-purple-600 font-bold mb-1">
                    {statsTriggered ? `${livelihoodCount}+` : '0+'}
                  </span>
                  <span className="text-[9px] text-[#2D3436]/40 uppercase font-extrabold tracking-wider">Livelihoods Created</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — TESTIMONIALS */}
      <section ref={statsRef} className="py-12 md:py-16 px-4 bg-transparent border-t border-pink-100/30">
        <div className="max-w-4xl mx-auto">
          {/* Centered Heading */}
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff4f8b] bg-[#ff4f8b]/10 px-4 py-1.5 rounded-full border border-[#ff4f8b]/20">
              IMPACT STORIES
            </span>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#1a202c] mt-4 mb-4 leading-tight tracking-tight">Stories of Change</h2>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-px bg-pink-200" />
              <div className="text-[14px] text-[#ff4f8b]">♥</div>
              <div className="w-12 h-px bg-pink-200" />
            </div>
          </div>

          {/* Testimonial slider */}
          <div className="relative max-w-3xl mx-auto flex items-center gap-4">
            {/* Left Button */}
            <button
              onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
              className="w-10 h-10 rounded-full bg-white border border-[#F0E6F6] hover:bg-[#ff4f8b]/10 hover:text-[#ff4f8b] hover:border-[#ff4f8b]/20 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
              aria-label="Previous story"
            >
              <svg className="w-5 h-5 text-[#2D3436]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Testimonial Card */}
            <div className="flex-1 bg-white border border-[#F0E6F6] rounded-3xl p-8 md:p-10 shadow-sm relative overflow-hidden">
              {/* Background quotes */}
              <span className="absolute top-2 left-6 text-7xl font-serif text-[#ff4f8b]/10 select-none">“</span>
              <span className="absolute bottom-2 right-6 text-7xl font-serif text-[#ff4f8b]/10 select-none">”</span>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
                <img
                  src={testimonials[activeTestimonial].image}
                  alt={testimonials[activeTestimonial].author}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover ring-4 ring-[#ff4f8b]/10 shrink-0 shadow-sm"
                />
                <div className="flex-1">
                  <p className="font-serif text-lg md:text-xl text-[#4a5568] font-medium mb-4 italic leading-relaxed">
                    "{testimonials[activeTestimonial].quote}"
                  </p>
                  <div>
                    <h4 className="font-bold text-base text-[#1a202c]">{testimonials[activeTestimonial].author}</h4>
                    <span className="text-[13px] text-[#ff4f8b] font-semibold">{testimonials[activeTestimonial].role}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Button */}
            <button
              onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
              className="w-10 h-10 rounded-full bg-white border border-[#F0E6F6] hover:bg-[#ff4f8b]/10 hover:text-[#ff4f8b] hover:border-[#ff4f8b]/20 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
              aria-label="Next story"
            >
              <svg className="w-5 h-5 text-[#2D3436]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Pagination */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeTestimonial === i ? 'bg-[#ff4f8b] w-6' : 'bg-[#F0E6F6] hover:bg-[#ff4f8b]/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — CALL TO ACTION */}
      <section className="relative overflow-hidden mb-12 px-4">
        <div className="max-w-5xl mx-auto">
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
                <button
                  onClick={() => navigate('/signup')}
                  className="h-12 px-8 rounded-full bg-white text-[#ff4f8b] font-semibold text-xs hover:bg-white/95 hover:shadow-xl transition-all duration-200 cursor-pointer"
                >
                  Join Now
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="h-12 px-8 rounded-full border-2 border-white/40 text-white font-semibold text-xs hover:bg-white/10 transition-all duration-200 cursor-pointer"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}
