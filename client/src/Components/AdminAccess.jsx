import React, { useEffect, useState } from "react";
import { ShieldCheck, ShieldX, Users } from "lucide-react";
import Navbar from "./Navbar";
import { Dialog } from "@headlessui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



export default function AdminAccessPage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [email, setEmail] = useState("");
  const [duration, setDuration] = useState("");
  const [removeEmail, setRemoveEmail] = useState("");
  const [activeSection, setActiveSection] = useState("grant");
  const [adminList, setAdminList] = useState([]);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate(); // ✅ This was missing


  const isPermAdmin =
    currentUser?.role === "admin" && !currentUser?.isTemporaryAdmin;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${backendURL}/api/admin-dashboard/admin-access/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCurrentUser(data.user))
      .catch((err) => console.error("User fetch error:", err));
  }, []);

  useEffect(() => {
    if (activeSection === "list") {
      const token = localStorage.getItem("token");
      if (!token) return;

      fetch(`${backendURL}/api/admin-dashboard/admin-access/list-admins`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setAdminList(data.admins || []))
        .catch((err) => console.error("Admin list fetch error:", err));
    }
  }, [activeSection]);

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (!eval(field)) {
      setErrors((prev) => ({ ...prev, [field]: "This field is required*" }));
    }
  };

  const handleFocus = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleGrant = async (e) => {
    e.preventDefault();
    if (!email || !duration) {
      setTouched({ email: true, duration: true });
      setErrors({
        email: !email ? "This field is required*" : "",
        duration: !duration ? "This field is required*" : "",
      });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${backendURL}/api/admin-dashboard/admin-access/grant-access`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, duration }),
      });
      const data = await res.json();
      setModalMessage(data.message);
      setSuccessModalOpen(true);
    } catch (err) {
      setModalMessage("Failed to grant access. " + err);
      setSuccessModalOpen(true);
    }
  };

  const handleRevoke = async (e) => {
    e.preventDefault();
    if (!removeEmail) {
      setTouched({ removeEmail: true });
      setErrors({ removeEmail: "This field is required*" });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(
        `${backendURL}/api/admin-dashboard/admin-access/revoke-access`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: removeEmail }),
        }
      );
      const data = await res.json();
      setModalMessage(data.message);
      setSuccessModalOpen(true);
    } catch (err) {
      setModalMessage("Failed to revoke access. " + err);
      setSuccessModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-color">
      <Navbar />
      <div className="pt-20 px-4 md:px-10">
        {/* Overlaid Back Button */ }
                            <div className="max-w-6xl mx-auto pb-3 pl-1">
                              <button className="relative flex gap-2 transition text-orange-950"
                              onClick={() => navigate(-1)}
                              >
                                <FaArrowLeft />
                              </button>
                            </div>
        <div className="max-w-6xl mx-auto bg-orange-100 rounded-sm shadow-md p-6">
          <h2 className="text-3xl font-bold mb-6 text-orange-950 text-center oxygen-bold">
            Admin Access Control Panel
          </h2>

          {/* Section Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 oxygen-regular">
            {[
              { label: "Allow Admin Access", value: "grant", icon: ShieldCheck, color: "blue" },
              { label: "Revoke Admin Access", value: "revoke", icon: ShieldX, color: "red" },
              { label: "Admin List", value: "list", icon: Users, color: "blue" },
            ].map(({ label, value, icon: Icon, color }) => (
              <button
                key={value}
                onClick={() => setActiveSection(value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-sm text-white font-medium shadow transition cursor-pointer ${
                  activeSection === value
                    ? `bg-${color}-600`
                    : `bg-${color}-400 hover:bg-${color}-500`
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Grant Admin Section */}
          {activeSection === "grant" && (
            <form onSubmit={handleGrant} className="space-y-4 border p-6 rounded shadow bg-blue-50 oxygen-regular">
              <div className="text-yellow-800 bg-yellow-100 p-3 rounded text-sm oxygen-regular">
                ⚠️ The email you enter <strong>must be registered</strong> on the site.
              </div>

              <div>
                <label className="block font-medium mb-1">User Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur("email")}
                  onFocus={() => handleFocus("email")}
                  className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {touched.email && errors.email && (
                  <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block font-medium mb-1">Duration (in days)</label>
                <input
                  type="number"
                  min={1}
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  onBlur={() => handleBlur("duration")}
                  onFocus={() => handleFocus("duration")}
                  className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    errors.duration ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {touched.duration && errors.duration && (
                  <p className="text-red-600 text-sm mt-1">{errors.duration}</p>
                )}
              </div>

              {!isPermAdmin && (
                <p className="text-sm text-red-600 italic">
                  Only permanent admins can grant admin access.
                </p>
              )}

              <button
                type="submit"
                disabled={!isPermAdmin}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
              >
                <ShieldCheck className="inline w-4 h-4 mr-1" /> Grant Access
              </button>
            </form>
          )}

          {/* Revoke Admin Section */}
          {activeSection === "revoke" && (
            <form onSubmit={handleRevoke} className="space-y-4 border p-6 rounded shadow bg-red-50 oxygen-regular">
              <div className="text-yellow-800 bg-yellow-100 p-3 rounded text-sm oxygen-regular">
                ⚠️ The email must belong to a user with temporary admin access.
              </div>

              <div>
                <label className="block font-medium mb-1">User Email</label>
                <input
                  type="email"
                  value={removeEmail}
                  onChange={(e) => setRemoveEmail(e.target.value)}
                  onBlur={() => handleBlur("removeEmail")}
                  onFocus={() => handleFocus("removeEmail")}
                  className={`w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                    errors.removeEmail ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {touched.removeEmail && errors.removeEmail && (
                  <p className="text-red-600 text-sm mt-1">{errors.removeEmail}</p>
                )}
              </div>

              {!isPermAdmin && (
                <p className="text-sm text-red-600 italic">
                  Only permanent admins can revoke access.
                </p>
              )}

              <button
                type="submit"
                disabled={!isPermAdmin}
                className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50 cursor-pointer"
              >
                <ShieldX className="inline w-4 h-4 mr-1" /> Revoke Access
              </button>
            </form>
          )}

          {/* Admin List Section */}
          {activeSection === "list" && (
            <div className="border p-6 rounded shadow bg-green-50 overflow-x-auto">
              <h3 className="text-xl font-semibold mb-4 text-green-700">All Admins</h3>
              <table className="min-w-full table-auto text-sm text-left">
                <thead className="bg-green-100 text-green-900 font-semibold">
                  <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Role</th>
                    <th className="px-4 py-2">Temporary?</th>
                    <th className="px-4 py-2">Expires At</th>
                  </tr>
                </thead>
                <tbody>
                  {adminList.map((admin) => (
                    <tr key={admin._id} className="border-t">
                      <td className="px-4 py-2">{admin.firstName} {admin.lastName}</td>
                      <td className="px-4 py-2">{admin.email}</td>
                      <td className="px-4 py-2">{admin.role}</td>
                      <td className="px-4 py-2">{admin.isTemporaryAdmin ? "Yes" : "No"}</td>
                      <td className="px-4 py-2">
                        {admin.adminAccessExpiresAt
                          ? new Date(admin.adminAccessExpiresAt).toLocaleString("en-IN", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })
                          : "Permanent"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Dialog
        open={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="fixed inset-0 bg-black/10 bg-opacity-10" aria-hidden="true" />
        <div className="relative bg-white rounded-lg shadow-xl p-6 z-50 w-full max-w-md mx-auto text-center">
          <img
            src={
              modalMessage.toLowerCase().includes("not found") || modalMessage.toLowerCase().includes("failed")
                ? "https://cdn-icons-png.flaticon.com/512/463/463612.png" // red cross
                : "https://cdn-icons-png.flaticon.com/512/190/190411.png" // green tick
            }
            alt={modalMessage.toLowerCase().includes("not found") ? "Error" : "Success"}
            className="w-20 h-20 mx-auto mb-4"
          />
          <h2
            className={`text-xl font-bold mb-2 ${
              modalMessage.toLowerCase().includes("not found") || modalMessage.toLowerCase().includes("failed")
                ? "text-red-600"
                : "text-green-700"
            }`}
          >
            {modalMessage.toLowerCase().includes("not found") || modalMessage.toLowerCase().includes("failed")
              ? "Action Failed!"
              : "Action Completed!"}
          </h2>
          <p className="text-gray-600 mb-5">{modalMessage}</p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full cursor-pointer"
              onClick={() => setSuccessModalOpen(false)}
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

    </div>
  );
}

