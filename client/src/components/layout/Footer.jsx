import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="pt-20 pb-10 px-4 md:px-8 bg-white overflow-hidden relative">
      
      {/* Decorative Floral Backgrounds */}
      <div className="absolute bottom-0 left-0 w-48 h-48 opacity-40 pointer-events-none -translate-x-1/4 translate-y-1/4">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-pink-300 fill-none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0,100 C20,70 50,50 100,30" />
          <path d="M30,80 C50,70 60,85 50,100 C40,85 20,85 30,80 Z" />
          <path d="M60,55 C80,45 90,60 80,75 C70,60 50,60 60,55 Z" />
        </svg>
      </div>
      <div className="absolute bottom-0 right-0 w-48 h-48 opacity-40 pointer-events-none translate-x-1/4 translate-y-1/4 scale-x-[-1]">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-green-300 fill-none" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M0,100 C20,70 50,50 100,30" />
          <path d="M30,80 C50,70 60,85 50,100 C40,85 20,85 30,80 Z" />
          <path d="M60,55 C80,45 90,60 80,75 C70,60 50,60 60,55 Z" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto bg-gradient-to-br from-[#FFFDF7] via-pink-50/30 to-orange-50/20 rounded-[3rem] p-10 md:p-16 border border-pink-50/50 shadow-[0_8px_30px_rgb(255,79,139,0.03)] relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          
          {/* Brand Column */}
          <div className="md:col-span-4 lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#ff758c] to-[#ff4f8b] text-white flex items-center justify-center shadow-md shadow-[#ff4f8b]/20">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v6M9 15h6" />
                </svg>
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#1a202c]">
                Empower<span className="text-[#ff4f8b]">Stop</span>
              </h3>
            </div>
            
            <p className="text-[15px] text-gray-500 leading-relaxed mb-8 max-w-sm">
              Empowering women. Building skills.<br/>
              Creating safe, equal, and confident<br/>
              communities.
            </p>
            
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/gullyclasses" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-[#ff4f8b] hover:bg-[#ff4f8b] hover:text-white transition-all shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="https://x.com/empowerstop" target="_blank" rel="noopener noreferrer" aria-label="X (formerly Twitter)" className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-[#ff4f8b] hover:bg-[#ff4f8b] hover:text-white transition-all shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://www.instagram.com/empowerstop?igsh=dzNteXR0bW1vNjFz" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-[#ff4f8b] hover:bg-[#ff4f8b] hover:text-white transition-all shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href="https://in.linkedin.com/company/gullyclassesfoundation" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-[#ff4f8b] hover:bg-[#ff4f8b] hover:text-white transition-all shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="https://www.youtube.com/channel/UCTUvuCQdVQfLzUG6FgIHPVg" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-[#ff4f8b] hover:bg-[#ff4f8b] hover:text-white transition-all shadow-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-[13px] font-bold uppercase tracking-widest text-[#ff4f8b] mb-2">Platform</h4>
            <div className="w-6 h-[2px] bg-[#ff4f8b] mb-6 rounded-full" />
            <div className="flex flex-col gap-4">
              <Link to="/services" className="text-[15px] text-[#4a5568] hover:text-[#ff4f8b] transition-colors font-medium">Services</Link>
              <Link to="/shop" className="text-[15px] text-[#4a5568] hover:text-[#ff4f8b] transition-colors font-medium">Shop</Link>
            </div>
          </div>

          <div className="md:col-span-3 lg:col-span-2">
            <h4 className="text-[13px] font-bold uppercase tracking-widest text-[#6BCB77] mb-2">Company</h4>
            <div className="w-6 h-[2px] bg-[#6BCB77] mb-6 rounded-full" />
            <div className="flex flex-col gap-4">
              <Link to="/about" className="text-[15px] text-[#4a5568] hover:text-[#6BCB77] transition-colors font-medium">About Us</Link>
              <Link to="/blog" className="text-[15px] text-[#4a5568] hover:text-[#6BCB77] transition-colors font-medium">Blog</Link>
              <Link to="/contact" className="text-[15px] text-[#4a5568] hover:text-[#6BCB77] transition-colors font-medium">Contact Us</Link>
              <Link to="/privacy-policy" className="text-[15px] text-[#4a5568] hover:text-[#6BCB77] transition-colors font-medium">Privacy Policy</Link>
              <Link to="/return-policy" className="text-[15px] text-[#4a5568] hover:text-[#6BCB77] transition-colors font-medium">Terms of Use</Link>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="md:col-span-12 lg:col-span-3">
            <h4 className="text-[13px] font-bold uppercase tracking-widest text-[#EF5350] mb-2">Newsletter</h4>
            <div className="w-6 h-[2px] bg-[#EF5350] mb-6 rounded-full" />
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-[#ff4f8b] shrink-0 mt-1 shadow-sm border border-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#1a202c] mb-1">181</div>
                <div className="text-[13px] text-gray-500 font-medium">New smiling partners 🎉</div>
              </div>
            </div>

            <form className="flex flex-col sm:flex-row gap-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-white border border-pink-100 rounded-full px-5 py-3 text-[14px] text-gray-700 focus:outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100 transition-all shadow-sm"
              />
              <button 
                type="submit" 
                className="bg-gradient-to-r from-[#ff758c] to-[#ff4f8b] text-white font-bold text-[14px] px-6 py-3 rounded-full shadow-[0_4px_15px_rgb(255,79,139,0.3)] hover:shadow-[0_6px_20px_rgb(255,79,139,0.4)] hover:-translate-y-0.5 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-t border-pink-100/60 mt-16 pt-8 flex flex-col md:flex-row items-center justify-center gap-2">
          <p className="text-[13px] text-gray-400 font-medium flex items-center gap-2">
            <span className="text-[#ff4f8b]">♥</span> 
            © {new Date().getFullYear()} EmpowerStop Foundation. All rights reserved. 
            <span className="text-[#ff4f8b]">♥</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
