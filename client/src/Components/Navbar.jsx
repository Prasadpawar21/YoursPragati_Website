// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { ChevronDown } from "lucide-react";
// import { jwtDecode } from "jwt-decode";
// import defaultProfile from "../assets/default-profile.png";
// import "../App.css";
// import AdminDashboard from "./AdminDashboard";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const dropdownRef = useRef(null);
//   const navigate = useNavigate();

//   // Decode JWT
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUser(decoded);
//       } catch (err) {
//         console.error("Invalid token", err);
//       }
//     }
//   }, []);

//   // Close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <nav className="bg-white border-b shadow-sm fixed w-full z-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo */}
//           <div className="flex items-center space-x-2 text-xl font-semibold text-purple-600">
//             <img
//               src="https://res.cloudinary.com/da8ma5izt/image/upload/v1749193933/Yours_Pragati_Logo-removebg-preview_1_qa00ao.png"
//               alt="Logo"
//               className="h-10 w-auto"
//             />
//             <span className="hidden sm:inline">Yours Pragati</span>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
//             <Link to="/" className="hover:text-purple-600 transition">Home</Link>
//             <Link to="/all-blogs" className="hover:text-purple-600 transition">Blogs</Link>
//             <a href="#contact" className="hover:text-purple-600 transition">Contact</a>

//             {/* Auth Section */}
//             {user ? (
//               <div
//                 ref={dropdownRef}
//                 className="relative flex items-center space-x-2 cursor-pointer"
//                 onClick={() => setDropdownOpen(!dropdownOpen)}
//               >
//                 <span className="text-sm font-medium text-gray-800">{user.firstName}</span>
//                 <img
//                   src={defaultProfile}
//                   alt="Profile"
//                   className="w-8 h-8 rounded-full object-cover border border-gray-300"
//                 />
//                 <ChevronDown className="w-4 h-4 text-gray-600" />

//                 {/* Dropdown */}
//                 {dropdownOpen && (
//                   <div className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-lg shadow-md py-2 z-20 animate-fade-in">
//                     <Link
//                       to="/activities"
//                       className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       Activities
//                     </Link>
//                     {user.role === "admin" && (
//                       <Link
//                         to="/admin-dashboard"
//                         className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         Admin Dashboard
//                       </Link>
//                     )}
//                     <button
//                       onClick={handleLogout}
//                       className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="flex space-x-4">
//                 <Link to="/login" className="hover:text-purple-600">Login</Link>
//                 <Link to="/signup" className="hover:text-purple-600">Signup</Link>
//               </div>
//             )}
//           </div>

//           {/* Hamburger Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-700 hover:text-purple-600 focus:outline-none"
//             >
//               <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 {isOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Dropdown */}
//       {isOpen && (
//         <div className="md:hidden px-4 pb-4 pt-2 space-y-2 font-medium text-gray-700">
//           <Link to="/" className="cursor-pointer block hover:text-purple-600">Home</Link>
//           <Link to="/all-blogs" className="cursor-pointer block hover:text-purple-600">Blogs</Link>
//           <a href="#contact" className="cursor-pointer block hover:text-purple-600">Contact</a>
//           {user ? (
//             <>
//               <Link to="/activities" className="cursor-pointer block hover:text-purple-600">Activities</Link>
//               {user.role === "admin" && (
//                 <Link to="/admin-dashboard" className="cursor-pointer block hover:text-purple-600">Admin Dashboard</Link>
//               )}
//               <button onClick={handleLogout} className="cursor-pointer block text-left text-red-600">Logout</button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="cursor-pointer block hover:text-purple-600">Login</Link>
//               <Link to="/signup" className="cursor-pointer block hover:text-purple-600">Signup</Link>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect, useRef } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { ChevronDown } from "lucide-react";
// import { jwtDecode } from "jwt-decode";
// import defaultProfile from "../assets/default-profile.png";
// import "../App.css";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [aboutOpen, setAboutOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const userDropdownRef = useRef(null);
//   const aboutDropdownRef = useRef(null);

//   const location = useLocation();
//   const navigate = useNavigate();
//   const isHome = location.pathname === "/";

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUser(decoded);
//       } catch (err) {
//         console.error("Invalid token", err);
//       }
//     }
//   }, []);

//   // Close dropdowns on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
//         setDropdownOpen(false);
//       }
//       if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(e.target)) {
//         setAboutOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     navigate("/");
//   };

