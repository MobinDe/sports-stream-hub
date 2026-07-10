// src/pages/HomePage.tsx
import { useQuery } from '@tanstack/react-query';
import Hero from '../components/Hero';
import Card from '../components/Card';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { fetchTodayMatches, fetchSportsNews } from '../services/api';

const HomePage = () => {
  // دریافت مسابقات امروز
  const {
    data: matches,
    isLoading: matchesLoading,
    error: matchesError,
  } = useQuery({
    queryKey: ['todayMatches'],
    queryFn: fetchTodayMatches,
    staleTime: 5 * 60 * 1000, // 5 دقیقه
  });

  // دریافت اخبار
  const {
    data: news,
    isLoading: newsLoading,
    error: newsError,
  } = useQuery({
    queryKey: ['sportsNews'],
    queryFn: fetchSportsNews,
    staleTime: 10 * 60 * 1000, // 10 دقیقه
  });

  // اگر هر دو در حال لودینگ باشند، اسکلتون نشان بده (بهتر است لودینگ مجزا برای هر بخش)
  // اما برای سادگی، اگر یکی از آنها لودینگ باشد لودینگ کلی نشان می‌دهیم
  if (matchesLoading || newsLoading) {
    return <LoadingSkeleton />;
  }

  // نمایش خطا
  if (matchesError || newsError) {
    return (
      <div className="text-center py-20 text-red-500">
        خطا در دریافت اطلاعات. لطفاً دوباره تلاش کنید.
      </div>
    );
  }

  // فقط سه مسابقه اول برای نمایش در صفحه اصلی
  const topMatches = matches?.slice(0, 3);
  // سه خبر اول
  const topNews = news?.slice(0, 3);

  return (
    <div>
      <Hero />

      {/* بخش مسابقات برتر */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 inline-block border-b-4 border-orange-500 pb-2">
            مسابقات برتر امروز
          </h2>
          <p className="text-gray-500 mt-4">هیجان‌انگیزترین رویدادهای ورزشی</p>
        </div>
        {topMatches && topMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topMatches.map((match) => (
              <Card key={match.id} {...match} variant="default" />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">مسابقه‌ای برای امروز یافت نشد.</p>
        )}
        <div className="text-center mt-8">
          <a
            href="/matches"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition"
          >
            مشاهده همه مسابقات
          </a>
        </div>
      </section>

      {/* بخش اخبار */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 inline-block border-b-4 border-orange-500 pb-2">
              آخرین اخبار ورزشی
            </h2>
            <p className="text-gray-500 mt-4">به‌روزترین اخبار دنیای ورزش</p>
          </div>
          {topNews && topNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {topNews.map((item) => (
                <Card key={item.id} {...item} variant="default" />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">خبری یافت نشد.</p>
          )}
          <div className="text-center mt-8">
            <a
              href="/news"
              className="inline-block border border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white px-6 py-2 rounded-full transition"
            >
              مشاهده همه اخبار
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;