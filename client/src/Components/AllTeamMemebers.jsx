import React, { useEffect, useState } from 'react';
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import Navbar from './Navbar';

export default function TeamPage() {
  const [team, setTeam] = useState([]);
  const backendURL = import.meta.env.VITE_BACKEND_URL ;
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await fetch(`${backendURL}/api/team`);
        const data = await res.json();
        setTeam(data);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };

    fetchTeam();
  }, []);

  return (
    <div>
        <Navbar />
    <section className="bg-orange-200 text-white py-16 px-4 min-h-screen">
      <div className="max-w-7xl mx-auto text-center">
        {/* Page Heading */}
        <h1 className="text-4xl font-bold mb-4 mt-4 oxygen-bold text-gray-900">Our Entire Team</h1>
        <p className="text-gray-700 mb-10">Here’s the full list of our awesome team members.</p>

        {/* Grid of Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
          {team.map((member, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center bg-orange-100 rounded-sm shadow-lg pt-20 pb-6 px-4 mt-20"
            >
              {/* Profile Image Positioned Half Outside with Hover Scale Effect */}
              <div className="absolute -top-16 transition-transform duration-300 ease-in-out hover:scale-110">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-32 h-32 object-cover rounded-full border-4 border-orange-50 shadow-md"
                />
              </div>

              {/* Member Info */}
              <h3 className="mt-4 text-lg font-semibold text-gray-900 oxygen-bold">{member.name}</h3>
              <p className="text-orange-950 oxygen-regular">{member.role}</p>
              <div className="flex gap-4 mt-3 text-xl text-orange-950">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {member.twitter && (
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-400"
                  >
                    <FaTwitter />
                  </a>
                )}
                {member.facebook && (
                  <a
                    href={member.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-500"
                  >
                    <FaFacebook />
                  </a>
                )}
                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-400"
                  >
                    <FaInstagram />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
}
