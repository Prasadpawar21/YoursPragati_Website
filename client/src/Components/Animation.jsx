import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { jwtDecode } from 'jwt-decode';

gsap.registerPlugin(ScrollTrigger);

// Get username from JWT
const getUserNameFromToken = () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return 'User';
    const decoded = jwtDecode(token);
    return decoded.firstName || 'User';
  } catch {
    return 'User';
  }
};

const AnimatedHello = () => {
  const [userName] = useState(getUserNameFromToken());

  const emojiRef = useRef(null);
  const waveTweenRef = useRef(null);
  const wordRefs = useRef([]);
  const timeoutRef = useRef(null);
  const currentIndexRef = useRef(0);
  const hasStoppedRef = useRef(false); // Will stop forever on tab switch

  // Translations (user name is untranslated)
  const translations = [
    `Hello ${userName}`,           // English
    `नमस्ते ${userName}`,          // Hindi
    `नमस्कार ${userName}`,         // Marathi
    `હેલો ${userName}`,            // Gujarati
    `ਸਤ ਸ੍ਰੀ ਅਕਾਲ ${userName}`,   // Punjabi
    `प्रणाम ${userName}`,          // Bhojpuri
    `হ্যালো ${userName}`,          // Bengali
    `வணக்கம் ${userName}`,         // Tamil
    `ہیلو ${userName}`,            // Urdu
  ];

  const [typeText] = useTypewriter({
    words: [
      // 'Contact us and begin your journey into a world of infinite AI possibilities.',
      // 'Get in touch and explore a future powered by artificial intelligence.',
      // 'Step into tomorrow with AI — let’s innovate together!',
      "Whether you're interested in translation, transcription, voice-over work, content management, or field research — Yours-Pragati welcomes skilled and passionate individuals like you! Our platform provides exciting opportunities to collaborate on impactful projects. Share your interest by filling out the contact form and be a part of a transformative journey with us. Let's bring ideas to life and make a difference together!"
    ],
    // loop: true,
    delaySpeed: 3000,
    typeSpeed: 40,
    deleteSpeed: 20,
  });

  // 👋 Emoji wave animation
  useEffect(() => {
    waveTweenRef.current = gsap.to(emojiRef.current, {
      rotate: 20,
      transformOrigin: '70% 70%',
      duration: 0.15,
      yoyo: true,
      repeat: 5,
      ease: 'power1.inOut',
      paused: true,
    });

    ScrollTrigger.create({
      trigger: emojiRef.current,
      start: 'top 80%',
      onEnter: () => waveTweenRef.current.restart(),
    });
  }, []);

  const handleHover = () => {
    waveTweenRef.current.restart();
  };

  // Start greeting animation loop
  const startGreetingAnimation = () => {
    const animate = () => {
      if (hasStoppedRef.current) return;

      const current = wordRefs.current[currentIndexRef.current];
      const nextIndex = (currentIndexRef.current + 1) % translations.length;
      const next = wordRefs.current[nextIndex];

      const tl = gsap.timeline();

      tl.to(current, {
        opacity: 0,
        y: -50,
        duration: 0.6,
        ease: 'power2.in',
      })
        .set(current, { y: 0 })
        .set(next, { y: 50 })
        .to(next, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        });

      currentIndexRef.current = nextIndex;

      // Continue animation if not stopped
      timeoutRef.current = setTimeout(() => {
        if (!hasStoppedRef.current) animate();
      }, 2000);
    };

    timeoutRef.current = setTimeout(animate, 2000);
  };

  // Init animation
  useLayoutEffect(() => {
    wordRefs.current.forEach((el, i) => {
      if (el) {
        gsap.set(el, {
          opacity: i === 0 ? 1 : 0,
          y: 0,
        });
      }
    });

    currentIndexRef.current = 0;
    hasStoppedRef.current = false;
    startGreetingAnimation();

    return () => clearTimeout(timeoutRef.current);
  }, [translations.length]);

  // STOP animation permanently when user switches tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        hasStoppedRef.current = true;
        clearTimeout(timeoutRef.current);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () =>
      document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  return (
    <div className="w-[50vw] min-h-screen px-15  flex flex-col justify-start items-start bg-color from-slate-900 to-slate-800 text-white relative overflow-hidden">

      {/* 👋 Emoji */}
      <div
        ref={emojiRef}
        onMouseEnter={handleHover}
        className="text-6xl cursor-pointer select-none"
      >
        👋
      </div>

      {/* Greetings */}
      <div className="h-[60px] mt-6 relative w-full overflow-hidden">
        {translations.map((text, index) => (
          <h1
            key={index}
            ref={(el) => (wordRefs.current[index] = el)}
            className="absolute left-1/2 -translate-x-1/2 w-full text-start text-5xl font-extrabold leading-[60px] opacity-0 text-orange-900 oxygen-bold"
          >
            {text}
          </h1>
        ))}
      </div>

      {/* Typewriter CTA */}
      <p className="mt-6 text-md md:text-xl font-medium text-gray-700 max-w-lg leading-relaxed oxygen-regular">
        <span>{typeText}</span>
        <Cursor cursorStyle="|" />
      </p>
    </div>
  );
};

