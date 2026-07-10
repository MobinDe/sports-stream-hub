// src/services/api.ts
import matchDerby from "../assets/match-derby.jpg";
import matchElclasico from "../assets/match-elclasico.jpg";
import matchLakersWarriors from "../assets/match-lakers-warriors.jpg";
import matchWimbledon from "../assets/match-wimbledon.jpg";
import matchIranJapan from "../assets/match-iran-japan.jpg";
import matchUclFinal from "../assets/match-ucl-final.jpg";

import newsRonaldo from "../assets/news-ronaldo.jpg";
import newsWrestling from "../assets/news-wrestling.jpg";
import newsGiannis from "../assets/news-giannis.jpg";
import newsVolleyball from "../assets/news-volleyball.jpg";
import newsNapoli from "../assets/news-napoli.jpg";

// ------------------------------
// 1. تعریف تایپ‌ها (Types)
// ------------------------------

export interface Match {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
  link?: string;
}

export interface NewsItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
  link: string;
}

export interface VideoItem {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  category: string;
  date: string;
  duration?: string;
}

export interface MatchFilters {
  category?: string;
  date?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface NewsFilters {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface VideoFilters {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ------------------------------
// 2. دیتای شبیه‌سازی شده (Mock Data)
// ------------------------------

const mockMatches: Match[] = [
  {
    id: 1,
    title: "استقلال - پرسپولیس",
    description: "دربی ۱۰۲ تهران، حساسترین دیدار فصل",
    imageUrl: matchDerby,
    category: "فوتبال",
    date: "۲۰:۳۰ - امروز",
    link: "/match/1",
  },
  {
    id: 2,
    title: "رئال مادرید - بارسلونا",
    description: "ال کلاسیکو، تقابل ستارگان",
    imageUrl: matchElclasico,
    category: "فوتبال",
    date: "۲۳:۱۵ - امشب",
    link: "/match/2",
  },
  {
    id: 3,
    title: "لس آنجلس لیکرز - گلدن استیت واریرز",
    description: "لبران جیمز در برابر استفن کری",
    imageUrl: matchLakersWarriors,
    category: "بسکتبال",
    date: "۰۳:۳۰ بامداد",
    link: "/match/3",
  },
  {
    id: 4,
    title: "نواک جوکوویچ - کارلوس آلکاراس",
    description: "فینال ویمبلدون",
    imageUrl: matchWimbledon,
    category: "تنیس",
    date: "۱۶:۰۰ - فردا",
    link: "/match/4",
  },
  {
    id: 5,
    title: "تیم ملی ایران - تیم ملی ژاپن",
    description: "انتقام جام ملت‌های آسیا",
    imageUrl: matchIranJapan,
    category: "فوتبال",
    date: "۲۱:۰۰ - شنبه",
    link: "/match/5",
  },
  {
    id: 6,
    title: "فینال لیگ قهرمانان اروپا",
    description: "منچسترسیتی vs اینتر میلان",
    imageUrl: matchUclFinal,
    category: "فوتبال",
    date: "۲۳:۰۰ - ۱۰ خرداد",
    link: "/match/6",
  },
];

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "رونالدو به النصر پیوست",
    description: "CR7 با عقد قراردادی ۲.۵ ساله به تیم عربستانی پیوست.",
    imageUrl: newsRonaldo,
    category: "فوتبال",
    date: "۲ ساعت قبل",
    link: "/news/1",
  },
  {
    id: 2,
    title: "قهرمانی تیم ملی کشتی آزاد در آسیا",
    description: "تیم ایران با کسب ۸ مدال طلا قهرمان شد.",
    imageUrl: newsWrestling,
    category: "کشتی",
    date: "دیروز",
    link: "/news/2",
  },
  {
    id: 3,
    title: "انتقام یانیس از ساکرمنتو",
    description: "باکس ۵۰ امتیازی یانیس آتتوکامپو",
    imageUrl: newsGiannis,
    category: "بسکتبال",
    date: "۳ روز قبل",
    link: "/news/3",
  },
  {
    id: 4,
    title: "صعود تیم ملی والیبال به المپیک",
    description: "شاگردان بهروز عطایی با غلبه بر کوبا جواز حضور گرفتند.",
    imageUrl: newsVolleyball,
    category: "والیبال",
    date: "هفته گذشته",
    link: "/news/4",
  },
  {
    id: 5,
    title: "ناپولی قهرمان سری ایتالیا شد",
    description: "ناپولی پس از ۳۳ سال اسکودتو را بالای سر برد.",
    imageUrl: newsNapoli,
    category: "فوتبال",
    date: "۵ روز قبل",
    link: "/news/5",
  },
];

const mockVideos: VideoItem[] = [
  {
    id: 1,
    title: "خلاصه بازی استقلال ۳-۱ پرسپولیس",
    description: "گل‌ها و لحظات حساس دربی ۱۰۲",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "فوتبال",
    date: "دیروز",
    duration: "۴:۳۲",
  },
  {
    id: 2,
    title: "بهترین دانک‌های هفته NBA",
    description: "اسلم دانک‌های نفس‌گیر",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "بسکتبال",
    date: "۲ روز قبل",
    duration: "۳:۱۸",
  },
  {
    id: 3,
    title: "آموزش ضربه فورهند حرفه‌ای در تنیس",
    description: "با تکنیک‌های نواک جوکوویچ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "تنیس",
    date: "هفته گذشته",
    duration: "۵:۲۱",
  },
  {
    id: 4,
    title: "گل‌های هفته لیگ برتر انگلیس",
    description: "گل‌های دیدنی هفته ۳۷",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    category: "فوتبال",
    date: "۳ روز قبل",
    duration: "۶:۰۴",
  },
];

// ------------------------------
// 3. توابع کمکی (فیلتر، جستجو، صفحه‌بندی)
// ------------------------------

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const filterMatches = (
  filters: MatchFilters,
): { data: Match[]; total: number } => {
  let filtered = [...mockMatches];
  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter((m) => m.category === filters.category);
  }
  if (filters.search) {
    const s = filters.search.toLowerCase();
    filtered = filtered.filter(
      (m) =>
        m.title.toLowerCase().includes(s) ||
        m.description.toLowerCase().includes(s),
    );
  }
  const total = filtered.length;
  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const paginated = filtered.slice((page - 1) * limit, page * limit);
  return { data: paginated, total };
};

