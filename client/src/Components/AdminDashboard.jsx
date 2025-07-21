import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaUsers,
  FaTools,
  FaBlog,
  FaUserShield,
  FaGlobeAmericas,
  FaUserFriends,
} from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import Navbar from "./Navbar";
import { FaArrowLeft } from "react-icons/fa";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState({
    fullName: "Admin",
    email: "admin@example.com",
    role: "Admin",
  });

  // Decode token to get admin details
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        const fullName = `${decoded.firstName || ""} ${decoded.lastName || ""}`.trim();
        setAdminInfo({
          fullName,
          email: decoded.email,
          role: decoded.role,
        });
      }
    } catch (err) {
      console.error("Error decoding JWT token:", err);
    }
  }, []);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const stats = [
    {
      title: "Users",
      count: 50,
      color: "bg-pink-500",
      icon: <FaUser size={50} className="absolute right-2 bottom-2 opacity-10" />,
      path: "/admin-dashboard/all-users",
    },
    {
      title: "Collaborations",
      count: 15,
      color: "bg-orange-400",
      icon: <FaUsers size={50} className="absolute right-2 bottom-2 opacity-10" />,
      path: "/admin-dashboard/collab",
    },
    {
      title: "Services",
      count: 20,
      color: "bg-green-500",
      icon: <FaTools size={50} className="absolute right-2 bottom-2 opacity-10" />,
      path: "/admin-dashboard/services",
    },
    {
      title: "Blogs",
      count: 65,
      color: "bg-blue-500",
      icon: <FaBlog size={50} className="absolute right-2 bottom-2 opacity-10" />,
      path: "/admin-dashboard/blogs-data",
    },
    {
      title: "Admin Access",
      count: 5,
      color: "bg-purple-600",
      icon: <FaUserShield size={50} className="absolute right-2 bottom-2 opacity-10" />,
      path: "/admin-dashboard/admin-access",
    },
    {
      title: "Work on Field",
      count: 12,
      color: "bg-teal-500",
      icon: <FaGlobeAmericas size={50} className="absolute right-2 bottom-2 opacity-10" />,
      path: "/admin-dashboard/field-work",
    },
    {
      title: "Team Members",
      count: 4,
      color: "bg-red-500",
      icon: <FaUserFriends size={50} className="absolute right-2 bottom-2 opacity-10" />,
      path: "/admin-dashboard/teams",
    },
  ];

  return (
    <div>
    <Navbar />
    <div className="pt-20 bg-color min-h-screen px-4">
      {/* Overlaid Back Button */ }
                      <div className="max-w-6xl mx-auto pb-3 pl-1">
                        <button className="relative flex gap-2 transition text-orange-950"
                        onClick={() => navigate(-1)}
                        >
                          <FaArrowLeft />
                        </button>
                      </div>
      <div className="max-w-6xl mx-auto shadow-lg bg-orange-100  px-4 py-10 pb-8">
        {/* Admin Ticket */}
        <div className="rounded-sm p-6 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-4 relative overflow-hidden">
          {/* Profile Initials */}
          <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-orange-950 text-orange-100 font-bold text-xl sm:text-2xl flex items-center justify-center shadow-md oxygen-bold">
            {getInitials(adminInfo.fullName)}
          </div>

          {/* Admin Details */}
          <div className="z-10 flex-1">
            <h1 className="text-xl sm:text-2xl text-orange-950 font-bold mb-1 oxygen-bold">Welcome, {adminInfo.fullName}</h1>
            <p className="text-sm sm:text-base">
              📧 <span className="font-medium oxygen-regular">{adminInfo.email}</span>
            </p>
            <p className="text-sm sm:text-base oxygen-bold text-orange-950" >
              🔐 Role:{" "}
              <span className="font-semibold text-orange-900 oxygen-regular">{adminInfo.role}</span>
            </p>
          </div>

          
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`${stat.color} rounded-sm  shadow-lg p-4 cursor-pointer relative overflow-hidden transition-transform transform hover:scale-105`}
              onClick={() => navigate(stat.path)}
            >
              <h2 className="text-white text-lg font-semibold mb-1 oxygen-bold">{stat.title}</h2>
              <p className="text-white text-3xl font-bold oxygen-regular">{stat.count}</p>
              <span className="text-sm text-white mt-1 inline-block underline oxygen-regular">More info</span>
              {stat.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminDashboard;
