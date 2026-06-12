import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import SearchBar from '../components/common/SearchBar';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { useProducts, usePriceRange } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { useTags } from '../hooks/useTags';
import { useCart } from '../context/CartContext';
import WishlistButton from '../components/domain/WishlistButton';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const outOfStock = product.stock <= 0;

  return (
    <div className="bg-white border border-[#F0E6F6] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#FF6B9D]/40 group relative">
      <div className="absolute top-3 right-3 z-10">
        <WishlistButton productId={product._id} />
      </div>
      <Link to={`/shop/${product._id}`} className="block">
        <div className="aspect-square bg-[#FAFAFA] overflow-hidden">
          {product.images?.[0] ? (
            <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#2D3436]/20">
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/shop/${product._id}`}>
          <h3 className="font-semibold text-[#2D3436] text-sm line-clamp-2 mb-2 hover:text-[#FF6B9D] transition-colors">{product.title}</h3>
        </Link>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-[#FF6B9D]">&#8377;{product.price.toLocaleString('en-IN')}</span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-sm text-[#2D3436]/40 line-through">&#8377;{product.compareAtPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
        <button
          onClick={() => !outOfStock && addToCart(product)}
          disabled={outOfStock}
          className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
            outOfStock
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'gradient-btn-pink text-white hover:shadow-lg'
          }`}
        >
          {outOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

function PriceSlider({ min, max, value, onChange }) {
  const range = max - min || 1;
  const leftPercent = ((value[0] - min) / range) * 100;
  const rightPercent = ((value[1] - min) / range) * 100;

  return (
    <div className="w-48">
      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
        <span>&#8377;{value[0]}</span>
        <span>&#8377;{value[1]}</span>
      </div>
      <div className="relative h-2 bg-gray-200 rounded-full">
        <div
          className="absolute h-2 bg-[#FF6B9D] rounded-full"
          style={{ left: `${leftPercent}%`, width: `${rightPercent - leftPercent}%` }}
        />
        <input
          type="range" min={min} max={max} value={value[0]}
          onChange={(e) => {
            const v = Math.min(Number(e.target.value), value[1] - 1);
            onChange([v, value[1]]);
          }}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#FF6B9D] [&::-webkit-slider-thumb]:shadow"
          style={{ top: 0 }}
        />
        <input
          type="range" min={min} max={max} value={value[1]}
          onChange={(e) => {
            const v = Math.max(Number(e.target.value), value[0] + 1);
            onChange([value[0], v]);
          }}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-auto cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#FF6B9D] [&::-webkit-slider-thumb]:shadow"
          style={{ top: 0 }}
        />
      </div>
    </div>
  );
}

export default function Shop() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [priceRange, setPriceRange] = useState(null);
  const [page, setPage] = useState(1);
  const [tagsOpen, setTagsOpen] = useState(false);

  const { data: categoriesData } = useCategories();
  const { data: tagsData } = useTags();
  const { data: priceData } = usePriceRange();

  const categories = categoriesData?.data || [];
  const allTags = tagsData?.data || [];
  const pMin = priceData?.data?.min || 0;
  const pMax = priceData?.data?.max || 10000;
  const currentRange = priceRange || [pMin, pMax];

  const params = { page, limit: 12 };
  if (search) params.search = search;
  if (category) params.category = category;
  if (selectedTags.length > 0) params.tags = selectedTags.join(',');
  if (priceRange) {
    params.minPrice = priceRange[0];
    params.maxPrice = priceRange[1];
  }

  const { data, isLoading } = useProducts(params);
  const products = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handleSearch = useCallback((val) => { setSearch(val); setPage(1); }, []);

  const toggleTag = (tagId) => {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
    setPage(1);
  };

  return (
    <PageContainer title="Shop — Empower Stop">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Banner - Reduced Height */}
        <div className="relative overflow-hidden bg-white/60 backdrop-blur-xl rounded-[2.5rem] py-10 px-8 md:py-12 md:px-16 mb-12 flex items-center justify-between border border-white shadow-sm hover:shadow-md transition-shadow">
          <div className="max-w-xl relative z-10">
            <h1 className="text-4xl md:text-[56px] font-serif font-bold text-[#1a202c] mb-4 leading-tight tracking-tight">Artisan Shop</h1>
            <p className="text-[#4a5568] text-[17px] font-medium leading-[1.8]">Discover empowering products designed for you.</p>
          </div>
          {/* Abstract illustrations */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden md:block opacity-90 pointer-events-none">
            {/* Outline Circle */}
            <div className="absolute bottom-[20%] left-[30%] w-12 h-12 rounded-full border-[4px] border-[#FFD1DA] opacity-80" />
            <div className="absolute top-[15%] right-[15%] w-8 h-8 rounded-full border-[5px] border-[#FFE4E8] opacity-80" />
            {/* SVG Bag Illustration */}
            <svg className="absolute bottom-[-20%] right-[10%] w-56 h-56 opacity-90 drop-shadow-sm" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M70 70L50 180H150L130 70H70Z" fill="#ff4f8b" fillOpacity="0.2"/>
              <path d="M80 70V50C80 38.9543 88.9543 30 100 30C111.046 30 120 38.9543 120 50V70" stroke="#ff4f8b" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.3"/>
              <path d="M120 70L100 180H170L150 70H120Z" fill="#FF8E71" fillOpacity="0.1"/>
              <path d="M180 140C180 140 170 130 160 140C150 150 140 130 140 130" stroke="#FF5C8A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Compact Horizontal Filter Row */}
        <div className="bg-white/80 backdrop-blur-md rounded-[1.25rem] shadow-[0_2px_10px_rgb(0,0,0,0.02)] border border-white/50 p-2 mb-10 flex flex-wrap items-center gap-2 relative z-20">
          <SearchBar value={search} onChange={handleSearch} placeholder="Search products..." className="flex-1 min-w-[200px] h-10" />

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="h-10 px-4 min-w-[140px] rounded-lg border-none bg-gray-50 text-sm font-semibold text-[#2D3436] focus:outline-none focus:ring-2 focus:ring-[#ff4f8b]/20 cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>

          {/* Tags Multi-Select Dropdown */}
          <div className="relative">
            <button
              onClick={() => setTagsOpen(!tagsOpen)}
              className="h-10 px-4 min-w-[100px] rounded-lg border-none bg-gray-50 text-sm font-semibold text-[#2D3436] flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#ff4f8b]/20 cursor-pointer"
            >
              <span>Tags {selectedTags.length > 0 && <span className="bg-[#ff4f8b] text-white text-[10px] rounded-full w-4 h-4 inline-flex items-center justify-center ml-1">{selectedTags.length}</span>}</span>
              <svg className={`w-3.5 h-3.5 transition-transform ${tagsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {tagsOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setTagsOpen(false)} />
                <div className="absolute top-12 left-0 z-20 bg-white border border-gray-100 rounded-xl shadow-xl py-2 min-w-[200px] max-h-60 overflow-y-auto">
                  {allTags.length === 0 ? (
                    <p className="px-3 py-2 text-sm text-gray-400">No tags yet</p>
                  ) : allTags.map((tag) => (
                    <label key={tag._id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag._id)}
                        onChange={() => toggleTag(tag._id)}
                        className="rounded border-gray-300 text-[#ff4f8b] focus:ring-[#ff4f8b]"
                      />
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: tag.color || '#ff4f8b' }} />
                      <span className="text-sm text-gray-700 font-medium">{tag.name}</span>
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Price Range Slider */}
          {pMax > pMin && (
            <div className="flex items-center ml-auto border-l border-gray-100 pl-4 py-1 h-10 hidden lg:flex">
              <PriceSlider
                min={pMin}
                max={pMax}
                value={currentRange}
                onChange={(val) => { setPriceRange(val); setPage(1); }}
              />
            </div>
          )}

          {/* Clear Filters */}
          {(category || selectedTags.length > 0 || priceRange || search) && (
            <button
              onClick={() => { setCategory(''); setSelectedTags([]); setPriceRange(null); setSearch(''); setPage(1); }}
              className="h-10 px-4 text-xs font-bold text-[#ff4f8b] hover:bg-[#ff4f8b]/10 rounded-lg transition-colors"
            >
              Clear all
            </button>
          )}
        </div>



        {isLoading ? (
          <LoadingSpinner size="lg" className="py-20" />
        ) : products.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-sm border border-white/50 p-16 flex flex-col items-center justify-center text-center">
            <div className="w-32 h-32 relative mb-6">
              <div className="absolute inset-0 bg-[#ff4f8b]/10 rounded-full blur-xl"></div>
              {/* Pink Bag Illustration */}
              <svg className="absolute inset-0 w-full h-full p-4 drop-shadow-md" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 70H150V160C150 165.523 145.523 170 140 170H60C54.4772 170 50 165.523 50 160V70Z" fill="#ff4f8b" fillOpacity="0.8"/>
                <path d="M60 70H140V160C140 165.523 135.523 170 130 170H70C64.4772 170 60 165.523 60 160V70Z" fill="#FF8E71"/>
                <path d="M70 70V50C70 33.4315 83.4315 20 100 20C116.569 20 130 33.4315 130 50V70" stroke="#FF8E71" strokeWidth="8" strokeLinecap="round"/>
              </svg>
            </div>
            <h3 className="text-3xl font-serif font-bold text-[#1a202c] mb-3">No products found</h3>
            <p className="text-[17px] text-[#4a5568] font-medium mb-8 max-w-sm">We couldn't find anything matching your filters. Try adjusting them or clear them all to see our full collection.</p>
            <button
              onClick={() => { setCategory(''); setSelectedTags([]); setPriceRange(null); setSearch(''); setPage(1); }}
              className="bg-gradient-to-r from-[#ff4f8b] to-[#FF8E71] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-[#ff4f8b]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              Browse All Products
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
            <div className="mt-12 flex justify-center">
               <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </>
        )}

        {/* Compact Features Banner (Moved Below Grid) */}
        <div className="mt-20 flex flex-wrap justify-center gap-6 md:gap-12 py-8 border-t border-gray-100">
          <div className="flex flex-col items-center text-center gap-2 max-w-[120px]">
            <div className="w-10 h-10 rounded-full bg-[#ff4f8b]/10 text-[#ff4f8b] flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
            </div>
            <div>
              <p className="font-bold text-[#2D3436] text-xs uppercase tracking-wide">Curated</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-2 max-w-[120px]">
            <div className="w-10 h-10 rounded-full bg-[#ff4f8b]/10 text-[#ff4f8b] flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <div>
              <p className="font-bold text-[#2D3436] text-xs uppercase tracking-wide">Secure</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-2 max-w-[120px]">
            <div className="w-10 h-10 rounded-full bg-[#ff4f8b]/10 text-[#ff4f8b] flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            </div>
            <div>
              <p className="font-bold text-[#2D3436] text-xs uppercase tracking-wide">Fast</p>
            </div>
          </div>
          <div className="flex flex-col items-center text-center gap-2 max-w-[120px]">
            <div className="w-10 h-10 rounded-full bg-[#ff4f8b]/10 text-[#ff4f8b] flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </div>
            <div>
              <p className="font-bold text-[#2D3436] text-xs uppercase tracking-wide">Returns</p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