const filterNews = (
  filters: NewsFilters,
): { data: NewsItem[]; total: number } => {
  let filtered = [...mockNews];
  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter((n) => n.category === filters.category);
  }
  if (filters.search) {
    const s = filters.search.toLowerCase();
    filtered = filtered.filter(
      (n) =>
        n.title.toLowerCase().includes(s) ||
        n.description.toLowerCase().includes(s),
    );
  }
  const total = filtered.length;
  const page = filters.page || 1;
  const limit = filters.limit || 9;
  const paginated = filtered.slice((page - 1) * limit, page * limit);
  return { data: paginated, total };
};

const filterVideos = (
  filters: VideoFilters,
): { data: VideoItem[]; total: number } => {
  let filtered = [...mockVideos];
  if (filters.category && filters.category !== "all") {
    filtered = filtered.filter((v) => v.category === filters.category);
  }
  if (filters.search) {
    const s = filters.search.toLowerCase();
    filtered = filtered.filter(
      (v) =>
        v.title.toLowerCase().includes(s) ||
        v.description.toLowerCase().includes(s),
    );
  }
  const total = filtered.length;
  const page = filters.page || 1;
  const limit = filters.limit || 6;
  const paginated = filtered.slice((page - 1) * limit, page * limit);
  return { data: paginated, total };
};

// ------------------------------
// 4. توابع اصلی برای استفاده در کامپوننت‌ها
// ------------------------------

export const fetchTodayMatches = async (): Promise<Match[]> => {
  await delay(600);
  return mockMatches.slice(0, 3);
};

export const fetchSportsNews = async (): Promise<NewsItem[]> => {
  await delay(600);
  return mockNews.slice(0, 3);
};

export const fetchMatches = async (
  filters: MatchFilters = {},
): Promise<{ data: Match[]; total: number }> => {
  await delay(800);
  return filterMatches(filters);
};

export const fetchNews = async (
  filters: NewsFilters = {},
): Promise<{ data: NewsItem[]; total: number }> => {
  await delay(800);
  return filterNews(filters);
};

export const fetchVideos = async (
  filters: VideoFilters = {},
): Promise<{ data: VideoItem[]; total: number }> => {
  await delay(800);
  return filterVideos(filters);
};

// ارسال فرم تماس - بدون any
export const submitContactForm = async (
  data: ContactFormData,
): Promise<{ success: boolean; message: string }> => {
  await delay(1000);
  console.log("Form submitted:", data);
  return { success: true, message: "پیام شما با موفقیت ارسال شد." };
};
