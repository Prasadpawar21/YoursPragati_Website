//DataCollection page === Work-on-Field Page
import React, { useEffect, useState } from "react";
import { Trash2, Pencil, Plus } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { FaArrowLeft } from "react-icons/fa";

export default function FieldWork() {
  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const entriesPerPage = 5;
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    fetch(`${backendURL}/api/admin-dashboard/field-work`)
      .then((res) => res.json())
      .then((data) => setEntries(data.images || []))
      .catch((err) => console.error("Failed to fetch entries:", err));
  }, []);

  const filteredEntries = entries.filter((entry) =>
    entry.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);

  const handleDeleteClick = (entry) => {
    setSelectedEntry(entry);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${backendURL}/api/admin-dashboard/field-work/${selectedEntry._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Entry "${selectedEntry.title}" deleted.`);
        setEntries(entries.filter((e) => e._id !== selectedEntry._id));
      } else {
        alert(`Error: ${data.message || "Could not delete entry."}`);
      }
    } catch (err) {
      alert("Server error while deleting entry: " + err.message);
    }
    setIsModalOpen(false);
    setSelectedEntry(null);
  };

  const handleEdit = (id) => {
    navigate(`/admin-dashboard/field-work/edit/${id}`);
  };

  const handleCreate = () => {
    navigate("/admin-dashboard/field-work/create");
  };

  return (
    <div className="min-h-screen bg-color text-gray-800">
      <Navbar />
      <div className="pt-20 px-4 md:px-10 pb-10">
        <div className="max-w-6xl mx-auto pb-3 pl-1">
                  <button className="relative flex gap-2 transition text-orange-950"
                  onClick={() => navigate(-1)}
                  >
                    <FaArrowLeft />
                  </button>
                </div>
        <div className="max-w-6xl mx-auto bg-orange-100 rounded-sm shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-orange-950 oxygen-bold">Field Work</h2>
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900/90 text-white rounded-sm hover:bg-gray-900 cursor-pointer"
            >
              <Plus className="w-5 h-5" /> Add Image
            </button>
          </div>

          <input
            type="text"
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-6 w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-950 oxygen-regular"
          />

          <div className="overflow-x-auto">
            <table className="w-full rounded-sm border border-gray-200 text-sm text-left border-separate border-spacing-y-0 oxygen-bold">
              <thead className="bg-gray-800 text-orange-100 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-4 py-3">S.No</th>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Uploaded At</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEntries.map((entry, index) => (
                  <tr
                    key={entry._id}
                    className={`rounded-md transition ${
                      index % 2 === 0 ? "bg-oragne-50" : "bg-orange-200"
                    } hover:bg-orange-300`}
                  >
                    <td className="px-4 py-3 font-medium">
                      {(currentPage - 1) * entriesPerPage + index + 1}
                    </td>
                    <td className="px-6 py-3">
                      <img
                        src={entry.imageUrl}
                        alt="field"
                        className="h-12 w-20 object-cover rounded-sm"
                      />
                    </td>
                    <td className="px-6 py-3 oxygen-regular">{entry.title}</td>
                    <td className="px-6 py-3 oxygen-regular">
                      {entry.createdAt
                        ? new Date(entry.createdAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "N/A"}
                    </td>
                    <td className="px-6 py-3 text-center flex gap-3 items-center oxygen-regular">
                      <button
                        onClick={() => handleEdit(entry._id)}
                        className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
                        title="Edit"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(entry)}
                        className="text-red-600 hover:text-red-800 transition cursor-pointer" 
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
              className="flex items-center gap-1 px-3 py-1 text-orange-100 bg-gray-800/80  rounded hover:bg-gray-800 disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm text-gray-950 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1  text-orange-100 bg-gray-800/80 rounded hover:bg-gray-800 disabled:opacity-50"
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
              Are you sure you want to delete field entry {" "}
              <strong>{selectedEntry?.title}</strong>?
            </p>
            <div className="mt-6 flex justify-end gap-4">
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
