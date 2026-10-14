// src/App.tsx
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  HiOutlineHome,
  HiOutlineArrowLeft,
  HiOutlineSearch,
} from "react-icons/hi";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MatchesPage from "./pages/MatchesPage";
import MatchDetailPage from "./pages/MatchDetailPage";
import NewsPage from "./pages/NewsPage";
import VideosPage from "./pages/VideosPage";
import ContactPage from "./pages/ContactPage";

/* ================================================================ */
/*                    اسکرول به بالا هنگام تغییر صفحه               */
/* ================================================================ */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
};

/* ================================================================ */
/*                       صفحه‌ی ۴۰۴                                 */
/* ================================================================ */
const NotFound = () => {
  return (
    <div
      dir="rtl"
      className="relative min-h-[80vh] flex items-center justify-center px-4 py-16 overflow-hidden"
    >
      {/* بافت تزئینی */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-yellow-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-md w-full text-center">
        {/* آیکون بزرگ */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-2xl animate-pulse" />
          <div className="relative w-32 h-32 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-2xl shadow-orange-500/30 rotate-3 hover:rotate-0 transition-transform duration-500">
            <span className="text-6xl font-black text-white drop-shadow-lg">
              ۴۰۴
            </span>
          </div>
        </div>

        {/* متن */}
        <h1 className="text-xl sm:text-2xl font-black text-gray-800 mb-3">
          این صفحه پیدا نشد!
        </h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-sm mx-auto">
          متأسفانه صفحه‌ای که به دنبال آن بودید وجود ندارد یا حذف شده است.
          می‌توانید به صفحه‌ی اصلی برگردید یا مسابقات را ببینید.
        </p>

        {/* دکمه‌ها */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="
              w-full sm:w-auto
              flex items-center justify-center gap-2
              bg-gradient-to-l from-orange-500 to-orange-600
              hover:from-orange-400 hover:to-orange-500
              text-white text-sm font-black
              px-6 py-3.5 rounded-xl
              shadow-lg shadow-orange-500/25
              hover:shadow-orange-500/40
              active:scale-95 transition-all
            "
          >
            <HiOutlineHome className="w-4 h-4" />
            بازگشت به خانه
          </Link>

          <Link
            to="/matches"
            className="
              w-full sm:w-auto
              flex items-center justify-center gap-2
              border-2 border-orange-500 hover:bg-orange-50
              text-orange-600 text-sm font-black
              px-6 py-3.5 rounded-xl
              active:scale-95 transition-all
            "
          >
            <HiOutlineSearch className="w-4 h-4" />
            دیدن مسابقات
          </Link>
        </div>

        {/* لینک‌های پیشنهادی */}
        <div className="mt-10 pt-6 border-t border-dashed border-gray-200">
          <p className="text-[11px] font-black text-gray-400 mb-4">
            شاید دنبال یکی از این‌ها هستید:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { to: "/matches", label: "مسابقات" },
              { to: "/news", label: "اخبار" },
              { to: "/videos", label: "ویدئوها" },
              { to: "/contact", label: "تماس با ما" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="
                  inline-flex items-center gap-1.5
                  text-[11px] font-bold
                  text-gray-600 hover:text-orange-600
                  bg-gray-100 hover:bg-orange-50
                  border border-gray-200 hover:border-orange-200
                  px-3 py-1.5 rounded-full
                  transition-all active:scale-95
                "
              >
                {link.label}
                <HiOutlineArrowLeft className="w-3 h-3" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================================================================ */
/*                       کامپوننت اصلی                              */
/* ================================================================ */
function App() {
  return (
    <BrowserRouter>
      {/* اسکرول خودکار به بالا هنگام تغییر مسیر */}
      <ScrollToTop />

      {/* ساختار کلی */}
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* هدر ثابت */}
        <Header />

        {/* محتوای اصلی */}
        <main className="flex-1">
          <Routes>
            {/* صفحه اصلی */}
            <Route path="/" element={<HomePage />} />

            {/* مسابقات */}
            <Route path="/matches" element={<MatchesPage />} />
            <Route path="/match/:id" element={<MatchDetailPage />} />

            {/* اخبار */}
            <Route path="/news" element={<NewsPage />} />

            {/* ویدئوها */}
            <Route path="/videos" element={<VideosPage />} />

            {/* تماس با ما */}
            <Route path="/contact" element={<ContactPage />} />

            {/* ۴۰۴ */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* فوتر */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;