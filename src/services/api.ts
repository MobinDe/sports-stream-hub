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

/* ================================================================ */
/*                       1. تعریف تایپ‌ها                            */
/* ================================================================ */

export interface Match {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
  link?: string;
  teamA?: string;
  teamB?: string;
  scoreA?: number;
  scoreB?: number;
  league?: string;
  status?: "live" | "upcoming" | "finished";
  minute?: string;
  streamUrl?: string;
  venue?: string;
  channels?: string[];
}

export interface NewsItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
  link: string;
  readTime?: string;
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
  views?: number;
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

/* ================================================================ */
/*                   2. دیتای شبیه‌سازی شده                         */
/* ================================================================ */

const mockMatches: Match[] = [
  /* ──────────────── فوتبال (۱-۱۲) ──────────────── */
  {
    id: 1,
    title: "استقلال - پرسپولیس",
    description: "دربی ۱۰۲ تهران، حساسترین دیدار فصل",
    imageUrl: matchDerby,
    category: "فوتبال",
    date: "۲۰:۳۰ - امروز",
    link: "/match/1",
    teamA: "استقلال",
    teamB: "پرسپولیس",
    scoreA: 1,
    scoreB: 1,
    league: "لیگ برتر ایران",
    status: "finished",
    minute: "۹۰",
    streamUrl: "https://www.aparat.com/v/ilbql73",
    venue: "ورزشگاه آزادی تهران",
    channels: ["شبکه سه", "varzesh3.com"],
  },
  {
    id: 2,
    title: "رئال مادرید - بارسلونا",
    description: "ال کلاسیکو، تقابل ستارگان بزرگ فوتبال جهان",
    imageUrl: matchElclasico,
    category: "فوتبال",
    date: "۲۳:۱۵ - امشب",
    link: "/match/2",
    teamA: "رئال مادرید",
    teamB: "بارسلونا",
    scoreA: 2,
    scoreB: 3,
    league: "لالیگا اسپانیا",
    status: "finished",
    streamUrl: "https://www.aparat.com/v/lia6p76",
    venue: "ورزشگاه سانتیاگو برنابئو",
    channels: ["شبکه سه", "beIN Sports"],
  },
  {
    id: 3,
    title: "منچسترسیتی - لیورپول",
    description: "نبرد قهرمانان در آنفیلد",
    imageUrl: matchDerby,
    category: "فوتبال",
    date: "۲۲:۰۰ - امشب",
    link: "/match/3",
    teamA: "منچسترسیتی",
    teamB: "لیورپول",
    scoreA: 0,
    scoreB: 0,
    league: "لیگ برتر انگلیس",
    status: "upcoming",
    streamUrl: "https://www.aparat.com/v/ilbql73",
    venue: "Anfield",
    channels: ["beIN Sports"],
  },
  {
    id: 4,
    title: "بایرن مونیخ - دورتموند",
    description: "دربی کلاسیکر آلمان",
    imageUrl: matchUclFinal,
    category: "فوتبال",
    date: "۲۲:۳۰ - جمعه",
    link: "/match/4",
    teamA: "بایرن مونیخ",
    teamB: "دورتموند",
    scoreA: 3,
    scoreB: 2,
    league: "بوندسلیگا",
    status: "finished",
    streamUrl: "https://www.aparat.com/v/ilbql73",
    venue: "Allianz Arena",
    channels: ["beIN Sports"],
  },
  {
    id: 5,
    title: "تیم ملی ایران - تیم ملی ژاپن",
    description: "انتقام جام ملت‌های آسیا در مقدماتی جام جهانی",
    imageUrl: matchIranJapan,
    category: "فوتبال",
    date: "۲۱:۰۰ - شنبه",
    link: "/match/5",
    teamA: "ایران",
    teamB: "ژاپن",
    scoreA: 2,
    scoreB: 1,
    league: "مقدماتی جام جهانی",
    status: "finished",
    minute: "۹۰+۳",
    streamUrl: "https://www.aparat.com/v/ilbql73",
    venue: "ورزشگاه آزادی تهران",
    channels: ["شبکه سه"],
  },
  {
    id: 6,
    title: "فینال لیگ قهرمانان اروپا",
    description: "منچسترسیتی vs اینتر میلان، شب قهرمانی اروپا",
    imageUrl: matchUclFinal,
    category: "فوتبال",
    date: "۲۳:۰۰ - ۱۰ خرداد",
    link: "/match/6",
    teamA: "منچسترسیتی",
    teamB: "اینتر میلان",
    scoreA: 1,
    scoreB: 0,
    league: "UEFA Champions League",
    status: "finished",
    streamUrl: "https://www.aparat.com/v/lia6p76",
    venue: "Atatürk Olympic Stadium",
    channels: ["beIN Sports"],
  },
  {
    id: 7,
    title: "پاری سن ژرمن - مارسی",
    description: "ال کلاسیکو فرانسه",
    imageUrl: matchElclasico,
    category: "فوتبال",
    date: "۲۲:۴۵ - یکشنبه",
    link: "/match/7",
    teamA: "پاری سن ژرمن",
    teamB: "مارسی",
    scoreA: 2,
    scoreB: 0,
    league: "لیگ ۱ فرانسه",
    status: "finished",
    streamUrl: "https://www.aparat.com/v/ilbql73",
    venue: "Parc des Princes",
    channels: ["beIN Sports"],
  },
  {
    id: 8,
    title: "میلان - یوونتوس",
    description: "دربی ایتالیا",
    imageUrl: matchDerby,
    category: "فوتبال",
    date: "۲۲:۰۰ - پنجشنبه",
    link: "/match/8",
    teamA: "میلان",
    teamB: "یوونتوس",
    scoreA: 1,
    scoreB: 2,
    league: "سری آ ایتالیا",
    status: "finished",
    streamUrl: "https://www.aparat.com/v/lia6p76",
    venue: "San Siro",
    channels: ["beIN Sports"],
  },
  {
    id: 9,
    title: "آرسنال - تاتنهام",
    description: "دربی شمال لندن",
    imageUrl: matchUclFinal,
    category: "فوتبال",
    date: "۲۱:۳۰ - شنبه",
    link: "/match/9",
    teamA: "آرسنال",
    teamB: "تاتنهام",
    scoreA: 0,
    scoreB: 0,
    league: "لیگ برتر انگلیس",
    status: "upcoming",
    streamUrl: "https://www.aparat.com/v/ilbql73",
    venue: "Emirates Stadium",
    channels: ["beIN Sports"],
  },
  {
    id: 10,
    title: "اتلتیکو مادرید - سویا",
    description: "نبرد قهرمانان لالیگا",
    imageUrl: matchElclasico,
    category: "فوتبال",
    date: "۲۲:۳۰ - جمعه",
    link: "/match/10",
    teamA: "اتلتیکو مادرید",
    teamB: "سویا",
    scoreA: 3,
    scoreB: 1,
    league: "لالیگا اسپانیا",
    status: "finished",
    streamUrl: "https://www.aparat.com/v/lia6p76",
    venue: "Wanda Metropolitano",
    channels: ["beIN Sports"],
  },
  {
    id: 11,
    title: "تیم ملی ایران - کره جنوبی",
    description: "نبرد آسیایی در تهران",
    imageUrl: matchIranJapan,
    category: "فوتبال",
    date: "۱۹:۰۰ - پنجشنبه",
    link: "/match/11",
    teamA: "ایران",
    teamB: "کره جنوبی",
    scoreA: 1,
    scoreB: 0,
    league: "مقدماتی جام جهانی",
    status: "finished",
    streamUrl: "https://www.aparat.com/v/ilbql73",
    venue: "ورزشگاه آزادی تهران",
    channels: ["شبکه سه"],
  },
  {
    id: 12,
    title: "چلسی - منچستریونایتد",
    description: "نبرد بزرگان لیگ برتر",
    imageUrl: matchDerby,
    category: "فوتبال",
    date: "۲۰:۰۰ - یکشنبه",
    link: "/match/12",
    teamA: "چلسی",
    teamB: "منچستریونایتد",
    scoreA: 2,
    scoreB: 2,
    league: "لیگ برتر انگلیس",
    status: "finished",
    streamUrl: "https://www.aparat.com/v/ilbql73",
    venue: "Stamford Bridge",
    channels: ["beIN Sports"],
  },

  /* ──────────────── بسکتبال (۱۳-۱۹) ──────────────── */
  {
    id: 13,
    title: "لس آنجلس لیکرز - گلدن استیت واریرز",
    description: "لبران جیمز در برابر استفن کری، نبرد ستارگان NBA",
    imageUrl: matchLakersWarriors,
    category: "بسکتبال",
    date: "۰۳:۳۰ بامداد",
    link: "/match/13",
    teamA: "LA Lakers",
    teamB: "Golden State Warriors",
    scoreA: 118,
    scoreB: 112,
    league: "NBA",
    status: "finished",
    streamUrl: "https://www.aparat.com/v/A3aGp",
    venue: "Crypto.com Arena",
    channels: ["ESPN"],
  },
  {
    id: 14,
    title: "بوستون سلتیکس - میامی هیت",
    description: "نبرد تیم‌های شرق NBA",
    imageUrl: matchLakersWarriors,
    category: "بسکتبال",
    date: "۰۲:۰۰ - پنجشنبه",
    link: "/match/14",
    teamA: "Boston Celtics",
    teamB: "Miami Heat",
    scoreA: 105,
    scoreB: 98,
    league: "NBA",
    status: "finished",
    streamUrl: "https://www.aparat.com/v/A3aGp",
    venue: "TD Garden",
    channels: ["ESPN"],
  },
  {
    id: 15,
    title: "میلواکی باکس - فیلادلفیا سونتی‌سیکسرز",
    description: "یانیس در برابر امبید",
    imageUrl: matchLakersWarriors,
    category: "بسکتبال",
    date: "۰۱:۳۰ - جمعه",
    link: "/match/15",
    teamA: "Milwaukee Bucks",
    teamB: "Philadelphia 76ers",
    scoreA: 121,
    scoreB: 115,
    league: "NBA",
    status: "finished",
    streamUrl: "https://www.aparat.com/v/A3aGp",
    venue: "Fiserv Forum",
    channels: ["ESPN"],
  },
  {
    id: 16,
    title: "دنور ناگتس - فینیکس سانز",
    description: "نیکولا یوکیچ در برابر کوین دورانت",
    imageUrl: matchLakersWarriors,
    category: "بسکتبال",
    date: "۰۴:۰۰ - شنبه",
    link: "/match/16",
    teamA: "Denver Nuggets",
    teamB: "Phoenix Suns",
    scoreA: 110,
    scoreB: 108,
    league: "NBA",
    status: "finished",
    streamUrl: "https://www.aparat.com/v/A3aGp",
    venue: "Ball Arena",
    channels: ["ESPN"],
  },
  {
    id: 17,
    title: "دالاس ماوریکس - اوکلاهاما سیتی تاندر",
    description: "لوکا دانچیچ در برابر شای گیلجس-الکساندر",
    imageUrl: matchLakersWarriors,
    category: "بسکتبال",
    date: "۰۳:۰۰ - یکشنبه",
    link: "/match/17",
    teamA: "Dallas Mavericks",
    teamB: "OKC Thunder",
    scoreA: 0,
    scoreB: 0,
    league: "NBA",
    status: "upcoming",
    streamUrl: "https://www.aparat.com/v/A3aGp",
    venue: "American Airlines Center",
    channels: ["ESPN"],
  },
  {
    id: 18,
    title: "نیویورک نیکس - بروکلین نتس",
    description: "دربی شهر نیویورک",
    imageUrl: matchLakersWarriors,
    category: "بسکتبال",
    date: "۰۲:۳۰ - دوشنبه",
    link: "/match/18",
    teamA: "New York Knicks",
    teamB: "Brooklyn Nets",
    scoreA: 102,
    scoreB: 96,
    league: "NBA",
    status: "finished",
    streamUrl: "https://www.aparat.com/v/A3aGp",
    venue: "Madison Square Garden",
    channels: ["ESPN"],
  },
  {
    id: 19,
    title: "شیکاگو بولز - کلیولند کاوالیرز",
    description: "نبرد تیم‌های مرکزی",
    imageUrl: matchLakersWarriors,
    category: "بسکتبال",
    date: "۰۱:۰۰ - سه‌شنبه",
    link: "/match/19",
    teamA: "Chicago Bulls",
    teamB: "Cleveland Cavaliers",
    scoreA: 0,
    scoreB: 0,
    league: "NBA",
    status: "upcoming",
    streamUrl: "https://www.aparat.com/v/A3aGp",
    venue: "United Center",
    channels: ["ESPN"],
  },

  /* ──────────────── تنیس (۲۰-۲۳) ──────────────── */
  {
    id: 20,
    title: "نواک جوکوویچ - کارلوس آلکاراس",
    description: "فینال ویمبلدون، تقابل نسل جدید و افسانه",
    imageUrl: matchWimbledon,
    category: "تنیس",
    date: "۱۶:۰۰ - فردا",
    link: "/match/20",
    teamA: "نواک جوکوویچ",
    teamB: "کارلوس آلکاراس",
    scoreA: 3,
    scoreB: 2,
    league: "ویمبلدون",
    status: "finished",
    streamUrl: "https://www.aparat.com/v/twmdkt2",
    venue: "Centre Court - Wimbledon",
    channels: ["ESPN", "beIN Sports"],
  },
  {
    id: 21,
    title: "رافائل نادال - دانیل مدودف",
    description: "نبرد خاک و سنگ",
    imageUrl: matchWimbledon,
    category: "تنیس",
    date: "۱۵:۳۰ - شنبه",
    link: "/match/21",
    teamA: "رافائل نادال",
    teamB: "دانیل مدودف",
    scoreA: 3,
    scoreB: 1,
    league: "رولند گاروس",
    status: "finished",
    streamUrl: "https://www.aparat.com/v/twmdkt2",
    venue: "Court Philippe-Chatrier",
    channels: ["beIN Sports"],
  },
  {
    id: 22,
    title: "ینیک سینر - الکساندر زورف",
    description: "نبرد ستارگان جدید تنیس",
    imageUrl: matchWimbledon,
    category: "تنیس",
    date: "۱۸:۰۰ - یکشنبه",
    link: "/match/22",
    teamA: "ینیک سینر",
    teamB: "الکساندر زورف",
    scoreA: 0,
    scoreB: 0,
    league: "اوپن استرالیا",
    status: "upcoming",
    streamUrl: "https://www.aparat.com/v/twmdkt2",
    venue: "Rod Laver Arena",
    channels: ["beIN Sports"],
  },
  {
    id: 23,
    title: "دانیل مدودف - استفانوس سیتسیپاس",
    description: "نبرد تنیسورهای اروپایی",
    imageUrl: matchWimbledon,
    category: "تنیس",
    date: "۱۷:۰۰ - جمعه",
    link: "/match/23",
    teamA: "دانیل مدودف",
    teamB: "استفانوس سیتسیپاس",
    scoreA: 3,
    scoreB: 0,
    league: "اوپن آمریکا",
    status: "finished",
    streamUrl: "https://www.aparat.com/v/twmdkt2",
    venue: "Arthur Ashe Stadium",
    channels: ["beIN Sports"],
  },

  /* ──────────────── والیبال (۲۴-۲۷) ──────────────── */
  {
    id: 24,
    title: "تیم ملی والیبال ایران - برزیل",
    description: "نبرد آسیا و آمریکای جنوبی",
    imageUrl: matchIranJapan,
    category: "والیبال",
    date: "۱۹:۳۰ - امروز",
    link: "/match/24",
    teamA: "ایران",
    teamB: "برزیل",
    scoreA: 3,
    scoreB: 2,
    league: "لیگ ملت‌ها",
    status: "finished",
    streamUrl: "https://www.aparat.com/v/twmdkt2",
    venue: "ورزشگاه ۱۲ هزار نفری",
    channels: ["شبکه ورزش"],
  },
  {
    id: 25,
    title: "تیم ملی والیبال ایران - ایتالیا",
    description: "نبرد قهرمانان اروپا و آسیا",
    imageUrl: matchIranJapan,
    category: "والیبال",
    date: "۲۰:۰۰ - پنجشنبه",
    link: "/match/25",
    teamA: "ایران",
    teamB: "ایتالیا",
    scoreA: 3,
    scoreB: 1,
    league: "لیگ ملت‌ها",
    status: "finished",
    streamUrl: "https://www.aparat.com/v/twmdkt2",
    venue: "ورزشگاه ۱۲ هزار نفری",
    channels: ["شبکه ورزش"],
  },
  {
    id: 26,
    title: "لهستان - فرانسه",
    description: "نبرد والیبال اروپا",
    imageUrl: matchIranJapan,
    category: "والیبال",
    date: "۲۱:۳۰ - شنبه",
    link: "/match/26",
    teamA: "لهستان",
    teamB: "فرانسه",
    scoreA: 0,
    scoreB: 0,
    league: "لیگ ملت‌ها",
    status: "upcoming",
    streamUrl: "https://www.aparat.com/v/twmdkt2",
    venue: "Spodek Arena",
    channels: ["شبکه ورزش"],
  },
  {
    id: 27,
    title: "تیم ملی والیبال ایران - آمریکا",
    description: "انتقام لیگ ملت‌ها",
    imageUrl: matchIranJapan,
    category: "والیبال",
    date: "۲۲:۰۰ - یکشنبه",
    link: "/match/27",
    teamA: "ایران",
    teamB: "آمریکا",
    scoreA: 2,
    scoreB: 3,
    league: "لیگ ملت‌ها",
    status: "finished",
    streamUrl: "https://www.aparat.com/v/twmdkt2",
    venue: "ورزشگاه ۱۲ هزار نفری",
    channels: ["شبکه ورزش"],
  },

  /* ──────────────── کشتی (۲۸-۳۰) ──────────────── */
  {
    id: 28,
    title: "حسن یزدانی - دیوید تیلور",
    description: "بزرگ‌ترین نبرد کشتی جهان",
    imageUrl: matchIranJapan,
    category: "کشتی",
    date: "۲۱:۰۰ - جمعه",
    link: "/match/28",
    teamA: "حسن یزدانی",
    teamB: "دیوید تیلور",
    scoreA: 8,
    scoreB: 6,
    league: "جام جهانی کشتی",
    status: "finished",
    streamUrl: "https://www.aparat.com/v/A3aGp",
    venue: "ورزشگاه آزادی تهران",
    channels: ["شبکه ورزش"],
  },
  {
    id: 29,
    title: "تیم ملی کشتی آزاد ایران - روسیه",
    description: "نبرد غول‌های کشتی جهان",
    imageUrl: matchIranJapan,
    category: "کشتی",
    date: "۲۰:۳۰ - شنبه",
    link: "/match/29",
    teamA: "ایران",
    teamB: "روسیه",
    scoreA: 5,
    scoreB: 3,
    league: "جام جهانی کشتی",
    status: "finished",
    streamUrl: "https://www.aparat.com/v/A3aGp",
    venue: "ورزشگاه آزادی تهران",
    channels: ["شبکه ورزش"],
  },
  {
    id: 30,
    title: "علیرضا دبیر - حریف آمریکایی",
    description: "نبرد کشتی فرنگی قهرمانان",
    imageUrl: matchIranJapan,
    category: "کشتی",
    date: "۱۹:۰۰ - یکشنبه",
    link: "/match/30",
    teamA: "علیرضا دبیر",
    teamB: "کشتی‌گیر آمریکایی",
    scoreA: 0,
    scoreB: 0,
    league: "جام جهانی کشتی",
    status: "upcoming",
    streamUrl: "https://www.aparat.com/v/A3aGp",
    venue: "ورزشگاه آزادی تهران",
    channels: ["شبکه ورزش"],
  },

  /* ──────────────── مسابقات ویژه (۳۱-۳۲) ──────────────── */
  {
    id: 31,
    title: "المپیک - فینال دوی ۱۰۰ متر",
    description: "سریع‌ترین مرد جهان",
    imageUrl: matchWimbledon,
    category: "دوومیدانی",
    date: "۲۳:۰۰ - جمعه",
    link: "/match/31",
    teamA: "یوسین بولت",
    teamB: "نوا لایلز",
    scoreA: 0,
    scoreB: 0,
    league: "المپیک",
    status: "upcoming",
    streamUrl: "https://www.aparat.com/v/twmdkt2",
    venue: "استادیوم المپیک",
    channels: ["شبکه ورزش"],
  },
  {
    id: 32,
    title: "فرمول ۱ - جایزه بزرگ موناکو",
    description: "نبرد سرعت در خیابان‌های موناکو",
    imageUrl: matchWimbledon,
    category: "فرمول ۱",
    date: "۱۶:۰۰ - یکشنبه",
    link: "/match/32",
    teamA: "لوئیس همیلتون",
    teamB: "مکس فرستاپن",
    scoreA: 0,
    scoreB: 0,
    league: "فرمول ۱",
    status: "upcoming",
    streamUrl: "https://www.aparat.com/v/twmdkt2",
    venue: "Circuit de Monaco",
    channels: ["شبکه ورزش"],
  },
];

