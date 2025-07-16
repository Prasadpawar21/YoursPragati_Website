// // import React from 'react';

// // const images = [
// //   {
// //     src: 'https://www.kobotoolbox.org/assets/images/blog/Philippines_Kobo_3.jpg',
// //     caption: '1.Field Survey in Rural Area',
// //   },
// //   {
// //     src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRNWO5rU73f2C3bsVlUVh4TwrwJsi-o_At-z6Y8VzVwtDj56R7C9DrnQTLgC5z576IYdQ&usqp=CAU',
// //     caption: '2.One-on-One Interview',
// //   },
// //   {
// //     src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpgrIqlm6LxG3Etmd0HYa_skVGz4BgJY3EvBOF75buNrMryvIt2iC_uEGbSTGUd2wb9xQ&usqp=CAU',
// //     caption: '3.Survey Data Collection',
// //   },
// //   {
// //     src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlDTeYCV3ot4ir9wDzbkJU7UfbMvHFY1ngMOX92_duEHjKdEfRJpbOAtp1fUQTQBh7iBc&usqp=CAU',
// //     caption: '4.Using Digital Tools',
// //   },
// //   {
// //     src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy4ECccLo7N3_R6lNwut-KJi7Aw8KF0pplq8iOOQMGKe98LLINI_9yqV9L2HR8EDy8xqk&usqp=CAU',
// //     caption: '5.Mobile Data Entry',
// //   },
// // ];

// // export default function DataCollectionPage() {
// //   return (
// //     <section className="bg-gray-50 py-12 px-6 md:px-20">
// //       <div className="max-w-6xl mx-auto text-center">
// //         <h2 className="text-4xl font-bold text-blue-900 mb-4">Work on Field!</h2>
// //         <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-10">
// //           The data collection process involves several key steps: defining objectives, selecting appropriate methods,
// //           gathering information, and analyzing the results. It's a systematic approach to acquiring information from
// //           various sources to address specific research questions or business needs.
// //         </p>

// //         {/* Scrolling Image Carousel */}
// //         <div className="overflow-hidden relative">
// //           <div className="flex gap-6 animate-scroll group hover:[animation-play-state:paused]">
// //             {images.map((item, index) => (
// //               <div key={index} className="min-w-[250px] flex-shrink-0">
// //                 <img
// //                   src={item.src}
// //                   alt={item.caption}
// //                   className="w-full h-[180px] object-cover rounded-md shadow-md"
// //                 />
// //                 <p className="mt-2 text-sm text-gray-600">{item.caption}</p>
// //               </div>
// //             ))}
// //             {/* Duplicate images for seamless loop */}
// //             {images.map((item, index) => (
// //               <div key={`dup-${index}`} className="min-w-[250px] flex-shrink-0">
// //                 <img
// //                   src={item.src}
// //                   alt={item.caption}
// //                   className="w-full h-[180px] object-cover rounded-md shadow-md"
// //                 />
// //                 <p className="mt-2 text-sm text-gray-600">{item.caption}</p>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// import React, { useEffect, useState } from 'react';

// export default function DataCollectionPage() {
//   const [images, setImages] = useState([]);

//   useEffect(() => {
//     fetch('http://localhost:3000/api/field-images')
//       .then((res) => res.json())
//       .then((data) => setImages(data.images || []))
//       .catch((err) => console.error('Failed to fetch field images:', err));
//   }, []);

//   return (
//     <section className="bg-gray-50 py-12 px-6 md:px-20">
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-4xl font-bold text-blue-900 mb-4">Work on Field!</h2>
//         <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-10">
//           The data collection process involves several key steps: defining objectives, selecting appropriate methods,
//           gathering information, and analyzing the results. It's a systematic approach to acquiring information from
//           various sources to address specific research questions or business needs.
//         </p>

//         <div className="overflow-hidden relative">
//           <div className="flex gap-6 animate-scroll group hover:[animation-play-state:paused]">
//             {[...images, ...images].map((item, index) => (
//               <div key={index} className="min-w-[250px] flex-shrink-0">
//                 <img
//                   src={item.imageUrl}
//                   alt={item.title}
//                   className="w-full h-[180px] object-cover rounded-md shadow-md"
//                 />
//                 <p className="mt-2 text-sm text-gray-600">{item.title}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

import React, { useEffect, useState } from 'react';

export default function DataCollectionPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/field-images')
      .then((res) => res.json())
      .then((data) => setImages(data.images || []))
      .catch((err) => console.error('Failed to fetch field images:', err));
  }, []);

  return (
    <section id="data-collection" className="bg-gray-50 py-12 px-6 md:px-20 bg-color">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 pt-10 oxygen-bold">Work on Field!</h2>
        <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-10 oxygen-regular pb-10">
          The data collection process involves several key steps: defining objectives, selecting appropriate methods,
          gathering information, and analyzing the results. It's a systematic approach to acquiring information from
          various sources to address specific research questions or business needs.
        </p>

        {/* Carousel */}
        <div className="overflow-hidden relative">
          <div className="flex gap-6 animate-scroll group hover:[animation-play-state:paused]">
            {[...images, ...images].map((item, index) => (
              <div key={index} className="w-[250px] flex-shrink-0">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-[180px] object-cover rounded-md shadow-md"
                />
                <p className="mt-2 text-sm text-orange-900 oxygen-light">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

