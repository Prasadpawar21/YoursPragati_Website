// TeamsData.jsx
import React, { useEffect, useState } from "react";
import { Trash2, Pencil, Plus } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function TeamsData() {
  const [teams, setTeams] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const entriesPerPage = 10;
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL ; 

  useEffect(() => {
    fetch(`${backendURL}/api/admin-dashboard/teams`)
      .then((res) => res.json())
      .then((data) => setTeams(data || []))
      .catch((err) => console.error("Failed to fetch teams:", err));
  }, []);

  const filteredTeams = teams.filter(
    (member) =>
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.role.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * entriesPerPage;
  const indexOfFirst = indexOfLast - entriesPerPage;
  const currentTeams = filteredTeams.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTeams.length / entriesPerPage);

  const handleDeleteClick = (team) => {
    setSelectedTeam(team);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${backendURL}/api/admin-dashboard/teams/${selectedTeam._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Member "${selectedTeam.name}" deleted.`);
        setTeams(teams.filter((t) => t._id !== selectedTeam._id));
      } else {
        alert(`Error: ${data.message || "Could not delete member."}`);
      }
    } catch (err) {
      alert("Server error while deleting member: " + err.message);
    }
    setIsModalOpen(false);
    setSelectedTeam(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 text-gray-800">
      <Navbar />
      <div className="pt-20 px-4 md:px-10">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-700">Team Members</h2>
            <button
              onClick={() => navigate("/admin-dashboard/teams/add")}
              className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
            >
              <Plus className="w-5 h-5" /> Add Member
            </button>
          </div>

          <input
            type="text"
            placeholder="Search by name or role"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-6 w-full md:w-1/2 px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
          />

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm text-left border-separate border-spacing-y-2">
              <thead className="bg-gray-200 text-gray-900 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-4 py-3">S.No</th>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3">Instagram</th>
                  <th className="px-6 py-3">Twitter</th>
                  <th className="px-6 py-3">LinkedIn</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTeams.map((member, index) => (
                  <tr
                    key={member._id}
                    className={`rounded-md transition ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
                  >
                    <td className="px-4 py-3 font-medium">
                      {(currentPage - 1) * entriesPerPage + index + 1}
                    </td>
                    <td className="px-6 py-3">
                      <img
                        src={member.imageUrl}
                        alt="team"
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-3">{member.name}</td>
                    <td className="px-6 py-3">{member.role}</td>
                    <td className="px-6 py-3 truncate text-blue-600 underline">
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer">Profile</a>
                    </td>
                    <td className="px-6 py-3 truncate text-blue-600 underline">
                      <a href={member.twitter} target="_blank" rel="noopener noreferrer">Profile</a>
                    </td>
                    <td className="px-6 py-3 truncate text-blue-600 underline">
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer">Profile</a>
                    </td>
                    <td className="px-6 py-3 text-center flex gap-3 items-center">
                      <button
                        onClick={() => navigate(`/admin-dashboard/teams/edit/${member._id}`)}
                        className="text-gray-600 hover:text-gray-800 transition"
                        title="Edit"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(member)}
                        className="text-red-600 hover:text-red-800 transition"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm text-gray-800 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <Dialog.Title className="text-lg font-bold mb-4 text-red-600">
              Confirm Deletion
            </Dialog.Title>
            <p>
              Are you sure you want to delete team member {" "}
              <strong>{selectedTeam?.name}</strong>?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
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