const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "رونالدو به النصر پیوست",
    description:
      "CR7 با عقد قراردادی ۲.۵ ساله به تیم عربستانی پیوست و رکورد جدیدی در تاریخ فوتبال ثبت کرد.",
    imageUrl: newsRonaldo,
    category: "فوتبال",
    date: "۲ ساعت قبل",
    link: "/news/1",
    readTime: "۳ دقیقه",
  },
  {
    id: 2,
    title: "قهرمانی تیم ملی کشتی آزاد در آسیا",
    description:
      "تیم ایران با کسب ۸ مدال طلا و ۲ نقره قهرمان مسابقات آسیایی شد و پرچم ایران را به اهتزاز درآورد.",
    imageUrl: newsWrestling,
    category: "کشتی",
    date: "دیروز",
    link: "/news/2",
    readTime: "۵ دقیقه",
  },
  {
    id: 3,
    title: "انتقام یانیس از ساکرمنتو",
    description:
      "باکس ۵۰ امتیازی یانیس آتتوکامپو در بازی حساس مقابل ساکرمنتو کینگز، یکی از بهترین بازی‌های فصلش را رقم زد.",
    imageUrl: newsGiannis,
    category: "بسکتبال",
    date: "۳ روز قبل",
    link: "/news/3",
    readTime: "۴ دقیقه",
  },
  {
    id: 4,
    title: "صعود تیم ملی والیبال به المپیک",
    description:
      "شاگردان بهروز عطایی با غلبه بر کوبا جواز حضور در المپیک را کسب کردند.",
    imageUrl: newsVolleyball,
    category: "والیبال",
    date: "هفته گذشته",
    link: "/news/4",
    readTime: "۶ دقیقه",
  },
  {
    id: 5,
    title: "ناپولی قهرمان سری ایتالیا شد",
    description:
      "ناپولی پس از ۳۳ سال اسکودتو را بالای سر برد و جشن قهرمانی در ناپل برگزار شد.",
    imageUrl: newsNapoli,
    category: "فوتبال",
    date: "۵ روز قبل",
    link: "/news/5",
    readTime: "۴ دقیقه",
  },
];

