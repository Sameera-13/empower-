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

        {/* 2.5 Skills & Opportunity (New Section) */}
        <div className="bg-gradient-to-br from-[#FFFDF7] to-white rounded-[32px] shadow-[0_8px_30px_rgb(255,107,157,0.04)] border border-pink-50/50 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#FF6B9D]/5 rounded-full blur-2xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#ff4f8b] bg-[#ff4f8b]/10 px-3 py-1 rounded-full mb-4 border border-[#ff4f8b]/20">Skills & Opportunity</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#2D3436] mb-6 leading-tight">
                Empowering Women Through Skills & Opportunity
              </h2>
              <div className="text-[#4a5568] text-[16px] leading-[1.8] space-y-5 font-medium">
                <p>
                  At <strong className="text-gray-800">EmpowerStop</strong>, we believe that every girl and woman deserves the opportunity to learn, grow, and become financially independent. Our mission is to empower women by providing practical, creative, and income-generating skill development programs.
                </p>
                <p>
                  We train girls and women in <strong className="text-[#ff4f8b]">Mehndi (Henna) Art, Stitching and Tailoring, and other creative and professional skills</strong>. These programs are designed to help women build confidence, develop practical abilities, and create opportunities to earn an income through employment, freelancing, home-based work, or entrepreneurship.
                </p>
                <p>
                  Our approach goes beyond skill training. We create a supportive environment where women can discover their potential, develop self-confidence, and take meaningful steps towards a more independent and secure future.
                </p>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="relative p-6 md:p-8 bg-gradient-to-br from-[#FFF0F5] to-pink-50/40 rounded-3xl border border-pink-100 shadow-sm relative overflow-hidden">
                <span className="absolute top-4 left-6 text-6xl text-pink-200 font-serif leading-none select-none pointer-events-none">“</span>
                <div className="relative z-10 pt-4">
                  <p className="font-serif italic font-bold text-[#ff4f8b] text-lg md:text-xl leading-relaxed text-center">
                    We don’t just teach skills—we empower women to turn their talent and creativity into confidence, opportunity, and independence.
                  </p>
                </div>
                <span className="absolute bottom-4 right-6 text-6xl text-pink-200 font-serif leading-none select-none pointer-events-none">”</span>
              </div>
            </div>
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

        {/* 4. Our Projects — What We Are Working On */}
        <div className="relative py-16 -mx-4 px-4 overflow-hidden">
          {/* Decorative floral/leaf SVGs */}
          <svg className="absolute top-0 left-0 w-40 h-40 text-pink-100 opacity-60 -translate-x-1/3 -translate-y-1/4 pointer-events-none" viewBox="0 0 200 200" fill="currentColor">
            <ellipse cx="80" cy="60" rx="60" ry="40" transform="rotate(-30 80 60)" />
            <ellipse cx="50" cy="100" rx="40" ry="25" transform="rotate(20 50 100)" />
            <ellipse cx="100" cy="120" rx="35" ry="20" transform="rotate(-15 100 120)" />
            <circle cx="30" cy="50" r="6" className="text-pink-200" />
            <circle cx="120" cy="40" r="4" className="text-pink-200" />
          </svg>
          <svg className="absolute top-10 right-0 w-48 h-48 text-green-100 opacity-50 translate-x-1/4 pointer-events-none" viewBox="0 0 200 200" fill="currentColor">
            <path d="M100 10 C130 30, 160 80, 140 120 C120 160, 80 170, 60 140 C40 110, 50 60, 80 30 Z" />
            <path d="M150 60 C170 70, 180 100, 170 130 C160 160, 140 150, 130 130 C120 110, 130 70, 150 60 Z" opacity="0.5" />
            <circle cx="160" cy="30" r="4" className="text-green-200" />
          </svg>
          <svg className="absolute bottom-0 left-10 w-32 h-32 text-pink-100 opacity-40 translate-y-1/3 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 0 C70 20, 80 50, 60 70 C40 90, 10 70, 20 50 C30 30, 30 10, 50 0 Z" />
          </svg>
          <svg className="absolute bottom-20 right-20 w-20 h-20 text-[#FFD93D] opacity-30 pointer-events-none" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="50" r="4" />
            <circle cx="30" cy="30" r="3" />
            <circle cx="70" cy="35" r="3" />
            <circle cx="40" cy="70" r="2" />
            <circle cx="65" cy="65" r="2" />
          </svg>

          {/* Section Header */}
          <div className="text-center mb-14 relative z-10">
            <span className="inline-block text-xs font-bold tracking-[0.25em] uppercase text-[#ff4f8b] bg-[#ff4f8b]/10 px-5 py-1.5 rounded-full mb-5 border border-[#ff4f8b]/20">
              Our Projects
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-[#1a202c] mb-4">
              What We Are Working On
            </h2>
            <p className="text-[#4a5568] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              We are creating real impact in women's lives through practical skills,
              <br className="hidden md:block" /> creativity, and opportunities for independence.
            </p>
          </div>

          {/* Project Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 relative z-10">

            {/* Stitching Classes Card */}
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-gray-100/60 overflow-hidden hover:-translate-y-1 transition-all duration-400 group">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 sm:h-full min-h-[260px] overflow-hidden">
                  <img
                    src="/about/stitching-classes.jpg"
                    alt="Stitching & Embroidery Classes - Artisan crafting a sunflower embroidery design"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
                    <p className="text-white text-xs font-bold leading-tight">Skill Today<br />Independent<br />Tomorrow</p>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6 sm:p-7 flex flex-col justify-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFF0F5] to-[#FFE0EC] flex items-center justify-center mb-4 shadow-sm border border-pink-100/50">
                    <svg className="w-6 h-6 text-[#FF6B9D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#1a202c] mb-1">Stitching Classes</h3>
                  <p className="text-sm font-semibold text-[#FF6B9D] italic mb-3">Empowering through skills</p>
                  <p className="text-[#4a5568] text-sm leading-relaxed mb-5">
                    We conduct regular stitching classes to help women learn tailoring, garment making, and basic fashion designing.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2.5 text-sm text-[#2D3436]">
                      <svg className="w-4 h-4 text-[#FF6B9D] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Beginners to Advanced Level</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-[#2D3436]">
                      <svg className="w-4 h-4 text-[#FF6B9D] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Practical & Hands-on Training</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-[#2D3436]">
                      <svg className="w-4 h-4 text-[#FF6B9D] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Certificate on Completion</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mehndi Art Classes Card */}
            <div className="bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-gray-100/60 overflow-hidden hover:-translate-y-1 transition-all duration-400 group">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-64 sm:h-full min-h-[260px] overflow-hidden">
                  <img
                    src="/about/mehndi-classes.png"
                    alt="Mehndi Art Classes - Women learning henna design"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm rounded-lg px-3 py-2">
                    <p className="text-white text-xs font-bold leading-tight">Creativity<br />Independence</p>
                  </div>
                </div>
                {/* Content */}
                <div className="p-6 sm:p-7 flex flex-col justify-center">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FFF0F5] to-[#FFE0EC] flex items-center justify-center mb-4 shadow-sm border border-pink-100/50">
                    <svg className="w-6 h-6 text-[#FF6B9D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-[#1a202c] mb-1">Mehndi Art Classes</h3>
                  <p className="text-sm font-semibold text-[#FF6B9D] italic mb-3">Creativity that empowers</p>
                  <p className="text-[#4a5568] text-sm leading-relaxed mb-5">
                    We teach beautiful mehndi designs to help women build a creative skill and earn through their talent.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2.5 text-sm text-[#2D3436]">
                      <svg className="w-4 h-4 text-[#FF6B9D] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Traditional to Modern Designs</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-[#2D3436]">
                      <svg className="w-4 h-4 text-[#FF6B9D] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Practice & Portfolio Building</span>
                    </li>
                    <li className="flex items-center gap-2.5 text-sm text-[#2D3436]">
                      <svg className="w-4 h-4 text-[#FF6B9D] flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Opportunities for Events</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* Stats Bar */}
          <div className="bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.06)] border border-gray-100/60 p-6 md:p-8 mb-10 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
              {/* Stat 1 */}
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFF0F5] to-[#FFE0EC] flex items-center justify-center shadow-sm flex-shrink-0 border border-pink-100/50">
                  <svg className="w-7 h-7 text-[#FF6B9D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-[#1a202c]">350+</div>
                  <div className="text-sm font-bold text-[#2D3436]">Women Trained</div>
                  <div className="text-xs text-[#2D3436]/50">Through our programs</div>
                </div>
              </div>
              {/* Stat 2 */}
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFF0F5] to-[#FFE0EC] flex items-center justify-center shadow-sm flex-shrink-0 border border-pink-100/50">
                  <svg className="w-7 h-7 text-[#FF6B9D]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-[#1a202c]">40+</div>
                  <div className="text-sm font-bold text-[#2D3436]">Training Batches</div>
                  <div className="text-xs text-[#2D3436]/50">Completed successfully</div>
                </div>
              </div>
              {/* Stat 3 */}
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FFF0F5] to-[#FFE0EC] flex items-center justify-center shadow-sm flex-shrink-0 border border-pink-100/50">
                  <svg className="w-7 h-7 text-[#6BCB77]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-[#1a202c]">20+</div>
                  <div className="text-sm font-bold text-[#2D3436]">Community Partners</div>
                  <div className="text-xs text-[#2D3436]/50">Supporting our mission</div>
                </div>
              </div>
              {/* Stat 4 */}
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F0FFF4] to-[#DCFFE4] flex items-center justify-center shadow-sm flex-shrink-0 border border-green-100/50">
                  <svg className="w-7 h-7 text-[#6BCB77]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div>
                  <div className="text-2xl md:text-3xl font-bold text-[#1a202c]">95%</div>
                  <div className="text-sm font-bold text-[#2D3436]">Success Stories</div>
                  <div className="text-xs text-[#2D3436]/50">Women are earning now</div>
                </div>
              </div>
            </div>
          </div>

          {/* Inspirational Quote */}
          <div className="text-center relative z-10 py-4">
            <div className="flex items-center justify-center gap-3">
              <span className="text-[#FF6B9D] text-xl">♥</span>
              <p className="text-[#4a5568] text-base md:text-lg italic font-medium max-w-2xl">
                "When a woman learns a skill, she builds a better tomorrow for herself and her family."
              </p>
            </div>
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
