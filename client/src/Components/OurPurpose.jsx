import React from "react";
import VisionIcon from "../assets/VisionIcon.svg";
import MissionIcon from "../assets/MissionIcon.svg";
import CustomerIcon from "../assets/CustomerIcon.svg";
import PassionIcon from "../assets/PassionIcon.svg";
import EmpowermentIcon from "../assets/EmpowermentIcon.svg";

const vision =
  "Empowering students and homemakers by enabling remote work in their native languages—allowing them to earn, grow, and build meaningful careers with flexibility and dignity.";
const mission =
  "To bridge language barriers by creating inclusive opportunities through regional language support, enabling access, growth, and representation for all.";

const icons = [
  VisionIcon,
  MissionIcon,
  CustomerIcon,
  PassionIcon,
  EmpowermentIcon,
];

const values = [
  {
    title: "Vision",
    text: vision,
  },
  {
    title: "Mission",
    text: mission,
  },
  {
    title: "Customer First",
    text: "We prioritize the needs and satisfaction of every client by delivering culturally relevant and accurate language services.",
  },
  {
    title: "Passion",
    text: "We bring energy, creativity, and dedication to everything we do—because we truly care about empowering people through language.",
  },
  {
    title: "Empowerment",
    text: "We enable growth and opportunity by supporting Indian languages and those who speak them.",
  },
];

const VisionMissionValues = () => {
  return (
    <section id="ethics" className="bg-gray-100 py-12 px-6 md:px-16 bg-color ">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-36 mt-5 pt-10 oxygen-bold ">
        Vision, Mission & Values
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-28 md:gap-y-36 gap-x-10">
        {values.map((item, index) => (
          <div
            key={index}
            className="relative bg-orange-100 shadow-lg rounded-sm p-8 pt-20 transition duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:bg-orange-50 focus-within:shadow-xl active:shadow-xl border border-orange-200"
          >
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-28 h-28 bg-orange-900 text-white rounded-full flex items-center justify-center text-xl shadow-md border-4 border-white">
              <img
                src={icons[index]}
                alt={item.title}
                className="w-16 h-16"
              />
            </div>
            <h3 className="text-xl font-semibold text-center text-orange-700 oxygen-bold mb-6">
              {item.title}
            </h3>
            <p className="text-gray-700 text-center text-sm leading-relaxed oxygen-light">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VisionMissionValues;
