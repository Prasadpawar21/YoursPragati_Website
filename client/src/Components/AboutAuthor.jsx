import React from "react";
import { motion } from "framer-motion";

const timeline = [
  {
    year: "2015",
    text: "My journey began in 2015 as a Marathi and Hindi language teacher for primary graders, nurturing young minds with my love for languages.",
  },
  {
    year: "2016",
    text: "In 2016, I transitioned to Amazon Kindle, leading the Indic launch process by introducing Marathi, Hindi, and Gujarati to the platform. This sparked my passion for empowering Indian languages.",
  },
  {
    year: "2018",
    text: "In 2018, I joined Pratilipi, engaging authors and communities, and later supported the launch of Pratilipi FM by building a voice-over artist network.",
  },
  {
    year: "2021",
    text: "By 2021, as a Content Acquisition Manager at KuKu FM, I onboarded over 500 hours of content within just 90 days.",
  },
  {
    year: "2023",
    text: "My experience culminated in 2023, when I worked with Apps For Bharat to launch Indian devotional content. Witnessing the scope of Indian languages for AI, I launched Yours Pragati to create employment for students, authors, and homemakers.",
  },
];

const AboutAuthor = () => {
  return (
    <section className="bg-gray-100 py-12 px-4 md:px-12 overflow-x-hidden relative z-0">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          About the Author
        </h2>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-indigo-600 z-10"></div>
          <div className="block md:hidden absolute left-4 h-full w-1 bg-indigo-600 z-10"></div>

          {/* Progress Line */}
          <motion.div
            className="absolute bg-indigo-300 origin-top z-0 w-1 left-4 md:left-1/2 transform md:-translate-x-1/2"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
          ></motion.div>

          <div className="flex flex-col gap-3 relative">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex flex-col md:flex-row items-start md:items-start gap-4"
              >
                {/* Dot Marker */}
                <div className="absolute z-20 w-4 h-4 bg-indigo-600 rounded-full border-4 border-white left-4 transform -translate-x-1/2 md:left-1/2 md:-translate-x-1/2"></div>

                {/* Timeline Card */}
                <div
                  className={`w-[90%] md:w-[45%] bg-white shadow-md rounded-lg p-4 md:p-6 mt-6 ml-10 md:ml-0 ${
                    index % 2 === 0 ? "md:ml-auto" : "md:mr-auto"
                  }`}
                >
                  <h3 className="text-lg font-semibold text-indigo-700 mb-1">
                    {item.year}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAuthor;
