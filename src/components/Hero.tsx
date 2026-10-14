// src/components/Hero.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlinePlay,
  HiOutlineLightningBolt,
  HiOutlineGlobe,
  HiOutlineShieldCheck,
  HiOutlineChevronDown,
  HiOutlineCalendar,
} from "react-icons/hi";
import { FaFutbol, FaBasketballBall, FaVolleyballBall } from "react-icons/fa";
import heroBg from "../assets/hero-bg.jpg";

/* ================================================================ */
/*                    آمار و ارقام                                   */
/* ================================================================ */
const stats = [
  { value: "۵۰۰+", label: "مسابقه‌ی زنده", icon: HiOutlineLightningBolt },
  { value: "۱۲۰+", label: "لیگ جهانی", icon: HiOutlineGlobe },
  { value: "۲۴/۷", label: "پوشش لحظه‌ای", icon: HiOutlineShieldCheck },
];

/* ================================================================ */
/*                    کامپوننت اصلی                                  */
/* ================================================================ */
const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  /* ✅ ذرات رو یه بار با useState initializer می‌سازیم */
  const [particles] = useState(() =>
    [...Array(15)].map((_, i) => ({
      id: i,
      size: 2 + Math.random() * 3,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 4,
    }))
  );

  /* ------- انیمیشن ورود ------- */
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  /* ------- افکت پارالاکس با موس ------- */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center bg-gradient-to-br from-orange-700 via-orange-600 to-red-800 text-white overflow-hidden">
      {/* ================= لایه‌ی تصویر پس‌زمینه ================= */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 scale-110"
        style={{
          backgroundImage: `url(${heroBg})`,
          transform: `scale(1.1) translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* گرادیان اضافی برای خوانایی */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

      {/* ================= افکت‌های نورانی ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-yellow-400/20 blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full bg-orange-500/25 blur-3xl animate-pulse-slow-delayed" />
      </div>

      {/* ================= ذرات شنای متحرک ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-white/30"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              top: `${p.top}%`,
              left: `${p.left}%`,
              animation: `float-particle ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ================= محتوای اصلی ================= */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* ---------- متن اصلی ---------- */}
          <div className="lg:col-span-7 text-center lg:text-right">
            {/* بج کوچیک */}
            <div
              className={`
                inline-flex items-center gap-2 px-4 py-2 rounded-full
                bg-white/15 backdrop-blur-md border border-white/25
                text-xs font-bold text-yellow-300 mb-6
                transition-all duration-700
                ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }
              `}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              بیش از ۱۰۰۰ مسابقه‌ی زنده در انتظار توست
            </div>

            {/* عنوان اصلی */}
            <h1
              className={`
                text-4xl sm:text-5xl md:text-6xl lg:text-7xl
                font-black leading-[1.15] mb-6
                drop-shadow-2xl
                transition-all duration-700 delay-100
                ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }
              `}
            >
              به دنیای
              <span className="relative inline-block mx-3">
                <span className="relative z-10 bg-gradient-to-l from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  ورزش
                </span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 C50 2, 150 2, 198 8"
                    stroke="url(#gradient-line)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient
                      id="gradient-line"
                      x1="0"
                      y1="0"
                      x2="200"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
                      <stop offset="50%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              خوش آمدی
            </h1>

            {/* توضیحات */}
            <p
              className={`
                text-base sm:text-lg md:text-xl text-white/90 leading-relaxed
                max-w-xl mx-auto lg:mx-0 mb-8
                transition-all duration-700 delay-200
                ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }
              `}
            >
              نتایج زنده، اخبار داغ، تحلیل‌های تخصصی و ویدئوهای لحظات ناب
              ورزشی — همه‌چیز در یک‌جا. با{" "}
              <span className="font-black text-yellow-300">ورزش‌نما</span>{" "}
              هیچ لحظه‌ای رو از دست نده.
            </p>

            {/* دکمه‌های CTA */}
            <div
              className={`
                flex flex-wrap items-center justify-center lg:justify-start gap-3
                transition-all duration-700 delay-300
                ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }
              `}
            >
              <Link
                to="/matches"
                className="group flex items-center gap-2 bg-gradient-to-l from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-gray-900 font-black py-3.5 px-6 sm:px-8 rounded-full transition-all shadow-xl shadow-yellow-500/30 hover:shadow-yellow-500/50 hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                <HiOutlinePlay className="w-5 h-5 group-hover:scale-110 transition" />
                مشاهده مسابقات زنده
              </Link>
              <Link
                to="/news"
                className="group flex items-center gap-2 border-2 border-white/60 hover:border-white hover:bg-white/10 backdrop-blur-sm text-white font-bold py-3.5 px-6 sm:px-8 rounded-full transition-all active:scale-95 text-sm sm:text-base"
              >
                <HiOutlineCalendar className="w-5 h-5" />
                آخرین اخبار
              </Link>
            </div>

            {/* آمار */}
            <div
              className={`
                grid grid-cols-3 gap-4 sm:gap-6 mt-12 max-w-lg mx-auto lg:mx-0
                transition-all duration-700 delay-500
                ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }
              `}
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="group text-center lg:text-right"
                  >
                    <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                      <Icon className="w-4 h-4 text-yellow-300" />
                      <span className="text-2xl sm:text-3xl font-black text-white group-hover:text-yellow-300 transition-colors">
                        {stat.value}
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-white/70 font-medium">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ---------- کارت‌های شناور (سمت چپ) ---------- */}
          <div className="hidden lg:block lg:col-span-5 relative h-[500px]">
            {/* کارت اصلی - فوتبال */}
            <div
              className={`
                absolute top-0 left-1/2 -translate-x-1/2
                w-72 bg-white/10 backdrop-blur-xl border border-white/20
                rounded-3xl p-6 shadow-2xl
                transition-all duration-1000 delay-300
                hover:scale-105 hover:bg-white/15
                ${
                  isVisible
                    ? "opacity-100 translate-y-0 rotate-0"
                    : "opacity-0 translate-y-10 rotate-6"
                }
              `}
              style={{
                transform: `translateX(-50%) translateY(${
                  -mousePosition.y * 0.3
                }px)`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg">
                  <FaFutbol className="w-7 h-7 text-white" />
                </div>
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-red-400">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  زنده
                </span>
              </div>
              <p className="text-xs text-white/60 mb-1">لیگ برتر ایران</p>
              <p className="text-lg font-black text-white mb-3">
                پرسپولیس vs استقلال
              </p>
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-3xl font-black text-white">۲</p>
                  <p className="text-[10px] text-white/60 mt-1">میزبان</p>
                </div>
                <div className="text-center text-white/40">
                  <p className="text-xs font-bold mb-1">دقیقه</p>
                  <p className="text-sm font-black">۷۵'</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-white">۱</p>
                  <p className="text-[10px] text-white/60 mt-1">میهمان</p>
                </div>
              </div>
            </div>

            {/* کارت دوم - بسکتبال */}
            <div
              className={`
                absolute top-44 right-0
                w-64 bg-white/10 backdrop-blur-xl border border-white/20
                rounded-3xl p-5 shadow-2xl
                transition-all duration-1000 delay-500
                hover:scale-105 hover:bg-white/15
                ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }
              `}
              style={{
                transform: `translateY(${mousePosition.y * 0.2}px)`,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                  <FaBasketballBall className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-white/60">NBA</p>
                  <p className="text-xs font-black text-white">
                    Lakers vs Celtics
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between bg-white/5 rounded-xl p-2.5">
                <span className="text-[10px] text-white/70 font-bold">
                  پایان Q3
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-black text-white">۸۸</span>
                  <span className="text-white/40 text-[10px]">-</span>
                  <span className="text-sm font-black text-white">۹۲</span>
                </div>
              </div>
            </div>

            {/* کارت سوم - والیبال */}
            <div
              className={`
                absolute bottom-0 left-0
                w-60 bg-white/10 backdrop-blur-xl border border-white/20
                rounded-3xl p-5 shadow-2xl
                transition-all duration-1000 delay-700
                hover:scale-105 hover:bg-white/15
                ${
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }
              `}
              style={{
                transform: `translateY(${mousePosition.y * -0.15}px)`,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                  <FaVolleyballBall className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-white/60">لیگ والیبال</p>
                  <p className="text-xs font-black text-white">
                    ایران vs برزیل
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between bg-white/5 rounded-xl p-2.5">
                <span className="flex items-center gap-1 text-[10px] text-green-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  شروع در ۱۵ دقیقه
                </span>
              </div>
            </div>

            {/* حلقه‌های تزئینی */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/10 animate-spin-slow pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-dashed border-white/15 animate-spin-slow-reverse pointer-events-none" />
          </div>
        </div>
      </div>

      {/* فلش اسکرول */}
      <button
        onClick={() =>
          window.scrollTo({ top: window.innerHeight * 0.9, behavior: "smooth" })
        }
        className={`
          absolute bottom-24 left-1/2 -translate-x-1/2 z-10
          hidden md:flex flex-col items-center gap-1.5
          text-white/60 hover:text-white transition
          animate-bounce-slow
          ${isVisible ? "opacity-100" : "opacity-0"}
        `}
        aria-label="اسکرول به پایین"
      >
        <span className="text-[10px] font-bold">اسکرول کن</span>
        <HiOutlineChevronDown className="w-5 h-5" />
      </button>

      {/* موج تزئینی پایین */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          fill="none"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0,64L60,58.7C120,53,240,43,360,48C480,53,600,75,720,80C840,85,960,75,1080,69.3C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            fill="#f3f4f6"
          />
        </svg>
      </div>

      {/* انیمیشن‌ها */}
      <style>{`
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10%, 90% {
            opacity: 0.6;
          }
          50% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.3;
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.7;
            transform: scale(1.1);
          }
        }

        @keyframes pulse-slow-delayed {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.15);
          }
        }

        @keyframes spin-slow {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes spin-slow-reverse {
          from {
            transform: translate(-50%, -50%) rotate(360deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(0deg);
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
          }
          50% {
            transform: translateX(-50%) translateY(-8px);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-slow-delayed {
          animation: pulse-slow-delayed 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 25s linear infinite;
        }

        .animate-spin-slow-reverse {
          animation: spin-slow-reverse 35s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;