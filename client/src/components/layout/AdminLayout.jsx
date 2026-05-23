import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from './AdminSidebar';
import SkipToContent from '../common/SkipToContent';

export default function AdminLayout({ children }) {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#FFFDF7]">
      <SkipToContent />
      <div className="hidden md:block">
        <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-[#FFFFFF] border-b border-[#F0E6F6] flex items-center justify-between px-4 md:px-6">
          <button className="md:hidden p-2 rounded-lg hover:bg-[#F0E6F6]" onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
            <svg className="w-5 h-5 text-[#2D3436]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-base font-semibold text-[#2D3436]">Admin</h1>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-sm text-[#FF6B9D] hover:text-[#2D3436] transition-colors">← Back to Site</Link>
            <div className="flex items-center gap-2">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full object-cover" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-[#FF6B9D] text-white flex items-center justify-center text-xs font-bold">
                  {user?.name?.[0]?.toUpperCase()}
                </div>
              )}
              <span className="text-sm font-medium text-[#2D3436]/70 hidden sm:inline">{user?.name}</span>
            </div>
          </div>
        </header>
        {collapsed && (
          <div className="md:hidden fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black/50" onClick={() => setCollapsed(false)} />
            <div className="fixed left-0 top-0 bottom-0">
              <AdminSidebar collapsed={false} onToggle={() => setCollapsed(false)} />
            </div>
          </div>
        )}
        <main id="main-content" className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
