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
  { to: '/about', label: 'About Us' },
  { to: '/safety', label: 'Safety' },
];

export default function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-b border-[#F0E6F6]">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.jpg" alt="Empower Stop" className="h-9 w-9 rounded-full object-cover" />
          <span className="text-lg font-bold text-[#2D3436]">Empower<span className="gradient-text-pink-green">Stop</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive ? 'text-[#2D3436] nav-active-bright' : 'text-[#2D3436]/60 hover:text-[#2D3436] hover:bg-[#F0E6F6]/50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
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