export default AnimatedHello;



// import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useTypewriter, Cursor } from 'react-simple-typewriter';
// import { jwtDecode } from 'jwt-decode';
// import { FaGlobe, FaMicrophone, FaPenNib, FaToolbox } from 'react-icons/fa';

// gsap.registerPlugin(ScrollTrigger);

// const getUserNameFromToken = () => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) return 'User';
//     const decoded = jwtDecode(token);
//     return decoded.firstName || 'User';
//   } catch {
//     return 'User';
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

//   const iconRefs = useRef([]);
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

//   const fullParagraph = `Whether you're interested in translation, transcription, voice-over work, content management, or field research — Yours-Pragati welcomes skilled and passionate individuals like you! Our platform provides exciting opportunities to collaborate on impactful projects. Share your interest by filling out the contact form and be a part of a transformative journey with us. Let's bring ideas to life and make a difference together!`;

//   const [typeText] = useTypewriter({
//     words: [fullParagraph],
//     delaySpeed: 3000,
//     typeSpeed: 40,
//     deleteSpeed: 20,
//   });

//   const [showIcons, setShowIcons] = useState(false);

//   useEffect(() => {
//     if (typeText === fullParagraph) {
//       setShowIcons(true);
//     }
//   }, [typeText, fullParagraph]);

//   // Animate icons when visible
//   useEffect(() => {
//     if (showIcons) {
//       gsap.fromTo(
//         iconRefs.current,
//         {
//           opacity: 0,
//           y: 50,
//           scale: 0.5,
//         },
//         {
//           opacity: 1,
//           y: 0,
//           scale: 1,
//           duration: 0.6,
//           stagger: 0.1,
//           ease: 'power2.out',
//         }
//       );
//     }
//   }, [showIcons]);

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

//   const handleHover = () => {
//     waveTweenRef.current.restart();
//   };

//   const startGreetingAnimation = () => {
//     const animate = () => {
//       if (hasStoppedRef.current) return;

//       const current = wordRefs.current[currentIndexRef.current];
//       const nextIndex = (currentIndexRef.current + 1) % translations.length;
//       const next = wordRefs.current[nextIndex];

//       const tl = gsap.timeline();
//       tl.to(current, {
//         opacity: 0,
//         y: -50,
//         duration: 0.6,
//         ease: 'power2.in',
//       })
//         .set(current, { y: 0 })
//         .set(next, { y: 50 })
//         .to(next, {
//           opacity: 1,
//           y: 0,
//           duration: 0.6,
//           ease: 'power2.out',
//         });

//       currentIndexRef.current = nextIndex;

//       timeoutRef.current = setTimeout(() => {
//         if (!hasStoppedRef.current) animate();
//       }, 2000);
//     };

//     timeoutRef.current = setTimeout(animate, 2000);
//   };

//   useLayoutEffect(() => {
//     wordRefs.current.forEach((el, i) => {
//       if (el) {
//         gsap.set(el, {
//           opacity: i === 0 ? 1 : 0,
//           y: 0,
//         });
//       }
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
//     return () =>
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//   }, []);

//   return (
//     <div className="w-[50vw] min-h-screen px-10 py-10 flex flex-col justify-start items-start bg-gray-100 text-white relative overflow-hidden">
//       {/* 👋 Emoji */}
//       <div
//         ref={emojiRef}
//         onMouseEnter={handleHover}
//         className="text-6xl cursor-pointer select-none"
//       >
//         👋
//       </div>

//       {/* Greetings */}
//       <div className="h-[60px] mt-6 relative w-full overflow-hidden">
//         {translations.map((text, index) => (
//           <h1
//             key={index}
//             ref={(el) => (wordRefs.current[index] = el)}
//             className="absolute left-1/2 -translate-x-1/2 w-full text-start text-5xl font-extrabold leading-[60px] opacity-0 text-indigo-700"
//           >
//             {text}
//           </h1>
//         ))}
//       </div>

//       {/* Typewriter CTA */}
//       <p className="mt-6 text-md md:text-xl font-medium text-gray-700 max-w-lg leading-relaxed">
//         <span>{typeText}</span>
//         <Cursor cursorStyle="|" />
//       </p>

//       {/* Animated Icons */}
//       {showIcons && (
//         <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2 w-full place-items-start">
//           {[
//             <FaGlobe />,
//             <FaPenNib />,
//             <FaMicrophone />,
//             <FaToolbox />,
//           ].map((Icon, idx) => (
//             <div
//               key={idx}
//               ref={(el) => (iconRefs.current[idx] = el)}
//               className="w-15 h-15 rounded-full border-2 border-blue-500 bg-blue-200/20 text-blue-600 flex items-center justify-center text-2xl shadow-md"
//             >
//               {Icon}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // export default AnimatedHello;


// import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useTypewriter, Cursor } from 'react-simple-typewriter';
// import { jwtDecode } from 'jwt-decode';
// import { MdOutlineTranslate, MdKeyboardVoice } from 'react-icons/md';
// import { RiVoiceprintLine } from 'react-icons/ri';
// import { FaToolbox } from 'react-icons/fa';

