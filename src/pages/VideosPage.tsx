// src/pages/VideosPage.tsx
import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { VideoFilters, VideoItem } from "../services/api";
import { fetchVideos } from "../services/api";
import VideoModal from "../components/VideoModal";
import {
  HiOutlineSearch,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineFilter,
  HiOutlineX,
  HiOutlineRefresh,
  HiOutlinePlay,
  HiOutlineViewGrid,
  HiOutlineSortAscending,
  HiOutlineTrendingUp,
  HiOutlineClock,
  HiOutlineEye,
} from "react-icons/hi";
import {
  FaFutbol,
  FaBasketballBall,
  FaTableTennis,
  FaVolleyballBall,
  FaFistRaised,
} from "react-icons/fa";

/* ================================================================ */
/*                       دسته‌بندی‌ها                                */
/* ================================================================ */
const categories = [
  { id: "all", name: "همه", icon: HiOutlineViewGrid },
  { id: "football", name: "فوتبال", icon: FaFutbol },
  { id: "basketball", name: "بسکتبال", icon: FaBasketballBall },
  { id: "tennis", name: "تنیس", icon: FaTableTennis },
  { id: "volleyball", name: "والیبال", icon: FaVolleyballBall },
  { id: "wrestling", name: "کشتی", icon: FaFistRaised },
];

