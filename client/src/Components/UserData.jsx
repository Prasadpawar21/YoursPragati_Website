import React, { useEffect, useState } from "react";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog } from "@headlessui/react";
import Navbar from "./Navbar";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



export default function AdminUsersPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const usersPerPage = 5;

  useEffect(() => {
    fetch("http://localhost:3000/api/admin-dashboard/users")
      .then((res) => res.json())
      .then((data) => {setUsers(data.users || []) ; console.log("Fetched users:", data);})
      .catch((err) => console.error("Failed to fetch users:", err));
  }, []);

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/admin-dashboard/users/${selectedUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        alert(`User ${selectedUser.firstName} (${selectedUser.email}) deleted.`);
        setUsers(users.filter((u) => u._id !== selectedUser._id));
      } else {
        alert(`Error: ${data.message || "Could not delete user."}`);
      }
    } catch (err) {
      alert("Server error while deleting user : " + err.message);
    }
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-color text-gray-800">
      <Navbar />

      <div className="pt-20 px-4 md:px-10 pb-10">
        {/* Overlaid Back Button */ }
        <div className="max-w-6xl mx-auto pb-3 pl-1">
          <button className="relative flex gap-2 transition text-orange-950"
          onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
          </button>
        </div>
        
        <div className="max-w-6xl mx-auto bg-orange-100 rounded-sm shadow-lg p-6">
          <h2 className="text-3xl font-bold text-orange-950 mb-6 oxygen-bold">Registered Users</h2>

          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-6 w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-950 oxygen-regular"
          />

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm text-left border-separate border-spacing-y-0 rounded-sm">
              <thead className="bg-gray-800 text-orange-100 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-4 py-3 oxygen-bold">S.No</th>
                  <th className="px-6 py-3 oxygen-bold">First Name</th>
                  <th className="px-6 py-3 oxygen-bold">Last Name</th>
                  <th className="px-6 py-3 oxygen-bold">Email</th>
                  <th className="px-6 py-3 oxygen-bold">Role</th>
                  <th className="px-6 py-3 oxygen-bold">Registration Date</th>
                  <th className="px-6 py-3 oxygen-bold">Admin Access Duration</th>
                  <th className="px-6 py-3 text-center oxygen-bold">Action</th>
                </tr>
              </thead>
              {/* <tbody>
                {currentUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`rounded-md transition ${
                      index % 2 === 0 ? "bg-blue-50" : "bg-white"
                    } hover:bg-blue-100`}
                  >
                    <td className="px-4 py-3 font-medium">
                      {(currentPage - 1) * usersPerPage + index + 1}
                    </td>
                    <td className="px-6 py-3">{user.firstName}</td>
                    <td className="px-6 py-3">{user.lastName}</td>
                    <td className="px-6 py-3">{user.email}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          user.role === "admin"
                            ? "bg-green-100 text-green-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      {user.createdAt
                        ? new Date(user.createdAt.$date || user.createdAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "N/A"}
                    </td>
                    <td className="px-6 py-3">
                      {user.role === "admin"
                        ? user.adminAccessExpiresAt
                          ? `Until ${new Date(user.adminAccessExpiresAt).toLocaleDateString()}`
                          : "Permanent"
                        : "-"}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody> */}
              <tbody>
                {currentUsers.map((user, index) => {
                  const isPermanentAdmin = user.role === "admin" && !user.isTemporaryAdmin;
                  return (
                    <tr
                      key={user._id}
                      className={`rounded-md transition oxygen-regular ${
                        index % 2 === 0 ? "bg-orange-200" : "bg-orange-50"
                      } hover:bg-orange-300`}
                    >
                      <td className="px-4 py-3 font-medium">
                        {(currentPage - 1) * usersPerPage + index + 1}
                      </td>
                      <td className="px-6 py-3">{user.firstName}</td>
                      <td className="px-6 py-3">{user.lastName}</td>
                      <td className="px-6 py-3">{user.email}</td>
                      <td className="px-6 py-3">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            user.role === "admin"
                              ? "bg-green-100 text-green-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        {user.createdAt
                          ? new Date(user.createdAt.$date || user.createdAt).toLocaleString(
                              "en-IN",
                              {
                                dateStyle: "medium",
                                timeStyle: "short",
                              }
                            )
                          : "N/A"}
                      </td>
                      <td className="px-6 py-3">
                        {user.role === "admin"
                          ? user.adminAccessExpiresAt
                            ? `Until ${new Date(
                                user.adminAccessExpiresAt
                              ).toLocaleDateString()}`
                            : "Permanent"
                          : "-"}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <button
                          onClick={() => handleDeleteClick(user)}
                          disabled={isPermanentAdmin}
                          title={
                            isPermanentAdmin
                              ? "Restricted"
                              : "Delete this user"
                          }
                          className={`${
                            isPermanentAdmin
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-red-600 hover:text-red-800 cursor-pointer transition"
                          }`}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6 oxygen-regular">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex cursor-pointer items-center gap-1 px-2 py-1 text-gray-100 bg-gray-800/80 rounded hover:bg-gray-800 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>

            <span className="text-sm text-gray-800 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex cursor-pointer items-center gap-1 px-2 py-1 text-gray-100 bg-gray-800/80 rounded hover:bg-gray-800 disabled:opacity-50"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-orange-50 p-6 rounded shadow-lg w-full max-w-md">
            <Dialog.Title className="text-lg font-bold mb-4 text-red-600 oxygen-bold">
              Confirm Deletion
            </Dialog.Title>
            <p className="oxygen-regular">
              Are you sure you want to delete user{" "}
              <strong>{selectedUser?.firstName}</strong> with email{" "}
              <strong>{selectedUser?.email}</strong>?
            </p>
            <div className="mt-6 flex justify-end gap-4 oxygen-regular">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