// gsap.registerPlugin(ScrollTrigger);

// const getUserNameFromToken = () => {
//   try {
//     const token = localStorage.getItem('token');
//     if (!token) return 'User';
//     const decoded = jwtDecode(token);
//     return decoded.firstName || 'User';
//   } catch {
//     return 'User';
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

//   const iconRefs = useRef([]);

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

//   const fullParagraph = `Whether you're interested in translation, transcription, voice-over work, content management, or field research — Yours-Pragati welcomes skilled and passionate individuals like you! Our platform provides exciting opportunities to collaborate on impactful projects. Share your interest by filling out the contact form and be a part of a transformative journey with us. Let's bring ideas to life and make a difference together!`;

//   const [typeText] = useTypewriter({
//     words: [fullParagraph],
//     delaySpeed: 3000,
//     typeSpeed: 40,
//     deleteSpeed: 20,
//   });

//   const [showIcons, setShowIcons] = useState(false);

//   useEffect(() => {
//     if (typeText === fullParagraph) {
//       setShowIcons(true);
//     }
//   }, [typeText, fullParagraph]);

//   useEffect(() => {
//     if (showIcons) {
//       gsap.fromTo(
//         iconRefs.current,
//         {
//           opacity: 0,
//           y: 50,
//           scale: 0.5,
//         },
//         {
//           opacity: 1,
//           y: 0,
//           scale: 1,
//           duration: 0.6,
//           stagger: 0.1,
//           ease: 'power2.out',
//         }
//       );
//     }
//   }, [showIcons]);

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

//   const handleHover = () => {
//     waveTweenRef.current.restart();
//   };

//   const startGreetingAnimation = () => {
//     const animate = () => {
//       if (hasStoppedRef.current) return;

//       const current = wordRefs.current[currentIndexRef.current];
//       const nextIndex = (currentIndexRef.current + 1) % translations.length;
//       const next = wordRefs.current[nextIndex];

//       const tl = gsap.timeline();
//       tl.to(current, {
//         opacity: 0,
//         y: -50,
//         duration: 0.6,
//         ease: 'power2.in',
//       })
//         .set(current, { y: 0 })
//         .set(next, { y: 50 })
//         .to(next, {
//           opacity: 1,
//           y: 0,
//           duration: 0.6,
//           ease: 'power2.out',
//         });

//       currentIndexRef.current = nextIndex;

//       timeoutRef.current = setTimeout(() => {
//         if (!hasStoppedRef.current) animate();
//       }, 2000);
//     };

//     timeoutRef.current = setTimeout(animate, 2000);
//   };

//   useLayoutEffect(() => {
//     wordRefs.current.forEach((el, i) => {
//       if (el) {
//         gsap.set(el, {
//           opacity: i === 0 ? 1 : 0,
//           y: 0,
//         });
//       }
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
//     return () =>
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//   }, []);

//   return (
//     <div className="w-[50vw] min-h-screen px-10 py-10 flex flex-col justify-start items-start bg-gray-100 text-white relative overflow-hidden">
//       {/* 👋 Emoji */}
//       <div
//         ref={emojiRef}
//         onMouseEnter={handleHover}
//         className="text-6xl cursor-pointer select-none"
//       >
//         👋
//       </div>

//       {/* Greetings */}
//       <div className="h-[60px] mt-6 relative w-full overflow-hidden">
//         {translations.map((text, index) => (
//           <h1
//             key={index}
//             ref={(el) => (wordRefs.current[index] = el)}
//             className="absolute left-1/2 -translate-x-1/2 w-full text-start text-5xl font-extrabold leading-[60px] opacity-0 text-indigo-700"
//           >
//             {text}
//           </h1>
//         ))}
//       </div>

//       {/* Typewriter CTA */}
//       <p className="mt-6 text-md md:text-xl font-medium text-gray-700 max-w-lg leading-relaxed">
//         <span>{typeText}</span>
//         <Cursor cursorStyle="|" />
//       </p>

//       {/* Animated Icons with Titles */}
//       {showIcons && (
//         <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full place-items-start">
//           {[
//             {
//               icon: <MdOutlineTranslate />,
//               label: 'Translator',
//             },
//             {
//               icon: <RiVoiceprintLine />,
//               label: 'Transcriptionist' ,
//             },
//             {
//               icon: <MdKeyboardVoice />,
//               label: 'Voice-over Artist',
//             },
//             {
//               icon: <FaToolbox />,
//               label: 'Other Roles',
//             },
//           ].map((item, idx) => (
//             <div key={idx} className="flex flex-col items-center">
//               <div
//                 ref={(el) => (iconRefs.current[idx] = el)}
//                 className="w-15 h-15 rounded-full border-2 border-blue-500 bg-blue-200/20 text-blue-600 flex items-center justify-center text-3xl shadow-md"
//               >
//                 {item.icon}
//               </div>
//               <span className="mt-2 text-blue-700 text-sm font-medium text-center">
//                 {item.label}
//               </span>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AnimatedHello;
