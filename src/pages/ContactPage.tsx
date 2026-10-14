// src/pages/ContactPage.tsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  HiOutlineLocationMarker,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineClock,
  HiOutlinePaperAirplane,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineUser,
  HiOutlineChat,
  HiOutlineTag,
} from "react-icons/hi";
import {
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

/* ================================================================ */
/*                       اسکیمای اعتبارسنجی                        */
/* ================================================================ */
const contactSchema = z.object({
  name: z.string().min(3, "نام باید حداقل ۳ کاراکتر باشد"),
  email: z.string().email("ایمیل معتبر نیست"),
  subject: z.string().min(3, "موضوع باید حداقل ۳ کاراکتر باشد"),
  message: z.string().min(10, "پیام باید حداقل ۱۰ کاراکتر باشد"),
});

type ContactFormData = z.infer<typeof contactSchema>;

/* ================================================================ */
/*                       اطلاعات تماس                              */
/* ================================================================ */
const contactInfo = [
  {
    icon: HiOutlineLocationMarker,
    title: "آدرس",
    lines: ["تهران، خیابان ورزش، پلاک ۱۲", "طبقه سوم، واحد ۵"],
    color: "orange",
  },
  {
    icon: HiOutlinePhone,
    title: "تلفن تماس",
    lines: ["۰۲۱-۱۲۳۴۵۶۷۸", "۰۲۱-۸۷۶۵۴۳۲۱"],
    dir: "ltr",
    color: "green",
  },
  {
    icon: HiOutlineMail,
    title: "ایمیل",
    lines: ["info@sportsnama.ir", "support@sportsnama.ir"],
    dir: "ltr",
    color: "blue",
  },
  {
    icon: HiOutlineClock,
    title: "ساعات کاری",
    lines: ["شنبه تا چهارشنبه: ۹ تا ۱۷", "پنجشنبه: ۹ تا ۱۳"],
    color: "purple",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-500",
  },
  green: {
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-500",
  },
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-500",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    text: "text-purple-500",
  },
};

