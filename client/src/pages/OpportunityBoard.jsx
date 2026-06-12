import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useOpportunities, useToggleSave } from '../hooks/useOpportunities';
import PageContainer from '../components/layout/PageContainer';
import SearchBar from '../components/common/SearchBar';
import Pagination from '../components/common/Pagination';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import OpportunityCard from '../components/domain/OpportunityCard';

const types = [
  { value: '', label: 'All' },
  { value: 'scholarship', label: 'Scholarships' },
  { value: 'internship', label: 'Internships' },
  { value: 'job', label: 'Jobs' },
  { value: 'skill-development', label: 'Skill Development' },
];

export default function OpportunityBoard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialType = searchParams.get('type') || '';

  const { user } = useAuth();
  const toggleSave = useToggleSave();

  const [type, setType] = useState(initialType);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useOpportunities({
    type: type || undefined,
    search: search || undefined,
    page,
    limit: 12,
  });

  const opportunities = data?.data || [];
  const totalPages = data?.totalPages || 1;

  const handleTypeChange = (t) => {
    setType(t);
    setPage(1);
    if (t) {
      setSearchParams({ type: t });
    } else {
      setSearchParams({});
    }
  };

  const handleToggleSave = (id) => {
    toggleSave.mutate(id);
  };

  return (
    <PageContainer>
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <h1 className="text-4xl md:text-[56px] font-serif font-bold text-[#1a202c] mb-6 leading-tight tracking-tight">
          Opportunity Board
        </h1>

        {/* Type Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {types.map((t) => (
            <button
              key={t.value}
              onClick={() => handleTypeChange(t.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                type === t.value
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white/80 backdrop-blur-md text-gray-600 border border-white/50 hover:bg-white shadow-sm'
              }`}
            >
              {t.label}
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
          placeholder="Search opportunities..."
          className="mb-6 max-w-md"
        />

        {/* Content */}
        {isLoading ? (
          <LoadingSpinner className="py-20" />
        ) : opportunities.length === 0 ? (
          <EmptyState
            title="No opportunities found"
            description="Try adjusting your filters or check back soon for new listings."
            icon={
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {opportunities.map((opp) => (
                <OpportunityCard
                  key={opp._id}
                  opportunity={opp}
                  onToggleSave={handleToggleSave}
                />
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
