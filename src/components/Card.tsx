import { Link } from "react-router-dom";

// تایپ‌های مربوط به کارت
export interface CardProps {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date?: string;
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
  link = "#",
  variant = "default",
  onButtonClick,
}: CardProps) => {
  // تعیین کلاس‌های مختلف بر اساس نوع کارت
  const variantClasses = {
    default: "flex-col",
    horizontal: "flex-row",
    compact: "flex-col max-w-[280px]",
  };

  const imageSizes = {
    default: "h-48",
    horizontal: "h-32 w-32 md:h-40 md:w-40",
    compact: "h-36",
  };

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick(id);
    }
  };

  return (
    <div
      className={`group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex ${variantClasses[variant]}`}
    >
      {/* بخش تصویر */}
      <div className={`relative overflow-hidden ${imageSizes[variant]} w-full ${variant === "horizontal" ? "flex-shrink-0" : ""}`}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* برچسب دسته‌بندی */}
        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1 rounded-full z-10">
          {category}
        </span>
        {/* برچسب تاریخ (اگر موجود باشد) */}
        {date && (
          <span className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {date}
          </span>
        )}
      </div>

      {/* بخش محتوا */}
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
        
        {/* دکمه یا لینک */}
        <div className="mt-auto">
          {link !== "#" ? (
            <Link
              to={link}
              className="inline-flex items-center gap-1 text-orange-600 font-semibold hover:text-orange-800 transition group/btn"
            >
              بیشتر بخوانید
              <span className="transform group-hover/btn:translate-x-1 transition">←</span>
            </Link>
          ) : (
            <button
              onClick={handleButtonClick}
              className="inline-flex items-center gap-1 text-orange-600 font-semibold hover:text-orange-800 transition"
            >
              بیشتر بخوانید
              <span className="transform group-hover:translate-x-1 transition">←</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;