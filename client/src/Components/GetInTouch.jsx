import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import AnimatedHello from "./Animation"; // Assuming you have an animation component
import { FiArrowRight, FiInfo } from 'react-icons/fi';
import Button from "../Components/Button";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    mobile: "",
    role: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    if (!formData[name] && name !== "mobile") {
      setErrors((prev) => ({ ...prev, [name]: "This field is required*" }));
    }
  };

  const handleOk = () => {
    setSuccessModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== "mobile") newErrors[key] = "This field is required*";
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      lastName: true,
      email: true,
      mobile: true,
      role: true,
      message: true,
    });

    if (Object.keys(newErrors).length === 0) {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:3000/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setSuccessModalOpen(true);
          setFormData({
            name: "",
            lastName: "",
            email: "",
            mobile: "",
            role: "",
            message: "",
          });
          setTouched({});
        } else {
          alert(data.message || "Something went wrong!");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Failed to submit form. Please try again.");
      }
    }
  };

  return (
    <div id="contact">
      <div className="text-center bg-color pt-30 pb-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 pb-4 oxygen-bold">Contact Us</h2>
        <p className="text-center text-gray-500 mb-10 max-w-3xl mx-auto oxygen-regular text-lg">
          Get in touch for collaboration and partnership opportunities.
        </p>
      </div>

      <section className="min-h-screen flex flex-col sm:flex-row bg-color">
        <div className="hidden sm:flex sm:w-2/5 items-center justify-start">
          <AnimatedHello />
        </div>

        <div className="w-full sm:w-3/5 px-6 sm:px-12 py-12 flex items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl border border-orange-200 bg-orange-100 rounded-sm shadow-xl p-8 relative "
          >
            <h2 className="text-2xl font-bold text-center text-orange-900 mb-10 oxygen-bold">Get in Touch</h2>

            {[
              { label: "Name", name: "name", type: "text", placeholder: "Your name" },
              { label: "Last name", name: "lastName", type: "text", placeholder: "Your last name" },
              { label: "Email", name: "email", type: "email", placeholder: "Your email address" },
              { label: "Mobile Number (optional)", name: "mobile", type: "text", placeholder: "Your mobile number" },
            ].map(({ label, name, type, placeholder }) => (
              <div className="mb-4" key={name}>
                <label className="block text-sm font-medium text-orange-900 mb-1 oxygen-regular">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={placeholder}
                  className={`w-full p-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-900 oxygen-regular ${
                    errors[name] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[name] && touched[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                )}
              </div>
            ))}

            <div className="mb-4">
              <label className="block text-sm font-medium text-orange-900 mb-2 oxygen-regular">
                I want to collaborate as
              </label>
              <div className="space-y-2 text-gray-800">
                {["Translator", "Transcriptionist", "Voice-over Artist", "Others"].map((roleOption) => (
                  <label key={roleOption} className="flex items-center">
                    <input
                      type="radio"
                      name="role"
                      value={roleOption}
                      checked={formData.role === roleOption}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mr-2 accent-orange-800"
                    />
                    {roleOption}
                  </label>
                ))}
                {errors.role && touched.role && (
                  <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-orange-900 mb-1 oxygen-regular">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your message"
                rows="4"
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 oxygen-regular ${
                  errors.message ? "border-red-500" : "border-gray-300"
                }`}
              ></textarea>
              {errors.message && touched.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            <div className="flex justify-center">
              {/* <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-8 rounded-full transition duration-300 oxygen-regular"
              >
                Submit
              </button> */}
              {/* <button
              className="flex items-center justify-between bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition text-xs font-semibold shadow-md gap-4 oxygen-bold"
              >
                <span className="ml-1">Submit</span>
                <div className="bg-white text-black p-1.5 rounded-full">
                  <FiArrowRight className="text-base" />
                </div>
              </button> */}
              <Button title="Submit" to="" />
            </div>
          </form>
        </div>

        {/* ✅ Modal */}
        <Dialog
          open={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="fixed inset-0 bg-black/10 bg-opacity-10" aria-hidden="true" />
          <div className="relative bg-white rounded-lg shadow-xl p-6 z-50 w-full max-w-md mx-auto text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
              alt="Success"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-green-700 mb-2">Form submitted successfully!</h2>
            <p className="text-gray-600 mb-5">We will contact you in the next 48 hours.</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full cursor-pointer"
                onClick={handleOk}
              >
                OK
              </button>
              <button
                className="border border-gray-400 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-100 cursor-pointer"
                onClick={() => setSuccessModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Dialog>
      </section>
    </div>
  );
};

export default GetInTouch;
