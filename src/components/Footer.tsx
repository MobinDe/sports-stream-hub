// src/components/Footer.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
  HiOutlineShieldCheck,
  HiOutlineLightningBolt,
  HiOutlineGlobe,
  HiOutlineChat,
  HiOutlineChevronLeft,
} from "react-icons/hi";
import {
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

/* ================================================================ */
/*                    لینک‌های فوتر                                  */
/* ================================================================ */
const quickLinks = [
  { label: "خانه", href: "/" },
  { label: "مسابقات", href: "/matches" },
  { label: "اخبار", href: "/news" },
  { label: "ویدئوها", href: "/videos" },
  { label: "تماس با ما", href: "/contact" },
];

const categories = [
  { label: "فوتبال", href: "/matches?type=football" },
  { label: "بسکتبال", href: "/matches?type=basketball" },
  { label: "والیبال", href: "/matches?type=volleyball" },
  { label: "کشتی", href: "/matches?type=wrestling" },
  { label: "پینگ‌پنگ", href: "/matches?type=pingpong" },
];

const services = [
  { label: "نتایج زنده", href: "/livescore" },
  { label: "جدول لیگ‌ها", href: "/standings" },
  { label: "برنامه‌ی بازی‌ها", href: "/schedule" },
  { label: "آمار بازیکنان", href: "/players" },
  { label: "تحلیل و پیش‌بینی", href: "/analysis" },
];

/* ================================================================ */
/*                       کامپوننت اصلی                              */
/* ================================================================ */
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsSubscribed(true);
    setEmail("");
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  /* ✅ اعداد فارسی (اصلاح‌شده) */
  const toPersianNum = (num: number | string) =>
    num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);

  return (
    <footer
      dir="rtl"
      className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-300 mt-auto overflow-hidden"
    >
      {/* بافت تزئینی */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -bottom-32 left-0 w-96 h-96 rounded-full bg-yellow-500/5 blur-3xl" />
      </div>

      {/* خط نارنجی بالا */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-l from-orange-600 via-yellow-400 to-orange-600" />

      {/* ===================================================== */}
      {/*          نوار ویژگی‌ها (بالای فوتر)                    */}
      {/* ===================================================== */}
      <div className="relative border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <FeatureBadge
              icon={HiOutlineLightningBolt}
              title="پوشش لحظه‌ای"
              desc="۲۴/۷ بدون توقف"
            />
            <FeatureBadge
              icon={HiOutlineShieldCheck}
              title="منابع معتبر"
              desc="اخبار تأییدشده"
            />
            <FeatureBadge
              icon={HiOutlineGlobe}
              title="پوشش جهانی"
              desc="تمام لیگ‌های دنیا"
            />
            <FeatureBadge
              icon={HiOutlineChat}
              title="پشتیبانی زنده"
              desc="پاسخ در چند دقیقه"
            />
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/*                بدنه اصلی فوتر                         */}
      {/* ===================================================== */}
      <div className="relative container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* ---------------- ستون برند ---------------- */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500 to-yellow-500 blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                  <span className="text-3xl">⚽</span>
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl font-black text-white leading-none group-hover:text-orange-400 transition-colors">
                  ورزش‌نما
                </h2>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-4 h-px bg-orange-500/60" />
                  <p className="text-[9px] text-orange-400/90 font-bold tracking-[0.2em]">
                    SPORTS ARENA
                  </p>
                </div>
              </div>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed">
              مرجع تخصصی اخبار، نتایج زنده و ویدئوهای لحظات ناب ورزشی. همراه
              همیشگی شما برای هیجان بی‌پایان ورزش، از لیگ‌های داخلی تا
              رقابت‌های بین‌المللی.
            </p>

            {/* اطلاعات تماس */}
            <div className="space-y-3 pt-2">
              <ContactRow
                icon={HiOutlineLocationMarker}
                text="تهران، خیابان ورزش، پلاک ۱۲"
              />
              <ContactRow
                icon={HiOutlineMail}
                text="info@sportsnama.ir"
                href="mailto:info@sportsnama.ir"
                dir="ltr"
              />
              <ContactRow
                icon={HiOutlinePhone}
                text="۰۲۱-۱۲۳۴۵۶۷۸"
                href="tel:02112345678"
              />
            </div>
          </div>

          {/* ---------------- لینک‌های سریع ---------------- */}
          <FooterColumn title="دسترسی سریع" links={quickLinks} />

          {/* ---------------- دسته‌بندی ورزشی ---------------- */}
          <FooterColumn title="رشته‌های ورزشی" links={categories} />

          {/* ---------------- خدمات ---------------- */}
          <FooterColumn title="خدمات ورزش‌نما" links={services} />

          {/* ---------------- خبرنامه ---------------- */}
          <div className="lg:col-span-2 space-y-5">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <span className="w-1 h-4 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full" />
              خبرنامه ورزشی
            </h3>

            <p className="text-xs text-gray-400 leading-relaxed">
              برای دریافت اخبار فوری و نتایج زنده، ایمیلت رو وارد کن.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ایمیل شما..."
                  className="w-full py-3 pr-10 pl-3 bg-gray-800 border border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 rounded-xl text-xs text-white placeholder-gray-500 outline-none transition"
                  dir="ltr"
                />
                <HiOutlineMail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              </div>

              <button
                type="submit"
                className={`
                  w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black
                  transition-all active:scale-95
                  ${
                    isSubscribed
                      ? "bg-gradient-to-l from-green-500 to-green-600 text-white shadow-lg shadow-green-500/20"
                      : "bg-gradient-to-l from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
                  }
                `}
              >
                {isSubscribed ? (
                  <>
                    <HiOutlineCheckCircle className="w-4 h-4" />
                    عضویت انجام شد
                  </>
                ) : (
                  <>
                    عضویت در خبرنامه
                    <HiOutlineArrowLeft className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* شبکه‌های اجتماعی */}
            <div className="pt-3">
              <p className="text-xs text-gray-500 mb-3">ما را دنبال کنید:</p>
              <div className="flex items-center gap-2 flex-wrap">
                <SocialButton
                  href="https://instagram.com"
                  label="اینستاگرام"
                  hoverColor="hover:from-pink-500 hover:to-purple-600"
                >
                  <FaInstagram className="w-4 h-4" />
                </SocialButton>
                <SocialButton
                  href="https://t.me"
                  label="تلگرام"
                  hoverColor="hover:from-blue-400 hover:to-blue-600"
                >
                  <FaTelegram className="w-4 h-4" />
                </SocialButton>
                <SocialButton
                  href="https://wa.me/989123456789"
                  label="واتساپ"
                  hoverColor="hover:from-green-400 hover:to-green-600"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </SocialButton>
                <SocialButton
                  href="https://twitter.com"
                  label="توییتر"
                  hoverColor="hover:from-sky-400 hover:to-sky-600"
                >
                  <FaTwitter className="w-4 h-4" />
                </SocialButton>
                <SocialButton
                  href="https://youtube.com"
                  label="یوتیوب"
                  hoverColor="hover:from-red-500 hover:to-red-700"
                >
                  <FaYoutube className="w-4 h-4" />
                </SocialButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===================================================== */}
      {/*              نمادهای اعتماد                           */}
      {/* ===================================================== */}
      <div className="relative border-t border-gray-800">
        <div className="container mx-auto px-4 py-6 flex flex-wrap items-center justify-center gap-4">
          <TrustBadge icon={HiOutlineShieldCheck} text="سایت امن" />
          <TrustBadge icon={HiOutlineCheckCircle} text="محتوای تأییدشده" />
          <TrustBadge icon={HiOutlineLightningBolt} text="پوشش لحظه‌ای" />
          <TrustBadge icon={HiOutlineGlobe} text="دسترسی از سراسر دنیا" />
        </div>
      </div>

      {/* ===================================================== */}
      {/*              نوار پایانی (کپی‌رایت)                    */}
      {/* ===================================================== */}
      <div className="relative border-t border-gray-800 bg-gradient-to-l from-black via-gray-950 to-black">
        <div className="container mx-auto px-4 py-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[11px] text-gray-500">
            © {toPersianNum(currentYear)} - تمامی حقوق برای{" "}
            <Link
              to="/"
              className="text-orange-500 font-black hover:text-orange-400 transition"
            >
              ورزش‌نما
            </Link>{" "}
            محفوظ است.
          </p>

          <p className="text-[11px] text-gray-500 flex items-center gap-1.5">
            طراحی شده با
            <span className="text-red-500 animate-pulse">❤️</span>
            برای عاشقان ورزش
          </p>

          <div className="flex items-center gap-3 text-[11px] text-gray-500">
            <Link to="/privacy" className="hover:text-orange-400 transition">
              حریم خصوصی
            </Link>
            <span className="w-px h-3 bg-gray-700" />
            <Link to="/terms" className="hover:text-orange-400 transition">
              قوانین
            </Link>
            <span className="w-px h-3 bg-gray-700" />
            <Link to="/sitemap" className="hover:text-orange-400 transition">
              نقشه سایت
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ================================================================ */
/*                    کامپوننت‌های کمکی                             */
/* ================================================================ */

/* ---------------- ستون لینک ---------------- */
interface FooterColumnProps {
  title: string;
  links: { label: string; href: string }[];
}

const FooterColumn = ({ title, links }: FooterColumnProps) => (
  <div className="lg:col-span-2">
    <h3 className="text-base font-black text-white mb-5 flex items-center gap-2">
      <span className="w-1 h-4 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full" />
      {title}
    </h3>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <Link
            to={link.href}
            className="group flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition"
          >
            <HiOutlineChevronLeft className="w-3 h-3 opacity-0 -mr-3 group-hover:opacity-100 group-hover:mr-0 transition-all duration-200" />
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

/* ---------------- ردیف تماس ---------------- */
interface ContactRowProps {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
  href?: string;
  dir?: string;
}

const ContactRow = ({ icon: Icon, text, href, dir }: ContactRowProps) => {
  const content = (
    <>
      <div className="w-9 h-9 rounded-lg bg-gray-800 group-hover:bg-orange-500/15 border border-gray-700 group-hover:border-orange-500/40 flex items-center justify-center transition shrink-0">
        <Icon className="w-4 h-4 text-orange-400 group-hover:scale-110 transition" />
      </div>
      <span
        className="text-sm font-bold group-hover:text-orange-400 transition"
        dir={dir}
      >
        {text}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className="flex items-center gap-3 group">
        {content}
      </a>
    );
  }

  return <div className="flex items-center gap-3 group">{content}</div>;
};

/* ---------------- نشان ویژگی ---------------- */
interface FeatureBadgeProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

const FeatureBadge = ({ icon: Icon, title, desc }: FeatureBadgeProps) => (
  <div className="group flex items-center gap-3 p-3 rounded-2xl border border-transparent hover:border-orange-500/30 hover:bg-gray-800/40 transition-all duration-300">
    <div className="relative shrink-0">
      <div className="absolute inset-0 rounded-xl bg-orange-500/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-orange-500/15 to-orange-600/5 border border-orange-500/30 group-hover:border-orange-500/60 flex items-center justify-center transition-all">
        <Icon className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-transform" />
      </div>
    </div>
    <div className="min-w-0">
      <h3 className="text-sm font-black text-white">{title}</h3>
      <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
    </div>
  </div>
);

/* ---------------- دکمه شبکه اجتماعی ---------------- */
interface SocialButtonProps {
  href: string;
  label: string;
  children: React.ReactNode;
  hoverColor: string;
}

const SocialButton = ({
  href,
  label,
  children,
  hoverColor,
}: SocialButtonProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={`
      w-9 h-9 rounded-xl bg-gray-800 hover:bg-gradient-to-br ${hoverColor}
      text-gray-400 hover:text-white
      border border-gray-700 hover:border-transparent
      flex items-center justify-center
      transition-all duration-300 hover:scale-110
    `}
  >
    {children}
  </a>
);

/* ---------------- نشان اعتماد ---------------- */
interface TrustBadgeProps {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

const TrustBadge = ({ icon: Icon, text }: TrustBadgeProps) => (
  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-800 hover:border-orange-500/30 transition">
    <Icon className="w-4 h-4 text-orange-400" />
    <span className="text-[11px] font-bold text-gray-300">{text}</span>
  </div>
);

export default Footer;