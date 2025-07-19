import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import Navbar from "./Navbar";

const EditActivity = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const nameInputRef = useRef(null); // 👈 Ref for the name input field

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
  const [loaded, setLoaded] = useState(false);

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL ;


  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${backendURL}/api/activities/edit/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setFormData(data);
          setTimeout(() => {
            setLoaded(true);
            nameInputRef.current?.focus(); // 👈 Auto-focus after data is loaded
          }, 300);
        }
      })
      .catch((err) => console.error("Failed to load activity", err));
  }, [id]);

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
    navigate("/activities");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== "mobile") {
        newErrors[key] = "This field is required*";
      }
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

    if (Object.keys(newErrors).length === 1) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${backendURL}/api/activities/edit/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          setModalMessage("Activity updated successfully.");
          setSuccessModalOpen(true);
        } else {
          const error = await res.json();
          setModalMessage(error.message || "Update failed.");
          setSuccessModalOpen(true);
        }
      } catch (err) {
        console.error(err);
        setModalMessage("Failed to update activity.");
        setSuccessModalOpen(true);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-color py-10 px-4 pt-20 flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl border border-orange-200 bg-orange-100 rounded-sm shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-center text-orange-900 mb-8 oxygen-bold">
            Edit Your Activity
          </h2>

          {["name", "lastName", "email", "mobile"].map((field) => (
            <div className="mb-4" key={field}>
              <label className="block text-sm font-medium text-orange-900 mb-1 oxygen-regular">
                {field === "mobile"
                  ? "Mobile Number (optional)"
                  : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={`Enter ${field}`}
                ref={field === "name" ? nameInputRef : null} // 👈 Attach ref to name field only
                className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-900 transition oxygen-regular ${
                  errors[field] ? "border-red-500" : "border-gray-800"
                } ${!loaded ? "animate-pulse bg-orange-50" : "bg-orange-100"}`}
              />
              {errors[field] && touched[field] && (
                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
              )}
            </div>
          ))}

          <div className="mb-4">
            <label className="block text-sm font-medium text-orange-900 mb-2 oxygen-regular">
              Collaborating As
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
                    className="mr-2 accent-orange-900 oxygen-regular"
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
              rows="4"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-orange-900 transition oxygen-regular ${
                errors.message ? "border-red-500" : "border-gray-800"
              } ${!loaded ? "animate-pulse bg-orange-50" : "bg-orange-100"}`}
              placeholder="Enter your message"
            ></textarea>
            {errors.message && touched.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-900 hover:bg-orange-950 text-white font-semibold py-2 px-6 rounded-full transition oxygen-regular cursor-pointer"
            >
              Save & Update
            </button>
          </div>
        </form>
      </div>

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
          <h2 className="text-xl font-bold text-green-700 mb-2 oxygen-bold">Action Completed!</h2>
          <p className="text-gray-600 mb-5 oxygen-regular">{modalMessage}</p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full oxygen-regular cursor-pointer"
              onClick={handleOk}
            >
              OK
            </button>
            <button
              className="border border-gray-400 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-100 oxygen-regular cursor-pointer"
              onClick={() => setSuccessModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default EditActivity;
