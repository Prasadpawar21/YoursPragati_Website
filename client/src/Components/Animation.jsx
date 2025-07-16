// // File: RotatingRing.jsx
// import React, { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { FaDatabase, FaKeyboard, FaLanguage, FaMicrophone, FaTasks } from 'react-icons/fa';

// const icons = [
//   { icon: <FaDatabase />, label: "Data Collection" },
//   { icon: <FaKeyboard />, label: "Transcript" },
//   { icon: <FaLanguage />, label: "Translator" },
//   { icon: <FaMicrophone />, label: "Voice Over" },
//   { icon: <FaTasks />, label: "Content Management" },
// ];

// const RotatingRing = () => {
//   const ringRef = useRef(null);
//   const itemRefs = useRef([]);

//   useEffect(() => {
//     const ring = ringRef.current;
//     const items = itemRefs.current;

//     // Rotate ring continuously
//     const rotateTl = gsap.timeline({ repeat: -1 });

//     rotateTl.to(ring, {
//       rotate: 360,
//       duration: 20,
//       ease: 'linear'
//     });

//     // Highlight effect on each icon
//     items.forEach((item, index) => {
//       const delayTime = (20 / icons.length) * index;

//       gsap.timeline({ repeat: -1, repeatDelay: 0 })
//         .to(item, {
//           scale: 1.5,
//           boxShadow: '0 0 20px #fff',
//           duration: 0.5,
//           delay: delayTime,
//           ease: 'power2.out'
//         })
//         .to(item, {
//           scale: 1,
//           boxShadow: 'none',
//           duration: 0.5,
//           ease: 'power2.in'
//         });
//     });
//   }, []);

//   return (
//     <div className="w-full h-[400px] flex justify-center items-center">
//       <div className="relative w-[300px] h-[300px]" ref={ringRef}>
//         {icons.map((item, index) => {
//           const angle = (index / icons.length) * 360;
//           const radius = 120;
//           const x = radius * Math.cos((angle * Math.PI) / 180);
//           const y = radius * Math.sin((angle * Math.PI) / 180);

//           return (
//             <div
//               key={index}
//               ref={(el) => (itemRefs.current[index] = el)}
//               className="absolute w-[60px] h-[60px] bg-white text-black rounded-full flex flex-col justify-center items-center text-sm font-medium shadow-md transition-all"
//               style={{
//                 top: `calc(50% + ${y}px - 30px)`,
//                 left: `calc(50% + ${x}px - 30px)`,
//               }}
//             >
//               <div className="text-xl">{item.icon}</div>
//               <div className="text-[10px] text-center">{item.label}</div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default RotatingRing;
// /

// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useTypewriter, Cursor } from 'react-simple-typewriter';

// gsap.registerPlugin(ScrollTrigger);

// const translations = [
//   'नमस्ते उपयोगकर्ता', // Hindi
//   'नमस्कार वापरकर्ता', // Marathi
//   'হ্যালো ব্যবহারকারী', // Bangla
//   'வணக்கம் பயனர்',    // Tamil
//   'ہیلو صارف',         // Urdu
//   'Hello User'         // English
// ];

// const AnimatedHello = () => {
//   const emojiRef = useRef(null);
//   const waveTweenRef = useRef(null);
//   const listRef = useRef(null);

//   const [typeText] = useTypewriter({
//     words: [
//       'Contact us and begin your journey into a world of infinite AI possibilities.',
//       'Get in touch and explore a future powered by artificial intelligence.',
//       'Step into tomorrow with AI — let’s innovate together!'
//     ],
//     loop: true,
//     delaySpeed: 3000,
//     typeSpeed: 40,
//     deleteSpeed: 20,
//   });

//   // Scroll-triggered waving animation (more realistic)
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

//   // Hover-triggered wave
//   const handleHover = () => {
//     waveTweenRef.current.restart();
//   };

//   // Vertical sliding text animation
//   useEffect(() => {
//     const tl = gsap.timeline({ repeat: -1 });
//     const total = translations.length;

//     tl.to(listRef.current, {
//       y: `-${(total - 1) * 60}px`,
//       duration: total * 1.5,
//       ease: 'none'
//     });
//   }, []);

//   return (
//     <div className="w-[50vw] min-h-screen px-6 py-10 flex flex-col justify-center items-start bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">

//       {/* Hello Emoji with Hover Wave */}
//       <div
//         ref={emojiRef}
//         onMouseEnter={handleHover}
//         className="text-6xl cursor-pointer select-none"
//       >
//         👋
//       </div>

//       {/* Sliding Translations */}
//       <div className="h-[60px] mt-6 overflow-hidden relative">
//         <div ref={listRef} className="flex flex-col gap-2">
//           {translations.map((text, index) => (
//             <h1
//               key={index}
//               className="text-5xl font-extrabold tracking-wide text-white text-center h-[60px] leading-[60px]"
//             >
//               {text}
//             </h1>
//           ))}
//         </div>
//       </div>

