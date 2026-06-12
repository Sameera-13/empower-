import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../common/Button';

const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/shop', label: 'Shop' },
  { to: '/blog', label: 'Blog' },
];

const aboutItems = [
  { to: '/about', label: 'About Us' },
  { to: '/partners', label: 'Partners' },
  { to: '/media-coverage', label: 'Media Coverage' },
];

export default function MobileDrawer({ isOpen, onClose }) {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const [aboutOpen, setAboutOpen] = useState(false);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed left-0 top-0 bottom-0 w-72 bg-[#FFFDF7] border-r border-[#F0E6F6] flex flex-col">
        <div className="flex items-center justify-between px-5 h-14 border-b border-[#F0E6F6]">
          <span className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#2D3436]">Empower<span className="gradient-text-pink-green">Stop</span></span>
          </span>
          <button onClick={onClose} aria-label="Close menu" className="p-1.5 rounded-md hover:bg-[#F0E6F6]">
            <svg className="w-5 h-5 text-[#2D3436]/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 py-3 px-3">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={onClose}
              className={({ isActive }) => `block px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 mb-0.5 ${isActive ? 'text-[#2D3436] nav-active-bright' : 'text-[#2D3436]/60 hover:bg-[#F0E6F6]/50'}`}>
              {link.label}
            </NavLink>
          ))}

          <button onClick={() => setAboutOpen(!aboutOpen)} className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 mb-0.5 text-[#2D3436]/60 hover:bg-[#F0E6F6]/50">
            About Us
            <svg className={`w-4 h-4 transition-transform ${aboutOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {aboutOpen && (
            <div className="pl-4 pr-2 space-y-0.5 mb-2 border-l-2 border-[#F0E6F6] ml-4 mt-1">
              {aboutItems.map(item => (
                <NavLink key={item.to} to={item.to} onClick={onClose} className="block px-3 py-2 rounded-lg text-sm text-[#2D3436]/60 hover:text-[#2D3436] hover:bg-[#F0E6F6]/50">
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
          {isAuthenticated && (
            <>
              <hr className="my-2 border-[#F0E6F6]" />
              <NavLink to="/profile" onClick={onClose} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#2D3436]/60 hover:bg-[#F0E6F6]/50">Profile</NavLink>
              {isAdmin && <NavLink to="/admin/dashboard" onClick={onClose} className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#2D3436]/60 hover:bg-[#F0E6F6]/50">Admin</NavLink>}
            </>
          )}
        </div>
        <div className="px-4 py-4 border-t border-[#F0E6F6]">
          {isAuthenticated ? (
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#2D3436]/60 truncate">{user.name}</span>
              <Button variant="ghost" onClick={() => { logout(); onClose(); }}>Sign Out</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link to="/login" onClick={onClose}><Button variant="secondary" className="w-full">Log In</Button></Link>
              <Link to="/signup" onClick={onClose}><Button className="w-full">Sign Up</Button></Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
