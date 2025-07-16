// import { useNavigate } from 'react-router-dom';
// import Typewriter from "./Typewriter";
// import Navbar from './Navbar';
// import Services from './Services';
// import AboutAuthor from './AboutAuthor';  
// import VisionMissionValues from './OurPurpose';
// import GetInTouch from './GetInTouch';  
// import Footer from './Footer';
// import Blogs from './Blogs'; 
// import DataCollectionPage from './DataCollectionPage'; 
// import TeamSection from "./OurTeam";
// import { FiArrowRight, FiInfo } from 'react-icons/fi';

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <Navbar />
//     <div className="relative min-h-screen overflow-hidden z-0">

//       {/* Grid and overlays */}
//       <div className="hero-grid-bg"></div>
//       <div className="hero-grid-tiles absolute inset-0 z-1 pointer-events-none"></div>
//       <div className="hero-fade-bottom"></div>

      

//       {/* Hero Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 min-h-screen">
//         <Typewriter />

//         <p className="mt-4 text-lg text-gray-600 max-w-2xl oxygen-bold ">
//           Connecting Communities and Businesses Through India's Native Tongues
//         </p>

//         <div className="mt-8 flex flex-col sm:flex-row gap-4">
//           {/* ✅ Get Started Button */}
//           <button
//             onClick={() => navigate("/all-blogs")}
//             className="flex items-center justify-between bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition text-xs font-semibold shadow-md gap-3 w-[200px] oxygen-bold"
//           >
//             <span className="ml-1">Get Started</span>
//             <div className="bg-white text-black p-1.5 rounded-full">
//               <FiArrowRight className="text-base" />
//             </div>
//           </button>

//           {/* ✅ Learn More Button */}
//           <button
//             onClick={() => navigate("/contact-us")}
//             className="flex items-center justify-between border border-gray-500 text-gray-800 px-5 py-2.5 rounded-full hover:bg-gray-100 transition text-xs font-semibold shadow-sm gap-3 w-[200px] oxygen-bold"
//           >
//             <span className="ml-1">Learn More</span>
//             <div className="bg-gray-200 text-gray-800 p-1.5 rounded-full">
//               <FiInfo className="text-base" />
//             </div>
//           </button>
//         </div>
//       </div>
//     </div>
//     <Services />
//     <DataCollectionPage />
//     {/* <AboutAuthor /> */}
//     <VisionMissionValues />
//     <GetInTouch />
//     <TeamSection />
//     <Blogs />
//     <Footer />
//     </div>
//   );
// };

// export default Home;

// import { useNavigate } from 'react-router-dom';
import Typewriter from "./Typewriter";
import Navbar from './Navbar';
import Services from './Services';
import AboutAuthor from './AboutAuthor';  
import VisionMissionValues from './OurPurpose';
import GetInTouch from './GetInTouch';  
import Footer from './Footer';
import Blogs from './Blogs'; 
import DataCollectionPage from './DataCollectionPage'; 
import TeamSection from "./OurTeam";
import { FiArrowRight, FiInfo } from 'react-icons/fi';
import UiverseCard from './UiverseCard'; // ✅ Import the new component
import Button from "../Components/Button";
// import Button2 from '../Components/Button2';

const Home = () => {
  // const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="relative min-h-screen overflow-hidden z-0">

        {/* Grid and overlays */}
        <div className="hero-grid-bg"></div>
        <div className="hero-grid-tiles absolute inset-0 z-1 pointer-events-none"></div>
        <div className="hero-fade-bottom"></div>

        {/* Hero Section Layout */}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center px-4 py-24 min-h-screen">
          
          {/* ✅ Left Section: Hero Content (60% on md+ screens) */}
          <div className="w-full md:w-3/5 flex flex-col items-center text-center md:text-left">
            <Typewriter />

            <p className="mt-4 text-lg text-gray-600 max-w-2xl oxygen-bold">
              Connecting Communities and Businesses Through India's Native Tongues
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {/* Get Started Button */}
              {/* <button
                onClick={() => navigate("/all-blogs")}
                className="flex items-center justify-between bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition text-xs font-semibold shadow-md gap-3 w-[200px] oxygen-bold"
              >
                <span className="ml-1">Get Started</span>
                <div className="bg-white text-black p-1.5 rounded-full">
                  <FiArrowRight className="text-base" />
                </div>
              </button> */}
              <Button title="Contact-us" to="/contact-us" />

              {/* Learn More Button */}
              {/* <button
                onClick={() => navigate("/contact-us")}
                className="flex items-center justify-between border border-gray-500 text-gray-800 px-5 py-2.5 rounded-full hover:bg-gray-100 transition text-xs font-semibold shadow-sm gap-3 w-[200px] oxygen-bold"
              >
                <span className="ml-1">Learn More</span>
                <div className="bg-gray-200 text-gray-800 p-1.5 rounded-full">
                  <FiInfo className="text-base" />
                </div>
              </button> */}
              <Button title="Our Services" to="#services" />
            </div>
          </div>

          {/* ✅ Right Section: UiverseCard (visible on md+ only) */}
          <div className="hidden md:flex md:w-2/5 justify-center pr-6">
            <UiverseCard />
          </div>
        </div>
      </div>

      {/* Other Sections */}
      <Services />
      <DataCollectionPage />
      {/* <AboutAuthor /> */}
      <VisionMissionValues />
      <GetInTouch />
      <TeamSection />
      <Blogs />
      <Footer />
    </div>
  );
};

export default Home;