//       {/* Typewriter Message */}
//       <p className="mt-6 text-md md:text-xl font-medium text-gray-300 max-w-lg leading-relaxed">
//         <span>{typeText}</span>
//         <Cursor cursorStyle="|" />
//       </p>
//     </div>
//   );
// };

// export default AnimatedHello;


// import React, { useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useTypewriter, Cursor } from 'react-simple-typewriter';

// gsap.registerPlugin(ScrollTrigger);

// const translations = [
//   'नमस्ते उपयोगकर्ता',   // Hindi
//   'नमस्कार वापरकर्ता',   // Marathi
//   'হ্যালো ব্যবহারকারী',   // Bangla
//   'வணக்கம் பயனர்',      // Tamil
//   'ہیلو صارف',           // Urdu
//   'Hello User'           // English
// ];

// const AnimatedHello = () => {
//   const emojiRef = useRef(null);
//   const waveTweenRef = useRef(null);
//   const containerRef = useRef(null);
//   const wordRefs = useRef([]);

//   const [typeText] = useTypewriter({
//     words: [
//       'Contact us and begin your journey into a world of infinite AI possibilities.',
//       'Get in touch and explore a future powered by artificial intelligence.',
//       'Step into tomorrow with AI — let’s innovate together!',
//     ],
//     loop: true,
//     delaySpeed: 3000,
//     typeSpeed: 40,
//     deleteSpeed: 20,
//   });

//   // Emoji waving on scroll and hover
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

//   // Animation: zoom + slide-up + visible focus
//   useEffect(() => {
//     wordRefs.current.forEach((el, i) => {
//       gsap.set(el, {
//         opacity: i === 0 ? 1 : 0,
//         y: 0,
//         scale: 1,
//       });
//     });

//     let currentIndex = 0;

//     const animate = () => {
//       const current = wordRefs.current[currentIndex];
//       const nextIndex = (currentIndex + 1) % translations.length;
//       const next = wordRefs.current[nextIndex];

//       // Animate current word: scale up then fade out
//       const tl = gsap.timeline();

//       tl.to(current, {
//         scale: 1.3,
//         duration: 0.4,
//         ease: 'power2.out',
//       })
//         .to(current, {
//           opacity: 0,
//           y: -50,
//           scale: 1,
//           duration: 0.6,
//           ease: 'power2.in',
//         })
//         .set(current, { y: 0 });

//       // Animate next word: fade in
//       tl.set(next, { y: 50 })
//         .to(next, {
//           opacity: 1,
//           y: 0,
//           duration: 0.6,
//           ease: 'power2.out',
//         });

//       currentIndex = nextIndex;

//       setTimeout(animate, 2000);
//     };

//     setTimeout(animate, 2000);
//   }, []);

//   return (
//     <div className="w-[50vw] min-h-screen px-6 py-10 flex flex-col justify-center items-start bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
      
//       {/* Hello Emoji */}
//       <div
//         ref={emojiRef}
//         onMouseEnter={handleHover}
//         className="text-6xl cursor-pointer select-none"
//       >
//         👋
//       </div>

//       {/* Greeting Translation Words */}
//       <div ref={containerRef} className="h-[60px] mt-6 relative w-full overflow-hidden">
//         {translations.map((text, index) => (
//           <h1
//             key={index}
//             ref={(el) => (wordRefs.current[index] = el)}
//             className="absolute left-1/2 -translate-x-1/2 w-full text-start text-5xl font-extrabold leading-[60px] opacity-0"
//           >
//             {text}
//           </h1>
//         ))}
//       </div>

//       {/* Typewriter CTA */}
//       <p className="mt-6 text-md md:text-xl font-medium text-gray-300 max-w-lg leading-relaxed">
//         <span>{typeText}</span>
//         <Cursor cursorStyle="|" />
//       </p>
//     </div>
//   );
// };

// export default AnimatedHello;

// import React, { useLayoutEffect, useEffect, useRef } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useTypewriter, Cursor } from 'react-simple-typewriter';

// gsap.registerPlugin(ScrollTrigger);

// const translations = [
//   'नमस्ते उपयोगकर्ता',
//   'नमस्कार वापरकर्ता',
//   'হ্যালো ব্যবহারকারী',
//   'வணக்கம் பயனர்',
//   'ہیلو صارف',
//   'Hello User',
// ];

// const AnimatedHello = () => {
//   const emojiRef = useRef(null);
//   const waveTweenRef = useRef(null);
//   const wordRefs = useRef([]);
//   const timeoutRef = useRef(null);
//   const currentIndexRef = useRef(0);
//   const hasStoppedRef = useRef(false); // flag to stop future animations

