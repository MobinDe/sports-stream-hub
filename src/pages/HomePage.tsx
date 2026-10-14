// src/pages/HomePage.tsx
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  HiOutlineArrowLeft,
  HiOutlineCalendar,
  HiOutlineLightningBolt,
  HiOutlineNewspaper,
  HiOutlineShieldCheck,
  HiOutlineGlobe,
  HiOutlineFire,
  HiOutlineClock,
  HiOutlineChevronLeft,
} from "react-icons/hi";
import Hero from "../components/Hero";
import Card from "../components/Card";
import { fetchTodayMatches, fetchSportsNews } from "../services/api";

/* ================================================================ */
/*                       کامپوننت اصلی                              */
/* ================================================================ */
const HomePage = () => {
  /* ------- دریافت مسابقات امروز ------- */
  const {
    data: matches,
    isLoading: matchesLoading,
    error: matchesError,
  } = useQuery({
    queryKey: ["todayMatches"],
    queryFn: fetchTodayMatches,
    staleTime: 5 * 60 * 1000,
  });

  /* ------- دریافت اخبار ------- */
  const {
    data: news,
    isLoading: newsLoading,
    error: newsError,
  } = useQuery({
    queryKey: ["sportsNews"],
    queryFn: fetchSportsNews,
    staleTime: 10 * 60 * 1000,
  });

  /* ------- فقط ۳ تای اول ------- */
  const topMatches = matches?.slice(0, 3);
  const topNews = news?.slice(0, 3);

  return (
    <div dir="rtl" className="min-h-screen bg-white">
      <Hero />

      {/* ===================================================== */}
      {/*                   بخش مسابقات برتر                     */}
      {/* ===================================================== */}
      <section className="relative py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* هدر بخش */}
          <SectionHeader
            icon={HiOutlineFire}
            title="مسابقات برتر امروز"
            subtitle="هیجان‌انگیزترین رویدادهای ورزشی"
            badge="زنده"
            badgeColor="red"
            moreLink="/matches"
          />

          {/* محتوا */}
          {matchesLoading ? (
            <CardSkeletonGrid count={3} />
          ) : matchesError ? (
            <ErrorState
              message="خطا در دریافت مسابقات"
              onRetry={() => window.location.reload()}
            />
          ) : topMatches && topMatches.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {topMatches.map((match) => (
                  <Card key={match.id} {...match} variant="default" />
                ))}
              </div>

              {/* دکمه‌ی مشاهده همه - موبایل */}
              <div className="flex justify-center mt-8 lg:hidden">
                <Link
                  to="/matches"
                  className="
                    inline-flex items-center gap-2
                    bg-gradient-to-l from-orange-500 to-orange-600
                    hover:from-orange-400 hover:to-orange-500
                    text-white text-sm font-black
                    px-6 py-3 rounded-full
                    shadow-lg shadow-orange-500/25
                    hover:shadow-orange-500/40
                    active:scale-95 transition-all
                  "
                >
                  مشاهده همه مسابقات
                  <HiOutlineArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </>
          ) : (
            <EmptyState
              icon={HiOutlineCalendar}
              title="مسابقه‌ای برای امروز یافت نشد"
              desc="به‌زودی مسابقات جدید اضافه می‌شود"
            />
          )}
        </div>
      </section>

      {/* ===================================================== */}
      {/*                  نوار ویژگی‌ها                        */}
      {/* ===================================================== */}
      <section className="relative bg-gradient-to-l from-orange-50 via-yellow-50 to-orange-50 border-y border-orange-100 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <FeatureItem
              icon={HiOutlineLightningBolt}
              title="پوشش لحظه‌ای"
              desc="۲۴/۷ بدون توقف"
            />
            <FeatureItem
              icon={HiOutlineShieldCheck}
              title="منابع معتبر"
              desc="اخبار تأییدشده"
            />
            <FeatureItem
              icon={HiOutlineGlobe}
              title="پوشش جهانی"
              desc="همه لیگ‌های دنیا"
            />
            <FeatureItem
              icon={HiOutlineClock}
              title="بروزرسانی سریع"
              desc="در چند ثانیه"
            />
          </div>
        </div>
      </section>

      {/* ===================================================== */}
      {/*                    بخش اخبار                          */}
      {/* ===================================================== */}
      <section className="relative py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* هدر بخش */}
          <SectionHeader
            icon={HiOutlineNewspaper}
            title="آخرین اخبار ورزشی"
            subtitle="به‌روزترین اخبار دنیای ورزش"
            badge="جدید"
            badgeColor="orange"
            moreLink="/news"
          />

          {/* محتوا */}
          {newsLoading ? (
            <CardSkeletonGrid count={3} />
          ) : newsError ? (
            <ErrorState
              message="خطا در دریافت اخبار"
              onRetry={() => window.location.reload()}
            />
          ) : topNews && topNews.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {topNews.map((item) => (
                  <Card key={item.id} {...item} variant="default" />
                ))}
              </div>

              {/* دکمه‌ی مشاهده همه - موبایل */}
              <div className="flex justify-center mt-8 lg:hidden">
                <Link
                  to="/news"
                  className="
                    inline-flex items-center gap-2
                    border-2 border-orange-500
                    text-orange-600 hover:text-white
                    hover:bg-orange-500
                    text-sm font-black
                    px-6 py-3 rounded-full
                    active:scale-95 transition-all
                  "
                >
                  مشاهده همه اخبار
                  <HiOutlineArrowLeft className="w-4 h-4" />
                </Link>
              </div>
            </>
          ) : (
            <EmptyState
              icon={HiOutlineNewspaper}
              title="خبری یافت نشد"
              desc="به‌زودی اخبار جدید منتشر می‌شود"
            />
          )}
        </div>
      </section>

      {/* ===================================================== */}
      {/*                   CTA پایانی                          */}
      {/* ===================================================== */}
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-orange-500 via-orange-600 to-red-600 p-8 sm:p-12 shadow-2xl shadow-orange-500/20">
            {/* بافت تزئینی */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/30 blur-3xl" />
              <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-black/20 blur-3xl" />
            </div>

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
              <div className="flex-1">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white mb-2">
                  هیچ لحظه‌ای رو از دست نده! ⚽
                </h2>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-xl">
                  نتایج زنده، اخبار داغ و ویدیوهای لحظات ناب ورزشی — همه‌چیز
                  در یک‌جا، رایگان و بدون محدودیت.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link
                  to="/matches"
                  className="
                    flex items-center justify-center gap-2
                    bg-white hover:bg-gray-100
                    text-orange-600 font-black text-sm
                    px-6 py-3.5 rounded-full
                    shadow-lg active:scale-95 transition-all
                  "
                >
                  <HiOutlineLightningBolt className="w-4 h-4" />
                  مسابقات زنده
                </Link>
                <Link
                  to="/videos"
                  className="
                    flex items-center justify-center gap-2
                    border-2 border-white/70 hover:border-white
                    hover:bg-white/10
                    text-white font-bold text-sm
                    px-6 py-3.5 rounded-full
                    active:scale-95 transition-all
                  "
                >
                  ویدیوها
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ================================================================ */
/*                    کامپوننت‌های کمکی                             */
/* ================================================================ */

/* ---------------- هدر بخش ---------------- */
interface SectionHeaderProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: "red" | "orange" | "green";
  moreLink: string;
}

