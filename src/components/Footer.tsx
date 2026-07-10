import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-auto">
      <div className="container mx-auto px-4">
        {/* بخش بالایی: ۴ ستون */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* ستون ۱: لوگو و توضیحات */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">⚽</span>
              <h2 className="text-2xl font-bold text-white">ورزش‌پلاس</h2>
            </div>
            <p className="text-sm leading-relaxed">
              اولین و بزرگترین مرجع تخصصی اخبار، نتایج زنده و ویدئوهای لحظات ناب ورزشی.
              همراه همیشگی شما برای هیجان ورزش.
            </p>
          </div>

          {/* ستون ۲: لینک‌های سریع */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-r-2 border-orange-500 pr-2 inline-block">
              دسترسی سریع
            </h3>
            <ul className="space-y-2 mt-4">
              <li><Link to="/" className="hover:text-orange-400 transition">خانه</Link></li>
              <li><Link to="/matches" className="hover:text-orange-400 transition">مسابقات</Link></li>
              <li><Link to="/news" className="hover:text-orange-400 transition">اخبار</Link></li>
              <li><Link to="/videos" className="hover:text-orange-400 transition">ویدئوها</Link></li>
              <li><Link to="/contact" className="hover:text-orange-400 transition">تماس با ما</Link></li>
            </ul>
          </div>

          {/* ستون ۳: شبکه‌های اجتماعی */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-r-2 border-orange-500 pr-2 inline-block">
              ما را دنبال کنید
            </h3>
            <div className="flex space-x-4 rtl:space-x-reverse mt-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-orange-500 p-2 rounded-full transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-orange-500 p-2 rounded-full transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.55 0 .36.04.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.28 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.38.1-.78.16-1.2.16-.3 0-.58-.03-.87-.08.59 1.84 2.3 3.18 4.32 3.22-1.58 1.24-3.57 1.98-5.74 1.98-.37 0-.74-.02-1.1-.06 2.03 1.3 4.44 2.06 7.04 2.06 8.44 0 13.06-7 13.06-13.06 0-.2 0-.4-.02-.6.9-.63 1.68-1.42 2.3-2.32z"/></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-orange-500 p-2 rounded-full transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.16c-5.5 0-10 4.5-10 10 0 4.67 3.18 8.63 7.5 9.8.55.1.75-.24.75-.53 0-.26-.01-.96-.01-1.88-3.07.67-3.72-1.48-3.72-1.48-.5-1.27-1.23-1.61-1.23-1.61-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.72.38-1.2.7-1.48-2.44-.28-5-1.22-5-5.42 0-1.2.43-2.18 1.13-2.95-.1-.28-.5-1.4.1-2.92 0 0 .92-.3 3 1.12.87-.24 1.8-.36 2.73-.37.93.01 1.86.13 2.73.37 2.08-1.42 3-1.12 3-1.12.6 1.52.2 2.64.1 2.92.7.77 1.13 1.75 1.13 2.95 0 4.2-2.56 5.14-5 5.42.38.33.72.98.72 1.98 0 1.43-.02 2.58-.02 2.93 0 .29.2.63.75.52 4.32-1.17 7.5-5.13 7.5-9.8 0-5.5-4.5-10-10-10z"/></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-orange-500 p-2 rounded-full transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.67 6.09c-.93-.33-1.96-.52-3.02-.52-1.5 0-2.92.36-4.19 1-.63.32-1.33.32-1.96 0-1.27-.64-2.69-1-4.19-1-1.06 0-2.09.19-3.02.52C4.58 6.57 4 7.78 4 9.1v6.82c0 1.32.58 2.53 1.29 3.01.93.33 1.96.52 3.02.52 1.5 0 2.92-.36 4.19-1 .63-.32 1.33-.32 1.96 0 1.27.64 2.69 1 4.19 1 1.06 0 2.09-.19 3.02-.52.71-.48 1.29-1.69 1.29-3.01V9.1c0-1.32-.58-2.53-1.29-3.01zM9.45 15.2L7 13.4l2.45-1.8v3.6zm6.55 0l-2.45-1.8 2.45-1.8v3.6z"/></svg>
              </a>
            </div>
          </div>

          {/* ستون ۴: اطلاعات تماس */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-r-2 border-orange-500 pr-2 inline-block">
              تماس با ما
            </h3>
            <ul className="space-y-3 mt-4 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>تهران، خیابان ورزش، پلاک ۱۲</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <span>info@sportsplus.ir</span>
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
            </ul>
          </div>
        </div>

        {/* خط جداکننده */}
        <div className="border-t border-gray-800 my-6"></div>

        {/* کپی‌رایت */}
        <div className="text-center text-sm text-gray-400">
          <p>© {currentYear} ورزش‌پلاس. تمامی حقوق محفوظ است.</p>
          <p className="mt-1">طراحی شده با <span className="text-red-500">❤️</span> برای عاشقان ورزش</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;