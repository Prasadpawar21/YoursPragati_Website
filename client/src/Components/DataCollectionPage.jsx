import React, { useEffect, useState } from 'react';

export default function DataCollectionPage() {
  const [images, setImages] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL ;


  useEffect(() => {
    fetch(`${backendURL}/api/field-images`)
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

