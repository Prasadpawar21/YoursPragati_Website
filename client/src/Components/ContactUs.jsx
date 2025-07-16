import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import Navbar from "./Navbar";

const ContactUs = () => {
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
  const [modalMessage, setModalMessage] = useState("");

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
          setModalMessage("We will contact you in the next 48 hours.");
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
    <div>
      <Navbar />
      <section className="min-h-screen flex items-center justify-center bg-color px-4 py-12 pt-20">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl border border-orange-200 bg-orange-100 rounded-sm shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold text-center text-orange-900 mb-10 oxygen-regular">
            Contact Us
          </h2>

          {[
            { label: "Name", name: "name", type: "text", placeholder: "Your name" },
            { label: "Last Name", name: "lastName", type: "text", placeholder: "Your last name" },
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
                  errors[name] ? "border-red-500" : "border-gray-700"
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
            <div className="space-y-2 text-gray-800 oxygen-regular">
              {["Translator", "Transcriptionist", "Voice-over Artist", "Others"].map((roleOption) => (
                <label key={roleOption} className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value={roleOption}
                    checked={formData.role === roleOption}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="mr-2 accent-orange-900"
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
              className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-900 oxygen-regular ${
                errors.message ? "border-red-500" : "border-gray-700"
              }`}
            ></textarea>
            {errors.message && touched.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-900 hover:bg-orange-950 text-white font-semibold py-2 px-8 rounded-full transition duration-300 oxygen-regular"
            >
              Submit
            </button>
          </div>
        </form>

        {/* ✅ Custom Modal */}
        <Dialog
          open={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="fixed inset-0 bg-black/10 bg-opacity-10" aria-hidden="true" />
          <div className="relative bg-orange-50 rounded-sm shadow-xl p-6 z-50 w-full max-w-md mx-auto text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
              alt="Success"
              className="w-20 h-20 mx-auto mb-4"
            />
            <h2 className="text-xl font-bold text-green-700 mb-2 oxygen-bold">Form submited successfully!</h2>
            <p className="text-gray-600 mb-5 oxygen-regular">{modalMessage}</p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full cursor-pointer oxygen-regular"
                onClick={handleOk}
              >
                OK
              </button>
              <button
                className="border border-gray-400 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-100 cursor-pointer oxygen-regular"
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

export default ContactUs;
