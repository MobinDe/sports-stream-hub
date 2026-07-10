import { useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import type { VideoFilters, VideoItem } from '../services/api';
import LoadingSkeleton from '../components/LoadingSkeleton';
import VideoModal from '../components/VideoModal';
import { fetchVideos } from '../services/api';

const VideosPage = () => {
  const [filters, setFilters] = useState<VideoFilters>({
    category: 'all',
    search: '',
    page: 1,
    limit: 6,
  });
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const {
    data,
    isLoading,
    error,
    isFetching,
    refetch,
  } = useQuery<{ data: VideoItem[]; total: number }>({
    queryKey: ['videos', filters],
    queryFn: () => fetchVideos(filters),
    placeholderData: keepPreviousData,
  });

  const videos = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / (filters.limit || 6));

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setFilters(prev => ({ ...prev, page: newPage }));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCategoryChange = (category: string) => {
    setFilters(prev => ({ ...prev, category, page: 1 }));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('search') as string;
    setFilters(prev => ({ ...prev, search: searchTerm, page: 1 }));
  };

  const categories = [
    { id: 'all', name: 'همه' },
    { id: 'football', name: 'فوتبال' },
    { id: 'basketball', name: 'بسکتبال' },
    { id: 'tennis', name: 'تنیس' },
    { id: 'volleyball', name: 'والیبال' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">ویدئوهای برگزیده</h1>

      {/* فیلترها */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-8 space-y-4">
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-full transition ${
                filters.category === cat.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            name="search"
            defaultValue={filters.search}
            placeholder="جستجوی ویدئو..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition"
          >
            جستجو
          </button>
          {filters.search && (
            <button
              type="button"
              onClick={() => setFilters(prev => ({ ...prev, search: '', page: 1 }))}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
            >
              پاک کردن
            </button>
          )}
        </form>
      </div>

      {isLoading ? (
        <LoadingSkeleton />
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">خطا در دریافت ویدئوها. لطفاً دوباره تلاش کنید.</p>
          <button
            onClick={() => refetch()}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition"
          >
            تلاش مجدد
          </button>
        </div>
      ) : videos.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          هیچ ویدئویی با این معیارها یافت نشد.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer group"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative aspect-video">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                    <div className="bg-white/90 rounded-full p-3">
                      <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {video.duration && (
                    <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 line-clamp-1">{video.title}</h3>
                  <p className="text-gray-500 text-sm">{video.date} • {video.category}</p>
                  <p className="text-gray-600 text-sm mt-2 line-clamp-2">{video.description}</p>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => goToPage(filters.page! - 1)}
                disabled={filters.page === 1}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
              >
                قبلی
              </button>
              <span className="px-4 py-2 bg-white shadow rounded-lg">
                صفحه {filters.page} از {totalPages}
              </span>
              <button
                onClick={() => goToPage(filters.page! + 1)}
                disabled={filters.page === totalPages}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
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

      {selectedVideo && (
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.videoUrl}
          title={selectedVideo.title}
        />
      )}
    </div>
  );
};

export default VideosPage;