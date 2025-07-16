import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiInfo } from 'react-icons/fi';
import Typewriter from "./Typewriter";
import Navbar from './Navbar';
import '../App.css';

const TempHome = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Grid and overlays */}
      <div className="hero-grid-bg"></div>
      <div className="hero-grid-tiles absolute inset-0 z-1 pointer-events-none"></div>
      <div className="hero-fade-bottom"></div>

      <Navbar />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 min-h-screen">
        <Typewriter />

        <p className="mt-4 text-lg text-gray-600 max-w-2xl oxygen-bold ">
          Connecting Communities and Businesses Through India's Native Tongues
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          {/* ✅ Get Started Button */}
          <button
            onClick={() => navigate("/all-blogs")}
            className="flex items-center justify-between bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition text-xs font-semibold shadow-md gap-3 w-[200px] oxygen-bold"
          >
            <span className="ml-1">Get Started</span>
            <div className="bg-white text-black p-1.5 rounded-full">
              <FiArrowRight className="text-base" />
            </div>
          </button>

          {/* ✅ Learn More Button */}
          <button
            onClick={() => navigate("/contact-us")}
            className="flex items-center justify-between border border-gray-500 text-gray-800 px-5 py-2.5 rounded-full hover:bg-gray-100 transition text-xs font-semibold shadow-sm gap-3 w-[200px] oxygen-bold"
          >
            <span className="ml-1">Learn More</span>
            <div className="bg-gray-200 text-gray-800 p-1.5 rounded-full">
              <FiInfo className="text-base" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TempHome;
