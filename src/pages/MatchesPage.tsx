import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import type { MatchFilters, Match } from '../services/api';
import Card from '../components/Card';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { fetchMatches } from '../services/api';

const MatchesPage = () => {
  const [filters, setFilters] = useState<MatchFilters>({
    category: 'all',
    date: new Date().toISOString().split('T')[0],
    search: '',
    page: 1,
    limit: 10,
  });

  const {
    data,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useQuery<{ data: Match[]; total: number }>({
    queryKey: ['matches', filters],
    queryFn: () => fetchMatches(filters),
    placeholderData: keepPreviousData,
  });

  const matches = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / (filters.limit || 10));

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setFilters(prev => ({ ...prev, page: newPage }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category, page: 1 }));
  };

  const handleDateChange = (date: string) => {
    setFilters(prev => ({ ...prev, date, page: 1 }));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('search') as string;
    setFilters(prev => ({ ...prev, search: searchTerm, page: 1 }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">مسابقات</h1>

      {/* فیلترها و جستجو */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-8 space-y-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            {['all', 'فوتبال', 'بسکتبال', 'تنیس', 'والیبال'].map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full transition ${
                  filters.category === cat
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat === 'all' ? 'همه' : cat}
              </button>
            ))}
          </div>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => handleDateChange(e.target.value)}
            className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            name="search"
            defaultValue={filters.search}
            placeholder="جستجوی تیم، لیگ یا ورزشکار..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition"
          >
            جستجو
          </button>
        </form>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : error ? (
        <div className="text-center py-12 text-red-500">
          <p>خطا در دریافت مسابقات. لطفاً دوباره تلاش کنید.</p>
          <button
            onClick={() => refetch()}
            className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg"
          >
            تلاش مجدد
          </button>
        </div>
      ) : matches.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          هیچ مسابقه‌ای با این فیلترها یافت نشد.
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {matches.map((match) => (
              <Card key={match.id} {...match} variant="horizontal" />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => goToPage(filters.page! - 1)}
                disabled={filters.page === 1}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                قبلی
              </button>
              <span className="px-3 py-1">
                صفحه {filters.page} از {totalPages}
              </span>
              <button
                onClick={() => goToPage(filters.page! + 1)}
                disabled={filters.page === totalPages}
                className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
              >
                بعدی
              </button>
            </div>
          )}

          {isFetching && !isLoading && (
            <div className="text-center text-sm text-gray-400 mt-4">در حال بروزرسانی...</div>
          )}
        </>
      )}
    </div>
  );
};

export default MatchesPage;