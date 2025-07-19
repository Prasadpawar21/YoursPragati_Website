import "./UiverseCard.css";
import { MdTranslate } from "react-icons/md";
import { RiMenuSearchLine } from "react-icons/ri";
import { BsClipboard2Data } from "react-icons/bs";

export default function UiverseCard() {
  return (
    <div className="parent">
      <div className="card">
        <div className="logo">
          <span className="circle circle1"></span>
          <span className="circle circle2"></span>
          <span className="circle circle3"></span>
          <span className="circle circle4"></span>
          <span className="circle circle5">
            <img
              src="https://res.cloudinary.com/da8ma5izt/image/upload/v1749193933/Yours_Pragati_Logo-removebg-preview_1_qa00ao.png"
              alt="Yours Pragati Logo"
              className="logo-img"
            />
          </span>
        </div>

        <div className="glass"></div>

        <div className="content">
          {/* <span className="title">Yours Pragati</span> */}
          <span className="title hidden sm:inline logo-style text-blue-900"><span className="vibur-regular">Y</span>ours<span className="text-orange-600"><span className="vibur-regular text-2xl">P</span>ragati</span></span>
          <span className="text">
            Providing services in translation, transcription, content management,
            and data collection.
          </span>
        </div>

        <div className="bottom">
          <div className="social-buttons-container">
            <button className="social-button">
              <MdTranslate className="bottom-icon" title="Translation" />
            </button>
            <button className="social-button">
              <RiMenuSearchLine className="bottom-icon" title="Transcription" />
            </button>
            <button className="social-button">
              <BsClipboard2Data className="bottom-icon" title="Data Collection" />
            </button>
          </div>

          <div className="view-more">
            <button className="view-more-button">Explore All...</button>
          </div>
        </div>
      </div>
    </div>
  );
}
