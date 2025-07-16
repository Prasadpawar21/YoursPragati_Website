import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import AnimatedHello from "./Animation"; // Assuming you have an animation component
import { FiArrowRight, FiInfo } from 'react-icons/fi';

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    mobile: "",
    role: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (!formData[name] && name !== "mobile") {
      setErrors((prev) => ({ ...prev, [name]: "This field is required*" }));
    }
  };

  const handleOk = () => {
    setSuccessModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== "mobile") newErrors[key] = "This field is required*";
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      lastName: true,
      email: true,
      mobile: true,
      role: true,
      message: true,
    });

    if (Object.keys(newErrors).length === 0) {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccessModalOpen(true);
          setFormData({
            name: "",
            lastName: "",
            email: "",
            mobile: "",
            role: "",
            message: "",
          });
          setTouched({});
        } else {
          alert(data.message || "Something went wrong!");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit form. Please try again.");
      }
    }
  };

  return (
    <div id="contact">
      <div className="text-center bg-color pt-30 pb-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 pb-4 oxygen-bold">Contact Us</h2>
        <p className="text-center text-gray-500 mb-10 max-w-3xl mx-auto oxygen-regular text-lg">
          Get in touch for collaboration and partnership opportunities.
        </p>
      </div>

      <section className="min-h-screen flex flex-col sm:flex-row bg-color">
        <div className="hidden sm:flex sm:w-2/5 items-center justify-start">
          <AnimatedHello />
        </div>

        <div className="w-full sm:w-3/5 px-6 sm:px-12 py-12 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl border border-orange-200 bg-orange-100 rounded-sm shadow-xl p-8 relative "
          >
            <h2 className="text-2xl font-bold text-center text-orange-900 mb-10 oxygen-bold">Get in Touch</h2>

            {[
              { label: "Name", name: "name", type: "text", placeholder: "Your name" },
              { label: "Last name", name: "lastName", type: "text", placeholder: "Your last name" },
              { label: "Email", name: "email", type: "email", placeholder: "Your email address" },
              { label: "Mobile Number (optional)", name: "mobile", type: "text", placeholder: "Your mobile number" },
            ].map(({ label, name, type, placeholder }) => (
              <div className="mb-4" key={name}>
                <label className="block text-sm font-medium text-orange-900 mb-1 oxygen-regular">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={placeholder}
                  className={`w-full p-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-900 oxygen-regular ${
                    errors[name] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[name] && touched[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                )}
              </div>
            ))}

            <div className="mb-4">
              <label className="block text-sm font-medium text-orange-900 mb-2 oxygen-regular">
                I want to collaborate as
              </label>
              <div className="space-y-2 text-gray-800">
                {["Translator", "Transcriptionist", "Voice-over Artist", "Others"].map((roleOption) => (
                  <label key={roleOption} className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value={roleOption}
                      checked={formData.role === roleOption}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mr-2 accent-orange-800"
                    />
                    {roleOption}
                  </label>
                ))}
                {errors.role && touched.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-orange-900 mb-1 oxygen-regular">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your message"
                rows="4"
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 oxygen-regular ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
              ></textarea>
              {errors.message && touched.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <div className="flex justify-center">
              {/* <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-8 rounded-full transition duration-300 oxygen-regular"
              >
                Submit
              </button> */}
              <button
              className="flex items-center justify-between bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition text-xs font-semibold shadow-md gap-4 oxygen-bold"
              >
                <span className="ml-1">Submit</span>
                <div className="bg-white text-black p-1.5 rounded-full">
                  <FiArrowRight className="text-base" />
                </div>
              </button>
            </div>
          </form>
        </div>

        {/* ✅ Modal */}
        <Dialog
          open={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="fixed inset-0 bg-black/10 bg-opacity-10" aria-hidden="true" />
          <div className="relative bg-white rounded-lg shadow-xl p-6 z-50 w-full max-w-md mx-auto text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
              alt="Success"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-green-700 mb-2">Form submitted successfully!</h2>
            <p className="text-gray-600 mb-5">We will contact you in the next 48 hours.</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full cursor-pointer"
                onClick={handleOk}
              >
                OK
              </button>
              <button
                className="border border-gray-400 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-100 cursor-pointer"
                onClick={() => setSuccessModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Dialog>
      </section>
    </div>
  );
};

export default GetInTouch;


// import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
// import { Dialog } from "@headlessui/react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useTypewriter, Cursor } from "react-simple-typewriter";
// import { jwtDecode } from "jwt-decode";

// gsap.registerPlugin(ScrollTrigger);

// const getUserNameFromToken = () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return "User";
//     const decoded = jwtDecode(token);
//     return decoded.firstName || "User";
//   } catch {
//     return "User";
//   }
// };

// const AnimatedHello = () => {
//   const [userName] = useState(getUserNameFromToken());
//   const emojiRef = useRef(null);
//   const waveTweenRef = useRef(null);
//   const wordRefs = useRef([]);
//   const timeoutRef = useRef(null);
//   const currentIndexRef = useRef(0);
//   const hasStoppedRef = useRef(false);

//   const translations = [
//     `Hello ${userName}`,
//     `नमस्ते ${userName}`,
//     `नमस्कार ${userName}`,
//     `હેલો ${userName}`,
//     `ਸਤ ਸ੍ਰੀ ਅਕਾਲ ${userName}`,
//     `प्रणाम ${userName}`,
//     `হ্যালো ${userName}`,
//     `வணக்கம் ${userName}`,
//     `ہیلو ${userName}`,
//   ];

//   const [typeText] = useTypewriter({
//     words: [
//       'Contact us and begin your journey into a world of infinite AI possibilities.',
//       'Get in touch and explore a future powered by artificial intelligence.',
//       'Step into tomorrow with AI — let’s innovate together!'
//     ],
//     loop: true,
//     delaySpeed: 3000,
//     typeSpeed: 40,
//     deleteSpeed: 20
//   });

//   useEffect(() => {
//     waveTweenRef.current = gsap.to(emojiRef.current, {
//       rotate: 20,
//       transformOrigin: '70% 70%',
//       duration: 0.15,
//       yoyo: true,
//       repeat: 5,
//       ease: 'power1.inOut',
//       paused: true,
//     });

//     ScrollTrigger.create({
//       trigger: emojiRef.current,
//       start: 'top 80%',
//       onEnter: () => waveTweenRef.current.restart(),
//     });
//   }, []);

//   const handleHover = () => waveTweenRef.current.restart();

//   const startGreetingAnimation = () => {
//     const animate = () => {
//       if (hasStoppedRef.current) return;
//       const current = wordRefs.current[currentIndexRef.current];
//       const nextIndex = (currentIndexRef.current + 1) % translations.length;
//       const next = wordRefs.current[nextIndex];

//       gsap.timeline()
//         .to(current, { opacity: 0, y: -50, duration: 0.6, ease: 'power2.in' })
//         .set(current, { y: 0 })
//         .set(next, { y: 50 })
//         .to(next, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });

//       currentIndexRef.current = nextIndex;
//       timeoutRef.current = setTimeout(animate, 2000);
//     };

//     timeoutRef.current = setTimeout(animate, 2000);
//   };

//   useLayoutEffect(() => {
//     wordRefs.current.forEach((el, i) => {
//       if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0, y: 0 });
//     });
//     currentIndexRef.current = 0;
//     hasStoppedRef.current = false;
//     startGreetingAnimation();
//     return () => clearTimeout(timeoutRef.current);
//   }, [translations.length]);

//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === 'hidden') {
//         hasStoppedRef.current = true;
//         clearTimeout(timeoutRef.current);
//       }
//     };
//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
//   }, []);

//   return (
//     <div className="w-full h-full px-4 py-10 flex flex-col justify-center items-start bg-gray-100 text-indigo-700 overflow-hidden">
//       <div ref={emojiRef} onMouseEnter={handleHover} className="text-6xl cursor-pointer select-none">👋</div>
//       <div className="h-[60px] mt-6 relative w-full overflow-hidden">
//         {translations.map((text, index) => (
//           <h1
//             key={index}
//             ref={(el) => (wordRefs.current[index] = el)}
//             className="absolute left-1/2 -translate-x-1/2 w-full text-start text-6xl font-bold leading-[60px] opacity-0"
//           >
//             {text}
//           </h1>
//         ))}
//       </div>
//       <p className="mt-6 text-base text-4xl font-medium text-gray-700 max-w-lg leading-relaxed">
//         <span>{typeText}</span><Cursor cursorStyle="|" />
//       </p>
//     </div>
//   );
// };

// import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
// import { Dialog } from "@headlessui/react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useTypewriter, Cursor } from "react-simple-typewriter";
// import { jwtDecode } from "jwt-decode";

// gsap.registerPlugin(ScrollTrigger);

// const getUserNameFromToken = () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return "User";
//     const decoded = jwtDecode(token);
//     return decoded.firstName || "User";
//   } catch {
//     return "User";
//   }
// };

// const AnimatedHello = () => {
//   const [userName] = useState(getUserNameFromToken());
//   const emojiRef = useRef(null);
//   const waveTweenRef = useRef(null);
//   const wordRefs = useRef([]);
//   const timeoutRef = useRef(null);
//   const currentIndexRef = useRef(0);
//   const hasStoppedRef = useRef(false);
//   const [showTypewriter, setShowTypewriter] = useState(false);

//   const translations = [
//     `Hello ${userName}`,
//     `नमस्ते ${userName}`,
//     `नमस्कार ${userName}`,
//     `હેલો ${userName}`,
//     `ਸਤ ਸ੍ਰੀ ਅਕਾਲ ${userName}`,
//     `प्रणाम ${userName}`,
//     `হ্যালো ${userName}`,
//     `வணக்கம் ${userName}`,
//     `ہیلو ${userName}`,
//   ];

//   const [typeText] = useTypewriter({
//     words: [
//       "We offer Translation, Transcription, Voice-over, Data Collection, Content Management, and Field Research services. Whether you're a linguist, voice artist, or researcher, there's a place for your skills. Fill out the form and become a part of 'Yours-Pragati' to collaborate in shaping the future of inclusive AI."
//     ],
//     loop: 1,
//     typeSpeed: 30,
//     deleteSpeed: 0,
//     delaySpeed: 1000,
//   });

//   useEffect(() => {
//     waveTweenRef.current = gsap.to(emojiRef.current, {
//       rotate: 20,
//       transformOrigin: '70% 70%',
//       duration: 0.15,
//       yoyo: true,
//       repeat: 5,
//       ease: 'power1.inOut',
//       paused: true,
//     });

//     ScrollTrigger.create({
//       trigger: emojiRef.current,
//       start: 'top 80%',
//       onEnter: () => waveTweenRef.current.restart(),
//     });

//     ScrollTrigger.create({
//       trigger: emojiRef.current,
//       start: 'top center',
//       once: true,
//       onEnter: () => setShowTypewriter(true),
//     });
//   }, []);

//   const handleHover = () => waveTweenRef.current.restart();

//   const startGreetingAnimation = () => {
//     const animate = () => {
//       if (hasStoppedRef.current) return;
//       const current = wordRefs.current[currentIndexRef.current];
//       const nextIndex = (currentIndexRef.current + 1) % translations.length;
//       const next = wordRefs.current[nextIndex];

//       gsap.timeline()
//         .to(current, { opacity: 0, y: -50, duration: 0.6, ease: 'power2.in' })
//         .set(current, { y: 0 })
//         .set(next, { y: 50 })
//         .to(next, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });

//       currentIndexRef.current = nextIndex;
//       timeoutRef.current = setTimeout(animate, 2000);
//     };

//     timeoutRef.current = setTimeout(animate, 2000);
//   };

//   useLayoutEffect(() => {
//     wordRefs.current.forEach((el, i) => {
//       if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0, y: 0 });
//     });
//     currentIndexRef.current = 0;
//     hasStoppedRef.current = false;
//     startGreetingAnimation();
//     return () => clearTimeout(timeoutRef.current);
//   }, [translations.length]);

//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === 'hidden') {
//         hasStoppedRef.current = true;
//         clearTimeout(timeoutRef.current);
//       }
//     };
//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
//   }, []);

//   return (
//     <div className="w-full h-full px-4 py-10 flex flex-col justify-center items-start bg-white text-indigo-700 overflow-hidden">
//       <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
//       <div ref={emojiRef} onMouseEnter={handleHover} className="text-6xl cursor-pointer select-none">👋</div>
//       <div className="h-[60px] mt-6 relative w-full overflow-hidden">
//         {translations.map((text, index) => (
//           <h1
//             key={index}
//             ref={(el) => (wordRefs.current[index] = el)}
//             className="absolute left-1/2 -translate-x-1/2 w-full text-start text-6xl font-bold leading-[60px] opacity-0"
//           >
//             {text}
//           </h1>
//         ))}
//       </div>
//       {showTypewriter && (
//         <p className="mt-6 text-xl font-medium text-gray-700 max-w-2xl leading-relaxed">
//           <span>{typeText}</span><Cursor cursorStyle="|" />
//         </p>
//       )}
//     </div>
//   );
// };

// export default AnimatedHello;


// const GetInTouch = () => {
//   const [formData, setFormData] = useState({ name: "", lastName: "", email: "", mobile: "", role: "", message: "" });
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handleBlur = (e) => {
//     const { name } = e.target;
//     setTouched((prev) => ({ ...prev, [name]: true }));
//     if (!formData[name] && name !== "mobile") {
//       setErrors((prev) => ({ ...prev, [name]: "This field is required*" }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = {};
//     Object.entries(formData).forEach(([key, value]) => {
//       if (!value && key !== "mobile") newErrors[key] = "This field is required*";
//     });
//     setErrors(newErrors);
//     setTouched({ name: true, lastName: true, email: true, mobile: true, role: true, message: true });

//     if (Object.keys(newErrors).length === 0) {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch("http://localhost:3000/api/contact", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token && { Authorization: `Bearer ${token}` }),
//           },
//           body: JSON.stringify(formData),
//         });

//         const data = await response.json();
//         if (response.ok) {
//           setIsDialogOpen(true);
//           setFormData({ name: "", lastName: "", email: "", mobile: "", role: "", message: "" });
//           setTouched({});
//         } else {
//           alert(data.message || "Something went wrong!");
//         }
//       } catch (error) {
//         console.error("Error submitting form:", error);
//         alert("Failed to submit form. Please try again.");
//       }
//     }
//   };

//   return (
//     <section className="min-h-screen flex flex-col sm:flex-row bg-gray-100" id="contact">
//       <div className="hidden sm:flex sm:w-2/5 items-center justify-center bg-white">
//         <AnimatedHello />
//       </div>

//       <div className="w-full sm:w-3/5 px-6 sm:px-12 py-12 flex items-center justify-center">
//         <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white rounded-sm shadow-xl p-8 relative">
//           <h2 className="text-2xl font-bold text-center text-indigo-700 mb-10">Get in Touch</h2>

//           {["name", "lastName", "email", "mobile"].map((field) => (
//             <div className="mb-4" key={field}>
//               <label className="block text-sm font-medium text-indigo-700 mb-1">
//                 {field === "mobile" ? "Mobile Number (optional)" : field.charAt(0).toUpperCase() + field.slice(1)}
//               </label>
//               <input
//                 type={field === "email" ? "email" : "text"}
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 placeholder={`Your ${field}`}
//                 className={`w-full p-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors[field] ? "border-red-500" : "border-gray-300"}`}
//               />
//               {errors[field] && touched[field] && (
//                 <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
//               )}
//             </div>
//           ))}

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-indigo-700 mb-2">I want to collaborate as</label>
//             <div className="space-y-2 text-gray-800">
//               {["Translator", "Transcriptionist", "Voice-over Artist", "Others"].map((roleOption) => (
//                 <label key={roleOption} className="flex items-center">
//                   <input
//                     type="radio"
//                     name="role"
//                     value={roleOption}
//                     checked={formData.role === roleOption}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className="mr-2 accent-indigo-600"
//                   />
//                   {roleOption}
//                 </label>
//               ))}
//               {errors.role && touched.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
//             </div>
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium text-indigo-700 mb-1">Message</label>
//             <textarea
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               placeholder="Enter your message"
//               rows="4"
//               className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.message ? "border-red-500" : "border-gray-300"}`}
//             ></textarea>
//             {errors.message && touched.message && (
//               <p className="text-red-500 text-sm mt-1">{errors.message}</p>
//             )}
//           </div>

//           <div className="text-center">
//             <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-8 rounded-full transition duration-300">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>

//       <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="fixed inset-0 flex items-center justify-center z-50">
//         <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//         <div className="bg-white rounded-xl shadow-xl p-6 z-50 max-w-md mx-auto">
//           <h3 className="text-xl font-bold text-center text-indigo-700 mb-2">Thank you for showing an interest</h3>
//           <p className="text-center text-gray-700">We will contact you in the next 48 hours.</p>
//           <div className="text-center mt-4">
//             <button onClick={() => setIsDialogOpen(false)} className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700">
//               Close
//             </button>
//           </div>
//         </div>
//       </Dialog>
//     </section>
//   );
// };

// export default GetInTouch;


// import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
// import { Dialog } from "@headlessui/react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useTypewriter, Cursor } from "react-simple-typewriter";
// import { jwtDecode } from "jwt-decode";

// gsap.registerPlugin(ScrollTrigger);

// const getUserNameFromToken = () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return "User";
//     const decoded = jwtDecode(token);
//     return decoded.firstName || "User";
//   } catch {
//     return "User";
//   }
// };

// const AnimatedHello = () => {
//   const [userName] = useState(getUserNameFromToken());
//   const emojiRef = useRef(null);
//   const waveTweenRef = useRef(null);
//   const wordRefs = useRef([]);
//   const timeoutRef = useRef(null);
//   const currentIndexRef = useRef(0);
//   const hasStoppedRef = useRef(false);
//   const [showTypewriter, setShowTypewriter] = useState(false);

//   const translations = [
//     `Hello ${userName}`,
//     `नमस्ते ${userName}`,
//     `नमस्कार ${userName}`,
//     `હેલો ${userName}`,
//     `ਸਤ ਸ੍ਰੀ ਅਕਾਲ ${userName}`,
//     `प्रणाम ${userName}`,
//     `হ্যালো ${userName}`,
//     `வணக்கம் ${userName}`,
//     `ہیلو ${userName}`,
//   ];

//   const [typeText] = useTypewriter({
//     words: [
//       "We offer Translation, Transcription, Voice-over, Data Collection, Content Management, and Field Research services. Whether you're a linguist, voice artist, or researcher, there's a place for your skills. Fill out the form and become a part of 'Yours-Pragati' to collaborate in shaping the future of inclusive AI."
//     ],
//     loop: 1,
//     typeSpeed: 30,
//     deleteSpeed: 0,
//     delaySpeed: 1000,
//   });

//   useEffect(() => {
//     waveTweenRef.current = gsap.to(emojiRef.current, {
//       rotate: 20,
//       transformOrigin: '70% 70%',
//       duration: 0.15,
//       yoyo: true,
//       repeat: 5,
//       ease: 'power1.inOut',
//       paused: true,
//     });

//     ScrollTrigger.create({
//       trigger: emojiRef.current,
//       start: 'top 80%',
//       onEnter: () => waveTweenRef.current.restart(),
//     });

//     ScrollTrigger.create({
//       trigger: emojiRef.current,
//       start: 'top center',
//       once: true,
//       onEnter: () => setShowTypewriter(true),
//     });
//   }, []);

//   const handleHover = () => waveTweenRef.current.restart();

//   const startGreetingAnimation = () => {
//     const animate = () => {
//       if (hasStoppedRef.current) return;
//       const current = wordRefs.current[currentIndexRef.current];
//       const nextIndex = (currentIndexRef.current + 1) % translations.length;
//       const next = wordRefs.current[nextIndex];

//       gsap.timeline()
//         .to(current, { opacity: 0, y: -50, duration: 0.6, ease: 'power2.in' })
//         .set(current, { y: 0 })
//         .set(next, { y: 50 })
//         .to(next, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });

//       currentIndexRef.current = nextIndex;
//       timeoutRef.current = setTimeout(animate, 2000);
//     };

//     timeoutRef.current = setTimeout(animate, 2000);
//   };

//   useLayoutEffect(() => {
//     wordRefs.current.forEach((el, i) => {
//       if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0, y: 0 });
//     });
//     currentIndexRef.current = 0;
//     hasStoppedRef.current = false;
//     startGreetingAnimation();
//     return () => clearTimeout(timeoutRef.current);
//   }, [translations.length]);

//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === 'hidden') {
//         hasStoppedRef.current = true;
//         clearTimeout(timeoutRef.current);
//       }
//     };
//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
//   }, []);

//   return (
//     <div className="w-full h-full px-4 py-10 flex flex-col justify-center items-start bg-white text-indigo-700 overflow-hidden">
//       <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
//       <div ref={emojiRef} onMouseEnter={handleHover} className="text-6xl cursor-pointer select-none">👋</div>
//       <div className="h-[60px] mt-6 relative w-full overflow-hidden">
//         {translations.map((text, index) => (
//           <h1
//             key={index}
//             ref={(el) => (wordRefs.current[index] = el)}
//             className="absolute left-1/2 -translate-x-1/2 w-full text-start text-6xl font-bold leading-[60px] opacity-0"
//           >
//             {text}
//           </h1>
//         ))}
//       </div>
//       {showTypewriter && (
//         <p className="mt-6 text-xl font-medium text-gray-700 max-w-2xl leading-relaxed">
//           <span>{typeText}</span><Cursor cursorStyle="|" />
//         </p>
//       )}
//     </div>
//   );
// };

// export default AnimatedHello;

// import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
// import { Dialog } from "@headlessui/react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useTypewriter, Cursor } from "react-simple-typewriter";
// import { jwtDecode } from "jwt-decode";

// gsap.registerPlugin(ScrollTrigger);

// const getUserNameFromToken = () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return "User";
//     const decoded = jwtDecode(token);
//     return decoded.firstName || "User";
//   } catch {
//     return "User";
//   }
// };

// const AnimatedHello = () => {
//   const [userName] = useState(getUserNameFromToken());
//   const emojiRef = useRef(null);
//   const wordRefs = useRef([]);
//   const timeoutRef = useRef(null);
//   const currentIndexRef = useRef(0);
//   const hasStoppedRef = useRef(false);
//   const [startTyping, setStartTyping] = useState(false);

//   const translations = [
//     `Hello ${userName}`,
//     `नमस्ते ${userName}`,
//     `नमस्कार ${userName}`,
//     `હેલો ${userName}`,
//     `ਸਤ ਸ੍ਰੀ ਅਕਾਲ ${userName}`,
//     `प्रणाम ${userName}`,
//     `হ্যালো ${userName}`,
//     `வணக்கம் ${userName}`,
//     `ہیلو ${userName}`,
//   ];

//   const [typeText] = useTypewriter({
//     words: [
//       "We provide high-quality translation, transcription, content management, voice-over, and on-field data collection services. Fill out the form and become a part of our mission to bridge linguistic gaps and amplify voices through technology."
//     ],
//     loop: false,
//     typeSpeed: 35,
//     deleteSpeed: 20,
//     delaySpeed: 1000,
//   });

//   useEffect(() => {
//     gsap.to(emojiRef.current, {
//       rotate: 20,
//       transformOrigin: "70% 70%",
//       duration: 0.15,
//       yoyo: true,
//       repeat: 5,
//       ease: "power1.inOut",
//       paused: true,
//     });

//     ScrollTrigger.create({
//       trigger: emojiRef.current,
//       start: "top 80%",
//       onEnter: () => {
//         gsap.to(emojiRef.current, { rotate: 20 }).restart();
//         setStartTyping(true);
//       },
//     });
//   }, []);

//   useLayoutEffect(() => {
//     wordRefs.current.forEach((el, i) => {
//       if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0, y: 0 });
//     });

//     const animate = () => {
//       if (hasStoppedRef.current) return;
//       const current = wordRefs.current[currentIndexRef.current];
//       const nextIndex = (currentIndexRef.current + 1) % translations.length;
//       const next = wordRefs.current[nextIndex];

//       gsap.timeline()
//         .to(current, { opacity: 0, y: -50, duration: 0.6, ease: "power2.in" })
//         .set(current, { y: 0 })
//         .set(next, { y: 50 })
//         .to(next, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });

//       currentIndexRef.current = nextIndex;
//       timeoutRef.current = setTimeout(animate, 2000);
//     };

//     animate();

//     return () => clearTimeout(timeoutRef.current);
//   }, []);

//   useEffect(() => {
//     document.addEventListener("visibilitychange", () => {
//       if (document.visibilityState === "hidden") {
//         hasStoppedRef.current = true;
//         clearTimeout(timeoutRef.current);
//       }
//     });
//   }, []);

//   return (
//     <div className="w-full h-full px-4 py-10 flex flex-col justify-center items-start bg-white text-indigo-700 overflow-hidden">
//       <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
//       <div ref={emojiRef} className="text-6xl cursor-pointer select-none">👋</div>
//       <div className="h-[60px] mt-6 relative w-full overflow-hidden">
//         {translations.map((text, index) => (
//           <h1
//             key={index}
//             ref={(el) => (wordRefs.current[index] = el)}
//             className="absolute left-1/2 -translate-x-1/2 w-full text-start text-5xl font-bold leading-[60px] opacity-0"
//           >
//             {text}
//           </h1>
//         ))}
//       </div>
//       {startTyping && (
//         <p className="mt-6 text-md md:text-xl font-medium text-gray-700 max-w-xl leading-relaxed">
//           {typeText}
//           <Cursor cursorStyle="|" />
//         </p>
//       )}
//     </div>
//   );
// };

// const GetInTouch = () => {
//   const [formData, setFormData] = useState({ name: "", lastName: "", email: "", mobile: "", role: "", message: "" });
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handleBlur = (e) => {
//     const { name } = e.target;
//     setTouched((prev) => ({ ...prev, [name]: true }));
//     if (!formData[name] && name !== "mobile") {
//       setErrors((prev) => ({ ...prev, [name]: "This field is required*" }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = {};
//     Object.entries(formData).forEach(([key, value]) => {
//       if (!value && key !== "mobile") newErrors[key] = "This field is required*";
//     });
//     setErrors(newErrors);
//     setTouched({ name: true, lastName: true, email: true, mobile: true, role: true, message: true });

//     if (Object.keys(newErrors).length === 0) {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch("http://localhost:3000/api/contact", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token && { Authorization: `Bearer ${token}` }),
//           },
//           body: JSON.stringify(formData),
//         });

//         const data = await response.json();
//         if (response.ok) {
//           setIsDialogOpen(true);
//           setFormData({ name: "", lastName: "", email: "", mobile: "", role: "", message: "" });
//           setTouched({});
//         } else {
//           alert(data.message || "Something went wrong!");
//         }
//       } catch (error) {
//         alert("Failed to submit form. Please try again. : " + error.message );
//       }
//     }
//   };

//   return (
//     <section className="min-h-screen flex flex-col sm:flex-row bg-gray-100" id="contact">
//       <div className="hidden sm:flex sm:w-2/5 items-center justify-center bg-white">
//         <AnimatedHello />
//       </div>

//       <div className="w-full sm:w-3/5 px-6 sm:px-12 py-12 flex items-center justify-center">
//         <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white rounded-sm shadow-xl p-8 relative">
//           <h2 className="text-2xl font-bold text-center text-indigo-700 mb-10">Get in Touch</h2>

//           {["name", "lastName", "email", "mobile"].map((field) => (
//             <div className="mb-4" key={field}>
//               <label className="block text-sm font-medium text-indigo-700 mb-1">
//                 {field === "mobile" ? "Mobile Number (optional)" : field.charAt(0).toUpperCase() + field.slice(1)}
//               </label>
//               <input
//                 type={field === "email" ? "email" : "text"}
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 placeholder={`Your ${field}`}
//                 className={`w-full p-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors[field] ? "border-red-500" : "border-gray-300"}`}
//               />
//               {errors[field] && touched[field] && (
//                 <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
//               )}
//             </div>
//           ))}

//           <div className="mb-4">
//             <label className="block text-sm font-medium text-indigo-700 mb-2">I want to collaborate as</label>
//             <div className="space-y-2 text-gray-800">
//               {["Translator", "Transcriptionist", "Voice-over Artist", "Others"].map((roleOption) => (
//                 <label key={roleOption} className="flex items-center">
//                   <input
//                     type="radio"
//                     name="role"
//                     value={roleOption}
//                     checked={formData.role === roleOption}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className="mr-2 accent-indigo-600"
//                   />
//                   {roleOption}
//                 </label>
//               ))}
//               {errors.role && touched.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
//             </div>
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm font-medium text-indigo-700 mb-1">Message</label>
//             <textarea
//               name="message"
//               value={formData.message}
//               onChange={handleChange}
//               onBlur={handleBlur}
//               placeholder="Enter your message"
//               rows="4"
//               className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${errors.message ? "border-red-500" : "border-gray-300"}`}
//             ></textarea>
//             {errors.message && touched.message && (
//               <p className="text-red-500 text-sm mt-1">{errors.message}</p>
//             )}
//           </div>

//           <div className="text-center">
//             <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-8 rounded-full transition duration-300">
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>

//       <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="fixed inset-0 flex items-center justify-center z-50">
//         <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//         <div className="bg-white rounded-xl shadow-xl p-6 z-50 max-w-md mx-auto">
//           <h3 className="text-xl font-bold text-center text-indigo-700 mb-2">Thank you for showing an interest</h3>
//           <p className="text-center text-gray-700">We will contact you in the next 48 hours.</p>
//           <div className="text-center mt-4">
//             <button onClick={() => setIsDialogOpen(false)} className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700">
//               Close
//             </button>
//           </div>
//         </div>
//       </Dialog>
//     </section>
//   );
// };

// export default GetInTouch;

// import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
// import { Dialog } from "@headlessui/react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useTypewriter, Cursor } from "react-simple-typewriter";
// import { jwtDecode } from "jwt-decode";
// import { FaLanguage, FaMicrophone, FaVolumeUp, FaUsers } from "react-icons/fa";

// gsap.registerPlugin(ScrollTrigger);

// const getUserNameFromToken = () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return "User";
//     const decoded = jwtDecode(token);
//     return decoded.firstName || "User";
//   } catch {
//     return "User";
//   }
// };

// const AnimatedHello = () => {
//   const [userName] = useState(getUserNameFromToken());
//   const emojiRef = useRef(null);
//   const waveTweenRef = useRef(null);
//   const wordRefs = useRef([]);
//   const timeoutRef = useRef(null);
//   const currentIndexRef = useRef(0);
//   const hasStoppedRef = useRef(false);
//   const circlesRef = useRef([]);
//   const [typeText] = useTypewriter({
//     words: [
//       "Contact us and begin your journey into a world of infinite AI possibilities.",
//     ],
//     loop: 1,
//     delaySpeed: 3000,
//     typeSpeed: 40,
//     deleteSpeed: 20,
//   });

//   const translations = [
//     `Hello ${userName}`,
//     `नमस्ते ${userName}`,
//     `नमस्कार ${userName}`,
//     `હેલો ${userName}`,
//     `ਸਤ ਸ੍ਰੀ ਅਕਾਲ ${userName}`,
//     `प्रणाम ${userName}`,
//     `হ্যালো ${userName}`,
//     `வணக்கம் ${userName}`,
//     `ہیلو ${userName}`,
//   ];

//   useEffect(() => {
//     waveTweenRef.current = gsap.to(emojiRef.current, {
//       rotate: 20,
//       transformOrigin: "70% 70%",
//       duration: 0.15,
//       yoyo: true,
//       repeat: 5,
//       ease: "power1.inOut",
//       paused: true,
//     });

//     ScrollTrigger.create({
//       trigger: emojiRef.current,
//       start: "top 80%",
//       onEnter: () => waveTweenRef.current.restart(),
//     });
//   }, []);

//   const handleHover = () => waveTweenRef.current.restart();

//   const startGreetingAnimation = () => {
//     const animate = () => {
//       if (hasStoppedRef.current) return;
//       const current = wordRefs.current[currentIndexRef.current];
//       const nextIndex = (currentIndexRef.current + 1) % translations.length;
//       const next = wordRefs.current[nextIndex];

//       gsap.timeline()
//         .to(current, { opacity: 0, y: -50, duration: 0.6, ease: "power2.in" })
//         .set(current, { y: 0 })
//         .set(next, { y: 50 })
//         .to(next, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });

//       currentIndexRef.current = nextIndex;
//       timeoutRef.current = setTimeout(animate, 2000);
//     };
//     timeoutRef.current = setTimeout(animate, 2000);
//   };

//   useLayoutEffect(() => {
//     wordRefs.current.forEach((el, i) => {
//       if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0, y: 0 });
//     });
//     currentIndexRef.current = 0;
//     hasStoppedRef.current = false;
//     startGreetingAnimation();
//     return () => clearTimeout(timeoutRef.current);
//   }, [translations.length]);

//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === "hidden") {
//         hasStoppedRef.current = true;
//         clearTimeout(timeoutRef.current);
//       }
//     };
//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
//   }, []);

//   useEffect(() => {
//     ScrollTrigger.create({
//       trigger: ".typewriter-paragraph",
//       start: "top 80%",
//       onEnter: () => {
//         gsap.to(circlesRef.current, {
//           opacity: 1,
//           y: 0,
//           duration: 0.6,
//           stagger: 0.3,
//           ease: "power2.out",
//         });
//       },
//     });
//   }, []);

//   const features = [
//     { icon: <FaLanguage className="text-3xl text-gray-900" />, label: "Translation" },
//     { icon: <FaMicrophone className="text-3xl text-gray-900" />, label: "Transcription" },
//     { icon: <FaVolumeUp className="text-3xl text-gray-900" />, label: "Voice-over" },
//     { icon: <FaUsers className="text-3xl text-gray-900" />, label: "Others" },
//   ];

//   return (
//     <div className="w-full h-full px-6 py-10 flex flex-col justify-center items-center bg-gray-200 text-indigo-700 overflow-hidden">
//       <div ref={emojiRef} onMouseEnter={handleHover} className="text-6xl cursor-pointer select-none">👋</div>
//       <div className="h-[60px] mt-6 relative w-full overflow-hidden">
//         {translations.map((text, index) => (
//           <h1
//             key={index}
//             ref={(el) => (wordRefs.current[index] = el)}
//             className="absolute left-1/2 -translate-x-1/2 w-full text-center text-5xl font-bold leading-[60px] opacity-0"
//           >
//             {text}
//           </h1>
//         ))}
//       </div>
//       <p className="typewriter-paragraph mt-6 text-xl text-gray-800 max-w-2xl leading-relaxed text-center">
//         <span>{typeText}</span><Cursor cursorStyle="|" />
//       </p>
//       <div className="flex gap-6 mt-12 flex-wrap justify-center">
//         {features.map((f, i) => (
//           <div
//             key={i}
//             ref={(el) => (circlesRef.current[i] = el)}
//             className="opacity-0 translate-y-10 flex flex-col items-center justify-center bg-gray-300 rounded-full w-28 h-28 shadow-md"
//           >
//             <div className="bg-gray-100 p-4 rounded-full shadow-inner">{f.icon}</div>
//             <span className="text-sm font-medium text-center mt-2 text-gray-800">{f.label}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const GetInTouch = () => {
//   return (
//     <section id="contact" className="min-h-screen w-full bg-gray-100 py-8">
//       <h2 className="text-3xl sm:text-4xl font-bold text-center text-indigo-700 mb-10">Contact Us</h2>
//       <div className="flex flex-col sm:flex-row w-full">
//         <div className="sm:w-2/5 bg-gray-200 flex items-center justify-center">
//           <AnimatedHello />
//         </div>
//         <div className="w-full sm:w-3/5 flex justify-center px-6 sm:px-12">
//           {/* Contact form logic here */}
//           <div className="text-gray-600 max-w-xl py-12">
//             <p className="text-lg leading-relaxed">
//               Whether you're interested in translation, transcription, voice-over work,
//               content management, or field research — Yours-Pragati welcomes skilled and passionate individuals like you! Our platform provides exciting opportunities to collaborate on impactful projects. Share your interest by filling out the contact form and be a part of a transformative journey with us. Let's bring ideas to life and make a difference together!
//             </p>
//             {/* Replace this block with your actual form code */}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GetInTouch;


// import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
// import { Dialog } from "@headlessui/react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useTypewriter, Cursor } from "react-simple-typewriter";
// import { jwtDecode } from "jwt-decode";
// import { FaLanguage, FaFileAudio, FaMicrophoneAlt, FaUserPlus } from "react-icons/fa";

// gsap.registerPlugin(ScrollTrigger);

// const getUserNameFromToken = () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return "User";
//     const decoded = jwtDecode(token);
//     return decoded.firstName || "User";
//   } catch {
//     return "User";
//   }
// };

// const AnimatedHello = () => {
//   const [userName] = useState(getUserNameFromToken());
//   const emojiRef = useRef(null);
//   const waveTweenRef = useRef(null);
//   const wordRefs = useRef([]);
//   const timeoutRef = useRef(null);
//   const currentIndexRef = useRef(0);
//   const hasStoppedRef = useRef(false);
//   const iconsRef = useRef([]);

//   const [text, count] = useTypewriter({
//     words: [
//       "Whether you're interested in translation, transcription, voice-over work, content management, or field research — Yours-Pragati welcomes skilled and passionate individuals like you! Our platform provides exciting opportunities to collaborate on impactful projects. Share your interest by filling out the contact form and be a part of a transformative journey with us. Let's bring ideas to life and make a difference together!"
//     ],
//     loop: 0,
//     typeSpeed: 20,
//     deleteSpeed: 0,
//   });

//   useEffect(() => {
//     waveTweenRef.current = gsap.to(emojiRef.current, {
//       rotate: 20,
//       transformOrigin: "70% 70%",
//       duration: 0.15,
//       yoyo: true,
//       repeat: 5,
//       ease: "power1.inOut",
//       paused: true,
//     });

//     ScrollTrigger.create({
//       trigger: emojiRef.current,
//       start: "top 80%",
//       onEnter: () => waveTweenRef.current.restart(),
//     });
//   }, []);

//   const handleHover = () => waveTweenRef.current.restart();

//   const translations = [
//     `Hello ${userName}`,
//     `नमस्ते ${userName}`,
//     `नमस्कार ${userName}`,
//     `હેલો ${userName}`,
//     `ਸਤ ਸ੍ਰੀ ਅਕਾਲ ${userName}`,
//     `प्रणाम ${userName}`,
//     `হ্যালো ${userName}`,
//     `வணக்கம் ${userName}`,
//     `ہیلو ${userName}`,
//   ];

//   const startGreetingAnimation = () => {
//     const animate = () => {
//       if (hasStoppedRef.current) return;
//       const current = wordRefs.current[currentIndexRef.current];
//       const nextIndex = (currentIndexRef.current + 1) % translations.length;
//       const next = wordRefs.current[nextIndex];

//       gsap.timeline()
//         .to(current, { opacity: 0, y: -50, duration: 0.6, ease: "power2.in" })
//         .set(current, { y: 0 })
//         .set(next, { y: 50 })
//         .to(next, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });

//       currentIndexRef.current = nextIndex;
//       timeoutRef.current = setTimeout(animate, 2000);
//     };
//     timeoutRef.current = setTimeout(animate, 2000);
//   };

//   useLayoutEffect(() => {
//     wordRefs.current.forEach((el, i) => {
//       if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0, y: 0 });
//     });
//     currentIndexRef.current = 0;
//     hasStoppedRef.current = false;
//     startGreetingAnimation();
//     return () => clearTimeout(timeoutRef.current);
//   }, [translations.length]);

//   useEffect(() => {
//     if (text.endsWith("together!")) {
//       gsap.to(iconsRef.current, {
//         opacity: 1,
//         y: 0,
//         stagger: 0.3,
//         duration: 0.6,
//         ease: "power3.out"
//       });
//     }
//   }, [text]);

//   const services = [
//     { icon: <FaLanguage size={30} />, label: "Translation" },
//     { icon: <FaFileAudio size={30} />, label: "Transcription" },
//     { icon: <FaMicrophoneAlt size={30} />, label: "Voice-over" },
//     { icon: <FaUserPlus size={30} />, label: "Others" },
//   ];

//   return (
//     <div className="w-full h-full px-4 py-10 flex flex-col justify-center items-start bg-gray-200 text-indigo-700 overflow-hidden">
//       <div ref={emojiRef} onMouseEnter={handleHover} className="text-6xl cursor-pointer select-none">👋</div>
//       <div className="h-[60px] mt-6 relative w-full overflow-hidden">
//         {translations.map((text, index) => (
//           <h1
//             key={index}
//             ref={(el) => (wordRefs.current[index] = el)}
//             className="absolute left-1/2 -translate-x-1/2 w-full text-start text-6xl font-bold leading-[60px] opacity-0"
//           >
//             {text}
//           </h1>
//         ))}
//       </div>

//       <p className="mt-6 text-xl font-medium text-gray-700 max-w-xl leading-relaxed min-h-[160px]">
//         {text}
//         <Cursor cursorStyle="|" />
//       </p>

//       <div className="mt-10 grid grid-cols-4 gap-6">
//         {services.map((service, idx) => (
//           <div
//             key={idx}
//             ref={(el) => (iconsRef.current[idx] = el)}
//             className="opacity-0 translate-y-8 flex flex-col items-center bg-white shadow-lg p-4 rounded-full w-20 h-20 justify-center text-indigo-700"
//           >
//             {service.icon}
//             {/* <p className="mt-2 text-sm font-semibold text-center">{service.label}</p> */}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const GetInTouch = () => {
//   return (
//     <section className="min-h-screen flex flex-col bg-gray-50 px-6 py-10" id="contact">
//       <h1 className="text-4xl font-bold text-center text-indigo-700 mb-10">Contact Us</h1>

//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Left - Animated Hello */}
//         <div className="w-full lg:w-1/2">
//           <AnimatedHello />
//         </div>

//         {/* Right - Form */}
//         <div className="w-full lg:w-1/2 bg-white shadow-lg rounded-xl p-8">
//           <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">Get in Touch</h2>
//           <form>
//             <input type="text" placeholder="First Name" className="w-full mb-4 p-2 border rounded" />
//             <input type="text" placeholder="Last Name" className="w-full mb-4 p-2 border rounded" />
//             <input type="email" placeholder="Email" className="w-full mb-4 p-2 border rounded" />
//             <input type="text" placeholder="Mobile (optional)" className="w-full mb-4 p-2 border rounded" />
//             <textarea placeholder="Message" rows="4" className="w-full mb-4 p-2 border rounded"></textarea>
//             <button className="bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700 w-full">Submit</button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default GetInTouch;

// import React, { useState, useEffect, useRef } from "react";
// import { Dialog } from "@headlessui/react";
// import { jwtDecode } from "jwt-decode";
// import { useTypewriter, Cursor } from "react-simple-typewriter";
// import { FaLanguage, FaMicrophoneAlt, FaHeadphones, FaUserEdit } from "react-icons/fa";
// // import gsap from "gsap";

// const getUserNameFromToken = () => {
//   try {
//     const token = localStorage.getItem("token");
//     if (!token) return "User";
//     const decoded = jwtDecode(token);
//     return decoded.firstName || "User";
//   } catch {
//     return "User";
//   }
// };

// const AnimatedHello = ({ onTypingEnd }) => {
//   const [userName] = useState(getUserNameFromToken());
//   const emojiRef = useRef(null);
//   const wordRef = useRef(null);
//   const [showServices, setShowServices] = useState(false);

//   const [text, count] = useTypewriter({
//     words: [
//       "Whether you're interested in translation, transcription, voice-over work, content management, or field research — Yours-Pragati welcomes skilled and passionate individuals like you! Our platform provides exciting opportunities to collaborate on impactful projects. Share your interest by filling out the contact form and be a part of a transformative journey with us. Let's bring ideas to life and make a difference together!"
//     ],
//     typeSpeed: 25,
//     deleteSpeed: 0,
//     delaySpeed: 1000,
//     loop: false,
//     onLoopDone: () => {
//       setShowServices(true);
//       onTypingEnd();
//     }
//   });

//   return (
//     <div className="w-full h-full px-4 py-10 flex flex-col justify-start items-center bg-gray-200 text-indigo-700 overflow-hidden">
//       <div ref={emojiRef} className="text-6xl mb-4 select-none">👋</div>
//       <h1 ref={wordRef} className="text-4xl font-bold text-center mb-6">
//         Hello {userName}
//       </h1>
//       <p className="text-lg text-gray-800 text-center max-w-2xl leading-relaxed">
//         {text}<Cursor cursorStyle="|" />
//       </p>

//       {showServices && (
//         <div className="mt-10 grid grid-cols-2 md:flex gap-6 justify-center items-center">
//           <div className="flex flex-col items-center">
//             <div className="bg-indigo-100 text-indigo-700 rounded-full p-6 text-3xl">
//               <FaLanguage />
//             </div>
//             <p className="mt-2 font-medium">Translation</p>
//           </div>
//           <div className="flex flex-col items-center">
//             <div className="bg-indigo-100 text-indigo-700 rounded-full p-6 text-3xl">
//               <FaHeadphones />
//             </div>
//             <p className="mt-2 font-medium">Transcription</p>
//           </div>
//           <div className="flex flex-col items-center">
//             <div className="bg-indigo-100 text-indigo-700 rounded-full p-6 text-3xl">
//               <FaMicrophoneAlt />
//             </div>
//             <p className="mt-2 font-medium">Voice-over</p>
//           </div>
//           <div className="flex flex-col items-center">
//             <div className="bg-indigo-100 text-indigo-700 rounded-full p-6 text-3xl">
//               <FaUserEdit />
//             </div>
//             <p className="mt-2 font-medium">Others</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const ContactUsPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     lastName: "",
//     email: "",
//     mobile: "",
//     role: "",
//     message: ""
//   });
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handleBlur = (e) => {
//     const { name } = e.target;
//     setTouched((prev) => ({ ...prev, [name]: true }));
//     if (!formData[name] && name !== "mobile") {
//       setErrors((prev) => ({ ...prev, [name]: "This field is required*" }));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = {};
//     Object.entries(formData).forEach(([key, value]) => {
//       if (!value && key !== "mobile") newErrors[key] = "This field is required*";
//     });
//     setErrors(newErrors);
//     setTouched({ name: true, lastName: true, email: true, mobile: true, role: true, message: true });

//     if (Object.keys(newErrors).length === 0) {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch("http://localhost:3000/api/contact", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             ...(token && { Authorization: `Bearer ${token}` }),
//           },
//           body: JSON.stringify(formData),
//         });

//         const data = await response.json();
//         if (response.ok) {
//           setIsDialogOpen(true);
//           setFormData({ name: "", lastName: "", email: "", mobile: "", role: "", message: "" });
//           setTouched({});
//         } else {
//           alert(data.message || "Something went wrong!");
//         }
//       } catch (error) {
//         console.error("Error submitting form:", error);
//         alert("Failed to submit form. Please try again.");
//       }
//     }
//   };

//   return (
//     <section id="contact" className="min-h-screen flex flex-col items-center justify-start bg-gray-50 px-4 py-10">
//       <h2 className="text-4xl font-bold text-indigo-700 mb-12 text-center">Contact Us</h2>

//       <div className="w-full flex flex-col lg:flex-row gap-10">
//         <div className="w-full lg:w-1/2 bg-gray-200 rounded-lg shadow-md p-6">
//           <AnimatedHello onTypingEnd={() => {}} />
//         </div>

//         <div className="w-full lg:w-1/2 bg-white shadow-xl rounded-md p-8">
//           <h3 className="text-2xl font-bold text-center text-indigo-700 mb-6">Get in Touch</h3>

//           <form onSubmit={handleSubmit}>
//             {["name", "lastName", "email", "mobile"].map((field) => (
//               <div className="mb-4" key={field}>
//                 <label className="block text-sm font-medium text-indigo-700 mb-1">
//                   {field === "mobile" ? "Mobile Number (optional)" : field.charAt(0).toUpperCase() + field.slice(1)}
//                 </label>
//                 <input
//                   type={field === "email" ? "email" : "text"}
//                   name={field}
//                   value={formData[field]}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   placeholder={`Your ${field}`}
//                   className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                     errors[field] ? "border-red-500" : "border-gray-300"
//                   }`}
//                 />
//                 {errors[field] && touched[field] && (
//                   <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
//                 )}
//               </div>
//             ))}

//             <div className="mb-4">
//               <label className="block text-sm font-medium text-indigo-700 mb-2">I want to collaborate as</label>
//               <div className="space-y-2 text-gray-800">
//                 {["Translator", "Transcriptionist", "Voice-over Artist", "Others"].map((roleOption) => (
//                   <label key={roleOption} className="flex items-center">
//                     <input
//                       type="radio"
//                       name="role"
//                       value={roleOption}
//                       checked={formData.role === roleOption}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       className="mr-2 accent-indigo-600"
//                     />
//                     {roleOption}
//                   </label>
//                 ))}
//                 {errors.role && touched.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
//               </div>
//             </div>

//             <div className="mb-6">
//               <label className="block text-sm font-medium text-indigo-700 mb-1">Message</label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 placeholder="Enter your message"
//                 rows="4"
//                 className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
//                   errors.message ? "border-red-500" : "border-gray-300"
//                 }`}
//               ></textarea>
//               {errors.message && touched.message && (
//                 <p className="text-red-500 text-sm mt-1">{errors.message}</p>
//               )}
//             </div>

//             <div className="text-center">
//               <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-8 rounded-full transition duration-300">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>

//       <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="fixed inset-0 flex items-center justify-center z-50">
//         <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//         <div className="bg-white rounded-xl shadow-xl p-6 z-50 max-w-md mx-auto">
//           <h3 className="text-xl font-bold text-center text-indigo-700 mb-2">Thank you for showing an interest</h3>
//           <p className="text-center text-gray-700">We will contact you in the next 48 hours.</p>
//           <div className="text-center mt-4">
//             <button onClick={() => setIsDialogOpen(false)} className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700">
//               Close
//             </button>
//           </div>
//         </div>
//       </Dialog>
//     </section>
//   );
// };

// export default ContactUsPage;