//   const scrollToSection = (id) => {
//     const el = document.getElementById(id);
//     if (el) el.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <nav className="bg-white border-b shadow-sm fixed w-full z-20">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16 items-center">
//           {/* Logo */}
//           <div className="flex items-center space-x-2 text-xl font-semibold text-purple-600">
//             <img
//               src="https://res.cloudinary.com/da8ma5izt/image/upload/v1749193933/Yours_Pragati_Logo-removebg-preview_1_qa00ao.png"
//               alt="Logo"
//               className="h-10 w-auto"
//             />
//             <span className="hidden sm:inline">Yours Pragati</span>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-8 font-medium text-gray-700">
//             <Link to="/" className="hover:text-purple-600 transition">Home</Link>
//             <Link to="/all-blogs" className="hover:text-purple-600 transition">Blogs</Link>
//             <a href="/contact-us" className="hover:text-purple-600 transition">Contact</a>

//             {/* About Us Dropdown */}
//             <div
//               className={`relative ${!isHome ? "opacity-50 cursor-not-allowed" : ""}`}
//               ref={aboutDropdownRef}
//               onClick={() => isHome && setAboutOpen(!aboutOpen)}
//             >
//               <div className="flex items-center space-x-1 cursor-pointer">
//                 <span>About Us</span>
//                 <ChevronDown className="w-4 h-4 text-gray-600" />
//               </div>
//               {aboutOpen && isHome && (
//                 <div className="absolute right-0 top-10 w-48 bg-white border border-gray-200 rounded-sm shadow-md py-2 z-20">
//                   {["services", "data-collection", "ethics", "team"].map((id) => (
//                     <button
//                       key={id}
//                       onClick={() => scrollToSection(id)}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                     >
//                       {id.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Auth Section */}
//             <div
//               ref={userDropdownRef}
//               className="relative flex items-center space-x-2 cursor-pointer"
//               onClick={() => setDropdownOpen(!dropdownOpen)}
//             >
//               <span className="text-sm font-medium text-gray-800">
//                 {user ? user.firstName : "User"}
//               </span>
//               {user ? (
//                 <img
//                   src={defaultProfile}
//                   alt="Profile"
//                   className="w-8 h-8 rounded-full object-cover border border-gray-300"
//                 />
//               ) : (
//                 <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-semibold border border-gray-300">
//                   U
//                 </div>
//               )}
//               <ChevronDown className="w-4 h-4 text-gray-600" />