const mockVideos: VideoItem[] = [
  {
    id: 1,
    title: "خلاصه بازی استقلال ۳-۱ پرسپولیس",
    description: "گل‌ها و لحظات حساس دربی ۱۰۲",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    videoUrl: "https://www.aparat.com/v/ilbql73",
    category: "فوتبال",
    date: "دیروز",
    duration: "۴:۳۲",
    views: 15420,
  },
  {
    id: 2,
    title: "بهترین دانک‌های هفته NBA",
    description: "اسلم دانک‌های نفس‌گیر ستارگان NBA",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    videoUrl: "https://www.aparat.com/v/A3aGp",
    category: "بسکتبال",
    date: "۲ روز قبل",
    duration: "۳:۱۸",
    views: 8930,
  },
  {
    id: 3,
    title: "آموزش ضربه فورهند حرفه‌ای در تنیس",
    description: "با تکنیک‌های نواک جوکوویچ، بهترین تنیسور تاریخ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    videoUrl: "https://www.aparat.com/v/twmdkt2",
    category: "تنیس",
    date: "هفته گذشته",
    duration: "۵:۲۱",
    views: 6210,
  },
  {
    id: 4,
    title: "گل‌های هفته لیگ برتر انگلیس",
    description: "گل‌های دیدنی هفته ۳۷",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    videoUrl: "https://www.aparat.com/v/lia6p76",
    category: "فوتبال",
    date: "۳ روز قبل",
    duration: "۶:۰۴",
    views: 11250,
  },
  {
    id: 5,
    title: "لحظات احساسی خداحافظی مسی",
    description: "بهترین لحظات لیونل مسی در بارسلونا",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    videoUrl: "https://www.aparat.com/v/ilbql73",
    category: "فوتبال",
    date: "۴ روز قبل",
    duration: "۸:۱۵",
    views: 25780,
  },
  {
    id: 6,
    title: "قهرمانی کشتی فرنگی ایران در جهان",
    description: "خلاصه فینال‌های حساس کشتی فرنگی",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    videoUrl: "https://www.aparat.com/v/A3aGp",
    category: "کشتی",
    date: "۵ روز قبل",
    duration: "۷:۴۰",
    views: 9840,
  },
];

