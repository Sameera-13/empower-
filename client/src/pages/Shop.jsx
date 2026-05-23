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
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-display text-dark mb-6">Shop</h1>

        {/* Filter Row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <SearchBar value={search} onChange={handleSearch} placeholder="Search products..." className="max-w-xs" />

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="h-10 px-3 rounded-lg border border-border bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#FF6B9D]/40"
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
              className="h-10 px-3 rounded-lg border border-border bg-white text-sm text-gray-700 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B9D]/40"
            >
              Tags {selectedTags.length > 0 && <span className="bg-[#FF6B9D] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{selectedTags.length}</span>}
              <svg className={`w-4 h-4 transition-transform ${tagsOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {tagsOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setTagsOpen(false)} />
                <div className="absolute top-12 left-0 z-20 bg-white border border-border rounded-lg shadow-lg py-2 min-w-[200px] max-h-60 overflow-y-auto">
                  {allTags.length === 0 ? (
                    <p className="px-3 py-2 text-sm text-gray-400">No tags yet</p>
                  ) : allTags.map((tag) => (
                    <label key={tag._id} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag._id)}
                        onChange={() => toggleTag(tag._id)}
                        className="rounded border-gray-300"
                      />
                      <span className="w-3 h-3 rounded-sm flex-shrink-0" style={{ backgroundColor: tag.color }} />
                      <span className="text-sm text-gray-700">{tag.name}</span>
                    </label>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Price Range Slider */}
          {pMax > pMin && (
            <PriceSlider
              min={pMin}
              max={pMax}
              value={currentRange}
              onChange={(val) => { setPriceRange(val); setPage(1); }}
            />
          )}

          {/* Clear Filters */}
          {(category || selectedTags.length > 0 || priceRange || search) && (
            <button
              onClick={() => { setCategory(''); setSelectedTags([]); setPriceRange(null); setSearch(''); setPage(1); }}
              className="text-sm text-[#FF6B9D] hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        {isLoading ? (
          <LoadingSpinner size="lg" className="py-20" />
        ) : products.length === 0 ? (
          <EmptyState
            title="No products found"
            description="Check back soon for new products!"
            icon={<svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}

        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </PageContainer>
  );
}
