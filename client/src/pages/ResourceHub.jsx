import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useResources } from '../hooks/useResources';
import { useEmergencyNumbers } from '../hooks/useSafety';
import PageContainer from '../components/layout/PageContainer';
import SearchBar from '../components/common/SearchBar';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import ResourceCard from '../components/domain/ResourceCard';

const categories = [
  { value: '', label: 'All' },
  { value: 'legal', label: 'Legal' },
  { value: 'health', label: 'Health' },
  { value: 'self-defense', label: 'Self Defense' },
  { value: 'govt-scheme', label: 'Govt Schemes' },
  { value: 'emergency', label: 'Emergency' },
];

export default function ResourceHub() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';

  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useResources({
    category: category || undefined,
    search: search || undefined,
    page,
    limit: 12,
  });

  const { data: emergencyData, isLoading: loadingNumbers } = useEmergencyNumbers();

  const resources = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const emergencyNumbers = emergencyData?.data || [];

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPage(1);
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  return (
    <PageContainer>
      {/* Emergency Strip */}
      <div className="bg-danger text-white">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="text-sm font-semibold">Emergency Helplines</span>
          </div>
          {!loadingNumbers && (
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {emergencyNumbers.map((en) => (
                <a
                  key={en.number}
                  href={`tel:${en.number}`}
                  className="text-sm hover:underline inline-flex items-center gap-1"
                >
                  <span className="font-semibold">{en.name}:</span>
                  <span>{en.number}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-display text-dark mb-6">
          Resource Hub
        </h1>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === cat.value
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 border border-border hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <SearchBar
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
          placeholder="Search resources..."
          className="mb-6 max-w-md"
        />

        {/* Content */}
        {isLoading ? (
          <LoadingSpinner className="py-20" />
        ) : resources.length === 0 ? (
          <EmptyState
            title="No resources found"
            description="Try adjusting your filters or search term."
            icon={
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.map((resource) => (
                <ResourceCard key={resource._id} resource={resource} />
              ))}
            </div>
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </PageContainer>
  );
}
