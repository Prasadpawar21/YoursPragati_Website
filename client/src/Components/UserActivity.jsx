import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineFile } from "react-icons/ai";
import { Pencil, Trash2, ChevronDown, ChevronRight, ChevronLeft, X } from "lucide-react";
import { Dialog } from "@headlessui/react";
import Navbar from "./Navbar";
import LogoutButton from "../Components/LogoutButton";

const UserActivity = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [openMessages, setOpenMessages] = useState({});
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    fetch("http://localhost:3000/api/activities/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setUser(data.user))
      .catch(() => navigate("/login"));

    fetch("http://localhost:3000/api/activities/contact", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => (Array.isArray(data) ? setActivity(data) : setActivity([])))
      .catch(console.error);
  }, [navigate]);

  const handleDelete = (id) => {
    setToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3000/api/activities/delete/${toDelete}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setActivity((prev) => prev.filter((item) => item._id !== toDelete));
        setToDelete(null);
        setShowModal(false);
        showToast();
      } else {
        const error = await res.json();
        alert(error.message || "Failed to delete activity");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("An error occurred while deleting activity");
    }
  };

  const toggleMessage = (id) => {
    setOpenMessages((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 4000);
  };

  if (!user) return null;

  const {
    firstName,
    lastName,
    email,
    role,
    isTemporaryAdmin,
    adminAccessExpiresAt,
  } = user;

  return (
    <div>
      <Navbar />

      {toastVisible && (
        <div className="fixed bottom-6 right-6 z-50 bg-red-100 border border-gray-300 text-red-800 px-5 py-3 rounded shadow-lg w-72 transition-all duration-300">
          <div className="flex justify-between items-center">
            <span className="font-medium oxygen-regular">1 item deleted</span>
            <button onClick={() => setToastVisible(false)} className="text-gray-800 hover:text-gray-900">
              <X size={18} />
            </button>
          </div>
          <div className="mt-2 h-1 bg-red-400 animate-[shrink_4s_linear_forwards]" />
        </div>
      )}

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        .animate-[shrink_4s_linear_forwards] {
          animation: shrink 4s linear forwards;
        }
      `}</style>

      <div className="pt-20 min-h-screen bg-color py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-orange-100 shadow-lg rounded-sm p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-orange-950 rounded-full flex items-center justify-center text-3xl text-orange-100 font-bold shadow-md oxygen-bold">
                  {firstName[0]}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-orange-950 oxygen-bold">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-sm text-gray-600 oxygen-regular">{email}</p>
                  <p className="text-sm oxygen-bold">
                    Role: <span className="font-semibold text-orange-950 oxygen-regular">{role}</span>
                    {isTemporaryAdmin && adminAccessExpiresAt && (
                      <span className="ml-2 text-xs text-red-600 oxygen-regular">
                        (Expires: {new Date(adminAccessExpiresAt).toLocaleDateString()})
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="text-right">
                {/* <button
                  className="px-5 py-1 bg-red-600 text-white rounded shadow hover:bg-red-700 cursor-pointer"
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                >
                  Logout
                </button> */}
                <LogoutButton
                  title="Logout"
                  onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
                />
              </div>
            </div>

            <h3 className="text-xl font-semibold text-orange-900 mb-4 pt-6">Your Activities</h3>

            {activity.length === 0 ? (
              <div className="text-center text-gray-500 py-10 flex flex-col items-center justify-center oxygen-regular">
                <AiOutlineFile className="text-4xl text-gray-400 mb-2" />
                <p>No activity yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto pb-20">
                <table className="min-w-full text-sm border border-gray-200 rounded-sm">
                  <thead className="bg-gray-800 text-orange-100 uppercase text-xs">
                    <tr>
                      <th className="px-4 py-3">Sr.</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3">Mobile</th>
                      <th className="px-4 py-3">Message</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activity.map((act, index) => {
                      const isOpen = openMessages[act._id];
                      return (
                        <React.Fragment key={act._id}>
                          <tr className={`${index % 2 === 0 ? "bg-orange-200" : "bg-orange-50"} hover:bg-orange-300`}>
                            <td className="px-4 py-3 oxygen-regular">{index + 1}</td>
                            <td className="px-4 py-3 oxygen-regular">{act.name} {act.lastName}</td>
                            <td className="px-4 py-3 oxygen-regular">{act.email}</td>
                            <td className="px-4 py-3 capitalize oxygen-regular">{act.role || "user"}</td>
                            <td className="px-4 py-3 oxygen-regular">{act.mobile || "-"}</td>
                            <td className="px-4 py-3 max-w-xs oxygen-regular">
                              <button
                                onClick={() => toggleMessage(act._id)}
                                className="flex items-center text-orange-900 hover:text-orange-950 oxygen-bold cursor-pointer"
                              >
                                <span className="truncate max-w-[130px] inline-block text-left">
                                  {act.message.length > 40 && !isOpen ? `${act.message.slice(0, 40)}...` : act.message}
                                </span>
                                {isOpen ? <ChevronDown className="ml-1 w-4 h-4" /> : <ChevronRight className="ml-1 w-4 h-4" />}
                              </button>
                            </td>
                            <td className="px-4 py-3">
                              {new Date(act.createdAt).toLocaleString("en-IN", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <div className="flex justify-center gap-3">
                                <button title="Edit" onClick={() => navigate(`/activities/edit/${act._id}`)} className="text-blue-600 hover:text-blue-800 cursor-pointer">
                                  <Pencil size={18} />
                                </button>
                                <button title="Delete" onClick={() => handleDelete(act._id)} className="text-red-600 hover:text-red-800 cursor-pointer">
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                          {isOpen && (
                            <tr>
                              <td colSpan="8" className="px-6 py-4 bg-white text-gray-800 oxygen-regular">
                                <strong>Full Message:</strong> {act.message}
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* <div className="flex justify-center pt-5">
              <Link to="/">
                <button className="flex items-center gap-6 pl-4 pr-4 bg-transparent border rounded-sm p-2 hover:bg-gray-900/90 hover:text-white oxygen-regular border-gray-900 text-gray-900 cursor-pointer">
                  <ChevronLeft className="w-4 h-4" /> back to home
                </button>
              </Link>
            </div> */}
          </div>
          <div className="flex justify-center pt-8 gap-3">
              <Link to="/">
                <button className="flex items-center gap-6 pl-4 pr-4 bg-transparent border rounded-sm p-2 hover:bg-gray-900/90 hover:text-white oxygen-regular border-gray-900 text-gray-900 cursor-pointer">
                  <ChevronLeft className="w-4 h-4" /> back to home
                </button>
              </Link>
              <Link to="/contact-us">
                <button className="flex items-center gap-6 pl-4 pr-4 bg-transparent border rounded-sm p-2 hover:bg-gray-900/90 hover:text-white oxygen-regular border-gray-900 text-gray-900 cursor-pointer">
                  Contact us <ChevronRight className="w-4 h-4" /> 
                </button>
              </Link>
            </div>
        </div>

        <Dialog open={showModal} onClose={() => setShowModal(false)} className="relative z-50">
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white p-6 rounded shadow-lg max-w-md w-full">
              <Dialog.Title className="text-lg font-semibold text-red-600 mb-4 oxygen-bold">
                Confirm Deletion
              </Dialog.Title>
              <p className="oxygen-regular">Are you sure you want to delete this activity?</p>
              <div className="mt-6 flex justify-end gap-4">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer oxygen-bold">
                  Cancel
                </button>
                <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer oxygen-bold">
                  Delete
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </div>
  );
};

export default UserActivity;
