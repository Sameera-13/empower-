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
      <div className="bg-gradient-to-r from-[#FFF5F8] to-[#FFFFFF] w-full border-b border-[#FDF0F4]">
        <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 md:pt-12 md:pb-24 flex items-center justify-between relative overflow-hidden">
          <div className="max-w-lg relative z-10">
            <div className="w-16 h-16 rounded-full border-[3px] border-[#FFE4E8] absolute -left-10 -top-8 opacity-70"></div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-dark mb-6">Our Blog</h1>
            <p className="text-gray-500 text-xl md:text-2xl mb-2">Inspiring stories, practical tips, and expert<br/>advice to empower your everyday.</p>
          </div>
          {/* Abstract illustration elements */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden md:flex items-center justify-center opacity-90 pointer-events-none">
            {/* Leaves / Notes abstract SVG */}
            <svg className="w-[400px] h-full absolute right-10" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M120 180 C100 120, 150 100, 180 150 Z" fill="#FF8DA1" opacity="0.8" />
              <path d="M150 200 C130 140, 180 120, 210 170 Z" fill="#FFB3C1" opacity="0.6" />
              <path d="M180 150 L200 80 L220 160 Z" fill="#FFD1DA" opacity="0.9" />
              <circle cx="250" cy="100" r="4" fill="#FF6B9D" opacity="0.4" />
              <circle cx="280" cy="120" r="3" fill="#FF6B9D" opacity="0.3" />
              <circle cx="260" cy="80" r="5" fill="#FF6B9D" opacity="0.5" />
              {/* Binder rings mock */}
              <circle cx="200" cy="60" r="5" stroke="#FF6B9D" strokeWidth="2" />
              <circle cx="195" cy="80" r="5" stroke="#FF6B9D" strokeWidth="2" />
              <circle cx="190" cy="100" r="5" stroke="#FF6B9D" strokeWidth="2" />
              <circle cx="185" cy="120" r="5" stroke="#FF6B9D" strokeWidth="2" />
              <circle cx="180" cy="140" r="5" stroke="#FF6B9D" strokeWidth="2" />
              <circle cx="175" cy="160" r="5" stroke="#FF6B9D" strokeWidth="2" />
              <circle cx="170" cy="180" r="5" stroke="#FF6B9D" strokeWidth="2" />
              <circle cx="165" cy="200" r="5" stroke="#FF6B9D" strokeWidth="2" />
              {/* Pen mock */}
              <rect x="250" y="70" width="10" height="120" rx="5" transform="rotate(-15 250 70)" fill="#FF8DA1" />
              <path d="M220 182 L225 195 L230 180 Z" fill="#FF6B9D" />
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column: Latest Articles */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Latest Articles</h2>
            
            {/* Active filter chips inside the article column */}
            {activeCount > 0 && (
              <div className="flex items-center gap-2 mb-6 flex-wrap">
                {search && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0E6F6] text-xs text-[#2D3436]/70">
                    "{search}"
                    <button onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }} className="hover:text-[#FF6B9D]">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </span>
                )}
                {category && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0E6F6] text-xs text-[#2D3436]/70">
                    {category}
                    <button onClick={() => { setCategory(''); setPage(1); }} className="hover:text-[#FF6B9D]">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </span>
                )}
                {selectedTag && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0E6F6] text-xs text-[#2D3436]/70">
                    #{selectedTag}
                    <button onClick={() => { setSelectedTag(''); setPage(1); }} className="hover:text-[#FF6B9D]">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </span>
                )}
                <button onClick={clearAllFilters} className="text-xs text-[#FF6B9D] hover:underline ml-1">Clear all</button>
              </div>
            )}

            {isLoading ? (
              <LoadingSpinner size="lg" className="py-20" />
            ) : posts.length === 0 ? (
              <EmptyState
                title="No blog posts yet"
                description="Check back soon for stories and updates!"
                icon={<svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>}
              />
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-8">
                  {posts.map((post) => <BlogCard key={post._id} post={post} />)}
                </div>
                
                {posts.length > 0 && (
                  <div className="mt-12 mb-8 flex justify-center">
                    <button className="gradient-btn-pink text-white px-8 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all">
                      View All Articles
                    </button>
                  </div>
                )}
              </>
            )}

            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
          </div>

          {/* Right Column: Sidebar */}
          <div className="w-full lg:w-[340px] flex flex-col gap-8 lg:-mt-[112px]">
            {/* Search and Filter */}
            <div className="flex items-center gap-2 z-20">
              <form onSubmit={handleSearch} className="relative flex-1">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-full border border-gray-100 shadow-sm bg-white text-[#2D3436] placeholder:text-gray-400 focus:outline-none focus:border-[#FF6B9D]/50 focus:ring-1 focus:ring-[#FF6B9D]/20 transition-all"
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {search && (
                  <button type="button" onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF6B9D]">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                )}
              </form>

              {/* Filter dropdown */}
              <div className="relative" ref={filterRef}>
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full shadow-sm transition-all ${
                    activeCount > 0
                      ? 'gradient-btn-pink text-white'
                      : 'bg-white border border-gray-100 text-gray-600 hover:border-[#FF6B9D]/40'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filter
                </button>

                {filterOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 z-50">
                    {/* Sort */}
                    <div className="mb-4">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Sort by</label>
                      <select
                        value={sort}
                        onChange={(e) => { setSort(e.target.value); setPage(1); }}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-100 bg-white text-gray-700 focus:outline-none focus:border-[#FF6B9D]/50 cursor-pointer"
                      >
                        <option value="newest">Newest first</option>
                        <option value="oldest">Oldest first</option>
                      </select>
                    </div>

                    {/* Category */}
                    <div className="mb-4">
                      <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Category</label>
                      <select
                        value={category}
                        onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-gray-100 bg-white text-gray-700 focus:outline-none focus:border-[#FF6B9D]/50 cursor-pointer"
                      >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Tags */}
                    {tags.length > 0 && (
                      <div className="mb-5">
                        <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Tag</label>
                        <div className="flex flex-wrap gap-1.5">
                          {tags.map((t) => (
                            <button
                              key={t._id}
                              onClick={() => { setSelectedTag(selectedTag === t.name ? '' : t.name); setPage(1); }}
                              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                                selectedTag === t.name
                                  ? 'text-white shadow-sm'
                                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                              }`}
                              style={selectedTag === t.name ? { backgroundColor: t.color || '#FF6B9D' } : {}}
                            >
                              {t.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <button
                        onClick={clearAllFilters}
                        className="text-xs text-[#FF6B9D] font-medium hover:underline disabled:opacity-30 disabled:no-underline"
                        disabled={activeCount === 0 && sort === 'newest'}
                      >
                        Clear all
                      </button>
                      <button
                        onClick={() => setFilterOpen(false)}
                        className="px-4 py-2 text-xs font-bold rounded-full gradient-btn-pink text-white"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Popular Posts */}
            <div className="bg-white rounded-[24px] shadow-sm border border-gray-100/80 p-6 pt-5">
              <h3 className="font-bold text-gray-800 text-[15px] mb-5">Popular Posts</h3>
              <div className="flex flex-col gap-5">
                {popularPosts.length > 0 ? popularPosts.map(post => (
                  <Link key={`pop-${post._id}`} to={`/blog/${post.slug}`} className="flex gap-4 group items-center">
                    <img src={post.coverImage || 'https://via.placeholder.com/150'} alt="" className="w-[72px] h-[72px] rounded-[16px] object-cover bg-gray-50 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-[#FF6B9D] transition-colors">{post.title}</h4>
                      <p className="text-xs text-gray-400 mt-1.5 font-medium">
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Just now'}
                      </p>
                    </div>
                  </Link>
                )) : (
                  <p className="text-sm text-gray-400">No popular posts yet.</p>
                )}
              </div>
            </div>
            
            {/* Stay Inspired */}
            <div className="bg-[#FFF5F8] rounded-[24px] p-6 pb-7">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-800 text-[15px]">Stay Inspired</h3>
                <div className="w-9 h-9 rounded-full bg-pink-100 text-[#FF6B9D] flex items-center justify-center">
                  <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-5 pr-4">Get the latest stories and tips delivered to your inbox.</p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Enter your email" className="w-full px-4 py-2.5 text-sm rounded-xl border border-transparent focus:outline-none focus:border-[#FF6B9D]/30 focus:ring-2 focus:ring-[#FF6B9D]/10" />
                <button type="submit" className="gradient-btn-pink text-white px-5 py-2.5 text-sm rounded-xl font-bold shadow-md whitespace-nowrap hover:shadow-lg transition-all">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