//   const [typeText] = useTypewriter({
//     words: [
//       'Contact us and begin your journey into a world of infinite AI possibilities.',
//       'Get in touch and explore a future powered by artificial intelligence.',
//       'Step into tomorrow with AI — let’s innovate together!',
//     ],
//     loop: true,
//     delaySpeed: 3000,
//     typeSpeed: 40,
//     deleteSpeed: 20,
//   });

//   // Emoji wave
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

//   // Start animation loop
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

//       // Only schedule next if not stopped
//       timeoutRef.current = setTimeout(() => {
//         if (!hasStoppedRef.current) animate();
//       }, 2000);
//     };

//     timeoutRef.current = setTimeout(animate, 2000);
//   };

//   // Init animation
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

//     return () => {
//       clearTimeout(timeoutRef.current);
//     };
//   }, []);

//   // Stop animation permanently when tab is hidden
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === 'hidden') {
//         // Stop future animation
//         hasStoppedRef.current = true;
//         clearTimeout(timeoutRef.current);
//       }
//     };

//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
//   }, []);

//   return (
//     <div className="w-[50vw] min-h-screen px-6 py-10 flex flex-col justify-center items-start bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">

//       {/* Hello Emoji */}
//       <div
//         ref={emojiRef}
//         onMouseEnter={handleHover}
//         className="text-6xl cursor-pointer select-none"
//       >
//         👋
//       </div>

//       {/* Animated Translations */}
//       <div className="h-[60px] mt-6 relative w-full overflow-hidden">
//         {translations.map((text, index) => (
//           <h1
//             key={index}
//             ref={(el) => (wordRefs.current[index] = el)}
//             className="absolute left-1/2 -translate-x-1/2 w-full text-start text-5xl font-extrabold leading-[60px] opacity-0"
//           >
//             {text}
//           </h1>
//         ))}
//       </div>

//       {/* Typewriter CTA */}
//       <p className="mt-6 text-md md:text-xl font-medium text-gray-300 max-w-lg leading-relaxed">
//         <span>{typeText}</span>
//         <Cursor cursorStyle="|" />
//       </p>
//     </div>
//   );
// };

// export default AnimatedHello;

// import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { useTypewriter, Cursor } from 'react-simple-typewriter';
// import { jwtDecode } from 'jwt-decode';

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

//   // Multilingual greetings — name kept intact
//   const translations = [
//     `नमस्ते ${userName}`,          // Hindi
//     `नमस्कार ${userName}`,         // Marathi
//     `હેલો ${userName}`,            // Gujarati
//     `ਸਤ ਸ੍ਰੀ ਅਕਾਲ ${userName}`,   // Punjabi
//     `प्रणाम ${userName}`,          // Bhojpuri
//     `হ্যালো ${userName}`,          // Bengali
//     `வணக்கம் ${userName}`,         // Tamil
//     `ہیلو ${userName}`,            // Urdu
//     `Hello ${userName}`,           // English
//   ];

//   const [typeText] = useTypewriter({
//     words: [
//       'Contact us and begin your journey into a world of infinite AI possibilities.',
//       'Get in touch and explore a future powered by artificial intelligence.',
//       'Step into tomorrow with AI — let’s innovate together!',
//     ],
//     loop: true,
//     delaySpeed: 3000,
//     typeSpeed: 40,
//     deleteSpeed: 20,
//   });

//   // 👋 Emoji wave
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

//   // Animation Loop
//   useLayoutEffect(() => {
//     // Set all greetings off except first
//     wordRefs.current.forEach((el, i) => {
//       if (el) {
//         gsap.set(el, {
//           opacity: i === 0 ? 1 : 0,
//           y: 0,
//         });
//       }
//     });

//     currentIndexRef.current = 0;

//     const animate = () => {
//       const current = wordRefs.current[currentIndexRef.current];
//       const nextIndex = (currentIndexRef.current + 1) % translations.length;
//       const next = wordRefs.current[nextIndex];

//       if (!current || !next) return;

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
//       timeoutRef.current = setTimeout(animate, 2000);
//     };

//     timeoutRef.current = setTimeout(animate, 2000);

//     return () => {
//       clearTimeout(timeoutRef.current);
//     };
//   }, [translations.length]);

//   return (
//     <div className="w-[50vw] min-h-screen px-6 py-10 flex flex-col justify-center items-start bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">

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
//             className="absolute left-1/2 -translate-x-1/2 w-full text-start text-5xl font-extrabold leading-[60px] opacity-0"
//           >
//             {text}
//           </h1>
//         ))}
//       </div>

//       {/* Typewriter CTA */}
//       <p className="mt-6 text-md md:text-xl font-medium text-gray-300 max-w-lg leading-relaxed">
//         <span>{typeText}</span>
//         <Cursor cursorStyle="|" />
//       </p>
//     </div>
//   );
// };

// export default AnimatedHello;

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
