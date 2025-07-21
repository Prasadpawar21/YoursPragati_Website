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
import UiverseCard from './UiverseCard'; 
import Button from "../Components/Button";
import Button2 from "../Components/Button2";

const Home = () => {

  

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
              <Button title="Contact-us" to="/contact-us" />
              <Button2
                title="Our Services" 
              />
            </div>
          </div>

          {/* ✅ Right Section: UiverseCard (visible on md+ only) */}
          <div className="hidden md:flex md:w-2/5 justify-center pr-6">
            <UiverseCard />
          </div>
        </div>
      </div>

      {/* ✅ Add id="services" here for scroll target */}
      <div id="services">
        <Services />
      </div>

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
