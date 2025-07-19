// TeamSection.jsx
import React, { useEffect, useState } from 'react';
import Button from "../Components/Button";
import {
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaArrowRight,
} from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

const backendURL = import.meta.env.VITE_BACKEND_URL ;
export default function TeamSection() {
  const [team, setTeam] = useState([]);
  // const navigate = useNavigate();

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
    <section id="team" className="bg-orange-200 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 mt-4 oxygen-bold text-gray-900">
          Meet the team
        </h2>
        <p className="text-gray-700 mb-10">
          Our team is made up of experienced professionals.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10">
          {team.slice(0, 4).map((member, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center bg-orange-100 rounded-sm shadow-lg pt-20 pb-6 px-4 mt-15"
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
              <h3 className="mt-4 text-lg font-semibold text-gray-900 oxygen-bold">
                {member.name}
              </h3>
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

        {/* Updated View All Team Members Button */}
        <div className="mt-20 mb-4 flex justify-center">
          {/* <button
            onClick={() => navigate('/team')}
            className="flex items-center gap-2 bg-white text-orange-800 border border-orange-400 font-semibold px-5 py-2 rounded-full transition duration-300 hover:bg-orange-300 hover:text-white hover:border-transparent"
          >
            Meet All <FaArrowRight className="ml-1" />
          </button> */}
          <Button title="Meet All" to="/team" />
        </div>
      </div>
    </section>
  );
}
