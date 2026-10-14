// src/components/Card.tsx
import { Link } from "react-router-dom";
import {
  HiOutlineArrowLeft,
  HiOutlineCalendar,
  HiOutlineClock,

} from "react-icons/hi";

/* ================================================================ */
/*                       تایپ‌های کارت                              */
/* ================================================================ */
export interface CardProps {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date?: string;
  readTime?: string;
  link?: string;
  variant?: "default" | "horizontal" | "compact";
  onButtonClick?: (id: string | number) => void;
}

const Card = ({
  id,
  title,
  description,
  imageUrl,
  category,
  date,
  readTime,
  link = "#",
  variant = "default",
  onButtonClick,
}: CardProps) => {
  /* ================================================================ */
  /*                    تنظیمات بر اساس واریانت                       */
  /* ================================================================ */
  const variantConfig = {
    default: {
      wrapper: "flex-col",
      imageHeight: "h-48",
      imageWidth: "w-full",
      padding: "p-5",
      titleSize: "text-lg",
      descSize: "text-sm",
      descLines: "line-clamp-3",
    },
    horizontal: {
      wrapper: "flex-row",
      imageHeight: "h-full",
      imageWidth: "w-32 sm:w-40 md:w-48 shrink-0",
      padding: "p-4 sm:p-5",
      titleSize: "text-base sm:text-lg",
      descSize: "text-xs sm:text-sm",
      descLines: "line-clamp-2 sm:line-clamp-3",
    },
    compact: {
      wrapper: "flex-col",
      imageHeight: "h-36",
      imageWidth: "w-full",
      padding: "p-4",
      titleSize: "text-base",
      descSize: "text-xs",
      descLines: "line-clamp-2",
    },
  };

  const config = variantConfig[variant];

  /* ================================================================ */
  /*                       هندلرها                                    */
  /* ================================================================ */
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick(id);
    }
  };

  const isClickable = link !== "#";

  /* ================================================================ */
  /*                       محتوای مشترک                               */
  /* ================================================================ */
  const cardContent = (
    <>
      {/* ================= تصویر ================= */}
      <div
        className={`
          relative overflow-hidden bg-gray-100
          ${config.imageHeight} ${config.imageWidth}
          ${variant !== "horizontal" ? "w-full" : ""}
        `}
      >
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://via.placeholder.com/400x300?text=No+Image";
          }}
        />

        {/* گرادیان تیره پایین */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

        {/* برچسب دسته‌بندی */}
        <span
          className="
            absolute top-3 right-3 z-10
            bg-gradient-to-l from-orange-500 to-orange-600
            text-white text-[11px] font-black
            px-3 py-1 rounded-full
            shadow-lg shadow-orange-500/30
            backdrop-blur-sm
          "
        >
          {category}
        </span>

        {/* تاریخ (اگه بود) */}
        {date && (
          <span
            className="
              absolute bottom-3 right-3 z-10
              flex items-center gap-1.5
              bg-black/60 backdrop-blur-md
              text-white text-[10px] font-bold
              px-2.5 py-1 rounded-full
              border border-white/20
            "
          >
            <HiOutlineCalendar className="w-3 h-3" />
            {date}
          </span>
        )}

        {/* زمان مطالعه */}
        {readTime && (
          <span
            className="
              absolute bottom-3 left-3 z-10
              flex items-center gap-1.5
              bg-white/95 backdrop-blur-md
              text-gray-800 text-[10px] font-bold
              px-2.5 py-1 rounded-full
              shadow-md
            "
          >
            <HiOutlineClock className="w-3 h-3 text-orange-500" />
            {readTime}
          </span>
        )}
      </div>

      {/* ================= محتوا ================= */}
      <div className={`flex-1 flex flex-col ${config.padding}`}>
        {/* عنوان */}
        <h3
          className={`
            font-black text-gray-800 mb-2 leading-snug
            ${config.titleSize} line-clamp-2
            group-hover:text-orange-600 transition-colors duration-300
          `}
        >
          {title}
        </h3>

        {/* توضیحات */}
        <p
          className={`
            text-gray-500 leading-relaxed
            ${config.descSize} ${config.descLines}
            flex-1
          `}
        >
          {description}
        </p>

        {/* دکمه */}
        <div className="mt-4 pt-3 border-t border-dashed border-gray-200">
          <span
            className="
              inline-flex items-center gap-1.5
              text-orange-600 font-black text-sm
              group-hover:text-orange-700
              transition-all duration-300
            "
          >
            بیشتر بخوانید
            <HiOutlineArrowLeft
              className="
                w-4 h-4
                transition-transform duration-300
                group-hover:-translate-x-1
              "
            />
          </span>
        </div>
      </div>
    </>
  );

  /* ================================================================ */
  /*                       رندر نهایی                                 */
  /* ================================================================ */
  const wrapperClasses = `
    group relative bg-white rounded-2xl overflow-hidden
    border border-gray-100
    shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)]
    hover:shadow-[0_12px_40px_-12px_rgba(249,115,22,0.25)]
    hover:border-orange-200 hover:-translate-y-1
    transition-all duration-300
    flex ${config.wrapper}
    h-full
  `;

  /* اگه لینک داشت، کل کارت قابل کلیک باشه */
  if (isClickable) {
    return (
      <Link to={link} className={wrapperClasses}>
        {cardContent}

        {/* خط تزئینی پایین کارت هنگام هاور */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-l from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
    );
  }

  /* در غیر این صورت، کارت معمولی */
  return (
    <div onClick={handleButtonClick} className={`${wrapperClasses} cursor-pointer`}>
      {cardContent}

      {/* خط تزئینی پایین کارت هنگام هاور */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-l from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

export default Card;