import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';

export default function About() {
  return (
    <PageContainer title="About Us — Empower Stop">
      
      {/* 1. Hero Banner & Stats (Combined 2-Column Layout) */}
      <div className="bg-gradient-to-br from-[#FFFDF7] to-white w-full border-b border-[#F0E6F6] relative overflow-hidden">
        {/* Soft background shapes */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#FF6B9D]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 z-0" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FFD93D]/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 z-0" />

        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Left Column: Content & Compact Stats */}
          <div>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#ff4f8b] bg-[#ff4f8b]/10 px-3 py-1 rounded-full mb-4 border border-[#ff4f8b]/20">Our Journey</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-[#2D3436] mb-4 leading-[1.1]">
              About Us
            </h1>
            <p className="text-[#2D3436]/60 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
              Empowering women with resources, support, and a community that inspires growth and confidence.
            </p>
            <div className="mb-10">
              <Link to="/about#story">
                <button className="h-12 px-8 rounded-full bg-gradient-to-r from-[#ff4f8b] to-[#FF8E71] text-white font-bold shadow-lg shadow-[#ff4f8b]/20 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300">
                  Read Our Story
                </button>
              </Link>
            </div>

            {/* Compact Stats Row */}
            <div className="grid grid-cols-3 gap-4 p-5 bg-white/60 backdrop-blur-md rounded-2xl border border-white shadow-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#2D3436] mb-1">25K+</div>
                <div className="text-[10px] uppercase font-bold text-[#2D3436]/40 tracking-wider">Empowered</div>
              </div>
              <div className="text-center border-l border-gray-100">
                <div className="text-2xl font-bold text-[#2D3436] mb-1">120+</div>
                <div className="text-[10px] uppercase font-bold text-[#2D3436]/40 tracking-wider">Resources</div>
              </div>
              <div className="text-center border-l border-gray-100">
                <div className="text-2xl font-bold text-[#2D3436] mb-1">50+</div>
                <div className="text-[10px] uppercase font-bold text-[#2D3436]/40 tracking-wider">Partners</div>
              </div>
            </div>
          </div>
          
          {/* Right Column: Overlapping Collage */}
          <div className="relative flex justify-center items-center h-[400px] md:h-[500px]">
            <div className="absolute right-4 top-4 w-[60%] h-[70%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10 hover:-translate-y-2 transition-transform duration-500">
              <img src="/about/empower-collage.png" alt="Community" className="w-full h-full object-cover" />
            </div>
            <div className="absolute left-4 bottom-4 w-[55%] h-[60%] rounded-3xl overflow-hidden shadow-xl border-4 border-white z-20 hover:-translate-y-2 transition-transform duration-500 delay-100">
              <img src="https://www.empowerstop.com/web/image/1778-e6eba054/Empower%20Stop%20%283%29.jpg" alt="Artisans" className="w-full h-full object-cover" />
            </div>
            {/* Decorative abstract svg */}
            <svg className="absolute -left-6 top-20 w-32 h-32 text-[#FFD93D]/20 z-0 animate-spin-slow" viewBox="0 0 100 100" fill="currentColor">
               <path d="M50 0 C 60 40, 90 40, 100 50 C 60 60, 60 90, 50 100 C 40 60, 10 60, 0 50 C 40 40, 40 10, 50 0" />
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        
        {/* 2. Mission and Vision (Compacted) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-[#FFF5F8] to-white border border-[#F0E6F6] rounded-3xl p-8 hover:shadow-lg transition-all duration-300 group">
             <div className="w-12 h-12 rounded-2xl bg-white text-[#ff4f8b] flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             </div>
             <h3 className="text-xl font-bold text-[#2D3436] mb-3">Our Mission</h3>
             <p className="text-[#2D3436]/60 text-sm leading-relaxed">
               To empower women by providing accessible resources, guidance, and a supportive community to help them thrive in every aspect of life.
             </p>
          </div>
          <div className="bg-gradient-to-br from-[#F4FBF6] to-white border border-[#E9F5EB] rounded-3xl p-8 hover:shadow-lg transition-all duration-300 group">
             <div className="w-12 h-12 rounded-2xl bg-white text-[#6BCB77] flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
             </div>
             <h3 className="text-xl font-bold text-[#2D3436] mb-3">Our Vision</h3>
             <p className="text-[#2D3436]/60 text-sm leading-relaxed">
               A world where every woman has the confidence, tools, and support to achieve her dreams and create positive change.
             </p>
          </div>
        </div>

        {/* 3. Our Story (Moved Image to hero, keep text focused) */}
        <div id="story" className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-display font-bold text-[#2D3436] mb-6">Our Story</h2>
          <div className="text-[#2D3436]/60 text-base leading-relaxed space-y-4 mb-8">
            <p>EmpowerStop was founded with a simple belief: every woman deserves access to the right resources, community, and opportunities to succeed.</p>
            <p>What started as a small initiative has grown into a platform that inspires and supports women around the world.</p>
            <p className="font-bold text-[#2D3436]">We're so glad you're here!</p>
          </div>
          <Link to="/contact">
            <button className="h-11 px-8 rounded-full border-2 border-[#ff4f8b] text-[#ff4f8b] font-bold text-sm hover:bg-[#ff4f8b] hover:text-white transition-colors duration-300">
              Get in Touch
            </button>
          </Link>
        </div>

        {/* 5. Our Values */}
        <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 p-10 mb-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-10">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
             
             <div className="flex flex-col gap-4 lg:px-4">
               <div className="w-12 h-12 rounded-full bg-pink-50 text-[#FF6B9D] flex items-center justify-center">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
               </div>
               <div>
                 <h4 className="font-bold text-gray-800 text-sm mb-1.5">Empowerment</h4>
                 <p className="text-[12px] text-gray-500 leading-relaxed">We uplift and inspire women to reach their full potential.</p>
               </div>
             </div>
             
             <div className="flex flex-col gap-4 pt-6 sm:pt-0 sm:pl-6 lg:px-6">
               <div className="w-12 h-12 rounded-full bg-pink-50 text-[#FF6B9D] flex items-center justify-center">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
               </div>
               <div>
                 <h4 className="font-bold text-gray-800 text-sm mb-1.5">Community</h4>
                 <p className="text-[12px] text-gray-500 leading-relaxed">We build a safe and inclusive space for connection.</p>
               </div>
             </div>

             <div className="flex flex-col gap-4 pt-6 sm:pt-0 sm:pl-6 lg:px-6">
               <div className="w-12 h-12 rounded-full bg-pink-50 text-[#FF6B9D] flex items-center justify-center">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
               </div>
               <div>
                 <h4 className="font-bold text-gray-800 text-sm mb-1.5">Growth</h4>
                 <p className="text-[12px] text-gray-500 leading-relaxed">We encourage continuous learning and self-improvement.</p>
               </div>
             </div>

             <div className="flex flex-col gap-4 pt-6 sm:pt-0 sm:pl-6 lg:px-6">
               <div className="w-12 h-12 rounded-full bg-pink-50 text-[#FF6B9D] flex items-center justify-center">
                 <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
               </div>
               <div>
                 <h4 className="font-bold text-gray-800 text-sm mb-1.5">Integrity</h4>
                 <p className="text-[12px] text-gray-500 leading-relaxed">We are honest, transparent, and committed to our mission.</p>
               </div>
             </div>

          </div>
        </div>

      </div>
    </PageContainer>
  );
}
