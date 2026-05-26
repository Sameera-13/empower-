import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';

export default function About() {
  return (
    <PageContainer title="About Us — Empower Stop">
      
      {/* 1. Hero Banner */}
      <div className="bg-gradient-to-r from-[#FFF5F8] to-[#FFFFFF] w-full border-b border-[#FDF0F4]">
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 md:pt-12 md:pb-24 flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 relative z-10 lg:pr-12">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-800 mb-6">About Us</h1>
            <p className="text-gray-500 text-xl md:text-2xl mb-10 max-w-lg leading-relaxed">
              Empowering women with resources, support, and a community that inspires growth and confidence.
            </p>
            <Link to="/about#story">
              <button className="gradient-btn-pink text-white px-8 py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-all">
                Our Story
              </button>
            </Link>
          </div>
          
          <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center lg:justify-end w-full relative">
            <img src="/about/empower-collage.png" alt="About Us" className="w-full max-w-lg h-auto object-contain z-10" />
            {/* SVG decorative leaves */}
            <svg className="absolute -left-10 bottom-10 w-40 h-40 text-[#FF8DA1]/30 z-0" viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 100 C 20 80, 0 50, 30 20 C 60 50, 80 80, 50 100" />
              <path d="M30 20 C 50 0, 80 20, 100 50 C 70 80, 50 50, 30 20" />
            </svg>
            <div className="absolute top-0 right-10 w-6 h-6 rounded-full bg-[#FFD1DA] opacity-60"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
        
        {/* 2. Stats Bar */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="flex flex-col lg:flex-row items-center gap-4 text-center lg:text-left">
             <div className="w-14 h-14 rounded-full bg-pink-50 text-[#FF6B9D] flex items-center justify-center flex-shrink-0">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
             </div>
             <div>
               <h3 className="text-2xl font-bold text-gray-800">25K+</h3>
               <p className="text-xs text-gray-500 font-medium">Women Empowered</p>
             </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-4 text-center lg:text-left">
             <div className="w-14 h-14 rounded-full bg-pink-50 text-[#FF6B9D] flex items-center justify-center flex-shrink-0">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
             </div>
             <div>
               <h3 className="text-2xl font-bold text-gray-800">120+</h3>
               <p className="text-xs text-gray-500 font-medium">Resources & Guides</p>
             </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-4 text-center lg:text-left">
             <div className="w-14 h-14 rounded-full bg-pink-50 text-[#FF6B9D] flex items-center justify-center flex-shrink-0">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
             </div>
             <div>
               <h3 className="text-2xl font-bold text-gray-800">50+</h3>
               <p className="text-xs text-gray-500 font-medium">Expert Contributors</p>
             </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-4 text-center lg:text-left">
             <div className="w-14 h-14 rounded-full bg-pink-50 text-[#FF6B9D] flex items-center justify-center flex-shrink-0">
               <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
             </div>
             <div>
               <h3 className="text-2xl font-bold text-gray-800">10+</h3>
               <p className="text-xs text-gray-500 font-medium">Countries Reached</p>
             </div>
          </div>
        </div>

        {/* 3. Mission and Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#FFF5F8] rounded-[24px] p-8 md:p-10 flex gap-6 relative overflow-hidden">
             <div className="w-14 h-14 rounded-full bg-white text-[#FF6B9D] flex items-center justify-center flex-shrink-0 shadow-sm z-10">
               <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             </div>
             <div className="z-10">
               <h3 className="text-lg font-bold text-gray-800 mb-2">Our Mission</h3>
               <p className="text-gray-600 text-[13px] leading-relaxed">
                 To empower women by providing accessible resources, guidance, and a supportive community to help them thrive in every aspect of life.
               </p>
             </div>
             {/* Decorative leaf */}
             <svg className="absolute bottom-0 right-0 w-32 h-32 text-[#FF8DA1]/30 transform translate-x-4 translate-y-4" viewBox="0 0 100 100" fill="currentColor"><path d="M50 100 C 20 80, 0 50, 30 20 C 60 50, 80 80, 50 100" /></svg>
          </div>
          <div className="bg-[#F4FBF6] rounded-[24px] p-8 md:p-10 flex gap-6 relative overflow-hidden">
             <div className="w-14 h-14 rounded-full bg-white text-[#4CAF50] flex items-center justify-center flex-shrink-0 shadow-sm z-10">
               <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
             </div>
             <div className="z-10">
               <h3 className="text-lg font-bold text-gray-800 mb-2">Our Vision</h3>
               <p className="text-gray-600 text-[13px] leading-relaxed">
                 A world where every woman has the confidence, tools, and support to achieve her dreams and create positive change.
               </p>
             </div>
             <svg className="absolute bottom-0 right-0 w-32 h-32 text-[#4CAF50]/15 transform translate-x-4 translate-y-4" viewBox="0 0 100 100" fill="currentColor"><path d="M50 100 C 20 80, 0 50, 30 20 C 60 50, 80 80, 50 100" /></svg>
          </div>
        </div>

        {/* 4. Our Story */}
        <div id="story" className="flex flex-col lg:flex-row gap-12 items-center pt-8">
          <div className="lg:w-1/2">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-gray-800 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-500 text-[13px] leading-relaxed mb-8">
              <p>EmpowerStop was founded with a simple belief: every woman deserves access to the right resources, community, and opportunities to succeed.</p>
              <p>What started as a small initiative has grown into a platform that inspires and supports women around the world.</p>
              <p className="font-semibold text-gray-800 text-[14px]">We're so glad you're here!</p>
            </div>
            <Link to="/contact">
              <button className="gradient-btn-pink text-white px-8 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg transition-all text-sm">
                Learn More
              </button>
            </Link>
          </div>
          <div className="lg:w-1/2">
             <div className="rounded-[32px] overflow-hidden shadow-sm">
                <img src="https://www.empowerstop.com/web/image/1778-e6eba054/Empower%20Stop%20%283%29.jpg" alt="Our Story" className="w-full h-[280px] object-cover" />
             </div>
          </div>
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
