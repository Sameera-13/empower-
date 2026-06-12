import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';
import CartIcon from '../domain/CartIcon';
import MobileDrawer from './MobileDrawer';
import NotificationBell from '../domain/NotificationBell';

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/shop', label: 'Shop' },
  { to: '/blog', label: 'Blog' },
];

const aboutDropdownItems = [
  {
    to: '/partners',
    label: 'Partners',
    icon: (
      <svg className="w-5 h-5 text-[#4a5568]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    to: '/media-coverage',
    label: 'Media Coverage',
    icon: (
      <svg className="w-5 h-5 text-[#4a5568]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
  },
];

export default function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-b border-[#F0E6F6]">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff4f8b] to-[#FF8E71] text-white flex items-center justify-center shadow-md shadow-[#ff4f8b]/20 group-hover:shadow-lg group-hover:-translate-y-0.5 transition-all duration-300">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-display text-2xl md:text-3xl tracking-tight font-bold text-[#2D3436]">
            Empower<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4f8b] to-[#FF8E71]">Stop</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-base font-semibold transition-all duration-200 ${
                  isActive ? 'text-[#2D3436] nav-active-bright' : 'text-[#2D3436]/60 hover:text-[#2D3436] hover:bg-[#F0E6F6]/50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-base font-semibold transition-all duration-200 ${
                aboutOpen ? 'bg-[#3A82F6] text-white' : 'text-[#2D3436]/60 hover:text-[#2D3436] hover:bg-[#F0E6F6]/50'
              }`}
            >
              About Us
              <svg className={`w-4 h-4 transition-transform duration-200 ${aboutOpen ? 'rotate-180 text-white' : 'text-[#2D3436]/60'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {aboutOpen && (
              <div className="absolute top-full left-0 mt-1 w-[260px] bg-white border border-gray-100 rounded-xl shadow-xl shadow-black/5 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                {aboutDropdownItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    className="flex items-center gap-3 px-5 py-2.5 hover:bg-gray-50/80 transition-colors group"
                    onClick={() => setAboutOpen(false)}
                  >
                    <div className="flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-[15px] font-medium text-[#4a5568] group-hover:text-[#1a202c]">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <NotificationBell />
          <CartIcon />
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-medium text-[#2D3436]/70 hover:bg-[#F0E6F6] transition-colors"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover ring-2 ring-[#FF6B9D]/30" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-[#FF6B9D] text-white flex items-center justify-center text-xs font-bold">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                )}
                {user.name}
                <svg className="w-3.5 h-3.5 text-[#2D3436]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute right-0 mt-1 w-48 bg-[#FFFFFF] border border-[#F0E6F6] rounded-lg shadow-xl shadow-black/30 py-1 z-50">
                    <Link to="/profile" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-[#2D3436]/70 hover:bg-[#F0E6F6] hover:text-[#2D3436]">Profile</Link>
                    {isAdmin && (
                      <Link to="/admin/dashboard" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-[#2D3436]/70 hover:bg-[#F0E6F6] hover:text-[#2D3436]">Admin Dashboard</Link>
                    )}
                    <hr className="my-1 border-[#F0E6F6]" />
                    <button onClick={() => { logout(); setDropdownOpen(false); }} className="w-full text-left px-4 py-2 text-sm text-[#EF5350] hover:bg-[#F0E6F6]">Sign Out</button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link to="/login"><Button variant="ghost">Log In</Button></Link>
              <Link to="/signup"><Button>Sign Up</Button></Link>
            </>
          )}
        </div>

        <button className="md:hidden p-2 -mr-2 rounded-md hover:bg-[#F0E6F6] transition-colors" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
          <svg className="w-5 h-5 text-[#2D3436]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <MobileDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </nav>
  );
}
