import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MatchesPage from "./pages/MatchesPage";
import NewsPage from "./pages/NewsPage";
import VideosPage from "./pages/VideosPage";
import ContactPage from "./pages/ContactPage";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">۴۰۴</h1>
      <p className="text-xl text-gray-600 mb-8">صفحه‌ای که به دنبال آن بودید پیدا نشد.</p>
      <Link
        to="/"
        className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition inline-block"
      >
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="matches" element={<MatchesPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="videos" element={<VideosPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;