/* ================================================================ */
/*                       کامپوننت اصلی                              */
/* ================================================================ */
const VideosPage = () => {
  const [filters, setFilters] = useState<VideoFilters>({
    category: "all",
    search: "",
    page: 1,
    limit: 12,
  });

  const [searchInput, setSearchInput] = useState(filters.search || "");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  /* ------- دریافت داده ------- */
  const { data, isLoading, error, isFetching, refetch } = useQuery<{
    data: VideoItem[];
    total: number;
  }>({
    queryKey: ["videos", filters],
    queryFn: () => fetchVideos(filters),
    placeholderData: keepPreviousData,
  });

  const videos = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / (filters.limit || 12));

  /* ================================================================ */
  /*                       هندلرها                                    */
  /* ================================================================ */
  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setFilters((prev) => ({ ...prev, page: newPage }));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCategoryChange = (category: string) => {
    setFilters((prev) => ({ ...prev, category, page: 1 }));
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, search: searchInput, page: 1 }));
  };

  const clearSearch = () => {
    setSearchInput("");
    setFilters((prev) => ({ ...prev, search: "", page: 1 }));
  };

  const clearAllFilters = () => {
    setSearchInput("");
    setFilters({
      category: "all",
      search: "",
      page: 1,
      limit: 12,
    });
  };

  const activeCategory = categories.find((c) => c.id === filters.category);
  const hasActiveFilters = filters.category !== "all" || filters.search !== "";

  /* ================================================================ */
  /*                       رندر نهایی                                 */
  /* ================================================================ */
  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-6 sm:py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* ===================================================== */}
        {/*                       هدر صفحه                          */}
        {/* ===================================================== */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-l from-orange-500 via-orange-600 to-red-600 p-5 sm:p-7 mb-5 shadow-xl shadow-orange-500/20">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/30 blur-3xl" />
            <div className="absolute -bottom-24 -right-16 w-72 h-72 rounded-full bg-black/20 blur-3xl" />
          </div>

          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0">
                <HiOutlinePlay className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-1">
                  ویدئوهای ورزشی
                </h1>
                <p className="text-[11px] sm:text-xs text-white/85">
                  {total > 0
                    ? `${total} ویدئو آماده‌ی تماشا`
                    : "لحظات ناب ورزش را تماشا کن"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-md border border-white/20 rounded-xl px-3.5 py-2">
                <HiOutlineTrendingUp className="w-4 h-4 text-yellow-300" />
                <div className="text-right">
                  <p className="text-[10px] text-white/70 font-bold leading-none">
                    ویدئو
                  </p>
                  <p className="text-sm font-black text-white leading-tight">
                    {total > 0 ? total : "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================== */}
        {/*                     بخش فیلترها                        */}
        {/* ===================================================== */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] p-4 sm:p-5 mb-5">
          {/* دسته‌بندی‌ها */}
          <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
            <div className="flex items-center gap-1.5 text-xs font-black text-gray-500 shrink-0 pl-2 border-l border-gray-200">
              <HiOutlineFilter className="w-4 h-4 text-orange-500" />
              <span className="hidden sm:inline">دسته:</span>
            </div>
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = filters.category === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`
                    flex items-center gap-1.5 shrink-0
                    px-3.5 py-2 rounded-xl
                    text-xs font-black whitespace-nowrap
                    transition-all duration-200 active:scale-95
                    ${
                      isActive
                        ? "bg-gradient-to-l from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/25"
                        : "bg-gray-50 text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-600 hover:bg-orange-50"
                    }
                  `}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isActive ? "text-white" : "text-orange-500"
                    }`}
                  />
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* جستجو */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="flex-1 relative group">
              <HiOutlineSearch className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="جستجو در ویدئوها (عنوان، توضیحات)..."
                className="
                  w-full pr-11 pl-11 py-3
                  bg-gray-50 border border-gray-200
                  focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-400/15
                  rounded-xl text-xs sm:text-sm text-gray-800
                  placeholder-gray-400 outline-none transition
                "
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-200 hover:bg-red-500 text-gray-500 hover:text-white flex items-center justify-center transition"
                  aria-label="پاک کردن"
                >
                  <HiOutlineX className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="
                sm:w-auto
                flex items-center justify-center gap-2
                px-6 py-3
                bg-gradient-to-l from-orange-500 to-orange-600
                hover:from-orange-400 hover:to-orange-500
                text-white text-xs sm:text-sm font-black
                rounded-xl shadow-md shadow-orange-500/25
                hover:shadow-orange-500/40
                active:scale-95 transition-all
              "
            >
              <HiOutlineSearch className="w-4 h-4" />
              <span className="sm:hidden">جستجو</span>
            </button>
          </form>

          {/* فیلترهای فعال */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-dashed border-gray-200">
              <span className="text-[10px] font-black text-gray-500">
                فیلترهای فعال:
              </span>

              {filters.category !== "all" && activeCategory && (
                <FilterChip
                  label={`دسته: ${activeCategory.name}`}
                  onRemove={() => handleCategoryChange("all")}
                />
              )}

              {filters.search && (
                <FilterChip
                  label={`جستجو: "${filters.search}"`}
                  onRemove={clearSearch}
                />
              )}

              <button
                onClick={clearAllFilters}
                className="text-[10px] font-black text-red-500 hover:text-red-600 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-red-50 transition"
              >
                <HiOutlineX className="w-3 h-3" />
                پاک کردن همه
              </button>
            </div>
          )}
        </div>

        {/* ===================================================== */}
        {/*                     لیست ویدئوها                        */}
        {/* ===================================================== */}
        {isLoading ? (
          <VideosSkeleton />
        ) : error ? (
          <ErrorState onRetry={() => refetch()} />
        ) : videos.length === 0 ? (
          <EmptyState onClear={clearAllFilters} hasFilters={hasActiveFilters} />
        ) : (
          <>
            <div className="flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <HiOutlineSortAscending className="w-4 h-4 text-orange-500" />
                <span className="font-bold">
                  نمایش {videos.length} از {total} ویدئو
                </span>
              </div>

              {isFetching && !isLoading && (
                <div className="flex items-center gap-1.5 text-[11px] text-orange-500 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                  در حال بروزرسانی...
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {videos.map((video) => (
                <VideoCard
                  key={video.id}
                  video={video}
                  onClick={() => setSelectedVideo(video)}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={filters.page || 1}
                totalPages={totalPages}
                onPageChange={goToPage}
              />
            )}
          </>
        )}
      </div>

      {/* ===================================================== */}
      {/*                     مودال ویدئو                        */}
      {/* ===================================================== */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo?.videoUrl || ""}
        title={selectedVideo?.title || ""}
        category={selectedVideo?.category}
        date={selectedVideo?.date}
        duration={selectedVideo?.duration}
      />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

/* ================================================================ */
/*                    کامپوننت‌های کمکی                             */
/* ================================================================ */

/* ---------------- کارت ویدئو ---------------- */
interface VideoCardProps {
  video: VideoItem;
  onClick: () => void;
}

const VideoCard = ({ video, onClick }: VideoCardProps) => (
  <button
    onClick={onClick}
    className="
      group relative flex flex-col text-right w-full
      bg-white rounded-2xl overflow-hidden
      border border-gray-100
      shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)]
      hover:shadow-[0_12px_40px_-12px_rgba(249,115,22,0.3)]
      hover:border-orange-200 hover:-translate-y-1
      transition-all duration-300
      active:scale-[0.98]
    "
  >
    {/* تصویر */}
    <div className="relative aspect-video w-full bg-gray-900 overflow-hidden">
      <img
        src={video.thumbnail}
        alt={video.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://via.placeholder.com/400x225?text=Video";
        }}
      />

      {/* گرادیان تیره */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* دکمه پلی (وسط) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-orange-500/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative w-14 h-14 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-orange-500 transition-all duration-300">
            <HiOutlinePlay className="w-7 h-7 text-orange-500 group-hover:text-white mr-0.5 transition-colors" />
          </div>
        </div>
      </div>

      {/* دسته‌بندی */}
      <span className="absolute top-3 right-3 bg-gradient-to-l from-orange-500 to-orange-600 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg shadow-orange-500/30">
        {video.category}
      </span>

      {/* مدت زمان */}
      {video.duration && (
        <span className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-full border border-white/20">
          <HiOutlineClock className="w-3 h-3" />
          {video.duration}
        </span>
      )}
    </div>

    {/* محتوا */}
    <div className="flex flex-col flex-grow p-4 gap-2">
      <h3 className="font-black text-sm text-gray-800 leading-snug line-clamp-2 min-h-[2.5rem] group-hover:text-orange-600 transition-colors">
        {video.title}
      </h3>

      <p className="text-[11px] text-gray-500 leading-relaxed line-clamp-2 flex-grow">
        {video.description}
      </p>

      {/* اطلاعات پایین */}
      <div className="flex items-center justify-between pt-3 mt-1 border-t border-dashed border-gray-100">
        <div className="flex items-center gap-3 text-[10px] text-gray-500">
          {video.views !== undefined && (
            <span className="flex items-center gap-1">
              <HiOutlineEye className="w-3 h-3" />
              {video.views.toLocaleString("fa-IR")}
            </span>
          )}
          {video.date && <span>{video.date}</span>}
        </div>

        <span className="flex items-center gap-1 text-[10px] font-black text-orange-600 group-hover:gap-2 transition-all">
          تماشا
          <HiOutlinePlay className="w-3 h-3" />
        </span>
      </div>
    </div>

    {/* خط تزئینی پایین */}
    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-l from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </button>
);

/* ---------------- چیپ فیلتر ---------------- */
interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

const FilterChip = ({ label, onRemove }: FilterChipProps) => (
  <span className="inline-flex items-center gap-1.5 bg-orange-50 border border-orange-200 text-orange-700 text-[11px] font-bold px-2.5 py-1.5 rounded-lg">
    {label}
    <button
      onClick={onRemove}
      className="w-4 h-4 rounded-full bg-orange-200 hover:bg-orange-500 text-orange-700 hover:text-white flex items-center justify-center transition"
      aria-label="حذف فیلتر"
    >
      <HiOutlineX className="w-2.5 h-2.5" />
    </button>
  </span>
);

/* ---------------- صفحه‌بندی ---------------- */
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center mt-8">
      <div className="inline-flex items-center gap-1 bg-white border border-gray-100 rounded-2xl p-1.5 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)]">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="
            flex items-center gap-1 px-3 py-2 rounded-xl
            text-xs font-black
            text-gray-600 hover:text-orange-600 hover:bg-orange-50
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600
            transition
          "
          aria-label="صفحه قبلی"
        >
          <HiOutlineChevronRight className="w-4 h-4" />
          <span className="hidden sm:inline">قبلی</span>
        </button>

        <div className="flex items-center gap-0.5">
          {pageNumbers.map((page, idx) =>
            page === "..." ? (
              <span
                key={`ellipsis-${idx}`}
                className="px-2 text-gray-400 font-black text-xs"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={`
                  min-w-[36px] h-9 rounded-xl
                  text-xs font-black
                  transition-all active:scale-95
                  ${
                    currentPage === page
                      ? "bg-gradient-to-l from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/25"
                      : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
                  }
                `}
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="
            flex items-center gap-1 px-3 py-2 rounded-xl
            text-xs font-black
            text-gray-600 hover:text-orange-600 hover:bg-orange-50
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-gray-600
            transition
          "
          aria-label="صفحه بعدی"
        >
          <span className="hidden sm:inline">بعدی</span>
          <HiOutlineChevronLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* ---------------- حالت خالی ---------------- */
interface EmptyStateProps {
  onClear: () => void;
  hasFilters: boolean;
}

const EmptyState = ({ onClear, hasFilters }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-2xl border-2 border-dashed border-gray-200">
    <div className="w-20 h-20 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center mb-5">
      <HiOutlinePlay className="w-9 h-9 text-orange-400" />
    </div>
    <h3 className="text-sm sm:text-base font-black text-gray-800 mb-2">
      {hasFilters
        ? "ویدئویی با این فیلترها پیدا نشد"
        : "ویدئویی برای نمایش وجود ندارد"}
    </h3>
    <p className="text-xs text-gray-500 mb-6 max-w-sm leading-relaxed">
      {hasFilters
        ? "فیلترها را تغییر دهید یا عبارت دیگری جستجو کنید."
        : "به‌زودی ویدئوهای جدید اضافه می‌شود."}
    </p>
    {hasFilters && (
      <button
        onClick={onClear}
        className="
          flex items-center gap-2
          px-5 py-2.5 rounded-full
          bg-gradient-to-l from-orange-500 to-orange-600
          hover:from-orange-400 hover:to-orange-500
          text-white text-xs font-black
          shadow-md shadow-orange-500/25
          active:scale-95 transition-all
        "
      >
        <HiOutlineX className="w-3.5 h-3.5" />
        پاک کردن فیلترها
      </button>
    )}
  </div>
);

/* ---------------- حالت خطا ---------------- */
interface ErrorStateProps {
  onRetry: () => void;
}

const ErrorState = ({ onRetry }: ErrorStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-red-50 rounded-2xl border border-red-100">
    <div className="w-20 h-20 rounded-full bg-white border border-red-200 flex items-center justify-center mb-5">
      <span className="text-4xl">😔</span>
    </div>
    <h3 className="text-sm sm:text-base font-black text-red-700 mb-2">
      خطا در دریافت ویدئوها
    </h3>
    <p className="text-xs text-red-500 mb-6 max-w-sm">
      لطفاً اتصال اینترنت خود را بررسی کنید و دوباره تلاش کنید.
    </p>
    <button
      onClick={onRetry}
      className="
        flex items-center gap-2
        px-5 py-2.5 rounded-full
        bg-gradient-to-l from-red-500 to-red-600
        hover:from-red-400 hover:to-red-500
        text-white text-xs font-black
        shadow-md shadow-red-500/25
        active:scale-95 transition-all
      "
    >
      <HiOutlineRefresh className="w-3.5 h-3.5" />
      تلاش دوباره
    </button>
  </div>
);

/* ---------------- اسکلتون لودینگ ---------------- */
const VideosSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse"
      >
        <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-100" />
        <div className="p-4 space-y-3">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
          <div className="h-3 w-full bg-gray-100 rounded" />
          <div className="pt-3 border-t border-gray-100 flex justify-between">
            <div className="h-3 w-16 bg-gray-200 rounded" />
            <div className="h-3 w-12 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default VideosPage;