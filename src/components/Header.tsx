import { useState } from "react";
import NavItem from "../components/NavItem";
import logo from "../assets/image/logo.png";

export interface NavItemType {
  id: string;
  title: string;
  href: string;
}

const navItems: NavItemType[] = [
  { id: "home", title: "خانه", href: "/" },
  { id: "matches", title: "مسابقات", href: "/matches" },
  { id: "news", title: "اخبار", href: "/news" },
  { id: "videos", title: "ویدئوها", href: "/videos" },
  { id: "contact", title: "تماس با ما", href: "/contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("home");

  const handleNavClick = (id: string) => {
    setActiveId(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full  bg-orange-600  shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* لوگو + عنوان */}
          <div className="flex items-center gap-2 md:gap-3">
            <a href="/" className="flex items-center gap-2 no-underline">
              <img
                src={logo}
                alt="ورزش‌نما"
                className="h-16 w-auto md:h-14 object-contain"
              />
              <span className="text-white font-bold text-lg md:text-2xl hidden sm ">
                ورزش‌ نما
              </span>
            </a>
          </div>

          {/* منوی دسکتاپ */}
          <nav className="hidden md:flex space-x-1 lg:space-x-2 rtl:space-x-reverse">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                href={item.href}
                active={activeId === item.id}
                onClick={() => setActiveId(item.id)}
                className="px-3 py-2 rounded-lg text-white hover:bg-white/10 transition"
              >
                {item.title}
              </NavItem>
            ))}
          </nav>

          {/* دکمه‌های سمت راست */}
          <div className="hidden md:flex items-center gap-3">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-full font-semibold transition shadow-md">
              ورود
            </button>
            <button className="border border-white hover:bg-white/10 text-white px-4 py-2 rounded-full font-semibold transition">
              ثبت‌نام
            </button>
          </div>

          {/* دکمه همبرگر */}
          <button
            className="md:hidden text-white text-2xl focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="منو"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* منوی موبایل */}
      {isMenuOpen && (
        <div className="md:hidden bg-orange-700/95 backdrop-blur-sm border-t border-orange-500">
          <nav className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                href={item.href}
                active={activeId === item.id}
                onClick={() => handleNavClick(item.id)}
                className="block px-3 py-2 rounded-lg text-white hover:bg-white/10 transition"
              >
                {item.title}
              </NavItem>
            ))}
            <div className="flex flex-col gap-2 pt-3 mt-2 border-t border-orange-500">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 rounded-full font-semibold w-full">
                ورود
              </button>
              <button className="border border-white hover:bg-white/10 text-white px-4 py-2 rounded-full font-semibold w-full">
                ثبت‌نام
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