//               {dropdownOpen && (
//                 <div className="absolute right-0 top-12 w-48 bg-white border border-gray-200 rounded-sm shadow-md py-2 z-20 animate-fade-in">
//                   {user ? (
//                     <>
//                       <Link
//                         to="/activities"
//                         className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         Activities
//                       </Link>
//                       {user.role === "admin" && (
//                         <Link
//                           to="/admin-dashboard"
//                           className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         >
//                           Admin Dashboard
//                         </Link>
//                       )}
//                       <button
//                         onClick={handleLogout}
//                         className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
//                       >
//                         Logout
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <Link
//                         to="/signup"
//                         className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         Register
//                       </Link>
//                       <Link
//                         to="/login"
//                         className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                       >
//                         Login
//                       </Link>
//                     </>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Hamburger Button */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-700 hover:text-purple-600 focus:outline-none"
//             >
//               <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 {isOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Dropdown */}
//       {isOpen && (
//         <div className="md:hidden px-4 pb-4 pt-2 space-y-2 font-medium text-gray-700">
//           <Link to="/" className="cursor-pointer block hover:text-purple-600">Home</Link>
//           <Link to="/all-blogs" className="cursor-pointer block hover:text-purple-600">Blogs</Link>
//           <a href="#contact" className="cursor-pointer block hover:text-purple-600">Contact</a>
//           {user ? (
//             <>
//               <Link to="/activities" className="cursor-pointer block hover:text-purple-600">Activities</Link>
//               {user.role === "admin" && (
//                 <Link to="/admin-dashboard" className="cursor-pointer block hover:text-purple-600">Admin Dashboard</Link>
//               )}
//               <button onClick={handleLogout} className="cursor-pointer block text-left text-red-600">Logout</button>
//             </>
//           ) : (
//             <>
//               <Link to="/signup" className="cursor-pointer block hover:text-purple-600">Register</Link>
//               <Link to="/login" className="cursor-pointer block hover:text-purple-600">Login</Link>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import "../App.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [user, setUser] = useState(null);
  const userDropdownRef = useRef(null);
  const aboutDropdownRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const currentPath = location.pathname;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(e.target)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const isActive = (path) => currentPath === path;

  const getUserInitials = () => {
    if (!user) return "U";
    const first = user.firstName?.charAt(0) || "";
    const last = user.lastName?.charAt(0) || "";
    return (first + last).toUpperCase();
  };

  return (
    <nav className="bg-transparent fixed w-full z-20 transition-all backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2 text-xl font-semibold text-orange-900">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/da8ma5izt/image/upload/v1749193933/Yours_Pragati_Logo-removebg-preview_1_qa00ao.png"
                alt="Logo"
                className="h-15 w-auto"
              />
            </Link>
            <Link to="/">
              <span className="hidden sm:inline logo-style text-blue-900"><span className="vibur-regular">Y</span>ours<span className="text-orange-600"><span className="vibur-regular text-2xl">P</span>ragati</span></span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10 font-medium text-gray-700">
            <Link
              to="/"
              className={`hover:text-orange-900 transition oxygen-regular border-b-2 ${isActive("/") ? "border-orange-900" : "border-transparent"}`}
            >
              Home
            </Link>
            <Link
              to="/all-blogs"
              className={`hover:text-orange-900 transition oxygen-regular border-b-2 ${isActive("/all-blogs") ? "border-orange-900" : "border-transparent"}`}
            >
              Blogs
            </Link>
            <Link
              to="/contact-us"
              className={`hover:text-orange-900 transition oxygen-regular border-b-2 ${isActive("/contact-us") ? "border-orange-900" : "border-transparent"}`}
            >
              Contact
            </Link>

            {/* About Us Dropdown */}
            <div
              className={`relative ${!isHome ? "opacity-50 cursor-not-allowed" : ""}`}
              ref={aboutDropdownRef}
              onClick={() => isHome && setAboutOpen(!aboutOpen)}
            >
              <div
                className={`flex items-center space-x-1 cursor-pointer oxygen-regular border-b-2 ${aboutOpen ? "border-transparent" : "border-transparent"}`}
              >
                <span>About Us</span>
                <ChevronDown className="w-4 h-4 text-gray-600" />
              </div>
              {aboutOpen && isHome && (
                <div className="absolute right-0 top-10 w-60 bg-orange-50 border-t-4 border-orange-900 rounded-sm shadow-lg py-2 z-20 oxygen-regular">
                  {["services", "data-collection", "ethics", "team"].map((id) => (
                    <button
                      key={id}
                      onClick={() => scrollToSection(id)}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-100 transition cursor-pointer"
                    >
                      {id.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ")}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Section */}
            <div
              ref={userDropdownRef}
              className="relative flex items-center space-x-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="text-sm font-medium text-gray-800">
                {user ? user.firstName : "User"}
              </span>
              <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-900 flex items-center justify-center text-sm font-semibold border border-gray-300 oxygen-bold">
                {getUserInitials()}
              </div>
              <ChevronDown className="w-4 h-4 text-gray-600" />

              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-60 bg-orange-50 rounded-sm shadow-lg py-2 z-20 animate-fade-in border-t-4 border-orange-900">
                  {user ? (
                    <>
                      <Link
                        to="/activities"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100 transition oxygen-regular"
                      >
                        Activities
                      </Link>
                      {user.role === "admin" && (
                        <Link
                          to="/admin-dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100 transition oxygen-regular"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-orange-100 transition oxygen-bold"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 transition oxygen-regular"
                      >
                        Register
                      </Link>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 transition oxygen-regular"
                      >
                        Login
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 space-y-2 font-medium text-gray-700 bg-white/90 border-t border-gray-200 shadow-md transition">
          <Link to="/" className="block hover:text-purple-600 transition">Home</Link>
          <Link to="/all-blogs" className="block hover:text-purple-600 transition">Blogs</Link>
          <Link to="/contact-us" className="block hover:text-purple-600 transition">Contact</Link>
          {user ? (
            <>
              <Link to="/activities" className="block hover:text-purple-600 transition">Activities</Link>
              {user.role === "admin" && (
                <Link to="/admin-dashboard" className="block hover:text-purple-600 transition">Admin Dashboard</Link>
              )}
              <button onClick={handleLogout} className="block text-left text-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/signup" className="block hover:text-purple-600 transition">Register</Link>
              <Link to="/login" className="block hover:text-purple-600 transition">Login</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