const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
  badge,
  badgeColor = "orange",
  moreLink,
}: SectionHeaderProps) => {
  const badgeColors = {
    red: "from-red-500 to-red-600 shadow-red-500/30",
    orange: "from-orange-500 to-orange-600 shadow-orange-500/30",
    green: "from-green-500 to-green-600 shadow-green-500/30",
  };

  return (
    <div className="flex items-end justify-between gap-4 mb-8">
      {/* سمت راست */}
      <div className="flex items-start gap-3 min-w-0">
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-2xl bg-orange-500/30 blur-xl" />
          <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/25">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-gray-800 leading-tight">
              {title}
            </h2>
            {badge && (
              <span
                className={`
                  inline-flex items-center gap-1
                  bg-gradient-to-l ${badgeColors[badgeColor]}
                  text-white text-[10px] font-black
                  px-2 py-0.5 rounded-full
                  shadow-md
                `}
              >
                {badgeColor === "red" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
                {badge}
              </span>
            )}
          </div>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-1">
            {subtitle}
          </p>
        </div>
      </div>

      {/* لینک مشاهده همه - دسکتاپ */}
      <Link
        to={moreLink}
        className="hidden lg:inline-flex items-center gap-1.5 text-xs sm:text-sm font-black text-orange-600 hover:text-orange-700 transition group shrink-0"
      >
        مشاهده همه
        <HiOutlineChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
      </Link>
    </div>
  );
};

/* ---------------- آیتم ویژگی ---------------- */
interface FeatureItemProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

const FeatureItem = ({ icon: Icon, title, desc }: FeatureItemProps) => (
  <div className="group flex items-center gap-3 p-3 rounded-2xl hover:bg-white hover:shadow-md border border-transparent hover:border-orange-100 transition-all duration-300">
    <div className="relative shrink-0">
      <div className="w-11 h-11 rounded-xl bg-white border border-orange-200 group-hover:border-orange-400 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5 text-orange-500" />
      </div>
    </div>
    <div className="min-w-0">
      <h3 className="text-xs sm:text-sm font-black text-gray-800">{title}</h3>
      <p className="text-[10px] sm:text-[11px] text-gray-500 mt-0.5">{desc}</p>
    </div>
  </div>
);

/* ---------------- اسکلتون لودینگ ---------------- */
const CardSkeletonGrid = ({ count = 3 }: { count?: number }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
    {[...Array(count)].map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-2xl border border-gray-100 overflow-hidden animate-pulse"
      >
        {/* تصویر */}
        <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-100" />

        {/* محتوا */}
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-16 bg-gray-200 rounded-full" />
            <div className="h-4 w-20 bg-gray-100 rounded-full" />
          </div>
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
          <div className="h-3 w-full bg-gray-100 rounded" />
          <div className="h-3 w-2/3 bg-gray-100 rounded" />
          <div className="pt-3 border-t border-gray-100 flex justify-between">
            <div className="h-3 w-24 bg-gray-200 rounded" />
            <div className="h-3 w-6 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

/* ---------------- حالت خالی ---------------- */
interface EmptyStateProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

const EmptyState = ({ icon: Icon, title, desc }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
    <div className="w-16 h-16 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-4">
      <Icon className="w-7 h-7 text-gray-400" />
    </div>
    <h3 className="text-sm font-black text-gray-700 mb-1">{title}</h3>
    <p className="text-xs text-gray-500">{desc}</p>
  </div>
);

/* ---------------- حالت خطا ---------------- */
interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

const ErrorState = ({ message, onRetry }: ErrorStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 text-center bg-red-50 rounded-2xl border border-red-100">
    <div className="w-16 h-16 rounded-full bg-white border border-red-200 flex items-center justify-center mb-4">
      <span className="text-3xl">😔</span>
    </div>
    <h3 className="text-sm font-black text-red-700 mb-1">{message}</h3>
    <p className="text-xs text-red-500 mb-4">
      لطفاً اتصال اینترنت خود را بررسی کنید
    </p>
    <button
      onClick={onRetry}
      className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-black rounded-full transition active:scale-95"
    >
      تلاش دوباره
    </button>
  </div>
);

export default HomePage;