// src/components/VideoModal.tsx
import { useEffect, useState, useRef } from "react";
import {
  HiOutlineX,
  HiOutlineShare,
  HiOutlineCheck,
  HiOutlineExternalLink,
  HiOutlinePlay,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineTag,
} from "react-icons/hi";

/* ================================================================ */
/*                       تایپ‌های Modal                             */
/* ================================================================ */
interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  title: string;
  category?: string;
  date?: string;
  duration?: string;
}

/* ================================================================ */
/*                    تبدیل URL به Embed                            */
/* ================================================================ */
const getEmbedUrl = (url: string): string => {
  if (!url) return "";

  if (url.includes("youtube.com/watch?v=")) {
    const id = url.split("watch?v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  }

  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  }

  if (url.includes("youtube.com/embed/")) {
    return url.includes("?") ? url : `${url}?autoplay=1&rel=0`;
  }

  if (url.includes("vimeo.com/")) {
    const id = url.split("vimeo.com/")[1]?.split("?")[0];
    return `https://player.vimeo.com/video/${id}?autoplay=1`;
  }

  if (url.includes("aparat.com/v/")) {
    const id = url.split("aparat.com/v/")[1]?.split("?")[0];
    return `https://www.aparat.com/video/video/embed/videohash/${id}/vt/frame`;
  }

  if (url.includes("/embed/") || url.includes("/video/")) {
    return url;
  }

  return url;
};

/* ================================================================ */
/*                       کامپوننت اصلی                              */
/* ================================================================ */
const VideoModal = ({
  isOpen,
  onClose,
  videoUrl,
  title,
  category,
  date,
  duration,
}: VideoModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [prevVideoUrl, setPrevVideoUrl] = useState(videoUrl);

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  /* ✅ ریست state هنگام تغییر URL (الگوی رسمی React) */
  if (videoUrl !== prevVideoUrl) {
    setPrevVideoUrl(videoUrl);
    setIsLoading(true);
    setCopied(false);
  }

  /* ================================================================ */
  /*                     مدیریت کلید Escape                          */
  /* ================================================================ */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  /* ================================================================ */
  /*                     کپی لینک                                    */
  /* ================================================================ */
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(videoUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div
      dir="rtl"
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        bg-black/85 backdrop-blur-md
        p-3 sm:p-4
        animate-modalFade
      "
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* ===================================================== */}
      {/*                    کارت ویدیو                         */}
      {/* ===================================================== */}
      <div
        ref={modalRef}
        className="
          relative w-full max-w-5xl
          bg-gradient-to-b from-gray-900 to-black
          rounded-2xl sm:rounded-3xl
          overflow-hidden
          shadow-2xl shadow-black/70
          border border-gray-800
          animate-modalScale
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* نوار تزئینی بالایی */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-l from-orange-500 via-yellow-400 to-orange-500 z-20" />

        {/* دکمه بستن */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="
            absolute top-3 left-3 sm:top-4 sm:left-4 z-20
            w-10 h-10 rounded-full
            bg-black/60 hover:bg-red-500 backdrop-blur-md
            border border-white/20
            flex items-center justify-center
            text-white
            transition-all duration-200
            active:scale-90
            focus:outline-none focus:ring-2 focus:ring-orange-400
          "
          aria-label="بستن"
        >
          <HiOutlineX className="w-5 h-5" />
        </button>

        {/* دکمه‌های بالا سمت راست */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className={`
              w-10 h-10 rounded-full backdrop-blur-md border border-white/20
              flex items-center justify-center text-white
              transition-all duration-200 active:scale-90
              focus:outline-none focus:ring-2 focus:ring-orange-400
              ${
                copied
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-black/60 hover:bg-orange-500"
              }
            `}
            aria-label={copied ? "کپی شد" : "کپی لینک"}
          >
            {copied ? (
              <HiOutlineCheck className="w-5 h-5" />
            ) : (
              <HiOutlineShare className="w-5 h-5" />
            )}
          </button>

          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-10 h-10 rounded-full
              bg-black/60 hover:bg-orange-500 backdrop-blur-md
              border border-white/20
              flex items-center justify-center
              text-white
              transition-all duration-200 active:scale-90
              focus:outline-none focus:ring-2 focus:ring-orange-400
            "
            aria-label="باز کردن در سایت اصلی"
          >
            <HiOutlineExternalLink className="w-5 h-5" />
          </a>
        </div>

        {/* ویدیو */}
        <div className="relative aspect-video w-full bg-black">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black z-10">
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-orange-500/20" />
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <HiOutlinePlay className="w-6 h-6 text-orange-500" />
                </div>
              </div>
              <p className="text-sm text-gray-400 font-bold">
                در حال بارگذاری ویدیو...
              </p>
            </div>
          )}

          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          />
        </div>

        {/* اطلاعات ویدیو */}
        <div className="relative p-4 sm:p-6 bg-gradient-to-b from-gray-900 to-black">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-l from-transparent via-orange-500/40 to-transparent" />

          <div className="flex flex-wrap items-center gap-2 mb-3">
            {category && (
              <span className="flex items-center gap-1.5 bg-gradient-to-l from-orange-500 to-orange-600 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg shadow-orange-500/20">
                <HiOutlineTag className="w-3 h-3" />
                {category}
              </span>
            )}
            {date && (
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 text-[11px] font-bold px-3 py-1 rounded-full">
                <HiOutlineCalendar className="w-3 h-3 text-orange-400" />
                {date}
              </span>
            )}
            {duration && (
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-300 text-[11px] font-bold px-3 py-1 rounded-full">
                <HiOutlineClock className="w-3 h-3 text-orange-400" />
                {duration}
              </span>
            )}
          </div>

          <h3 className="text-base sm:text-lg md:text-xl font-black text-white leading-snug">
            {title}
          </h3>

          <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[11px] text-gray-500 flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400">
                ESC
              </kbd>
              برای بستن
            </p>
            <p className="text-[11px] text-gray-500">
              یا کلیک بیرون از کادر
            </p>
          </div>
        </div>
      </div>

      {/* انیمیشن‌ها */}
      <style>{`
        @keyframes modalFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalScale {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-modalFade {
          animation: modalFade 0.2s ease-out both;
        }

        .animate-modalScale {
          animation: modalScale 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) both;
        }
      `}</style>
    </div>
  );
};

export default VideoModal;