/* ================================================================ */
/*                    3. توابع کمکی                                  */
/* ================================================================ */

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const filterMatches = (
  filters: MatchFilters
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
        m.description.toLowerCase().includes(s)
    );
  }

  const total = filtered.length;
  const page = filters.page || 1;
  const limit = filters.limit || 10;
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  return { data: paginated, total };
};

const filterNews = (
  filters: NewsFilters
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
        n.description.toLowerCase().includes(s)
    );
  }

  const total = filtered.length;
  const page = filters.page || 1;
  const limit = filters.limit || 9;
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  return { data: paginated, total };
};

const filterVideos = (
  filters: VideoFilters
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
        v.description.toLowerCase().includes(s)
    );
  }

  const total = filtered.length;
  const page = filters.page || 1;
  const limit = filters.limit || 6;
  const paginated = filtered.slice((page - 1) * limit, page * limit);

  return { data: paginated, total };
};

/* ================================================================ */
/*                   4. توابع اصلی                                  */
/* ================================================================ */

export const fetchTodayMatches = async (): Promise<Match[]> => {
  await delay(600);
  return mockMatches.slice(0, 3);
};

export const fetchSportsNews = async (): Promise<NewsItem[]> => {
  await delay(600);
  return mockNews.slice(0, 3);
};

export const fetchMatches = async (
  filters: MatchFilters = {}
): Promise<{ data: Match[]; total: number }> => {
  await delay(800);
  return filterMatches(filters);
};

export const fetchMatchById = async (id: number): Promise<Match | null> => {
  await delay(400);
  const match = mockMatches.find((m) => m.id === id);
  return match || null;
};

export const fetchNews = async (
  filters: NewsFilters = {}
): Promise<{ data: NewsItem[]; total: number }> => {
  await delay(800);
  return filterNews(filters);
};

export const fetchVideos = async (
  filters: VideoFilters = {}
): Promise<{ data: VideoItem[]; total: number }> => {
  await delay(800);
  return filterVideos(filters);
};

export const submitContactForm = async (
  data: ContactFormData
): Promise<{ success: boolean; message: string }> => {
  await delay(1000);
  console.log("Form submitted:", data);
  return { success: true, message: "پیام شما با موفقیت ارسال شد." };
};