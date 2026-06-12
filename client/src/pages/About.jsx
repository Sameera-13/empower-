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
        
        {/* 2. Mission and Vision (Redesigned) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Mission Card */}
          <div className="relative bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(255,107,157,0.15)] border-l-[12px] border-[#FF6B9D] p-10 md:p-12 overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
            {/* Top Right Dot Grid */}
            <div className="absolute top-8 right-8 w-16 h-12 bg-[radial-gradient(#FF6B9D_2px,transparent_2px)] bg-[size:10px_10px] opacity-30"></div>
            
            {/* Bottom Left Floral/Leaf SVG */}
            <div className="absolute -bottom-2 -left-2 w-32 h-32 text-pink-200 opacity-60 pointer-events-none transform -rotate-12">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 100 C 30 80, 10 60, 20 40 C 30 20, 50 10, 70 30 C 90 50, 70 80, 50 100 Z" />
                <path d="M0 80 C 20 70, 40 50, 30 20 C 20 0, 0 10, 0 30 C 0 50, -10 70, 0 80 Z" />
              </svg>
            </div>

            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-[#FFF0F5] border-2 border-pink-100 flex items-center justify-center mb-6 relative z-10 shadow-sm">
              <svg className="w-8 h-8 text-[#FF6B9D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            
            <h3 className="text-3xl font-bold text-[#1a202c] mb-2 relative z-10">Our Mission</h3>
            <div className="w-10 h-[3px] bg-[#FF6B9D] rounded-full mb-6 relative z-10"></div>
            
            <p className="text-[#4a5568] text-[17px] leading-[1.7] relative z-10 font-medium">
              To empower women by providing accessible resources, guidance, and a supportive community to help them thrive in every aspect of life.
            </p>
          </div>

          {/* Vision Card */}
          <div className="relative bg-white rounded-3xl shadow-[0_10px_40px_-10px_rgba(107,203,119,0.15)] border-l-[12px] border-[#6BCB77] p-10 md:p-12 overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
            {/* Top Right Dot Grid */}
            <div className="absolute top-8 right-8 w-16 h-12 bg-[radial-gradient(#6BCB77_2px,transparent_2px)] bg-[size:10px_10px] opacity-30"></div>
            
            {/* Bottom Right Floral/Leaf SVG */}
            <div className="absolute -bottom-2 -right-2 w-32 h-32 text-green-200 opacity-60 pointer-events-none transform rotate-12">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d="M50 100 C 70 80, 90 60, 80 40 C 70 20, 50 10, 30 30 C 10 50, 30 80, 50 100 Z" />
                <path d="M100 80 C 80 70, 60 50, 70 20 C 80 0, 100 10, 100 30 C 100 50, 110 70, 100 80 Z" />
              </svg>
            </div>

            {/* Icon */}
            <div className="w-16 h-16 rounded-full bg-[#F4FBF6] border-2 border-green-100 flex items-center justify-center mb-6 relative z-10 shadow-sm">
              <svg className="w-8 h-8 text-[#6BCB77]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            
            <h3 className="text-3xl font-bold text-[#1a202c] mb-2 relative z-10">Our Vision</h3>
            <div className="w-10 h-[3px] bg-[#6BCB77] rounded-full mb-6 relative z-10"></div>
            
            <p className="text-[#4a5568] text-[17px] leading-[1.7] relative z-10 font-medium">
              A world where every woman has the confidence, tools, and support to achieve her dreams and create positive change.
            </p>
          </div>
        </div>

        {/* 3. Our Story */}
        <div id="story" className="max-w-4xl mx-auto text-center relative pt-8">
          
          {/* Subtle background wavy lines */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none opacity-[0.04] -z-10">
            <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#FF6B9D]" strokeWidth="0.5">
              <path d="M0 50 Q 25 25, 50 50 T 100 50" />
              <path d="M0 60 Q 25 35, 50 60 T 100 60" />
              <path d="M0 40 Q 25 15, 50 40 T 100 40" />
            </svg>
          </div>

          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[2px] bg-pink-100" />
            <div className="w-2 h-1 bg-pink-200 rounded-full" />
            <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center shadow-inner">
               <span className="text-xl text-[#ff4f8b]">♥</span>
            </div>
            <div className="w-2 h-1 bg-pink-200 rounded-full" />
            <div className="w-8 h-[2px] bg-pink-100" />
          </div>

          <h2 className="text-5xl md:text-[56px] font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F8B] to-[#FF9F43] mb-6 inline-block leading-tight pb-1">
            Our Story
          </h2>
          
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="w-12 h-px bg-gray-200" />
            <div className="w-1 h-1 rounded-full bg-[#ff4f8b]" />
            <div className="text-[14px] text-[#ff4f8b]">♥</div>
            <div className="w-1 h-1 rounded-full bg-[#ff4f8b]" />
            <div className="w-12 h-px bg-gray-200" />
          </div>

          <div className="text-[#4a5568] text-[17px] md:text-[19px] leading-[1.8] space-y-8 mb-12 max-w-3xl mx-auto font-medium">
            <p>EmpowerStop was founded with a simple belief: every woman deserves access<br className="hidden md:block"/> to the right resources, community, and opportunities to succeed.</p>
            <p>What started as a small initiative has grown into a platform<br className="hidden md:block"/> that inspires and supports women around the world.</p>
          </div>

          <div className="flex items-center justify-center gap-4 mt-12 mb-10">
            <svg className="w-8 h-8 text-[#ff4f8b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M8 6L14 10" />
              <path d="M6 12H14" />
              <path d="M8 18L14 14" />
            </svg>
            <p className="font-serif italic font-bold text-[#ff4f8b] text-2xl md:text-3xl tracking-wide">
              We're so glad you're here!
            </p>
            <svg className="w-8 h-8 text-[#ff4f8b]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M16 6L10 10" />
              <path d="M18 12H10" />
              <path d="M16 18L10 14" />
            </svg>
          </div>
        </div>

        {/* 5. Our Values */}
        <div className="bg-[#FFFDF7] rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50 p-10 md:p-16 mb-16 text-center relative overflow-hidden">
          
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-pink-50/40 via-white to-orange-50/40 rounded-full blur-3xl -z-10"></div>

          <div className="flex justify-center items-center gap-4 mb-4">
            <svg className="w-8 h-8 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
               <path d="M15 5L9 14" />
               <path d="M5 10L14 15" />
            </svg>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a202c]">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4F8B] via-[#FF9F43] to-[#6BCB77]">Values</span>
            </h2>
            <svg className="w-8 h-8 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
               <path d="M9 5L15 14" />
               <path d="M19 10L10 15" />
            </svg>
          </div>
          
          <div className="flex items-center justify-center gap-3 mb-16">
            <div className="w-12 h-px bg-pink-200" />
            <div className="text-[14px] text-[#ff4f8b]">♥</div>
            <div className="w-12 h-px bg-pink-200" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 sm:gap-y-16 text-center divide-y sm:divide-y-0 sm:divide-x divide-pink-100/50">
             
             {/* Col 1: Empowerment */}
             <div className="flex flex-col items-center lg:px-6 pt-8 sm:pt-0">
               <div className="relative mb-8">
                 <div className="absolute -top-2 -right-3 w-[72px] h-[72px] rounded-full border border-dashed border-pink-300 opacity-60"></div>
                 <span className="absolute top-1/2 -left-4 text-pink-400 text-lg">✦</span>
                 <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-100 to-pink-50 border-4 border-white shadow-[0_4px_15px_rgba(255,107,157,0.2)] flex items-center justify-center relative z-10">
                   <svg className="w-8 h-8 text-[#FF6B9D] drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <circle cx="12" cy="7" r="3" />
                     <path strokeLinecap="round" strokeLinejoin="round" d="M4 15l4-4h8l4 4M12 11v8M9 22l3-3 3 3" />
                   </svg>
                 </div>
               </div>
               <div className="bg-[#FFF0F5] text-[#FF6B9D] font-bold text-lg px-6 py-2 rounded-full mb-4 shadow-sm border border-pink-50">
                 Empowerment
               </div>
               <div className="w-6 h-[3px] bg-[#FF6B9D] rounded-full mb-5 opacity-80"></div>
               <p className="text-[15px] text-[#4a5568] leading-relaxed font-medium">
                 We uplift and inspire women to reach their full potential and lead confident lives.
               </p>
             </div>
             
             {/* Col 2: Community */}
             <div className="flex flex-col items-center lg:px-6 pt-8 sm:pt-0">
               <div className="relative mb-8">
                 <div className="absolute -top-2 -right-3 w-[72px] h-[72px] rounded-full border border-dashed border-pink-400 opacity-50"></div>
                 <span className="absolute -bottom-1 -right-2 text-pink-400 text-sm">♥</span>
                 <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-100 to-rose-50 border-4 border-white shadow-[0_4px_15px_rgba(255,79,139,0.2)] flex items-center justify-center relative z-10">
                   <svg className="w-9 h-9 text-[#FF4F8B] drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                   </svg>
                 </div>
               </div>
               <div className="bg-[#FFF0F5] text-[#FF4F8B] font-bold text-lg px-6 py-2 rounded-full mb-4 shadow-sm border border-pink-50">
                 Community
               </div>
               <div className="w-6 h-[3px] bg-[#FF4F8B] rounded-full mb-5 opacity-80"></div>
               <p className="text-[15px] text-[#4a5568] leading-relaxed font-medium">
                 We build a safe and inclusive space for connection, support, and belonging.
               </p>
             </div>

             {/* Col 3: Growth */}
             <div className="flex flex-col items-center lg:px-6 pt-8 sm:pt-0">
               <div className="relative mb-8">
                 <div className="absolute -top-2 -right-3 w-[72px] h-[72px] rounded-full border border-dashed border-green-400 opacity-60"></div>
                 <span className="absolute bottom-2 -left-3 text-green-500 text-lg">✦</span>
                 <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-green-50 border-4 border-white shadow-[0_4px_15px_rgba(107,203,119,0.2)] flex items-center justify-center relative z-10">
                   <svg className="w-8 h-8 text-[#6BCB77] drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                   </svg>
                 </div>
               </div>
               <div className="bg-[#F4FBF6] text-[#6BCB77] font-bold text-lg px-6 py-2 rounded-full mb-4 shadow-sm border border-green-50">
                 Growth
               </div>
               <div className="w-6 h-[3px] bg-[#6BCB77] rounded-full mb-5 opacity-80"></div>
               <p className="text-[15px] text-[#4a5568] leading-relaxed font-medium">
                 We encourage continuous learning and self-improvement to create a better tomorrow.
               </p>
             </div>

             {/* Col 4: Integrity */}
             <div className="flex flex-col items-center lg:px-6 pt-8 sm:pt-0">
               <div className="relative mb-8">
                 <div className="absolute -top-2 -right-3 w-[72px] h-[72px] rounded-full border border-dashed border-orange-300 opacity-70"></div>
                 <span className="absolute top-1/2 -left-4 text-orange-400 text-lg">✦</span>
                 <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-100 to-orange-50 border-4 border-white shadow-[0_4px_15px_rgba(255,159,67,0.2)] flex items-center justify-center relative z-10">
                   <svg className="w-8 h-8 text-[#FF9F43] drop-shadow-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                   </svg>
                 </div>
               </div>
               <div className="bg-[#FFF8EE] text-[#FF9F43] font-bold text-lg px-6 py-2 rounded-full mb-4 shadow-sm border border-orange-50">
                 Integrity
               </div>
               <div className="w-6 h-[3px] bg-[#FF9F43] rounded-full mb-5 opacity-80"></div>
               <p className="text-[15px] text-[#4a5568] leading-relaxed font-medium">
                 We are honest, transparent, and committed to our mission in everything we do.
               </p>
             </div>

          </div>
        </div>

      </div>
    </PageContainer>
  );
}
