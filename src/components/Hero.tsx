import heroBg from "../assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-orange-700 to-red-800 text-white overflow-hidden">
      {/* تصویر پس‌زمینه با افکت شفافیت */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroBg})` }}
      ></div>

      {/* محتوای اصلی */}
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16 relative z-10 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 drop-shadow-lg">
            به خانواده ورزش خوش آمدید
          </h1>

          <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-full transition transform hover:scale-105 shadow-lg text-lg">
            مشاهده مسابقات زنده
          </button>
        </div>
      </div>

      {/* منحنی تزئینی پایین */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          fill="#f3f4f6"
          className="w-full h-auto"
        >
          <path d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
