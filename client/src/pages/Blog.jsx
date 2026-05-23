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
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <div className="bg-white border border-[#F0E6F6] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#FF6B9D]/40">
        <div className="aspect-[16/9] bg-[#FAFAFA] overflow-hidden">
          {post.coverImage ? (
            <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#F0E6F6]">
              <svg className="w-12 h-12 text-[#FF6B9D]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant={post.category}>{post.category}</Badge>
            <span className="text-xs text-[#2D3436]/40">
              {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
            </span>
          </div>
          <h3 className="font-semibold text-[#2D3436] text-lg mb-2 line-clamp-2 group-hover:text-[#FF6B9D] transition-colors">{post.title}</h3>
          {post.excerpt && <p className="text-sm text-[#2D3436]/50 line-clamp-2">{post.excerpt}</p>}
          <div className="flex items-center gap-2 mt-4">
            {post.author?.avatar ? (
              <img src={post.author.avatar} alt="" className="w-6 h-6 rounded-full object-cover" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-[#FF6B9D] text-white flex items-center justify-center text-xs font-bold">
                {post.author?.name?.[0]?.toUpperCase()}
              </div>
            )}
            <span className="text-xs text-[#2D3436]/50">{post.author?.name}</span>
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

  return (
    <PageContainer title="Blog — Empower Stop">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-display text-dark">Our Blog</h1>

          <div className="flex items-center gap-3">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search posts..."
                className="w-48 sm:w-56 pl-9 pr-3 py-2 text-sm rounded-full border border-[#F0E6F6] bg-white text-[#2D3436] placeholder:text-[#2D3436]/40 focus:outline-none focus:border-[#FF6B9D]/50 focus:ring-1 focus:ring-[#FF6B9D]/20 transition-all"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2D3436]/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {search && (
                <button type="button" onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#2D3436]/30 hover:text-[#FF6B9D]">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </form>

            {/* Filter dropdown */}
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setFilterOpen(!filterOpen)}
                className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all ${
                  activeCount > 0
                    ? 'gradient-btn-pink text-white border-transparent'
                    : 'bg-white border-[#F0E6F6] text-[#2D3436]/70 hover:border-[#FF6B9D]/40'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter
                {activeCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-white/30 text-xs flex items-center justify-center">{activeCount}</span>
                )}
              </button>

              {filterOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#F0E6F6] p-4 z-50">
                  {/* Sort */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-[#2D3436]/50 uppercase tracking-wider mb-2">Sort by</label>
                    <select
                      value={sort}
                      onChange={(e) => { setSort(e.target.value); setPage(1); }}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#F0E6F6] bg-white text-[#2D3436] focus:outline-none focus:border-[#FF6B9D]/50 cursor-pointer"
                    >
                      <option value="newest">Newest first</option>
                      <option value="oldest">Oldest first</option>
                    </select>
                  </div>

                  {/* Category */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-[#2D3436]/50 uppercase tracking-wider mb-2">Category</label>
                    <select
                      value={category}
                      onChange={(e) => { setCategory(e.target.value); setPage(1); }}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-[#F0E6F6] bg-white text-[#2D3436] focus:outline-none focus:border-[#FF6B9D]/50 cursor-pointer"
                    >
                      <option value="">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Tags */}
                  {tags.length > 0 && (
                    <div className="mb-4">
                      <label className="block text-xs font-semibold text-[#2D3436]/50 uppercase tracking-wider mb-2">Tag</label>
                      <div className="flex flex-wrap gap-1.5">
                        {tags.map((t) => (
                          <button
                            key={t._id}
                            onClick={() => { setSelectedTag(selectedTag === t.name ? '' : t.name); setPage(1); }}
                            className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                              selectedTag === t.name
                                ? 'text-white shadow-sm'
                                : 'bg-[#F0E6F6]/60 text-[#2D3436]/60 hover:bg-[#F0E6F6]'
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
                  <div className="flex items-center justify-between pt-3 border-t border-[#F0E6F6]">
                    <button
                      onClick={clearAllFilters}
                      className="text-xs text-[#FF6B9D] hover:underline disabled:opacity-30 disabled:no-underline"
                      disabled={activeCount === 0 && sort === 'newest'}
                    >
                      Clear all
                    </button>
                    <button
                      onClick={() => setFilterOpen(false)}
                      className="px-4 py-1.5 text-xs font-medium rounded-full gradient-btn-pink text-white"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active filter chips */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => <BlogCard key={post._id} post={post} />)}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </PageContainer>
  );
}
