// src/pages/MatchDetailPage.tsx
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchMatchById } from "../services/api";
import {
  HiOutlineArrowRight,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineVideoCamera,
  HiOutlinePlay,
  HiOutlineShare,
  HiOutlineHeart,
  HiOutlineRefresh,
  HiOutlineUsers,
  HiOutlineBell,
} from "react-icons/hi";
import {
  FaFutbol,
  FaBasketballBall,
  FaTableTennis,
} from "react-icons/fa";

/* ================================================================ */
/*                    تبدیل URL به Embed                            */
/* ================================================================ */
const getEmbedUrl = (url?: string): string => {
  if (!url) return "";

  // ─── یوتیوب ───
  if (url.includes("youtube.com/watch?v=")) {
    const id = url.split("watch?v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  }
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  }
  if (url.includes("youtube.com/embed/")) {
    return url;
  }

  // ─── آپارات (فرمت جدید /embed/) ───
  if (url.includes("aparat.com/embed/")) {
    return url;
  }

  // ─── آپارات (فرمت کوتاه /v/) ───
  if (url.includes("aparat.com/v/")) {
    const id = url.split("aparat.com/v/")[1]?.split("?")[0];
    return `https://www.aparat.com/video/video/embed/videohash/${id}/vt/frame`;
  }

  // ─── فرمت قدیمی آپارات ───
  if (url.includes("aparat.com/video/video/embed/")) {
    return url;
  }

  return url;
};

/* ================================================================ */
/*                    کامپوننت اصلی                                 */
/* ================================================================ */
const MatchDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  /* ------- دریافت مسابقه ------- */
  const {
    data: match,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["match", id],
    queryFn: () => fetchMatchById(Number(id)),
    enabled: !!id,
  });

  /* ================================================================ */
  /*                    حالت لودینگ                                   */
  /* ================================================================ */
  if (isLoading) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-gray-50 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*                    حالت خطا                                      */
  /* ================================================================ */
  if (error || !match) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
      >
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center">
            <HiOutlineVideoCamera className="w-9 h-9 text-orange-400" />
          </div>
          <h2 className="text-lg sm:text-xl font-black text-gray-800 mb-2">
            مسابقه پیدا نشد
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-6">
            ممکنه این مسابقه حذف شده یا آدرس اشتباه باشه
          </p>
          <Link
            to="/matches"
            className="inline-flex items-center gap-2 bg-gradient-to-l from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white text-xs sm:text-sm font-black px-5 py-3 rounded-xl shadow-md shadow-orange-500/25 transition"
          >
            <HiOutlineArrowRight className="w-4 h-4" />
            بازگشت به لیست مسابقات
          </Link>
        </div>
      </div>
    );
  }

  /* ================================================================ */
  /*                       محاسبات                                    */
  /* ================================================================ */
  const statusConfig = {
    live: {
      label: "زنده",
      color: "bg-red-500",
      text: "text-white",
      dot: true,
    },
    upcoming: {
      label: "به‌زودی",
      color: "bg-amber-500",
      text: "text-white",
      dot: false,
    },
    finished: {
      label: "پایان یافته",
      color: "bg-gray-500",
      text: "text-white",
      dot: false,
    },
  };

  const status = statusConfig[match.status || "upcoming"];
  const hasScore = match.scoreA !== undefined && match.scoreB !== undefined;

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-6 sm:py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* ================= Breadcrumb ================= */}
        <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-500 mb-4 flex-wrap">
          <Link to="/" className="hover:text-orange-600 transition">
            خانه
          </Link>
          <span>/</span>
          <Link to="/matches" className="hover:text-orange-600 transition">
            مسابقات
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-bold">{match.title}</span>
        </div>

        {/* ===================================================== */}
        {/*                  هدر مسابقه                            */}
        {/* ===================================================== */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-l from-orange-500 via-orange-600 to-red-600 p-5 sm:p-8 mb-5 shadow-xl shadow-orange-500/20">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/30 blur-3xl" />
            <div className="absolute -bottom-24 -right-16 w-72 h-72 rounded-full bg-black/20 blur-3xl" />
          </div>

          <div className="relative">
            {/* League + Status */}
            <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
              <div className="flex items-center gap-2">
                {match.league && (
                  <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-black px-3 py-1.5 rounded-full">
                    <HiOutlineVideoCamera className="w-3.5 h-3.5" />
                    {match.league}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`
                    inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full
                    text-[11px] font-black shadow-lg
                    ${status.color} ${status.text}
                  `}
                >
                  {status.dot && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                  {status.label}
                </span>
              </div>
            </div>

            {/* تیم‌ها و امتیاز */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 items-center">
              {/* تیم A */}
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                  {match.category === "فوتبال" && (
                    <FaFutbol className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  )}
                  {match.category === "بسکتبال" && (
                    <FaBasketballBall className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  )}
                  {match.category === "تنیس" && (
                    <FaTableTennis className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  )}
                  {match.category !== "فوتبال" &&
                    match.category !== "بسکتبال" &&
                    match.category !== "تنیس" && (
                      <HiOutlineUsers className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    )}
                </div>
                <h3 className="text-sm sm:text-lg md:text-xl font-black text-white leading-tight">
                  {match.teamA || "تیم A"}
                </h3>
              </div>

              {/* امتیاز / vs */}
              <div className="text-center">
                {hasScore ? (
                  <div className="flex items-center justify-center gap-2 sm:gap-3">
                    <span className="text-3xl sm:text-5xl md:text-6xl font-black text-white drop-shadow-lg">
                      {match.scoreA}
                    </span>
                    <span className="text-2xl sm:text-3xl text-white/60 font-black">
                      -
                    </span>
                    <span className="text-3xl sm:text-5xl md:text-6xl font-black text-white drop-shadow-lg">
                      {match.scoreB}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl sm:text-3xl font-black text-white/80">
                    VS
                  </span>
                )}
                {match.minute && (
                  <p className="text-[11px] sm:text-xs text-white/80 font-bold mt-2">
                    دقیقه {match.minute}
                  </p>
                )}
              </div>

              {/* تیم B */}
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
                  {match.category === "فوتبال" && (
                    <FaFutbol className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  )}
                  {match.category === "بسکتبال" && (
                    <FaBasketballBall className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  )}
                  {match.category === "تنیس" && (
                    <FaTableTennis className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  )}
                  {match.category !== "فوتبال" &&
                    match.category !== "بسکتبال" &&
                    match.category !== "تنیس" && (
                      <HiOutlineUsers className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    )}
                </div>
                <h3 className="text-sm sm:text-lg md:text-xl font-black text-white leading-tight">
                  {match.teamB || "تیم B"}
                </h3>
              </div>
            </div>

            {/* توضیحات */}
            <p className="text-center text-[11px] sm:text-sm text-white/85 mt-5 leading-relaxed">
              {match.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* ===================================================== */}
          {/*                  پخش‌کننده                             */}
          {/* ===================================================== */}
          <div className="lg:col-span-2">
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-gray-800">
              {/* هدر پخش */}
              <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-l from-gray-900 to-black border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-white text-[11px] font-black">
                    {match.status === "live"
                      ? "پخش زنده"
                      : match.status === "finished"
                      ? "خلاصه مسابقه"
                      : "پخش اختصاصی"}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: match.title,
                          url: window.location.href,
                        });
                      }
                    }}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-orange-500 text-white flex items-center justify-center transition"
                    aria-label="اشتراک‌گذاری"
                  >
                    <HiOutlineShare className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setIsLiked((v) => !v)}
                    className={`
                      w-8 h-8 rounded-lg flex items-center justify-center transition
                      ${
                        isLiked
                          ? "bg-red-500 text-white"
                          : "bg-white/10 hover:bg-red-500 text-white"
                      }
                    `}
                    aria-label="علاقه‌مندی"
                  >
                    <HiOutlineHeart className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* پخش‌کننده */}
              <div className="relative aspect-video w-full bg-black">
                {!isPlaying ? (
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center group"
                  >
                    <img
                      src={match.imageUrl}
                      alt={match.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />

                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-orange-500/40 blur-2xl animate-pulse" />
                      <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <HiOutlinePlay className="w-10 h-10 text-white mr-1" />
                      </div>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 text-center">
                      <p className="text-white font-black text-sm sm:text-base drop-shadow-lg">
                        برای پخش کلیک کن
                      </p>
                    </div>
                  </button>
                ) : (
                  <iframe
                    src={getEmbedUrl(match.streamUrl)}
                    title={match.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                    allowFullScreen
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>

              {/* اطلاعات پایین */}
              <div className="p-4 bg-gray-900 border-t border-gray-800">
                <h2 className="text-sm sm:text-base font-black text-white mb-1">
                  {match.title}
                </h2>
                <p className="text-[11px] text-gray-400">
                  {match.description}
                </p>
              </div>
            </div>

            {/* اطلاعات بیشتر */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {match.venue && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
                      <HiOutlineLocationMarker className="w-5 h-5 text-orange-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-500 mb-1">
                        محل برگزاری
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-gray-800">
                        {match.venue}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <HiOutlineCalendar className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-500 mb-1">
                      زمان برگزاری
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-gray-800">
                      {match.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================== */}
          {/*                  سایدبار                              */}
          {/* ===================================================== */}
          <div className="lg:col-span-1 space-y-4">
            {/* کانال‌های پخش */}
            {match.channels && match.channels.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] p-5">
                <h3 className="text-sm font-black text-gray-800 mb-4 flex items-center gap-2 pb-3 border-b border-gray-100">
                  <span className="w-1 h-4 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full" />
                  کانال‌های پخش
                </h3>
                <ul className="space-y-2.5">
                  {match.channels.map((channel) => (
                    <li
                      key={channel}
                      className="flex items-center gap-2.5 text-xs text-gray-700 bg-gray-50 hover:bg-orange-50 rounded-xl px-3 py-2.5 transition border border-gray-100 hover:border-orange-200"
                    >
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shrink-0">
                        <HiOutlineVideoCamera className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="font-bold">{channel}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* اطلاعات تیم‌ها */}
            {match.teamA && match.teamB && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] p-5">
                <h3 className="text-sm font-black text-gray-800 mb-4 flex items-center gap-2 pb-3 border-b border-gray-100">
                  <span className="w-1 h-4 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full" />
                  تیم‌های حاضر
                </h3>
                <div className="space-y-3">
                  <TeamRow name={match.teamA} side="host" />
                  <TeamRow name={match.teamB} side="away" />
                </div>
              </div>
            )}

            {/* یادآوری */}
            {match.status === "upcoming" && (
              <button className="w-full bg-gradient-to-l from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white text-xs sm:text-sm font-black py-3.5 rounded-2xl shadow-lg shadow-orange-500/25 active:scale-95 transition-all flex items-center justify-center gap-2">
                <HiOutlineBell className="w-4 h-4" />
                یادآوری کن
              </button>
            )}

            {/* اقدامات */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] p-5 space-y-2.5">
              <button
                onClick={() => refetch()}
                className="w-full flex items-center justify-center gap-2 text-xs font-black text-gray-700 bg-gray-50 hover:bg-gray-100 border border-gray-200 py-3 rounded-xl transition"
              >
                <HiOutlineRefresh className="w-4 h-4" />
                بروزرسانی
              </button>

              <Link
                to="/matches"
                className="w-full flex items-center justify-center gap-2 text-xs font-black text-orange-600 bg-orange-50 hover:bg-orange-100 border border-orange-200 py-3 rounded-xl transition"
              >
                <HiOutlineArrowRight className="w-4 h-4" />
                سایر مسابقات
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================================================================ */
/*                    کامپوننت کمکی                                */
/* ================================================================ */
const TeamRow = ({ name, side }: { name: string; side: "host" | "away" }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
    <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-sm">
        <HiOutlineUsers className="w-4 h-4 text-white" />
      </div>
      <span className="text-xs sm:text-sm font-bold text-gray-800">
        {name}
      </span>
    </div>
    <span className="text-[10px] font-black text-orange-500 bg-white px-2 py-1 rounded-lg border border-orange-100">
      {side === "host" ? "میزبان" : "میهمان"}
    </span>
  </div>
);

export default MatchDetailPage;