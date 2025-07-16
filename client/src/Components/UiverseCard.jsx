// import React from "react";
// import "./UiverseCard.css"; // Import the styles
// import { MdTranslate } from "react-icons/md";
// import { RiMenuSearchLine } from "react-icons/ri";
// import { BsClipboard2Data } from "react-icons/bs";


// export default function UiverseCard() {
//   return (
//     <div className="parent">
//       <div className="card">
//         <div className="logo">
//           <span className="circle circle1"></span>
//           <span className="circle circle2"></span>
//           <span className="circle circle3"></span>
//           <span className="circle circle4"></span>
//           <span className="circle circle5">
//             {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.667 31.69" className="svg">
//               <path
//                 d="M12.827,1.628A1.561,1.561,0,0,1,14.31,0h2.964a1.561,1.561,0,0,1,1.483,1.628v11.9a9.252,9.252,0,0,1-2.432,6.852q-2.432,2.409-6.963,2.409T2.4,20.452Q0,18.094,0,13.669V1.628A1.561,1.561,0,0,1,1.483,0h2.98A1.561,1.561,0,0,1,5.947,1.628V13.191a5.635,5.635,0,0,0,.85,3.451,3.153,3.153,0,0,0,2.632,1.094,3.032,3.032,0,0,0,2.582-1.076,5.836,5.836,0,0,0,.816-3.486Z"
//               ></path>
//               <path
//                 d="M75.207,20.857a1.561,1.561,0,0,1-1.483,1.628h-2.98a1.561,1.561,0,0,1-1.483-1.628V1.628A1.561,1.561,0,0,1,70.743,0h2.98a1.561,1.561,0,0,1,1.483,1.628Z"
//                 transform="translate(-45.91 0)"
//               ></path>
//               <path
//                 d="M0,80.018A1.561,1.561,0,0,1,1.483,78.39h26.7a1.561,1.561,0,0,1,1.483,1.628v2.006a1.561,1.561,0,0,1-1.483,1.628H1.483A1.561,1.561,0,0,1,0,82.025Z"
//                 transform="translate(0 -51.963)"
//               ></path>
//             </svg> */}
//             <img src="https://res.cloudinary.com/da8ma5izt/image/upload/v1749193933/Yours_Pragati_Logo-removebg-preview_1_qa00ao.png" />
//           </span>
//         </div>
//         <div className="glass"></div>
//         <div className="content">
//           <span className="title">UIVERSE (3D UI)</span>
//           <span className="text">
//             Craft and share stunning CSS-based custom elements
//           </span>
//         </div>
//         <div className="bottom">
//           {/* <div className="social-buttons-container">
//             <button className="social-button social-button1">
//               <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg" className="svg">
//                 <MdTranslate className="bottom-icon" title="Translation" />
//               </svg>
//             </button>
//             <button className="social-button social-button1">
//               <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="svg">
//                 <RiMenuSearchLine className="bottom-icon" title="Transcription" />
//               </svg>
//             </button>
//             <button className="social-button social-button1">
//               <svg viewBox="0 0 640 512" xmlns="http://www.w3.org/2000/svg" className="svg">
//                 <BsClipboard2Data className="bottom-icon" title="Data Collection" />
//               </svg>
//             </button>
//           </div> */}
//           <div className="social-buttons-container">
//             <button className="social-button social-button1">
//               <MdTranslate className="svg bottom-icon" title="Translation" />
//             </button>
//             <button className="social-button social-button1">
//               <RiMenuSearchLine className="svg bottom-icon" title="Transcription" />
//             </button>
//             <button className="social-button social-button1">
//               <BsClipboard2Data className="svg bottom-icon" title="Data Collection" />
//             </button>
//           </div>
//           <div className="view-more">
//             <button className="view-more-button">Explore all </button>
//             <svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
//               <path d="m6 9 6 6 6-6"></path>
//             </svg>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



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