/* ================================================================ */
/*                       کامپوننت اصلی                              */
/* ================================================================ */
const ContactPage = () => {
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (formData: ContactFormData) => {
    setSubmitStatus({ type: null, message: "" });

    try {
      // شبیه‌سازی درخواست به سرور
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log("Form data received:", formData);

      setSubmitStatus({
        type: "success",
        message: "پیام شما با موفقیت ارسال شد. به‌زودی با شما تماس می‌گیریم.",
      });
      reset();
    } catch {
      setSubmitStatus({
        type: "error",
        message: "خطا در ارسال پیام. لطفاً دوباره تلاش کنید.",
      });
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 py-8 sm:py-10 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* ================= هدر صفحه ================= */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-l from-orange-500 via-orange-600 to-orange-700 p-6 sm:p-8 mb-6 shadow-xl shadow-orange-500/20">
          {/* بافت تزئینی */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/30 blur-3xl" />
            <div className="absolute -bottom-24 -right-16 w-72 h-72 rounded-full bg-black/20 blur-3xl" />
          </div>

          <div className="relative flex items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shrink-0">
              <HiOutlineChat className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-1">
                تماس با ما
              </h1>
              <p className="text-[11px] sm:text-xs text-white/85 leading-relaxed">
                نظرات، پیشنهادات و انتقادات شما برای ما ارزشمنده
              </p>
            </div>
          </div>
        </div>

        {/* ================= گرید اصلی ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* ===================================================== */}
          {/*                    فرم تماس                            */}
          {/* ===================================================== */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
                <span className="w-1 h-5 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full" />
                <h2 className="text-sm sm:text-base font-black text-gray-800">
                  ارسال پیام
                </h2>
                <span className="text-[10px] text-gray-400 font-bold mr-auto">
                  همه فیلدها الزامی هستند
                </span>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* نام */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-gray-600 mb-1.5">
                    <HiOutlineUser className="w-3.5 h-3.5 text-orange-500" />
                    نام و نام خانوادگی
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className={`
                      w-full border rounded-xl px-3.5 py-2.5
                      text-xs sm:text-sm text-gray-800
                      placeholder-gray-400 outline-none transition
                      ${
                        errors.name
                          ? "border-red-400 bg-red-50/50 focus:ring-red-400/20"
                          : "border-gray-200 bg-gray-50/50 focus:border-orange-400 focus:ring-orange-400/15"
                      }
                      focus:ring-2
                    `}
                    placeholder="مثال: علی محمدی"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-[10px] mt-1.5 flex items-center gap-1">
                      <HiOutlineXCircle className="w-3 h-3" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* ایمیل */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-gray-600 mb-1.5">
                    <HiOutlineMail className="w-3.5 h-3.5 text-orange-500" />
                    ایمیل
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    dir="ltr"
                    className={`
                      w-full border rounded-xl px-3.5 py-2.5
                      text-xs sm:text-sm text-gray-800
                      placeholder-gray-400 outline-none transition text-left
                      ${
                        errors.email
                          ? "border-red-400 bg-red-50/50 focus:ring-red-400/20"
                          : "border-gray-200 bg-gray-50/50 focus:border-orange-400 focus:ring-orange-400/15"
                      }
                      focus:ring-2
                    `}
                    placeholder="example@domain.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-[10px] mt-1.5 flex items-center gap-1">
                      <HiOutlineXCircle className="w-3 h-3" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* موضوع */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-gray-600 mb-1.5">
                    <HiOutlineTag className="w-3.5 h-3.5 text-orange-500" />
                    موضوع
                  </label>
                  <input
                    type="text"
                    {...register("subject")}
                    className={`
                      w-full border rounded-xl px-3.5 py-2.5
                      text-xs sm:text-sm text-gray-800
                      placeholder-gray-400 outline-none transition
                      ${
                        errors.subject
                          ? "border-red-400 bg-red-50/50 focus:ring-red-400/20"
                          : "border-gray-200 bg-gray-50/50 focus:border-orange-400 focus:ring-orange-400/15"
                      }
                      focus:ring-2
                    `}
                    placeholder="مثال: انتقاد، پیشنهاد، مشکل فنی"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-[10px] mt-1.5 flex items-center gap-1">
                      <HiOutlineXCircle className="w-3 h-3" />
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* پیام */}
                <div>
                  <label className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-gray-600 mb-1.5">
                    <HiOutlineChat className="w-3.5 h-3.5 text-orange-500" />
                    پیام شما
                  </label>
                  <textarea
                    rows={4}
                    {...register("message")}
                    className={`
                      w-full border rounded-xl px-3.5 py-2.5
                      text-xs sm:text-sm text-gray-800
                      placeholder-gray-400 outline-none transition resize-none
                      ${
                        errors.message
                          ? "border-red-400 bg-red-50/50 focus:ring-red-400/20"
                          : "border-gray-200 bg-gray-50/50 focus:border-orange-400 focus:ring-orange-400/15"
                      }
                      focus:ring-2
                    `}
                    placeholder="پیام خود را اینجا بنویسید..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-[10px] mt-1.5 flex items-center gap-1">
                      <HiOutlineXCircle className="w-3 h-3" />
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* دکمه ارسال */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="
                    w-full flex items-center justify-center gap-2
                    bg-gradient-to-l from-orange-500 to-orange-600
                    hover:from-orange-400 hover:to-orange-500
                    disabled:opacity-60 disabled:cursor-not-allowed
                    text-white text-xs sm:text-sm font-black
                    py-3 rounded-xl
                    shadow-lg shadow-orange-500/25
                    hover:shadow-orange-500/40
                    active:scale-[0.98] transition-all
                  "
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="opacity-25"
                        />
                        <path
                          fill="currentColor"
                          className="opacity-75"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      در حال ارسال...
                    </>
                  ) : (
                    <>
                      <HiOutlinePaperAirplane className="w-4 h-4 rotate-180" />
                      ارسال پیام
                    </>
                  )}
                </button>

                {/* پیام وضعیت */}
                {submitStatus.type && (
                  <div
                    className={`
                      flex items-start gap-2.5 p-3 rounded-xl border text-[11px] sm:text-xs font-bold
                      ${
                        submitStatus.type === "success"
                          ? "bg-green-50 border-green-200 text-green-700"
                          : "bg-red-50 border-red-200 text-red-700"
                      }
                    `}
                  >
                    {submitStatus.type === "success" ? (
                      <HiOutlineCheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    ) : (
                      <HiOutlineXCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    )}
                    <span className="leading-relaxed">
                      {submitStatus.message}
                    </span>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* ===================================================== */}
          {/*              اطلاعات تماس + نقشه                        */}
          {/* ===================================================== */}
          <div className="lg:col-span-2 space-y-5">
            {/* اطلاعات تماس */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] p-5">
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
                <span className="w-1 h-5 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full" />
                <h2 className="text-sm sm:text-base font-black text-gray-800">
                  اطلاعات تماس
                </h2>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  const colors = colorMap[item.color];
                  return (
                    <div key={item.title} className="flex items-start gap-3 group">
                      <div
                        className={`
                          w-10 h-10 rounded-xl shrink-0
                          ${colors.bg} ${colors.border} border
                          flex items-center justify-center
                          group-hover:scale-110 transition-transform
                        `}
                      >
                        <Icon className={`w-5 h-5 ${colors.text}`} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-black text-gray-500 mb-1">
                          {item.title}
                        </p>
                        {item.lines.map((line, idx) => (
                          <p
                            key={idx}
                            dir={item.dir || "rtl"}
                            className="text-xs sm:text-[13px] text-gray-700 font-medium leading-relaxed"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* شبکه‌های اجتماعی */}
              <div className="mt-5 pt-5 border-t border-gray-100">
                <p className="text-[11px] font-black text-gray-500 mb-3">
                  ما را در شبکه‌های اجتماعی دنبال کنید
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  <SocialBtn
                    href="https://instagram.com"
                    label="اینستاگرام"
                    hoverColor="hover:from-pink-500 hover:to-purple-600"
                  >
                    <FaInstagram className="w-4 h-4" />
                  </SocialBtn>
                  <SocialBtn
                    href="https://t.me"
                    label="تلگرام"
                    hoverColor="hover:from-blue-400 hover:to-blue-600"
                  >
                    <FaTelegram className="w-4 h-4" />
                  </SocialBtn>
                  <SocialBtn
                    href="https://wa.me/989123456789"
                    label="واتساپ"
                    hoverColor="hover:from-green-400 hover:to-green-600"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                  </SocialBtn>
                  <SocialBtn
                    href="https://twitter.com"
                    label="توییتر"
                    hoverColor="hover:from-sky-400 hover:to-sky-600"
                  >
                    <FaTwitter className="w-4 h-4" />
                  </SocialBtn>
                  <SocialBtn
                    href="https://youtube.com"
                    label="یوتیوب"
                    hoverColor="hover:from-red-500 hover:to-red-700"
                  >
                    <FaYoutube className="w-4 h-4" />
                  </SocialBtn>
                </div>
              </div>
            </div>

            {/* نقشه */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
                <span className="w-1 h-5 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full" />
                <h2 className="text-sm sm:text-base font-black text-gray-800">
                  موقعیت ما روی نقشه
                </h2>
              </div>
              <iframe
                title="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.917484489297!2d51.389015!3d35.689197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e0146f4d5e0c5%3A0x8b3c1c5d8e5f4b1f!2sTehran%2C%20Iran!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full grayscale hover:grayscale-0 transition-all duration-500"
              />
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
interface SocialBtnProps {
  href: string;
  label: string;
  children: React.ReactNode;
  hoverColor: string;
}

const SocialBtn = ({ href, label, children, hoverColor }: SocialBtnProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className={`
      w-9 h-9 rounded-xl bg-gray-50 hover:bg-gradient-to-br ${hoverColor}
      text-gray-500 hover:text-white
      border border-gray-200 hover:border-transparent
      flex items-center justify-center
      transition-all duration-300 hover:scale-110 active:scale-95
    `}
  >
    {children}
  </a>
);

export default ContactPage;