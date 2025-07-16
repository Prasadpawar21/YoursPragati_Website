import React, { useEffect, useState, useRef } from "react";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io5";
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";
import * as BsIcons from "react-icons/bs";
import * as TbIcons from "react-icons/tb";

const iconLibraries = {
  md: MdIcons,
  fa: FaIcons,
  ai: AiIcons,
  bi: BiIcons,
  io: IoIcons,
  ri: RiIcons,
  gi: GiIcons,
  bs: BsIcons,
  tb: TbIcons,
};

const getIconComponent = (iconName) => {
  if (!iconName || typeof iconName !== "string") return null;
  const prefix = iconName.slice(0, 2).toLowerCase();
  const library = iconLibraries[prefix];
  return library && library[iconName] ? library[iconName] : null;
};

const Services = () => {
  const [services, setServices] = useState([]);
  const containerRefs = useRef([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/services");
        const data = await res.json();
        setServices(data.services || []);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const observers = [];

    containerRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-x-0");
            entry.target.classList.remove(
              idx % 2 === 0 ? "-translate-x-20" : "translate-x-20"
            );
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(ref);
      observers.push(observer);
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, [services]);

  return (
    <section id="services" className="py-20 px-6 md:px-12 bg-white bg-color">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 oxygen-bold">
          Our Language Services
        </h2>
        <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto oxygen-regular pb-10">
          Yours Pragati specializes in offering a wide range of language services
          for Indian languages. Our founder, Pragati, has successfully collaborated
          with various platforms to integrate Indian languages into different domains,
          ensuring accurate and culturally sensitive content.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {services.length === 0 ? (
            <p className="text-gray-600 col-span-full oxygen-regular">No services available.</p>
          ) : (
            services.map((service, index) => {
              const Icon = getIconComponent(service.icon);
              const directionClass = index % 2 === 0 ? "-translate-x-20" : "translate-x-20";
              return (
                <div
                  key={service._id}
                  ref={(el) => (containerRefs.current[index] = el)}
                  className={`opacity-0 transform ${directionClass} transition duration-700 ease-in-out bg-orange-100 p-6 rounded-sm shadow-md hover:shadow-lg text-left mx-auto w-full border border-orange-200`}
                >
                  {Icon && (
                    <div className="text-orange-900 text-6xl mb-4">
                      <Icon />
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-3 text-orange-700 oxygen-bold">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed oxygen-light">
                    {service.description}
                  </p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;