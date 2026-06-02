import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-[#F0E6F6] mt-auto bg-[#FFFDF7]">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff4f8b] to-[#FF8E71] text-white flex items-center justify-center shadow-md shadow-[#ff4f8b]/20">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl tracking-tight font-bold text-[#2D3436]">
                  Empower<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4f8b] to-[#FF8E71]">Stop</span>
                </h3>
              </div>
            <p className="text-base text-[#2D3436]/60 leading-relaxed mb-6 mt-4">
              Resources, community, and support for every woman.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/gullyclasses" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#F0E6F6] flex items-center justify-center text-[#2D3436]/50 hover:bg-[#FF6B9D]/15 hover:text-[#FF6B9D] transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="https://x.com/empowerstop" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#F0E6F6] flex items-center justify-center text-[#2D3436]/50 hover:bg-[#FF6B9D]/15 hover:text-[#FF6B9D] transition-colors" aria-label="X (Twitter)">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              <a href="https://www.instagram.com/empowerstop" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#F0E6F6] flex items-center justify-center text-[#2D3436]/50 hover:bg-[#FF6B9D]/15 hover:text-[#FF6B9D] transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
              <a href="https://in.linkedin.com/company/gullyclassesfoundation" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#F0E6F6] flex items-center justify-center text-[#2D3436]/50 hover:bg-[#FF6B9D]/15 hover:text-[#FF6B9D] transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="https://www.youtube.com/channel/UCTUvuCQdVQfLzUG6FgIHPVg" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#F0E6F6] flex items-center justify-center text-[#2D3436]/50 hover:bg-[#FF6B9D]/15 hover:text-[#FF6B9D] transition-colors" aria-label="YouTube">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#FF6B9D]/60 mb-4">Platform</h4>
            <div className="flex flex-col gap-3">
              <Link to="/services" className="text-base text-[#2D3436]/60 hover:text-[#ff4f8b] transition-colors">Services</Link>
              <Link to="/shop" className="text-base text-[#2D3436]/60 hover:text-[#FF6B9D] transition-colors">Shop</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#6BCB77]/60 mb-4">Company</h4>
            <div className="flex flex-col gap-3">
              <Link to="/about" className="text-base text-[#2D3436]/60 hover:text-[#FF6B9D] transition-colors">About Us</Link>
              <Link to="/blog" className="text-base text-[#2D3436]/60 hover:text-[#6BCB77] transition-colors">Blog</Link>
              <Link to="/contact" className="text-base text-[#2D3436]/60 hover:text-[#2D3436] transition-colors">Contact Us</Link>
              <Link to="/privacy-policy" className="text-base text-[#2D3436]/60 hover:text-[#FF6B9D] transition-colors">Privacy Policy</Link>
              <Link to="/return-policy" className="text-base text-[#2D3436]/60 hover:text-[#6BCB77] transition-colors">Return Policy</Link>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#EF5350]/60 mb-4">Emergency</h4>
            <a href="tel:181" className="inline-flex items-center gap-3 text-[#2D3436] font-semibold text-2xl">
              <span className="w-10 h-10 rounded-full bg-[#EF5350]/15 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-[#EF5350]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              181
            </a>
            <p className="text-sm text-[#2D3436]/50 mt-1.5 ml-12">Women Helpline (24/7)</p>
          </div>
        </div>

        <div className="border-t border-[#F0E6F6] mt-10 pt-6 text-center">
          <p className="text-xs text-[#2D3436]/30">Copyright &copy; {new Date().getFullYear()} Empower Stop I Gully Classes Foundation</p>
        </div>
      </div>
    </footer>
  );
}
