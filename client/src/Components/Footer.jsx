// import React from "react";
// import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

// const Footer = () => {
//   return (
//     <footer className="bg-gray-900 text-white px-6 py-10">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

//         {/* Contact Info and Logo */}
//         <div>
//           <h2 className="text-xl font-bold mb-4">YoursPragati</h2>
//           <p className="mb-1">Email: <a href="mailto:yourspragati30@gmail.com" className="text-indigo-400">yourspragati30@gmail.com</a></p>
//           <p>Phone: <a href="tel:8600665218" className="text-indigo-400">8600665218</a></p>
//         </div>

//         {/* Google Map */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Our Location</h3>
//           <div className="w-full h-40 bg-gray-700 rounded-lg">
//             {/* Embed your Google Map iframe here */}
//             <p className="text-center pt-14 text-sm text-gray-300">[Google Map Placeholder]</p>
//           </div>
//         </div>

//         {/* Social Media Links */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Connect on:</h3>
//           <div className="flex gap-4 text-2xl">
//             <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400"><FaLinkedin /></a>
//             <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400"><FaTwitter /></a>
//             <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400"><FaFacebook /></a>
//             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400"><FaInstagram /></a>
//             <a href="https://wa.me/918600665218" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400"><FaWhatsapp /></a>
//           </div>
//         </div>

//         {/* Navigation Links */}
//         <div>
//           <h3 className="text-lg font-semibold mb-4">Sections</h3>
//           <ul className="space-y-2">
//             <li><a href="#home" className="hover:text-indigo-400">Home</a></li>
//             <li><a href="#services" className="hover:text-indigo-400">Services</a></li>
//             <li><a href="#blogs" className="hover:text-indigo-400">Blogs</a></li>
//             <li><a href="#connect" className="hover:text-indigo-400">Connect</a></li>
//           </ul>
//         </div>

//       </div>

//       <div className="text-center text-gray-400 mt-10 text-sm">
//         &copy; {new Date().getFullYear()} YoursPragati. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from "react";
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Contact Info and Logo */}
        <div>
          <h2 className="text-xl font-bold mb-4">YoursPragati</h2>
          <p className="mb-1">
            Email:{" "}
            <a
              href="mailto:yourspragati30@gmail.com"
              className="text-indigo-400 hover:underline"
            >
              yourspragati30@gmail.com
            </a>
          </p>
          <p>
            Phone:{" "}
            <a
              href="tel:8600665218"
              className="text-indigo-400 hover:underline"
            >
              8600665218
            </a>
          </p>

          {/* Developer Info Below */}
          <div className="mt-6 border-t border-gray-800 pt-4">
            <h3 className="text-sm font-semibold mb-1 text-gray-300">
              Developed by:
            </h3>
            <p className="text-sm text-white font-medium">Prasad Pawar</p>
            <p className="text-xs text-gray-400 mb-3">
              SY - B.Tech - CSE (AI-ML), PCCOE, Pune
            </p>
            <div className="flex gap-3 text-lg text-gray-300">
              <a
                href="https://www.linkedin.com/in/prasadpawar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/Prasad-Pawar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400"
              >
                <FaGithub />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400"
              >
                <FaTwitter />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400"
              >
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-400"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Location</h3>
          <div className="w-full h-40 md:h-52 rounded-lg overflow-hidden">
            <iframe
              title="PCCOE Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d22278.957259858315!2d73.76221502765561!3d18.655011928244328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e76c8fa205%3A0x1b210131915734fd!2sPCCOE%20-%20Pimpri%20Chinchwad%20College%20Of%20Engineering!5e0!3m2!1sen!2sin!4v1751000125802!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect on:</h3>
          <div className="flex gap-4 text-2xl">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400"
            >
              <FaTwitter />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/918600665218"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Sections</h3>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="hover:text-indigo-400">
                Home
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-indigo-400">
                Services
              </a>
            </li>
            <li>
              <a href="#blogs" className="hover:text-indigo-400">
                Blogs
              </a>
            </li>
            <li>
              <a href="#connect" className="hover:text-indigo-400">
                Connect
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 mt-10 text-sm">
        &copy; {new Date().getFullYear()} YoursPragati. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
