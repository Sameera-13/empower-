import { useState, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import Badge from '../components/common/Badge';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { useBlogPosts } from '../hooks/useBlog';
import { useCategories } from '../hooks/useCategories';
import { useTags } from '../hooks/useTags';

function BlogCard({ post }) {
  const readTime = '5 min read';

  return (
    <Link to={`/blog/${post.slug}`} className="group block h-full">
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#FF6B9D]/20 h-full flex flex-col">
        <div className="aspect-[16/11] bg-[#FAFAFA] overflow-hidden relative">
          {post.coverImage ? (
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#F0E6F6]">
              <svg className="w-12 h-12 text-[#FF6B9D]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
            </div>
          )}
          {post.category && (
            <div className="absolute bottom-3 left-3">
              <span className="px-3 py-1 bg-white/95 text-[#FF6B9D] text-[10px] uppercase tracking-wider font-bold rounded-full shadow-sm">
                {post.category}
              </span>
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2 group-hover:text-[#FF6B9D] transition-colors">{post.title}</h3>
          {post.excerpt && <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-grow">{post.excerpt}</p>}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
            <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Just now'}
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {readTime}
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-pink-50 text-[#FF6B9D] flex items-center justify-center group-hover:bg-[#FF6B9D] group-hover:text-white transition-colors flex-shrink-0 ml-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Blog() {
  const [category, setCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);

  const { data: catData } = useCategories();
  const categories = (catData?.data || catData || []).filter((c) => c.isActive !== false);

  const { data: tagData } = useTags();
  const tags = tagData?.data || tagData || [];

  const params = { page, limit: 9, sort };
  if (category) params.category = category;
  if (selectedTag) params.tag = selectedTag;
  if (search) params.search = search;

  const { data, isLoading } = useBlogPosts(params);
  const posts = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);

  const activeCount = [category, selectedTag, search].filter(Boolean).length;

  const clearAllFilters = () => {
    setCategory('');
    setSelectedTag('');
    setSearch('');
    setSearchInput('');
    setSort('newest');
    setPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  // close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setFilterOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const popularPosts = posts.slice(0, 4);

  return (
    <PageContainer title="Blog — Empower Stop">
      {/* Full-bleed Banner */}
      <div className="bg-gradient-to-br from-[#FFFDF7] to-white w-full border-b border-[#F0E6F6] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16 flex items-center justify-between relative z-10">
          <div className="max-w-2xl relative z-10">
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#ff4f8b] bg-[#ff4f8b]/10 px-3 py-1 rounded-full mb-4 border border-[#ff4f8b]/20">Stories & Tips</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-[#2D3436] mb-4">Our Blog</h1>
            <p className="text-[#2D3436]/60 text-lg md:text-xl leading-relaxed">Inspiring stories, practical tips, and expert advice to empower your everyday life.</p>
          </div>
          {/* Abstract illustration elements */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:flex items-center justify-center opacity-90 pointer-events-none">
            {/* Leaves / Notes abstract SVG */}
            <svg className="w-[400px] h-full absolute right-10" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M120 180 C100 120, 150 100, 180 150 Z" fill="#ff4f8b" opacity="0.1" />
              <path d="M150 200 C130 140, 180 120, 210 170 Z" fill="#FF8E71" opacity="0.1" />
              <path d="M180 150 L200 80 L220 160 Z" fill="#FFD93D" opacity="0.2" />
              <circle cx="250" cy="100" r="4" fill="#ff4f8b" opacity="0.4" />
              <circle cx="280" cy="120" r="3" fill="#ff4f8b" opacity="0.3" />
              <circle cx="260" cy="80" r="5" fill="#ff4f8b" opacity="0.5" />
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Top Horizontal Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
          {/* Quick Categories */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            <button
              onClick={() => { setCategory(''); setPage(1); }}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                !category ? 'bg-[#2D3436] text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            {categories.slice(0, 5).map(cat => (
              <button
                key={cat._id}
                onClick={() => { setCategory(cat.name); setPage(1); }}
                className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                  category === cat.name ? 'bg-[#ff4f8b] text-white shadow-md' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative flex-1 md:w-64">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-gray-200 bg-white text-[#2D3436] focus:outline-none focus:border-[#ff4f8b] focus:ring-2 focus:ring-[#ff4f8b]/10 transition-all"
              />
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </form>
          </div>
        </div>

        {/* Active Filters Display */}
        {activeCount > 0 && (
          <div className="flex items-center gap-2 mb-8 flex-wrap">
            <span className="text-sm font-bold text-gray-500 mr-2">Active Filters:</span>
            {search && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff4f8b]/10 text-xs font-bold text-[#ff4f8b]">
                Search: "{search}"
                <button onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }} className="hover:text-[#2D3436]">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </span>
            )}
            {category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff4f8b]/10 text-xs font-bold text-[#ff4f8b]">
                Category: {category}
                <button onClick={() => { setCategory(''); setPage(1); }} className="hover:text-[#2D3436]">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </span>
            )}
            <button onClick={clearAllFilters} className="text-xs font-bold text-gray-400 hover:text-[#2D3436] ml-2">Clear all</button>
          </div>
        )}

        {/* Blog Grid */}
        <div className="w-full">
          {isLoading ? (
            <LoadingSpinner size="lg" className="py-20" />
          ) : posts.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl overflow-hidden h-full flex flex-col">
                  <div className="aspect-[16/11] bg-gradient-to-br from-gray-100 to-gray-50 animate-pulse flex items-center justify-center">
                    <span className="text-gray-300 font-bold tracking-widest text-sm uppercase">Coming Soon</span>
                  </div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                    <div className="h-3 bg-gray-100 rounded w-full mb-2 animate-pulse"></div>
                    <div className="h-3 bg-gray-100 rounded w-5/6 mb-4 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => <BlogCard key={post._id} post={post} />)}
            </div>
          )}

          <div className="mt-10">
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
        </div>

        {/* Bottom Section: Popular & Newsletter (Moved from sidebar) */}
        <div className="mt-20 pt-16 border-t border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Popular Posts Mini List */}
          <div>
            <h3 className="font-display font-bold text-2xl text-[#2D3436] mb-6">Trending Topics</h3>
            <div className="flex flex-col gap-4">
              {popularPosts.length > 0 ? popularPosts.map(post => (
                <Link key={`pop-${post._id}`} to={`/blog/${post.slug}`} className="flex gap-4 group items-center p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                  <img src={post.coverImage || 'https://via.placeholder.com/150'} alt="" className="w-20 h-20 rounded-xl object-cover bg-gray-100 shadow-sm flex-shrink-0" />
                  <div>
                    <h4 className="text-base font-bold text-[#2D3436] line-clamp-2 leading-snug group-hover:text-[#ff4f8b] transition-colors">{post.title}</h4>
                    <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-wide">
                      {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Just now'}
                    </p>
                  </div>
                </Link>
              )) : (
                <p className="text-sm text-gray-400 italic">More trending posts coming soon.</p>
              )}
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="bg-gradient-to-br from-[#FFF5F8] to-white border border-[#F0E6F6] rounded-3xl p-10 text-center shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-white text-[#ff4f8b] flex items-center justify-center mx-auto mb-6 shadow-sm">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="font-display font-bold text-2xl text-[#2D3436] mb-3">Stay Inspired</h3>
            <p className="text-[#2D3436]/60 leading-relaxed mb-8 max-w-sm mx-auto">Get the latest stories, tips, and safety guides delivered straight to your inbox.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email" className="w-full px-5 py-3 text-sm rounded-full border border-gray-200 focus:outline-none focus:border-[#ff4f8b] focus:ring-2 focus:ring-[#ff4f8b]/10 transition-all shadow-sm" />
              <button type="submit" className="bg-gradient-to-r from-[#ff4f8b] to-[#FF8E71] text-white px-8 py-3 text-sm rounded-full font-bold shadow-lg shadow-[#ff4f8b]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
