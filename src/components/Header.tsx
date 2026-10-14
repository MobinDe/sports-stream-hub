// src/components/Header.tsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconType } from "react-icons";
import {
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlineNewspaper,
  HiOutlinePlay,
  HiOutlinePhone,
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineSearch,
} from "react-icons/hi";
import NavItem from "../components/NavItem";
import logo from "../assets/image/logo.png";

export interface NavItemType {
  id: string;
  title: string;
  href: string;
  icon: IconType;
}

const navItems: NavItemType[] = [
  { id: "home", title: "خانه", href: "/", icon: HiOutlineHome },
  { id: "matches", title: "مسابقات", href: "/matches", icon: HiOutlineCalendar },
  { id: "news", title: "اخبار", href: "/news", icon: HiOutlineNewspaper },
  { id: "videos", title: "ویدئوها", href: "/videos", icon: HiOutlinePlay },
  { id: "contact", title: "تماس با ما", href: "/contact", icon: HiOutlinePhone },
];

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const [lastPathname, setLastPathname] = useState(location.pathname);

  /* ------- تشخیص صفحه‌ی فعال از URL ------- */
  const activeId =
    navItems.find((item) =>
      item.href === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(item.href)
    )?.id || "home";

  /* ------- بستن منو هنگام تغییر مسیر ------- */
  if (lastPathname !== location.pathname) {
    setLastPathname(location.pathname);
    if (isMenuOpen) setIsMenuOpen(false);
  }

  /* ------- افکت اسکرول ------- */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ------- قفل اسکرول وقتی منو بازه ------- */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className={`
          sticky top-0 z-50 w-full transition-all duration-300
          ${
            isScrolled
              ? "bg-orange-600/95 backdrop-blur-md shadow-lg shadow-orange-900/20"
              : "bg-orange-600 shadow-md"
          }
        `}
      >
        {/* نوار تزئینی بالایی */}
        <div className="h-0.5 bg-gradient-to-l from-yellow-400 via-orange-300 to-yellow-400" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`
              flex items-center justify-between gap-3
              transition-all duration-300
              ${isScrolled ? "h-16" : "h-18 md:h-20"}
            `}
          >
            {/* ================= لوگو + برند ================= */}
            <Link to="/" className="group flex items-center gap-2.5 shrink-0">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-yellow-400/40 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <img
                  src={logo}
                  alt="ورزش‌نما"
                  className="relative h-12 w-auto md:h-14 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="hidden sm:flex flex-col leading-none">
                <span className="text-white font-black text-lg md:text-xl tracking-tight">
                  ورزش‌نما
                </span>
                <span className="text-[9px] md:text-[10px] text-yellow-300/90 font-bold tracking-[0.2em] mt-1">
                  SPORTS ARENA
                </span>
              </span>
            </Link>

            {/* ================= منوی دسکتاپ (وسط) ================= */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 rtl:space-x-reverse flex-1 justify-center max-w-2xl">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeId === item.id;
                return (
                  <NavItem
                    key={item.id}
                    href={item.href}
                    active={isActive}
                    onClick={handleNavClick}
                    className={`
                      relative flex items-center gap-1.5 px-3 py-2 rounded-xl
                      text-sm font-bold transition-all duration-200
                      ${
                        isActive
                          ? "bg-white/15 text-white shadow-inner"
                          : "text-white/85 hover:bg-white/10 hover:text-white"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.title}</span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-yellow-400 rounded-full" />
                    )}
                  </NavItem>
                );
              })}
            </nav>

            {/* ================= دکمه‌های سمت چپ (دسکتاپ) ================= */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              {/* جستجو */}
              <button
                className="w-10 h-10 flex items-center justify-center text-white rounded-xl hover:bg-white/10 transition"
                aria-label="جستجو"
              >
                <HiOutlineSearch className="w-5 h-5" />
              </button>

              {/* تماس با ما (CTA اصلی) */}
            
            </div>

            {/* ================= دکمه‌های موبایل ================= */}
            <div className="flex md:hidden items-center gap-2">
              <button
                className="w-10 h-10 flex items-center justify-center text-white rounded-xl hover:bg-white/10 transition"
                aria-label="جستجو"
              >
                <HiOutlineSearch className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 flex items-center justify-center text-white rounded-xl hover:bg-white/10 transition"
                aria-label="منو"
              >
                {isMenuOpen ? (
                  <HiOutlineX className="w-6 h-6" />
                ) : (
                  <HiOutlineMenu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ================= بک‌دراپ منوی موبایل ================= */}
      <div
        className={`
          md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40
          transition-opacity duration-300
          ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* ================= منوی موبایل (اسلاید از راست) ================= */}
      <div
        dir="rtl"
        className={`
          md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50
          bg-gradient-to-b from-orange-700 via-orange-600 to-orange-700
          shadow-2xl shadow-black/50
          flex flex-col
          transition-transform duration-300 ease-out
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* هدر منوی موبایل */}
        <div className="flex items-center justify-between p-4 border-b border-white/15">
          <Link
            to="/"
            onClick={handleNavClick}
            className="flex items-center gap-2.5"
          >
            <img
              src={logo}
              alt="ورزش‌نما"
              className="h-11 w-auto object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="text-white font-black text-base">ورزش‌نما</span>
              <span className="text-[9px] text-yellow-300/90 font-bold tracking-[0.15em] mt-1">
                SPORTS ARENA
              </span>
            </div>
          </Link>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-red-500/80 text-white transition"
            aria-label="بستن"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        {/* آیتم‌های منو */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            return (
              <NavItem
                key={item.id}
                href={item.href}
                active={isActive}
                onClick={handleNavClick}
                className={`
                  flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-white/20 text-white shadow-inner border-r-4 border-yellow-400"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                  }
                `}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.title}</span>
              </NavItem>
            );
          })}
        </nav>

        {/* CTA پایین منو */}
        <div className="p-4 border-t border-white/15 space-y-3">
         

          {/* نسخه */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            نسخه ۱.۰.۰
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;