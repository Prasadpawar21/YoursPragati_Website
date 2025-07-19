import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { IoArrowBack } from "react-icons/io5";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Signup = () => {
  const navigate = useNavigate();

  // States
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL ;

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    try {
      const res = await fetch(`${backendURL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password, confirmPassword }),
      });

      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="relative bg-color min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Back Button */}
      <div className="absolute z-10 top-20 left-4 sm:top-24 sm:left-6 md:left-10">
        <button
          onClick={() => navigate(-1)}
          className="text-orange-900 hover:text-orange-950 transition duration-200 p-1 cursor-pointer"
          title="Go back"
        >
          <IoArrowBack size={24} />
        </button>
      </div>

      {/* Signup Form Section */}
      <div className="pt-24 px-4 flex items-center justify-center">
        <div className="bg-orange-100 backdrop-blur-md shadow-2xl p-10 rounded-sm w-full max-w-md border border-orange-200 transition-all duration-300">
          <h2 className="text-3xl font-bold text-center text-orange-900 mb-6 oxygen-bold">Join the Movement 🚀</h2>

          {error && <p className="text-red-600 text-sm text-center mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block mb-1 text-sm font-medium text-orange-900 oxygen-regular">First Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-700 rounded-sm focus:ring-2 focus:ring-orange-900 focus:outline-none oxygen-regular"
                  placeholder="Vivek"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="flex-1">
                <label className="block mb-1 text-sm font-medium text-gray-700 oxygen-regular ">Last Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-700 rounded-sm focus:ring-2 focus:ring-orange-900 focus:outline-none oxygen-regular"
                  placeholder="Sharma"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-orange-900 oxygen-regular">Email Address</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-700 rounded-sm focus:ring-2 focus:ring-orange-900 focus:outline-none oxygen-regular"
                placeholder="viveksharma@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-orange-900 oxygen-regular" >Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 pr-10 border border-gray-700 rounded-sm focus:ring-2 focus:ring-orange-900 focus:outline-none oxygen-regular"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </span>
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-orange-900 oxygen-regular">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  className="w-full px-4 py-2 pr-10 border border-gray-700 rounded-sm focus:ring-2 focus:ring-orange-900 focus:outline-none oxygen-regular"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-stone-900/80 hover:bg-stone-900 text-white font-semibold rounded-sm transition duration-200 shadow-md cursor-pointer"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-orange-900 oxygen-regular">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-orange-900 hover:underline cursor-pointer font-medium oxygen-bold"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
