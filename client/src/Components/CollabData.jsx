import React, { useEffect, useState } from "react";
import { Trash2, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { Dialog } from "@headlessui/react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function AdminCollabPage() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const backendURL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    fetch(`${backendURL}/api/admin-dashboard/collab`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched collab data:", data);
        setContacts(data.collaborations || []);
      })
      .catch((err) =>
        console.error("Failed to fetch collaborations:", err)
      );
  }, []);

  const toggleMessage = (id) => {
    setExpandedRow((prev) => (prev === id ? null : id));
  };

  const handleDeleteClick = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(
        `${backendURL}/api/admin-dashboard/collab/${selectedContact._id}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (res.ok) {
        alert(`Contact by ${selectedContact.name} deleted.`);
        setContacts(
          contacts.filter((c) => c._id !== selectedContact._id)
        );
      } else {
        alert(data.message || "Error deleting contact.");
      }
    } catch (err) {
      alert("Server error: " + err.message);
    }
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const filteredContacts = contacts.filter((c) => {
    const query = searchQuery.toLowerCase();
    return (
      c.name?.toLowerCase().includes(query) ||
      c.lastName?.toLowerCase().includes(query) ||
      c.email?.toLowerCase().includes(query) ||
      c.mobile?.toLowerCase().includes(query) ||
      c.role?.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage) || 1;
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-orange-50 text-gray-800">
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
          <h2 className="text-3xl font-bold text-orange-950 mb-4 oxygen-bold">
            Collaborations
          </h2>

          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by name, email, mobile or role..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-950 oxygen-regular"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-sm text-sm border-separate border-spacing-y-0">
              <thead className="bg-gray-800 text-orange-100 text-xs font-semibold uppercase">
                <tr>
                  <th className="px-4 py-3 oxygen-bold">S.No</th>
                  <th className="px-4 py-3 oxygen-bold">First Name</th>
                  <th className="px-4 py-3 oxygen-bold">Last Name</th>
                  <th className="px-4 py-3 oxygen-bold">Email</th>
                  <th className="px-4 py-3 oxygen-bold">Mobile</th>
                  <th className="px-4 py-3 oxygen-bold">Role</th>
                  <th className="px-4 py-3 oxygen-bold">Message</th>
                  <th className="px-4 py-3 oxygen-bold">Date</th>
                  <th className="px-4 py-3 text-center oxygen-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedContacts.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-6 text-gray-500 oxygen-regular">
                      No results found.
                    </td>
                  </tr>
                ) : (
                  paginatedContacts.map((contact, index) => {
                    const isOpen = expandedRow === contact._id;
                    return (
                      <React.Fragment key={contact._id}>
                        <tr
                          className={`rounded-md ${
                            index % 2 === 0 ? "bg-orange-50" : "bg-orange-200"
                          } hover:bg-orange-300`}
                        >
                          <td className="px-4 py-3 font-medium oxygen-regular" >
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </td>
                          <td className="px-4 py-3 oxygen-regular">{contact.name}</td>
                          <td className="px-4 py-3 oxygen-regular">{contact.lastName}</td>
                          <td className="px-4 py-3 oxygen-regular">{contact.email}</td>
                          <td className="px-4 py-3 oxygen-regular">
                            {contact.mobile || "N/A"}
                          </td>
                          <td className="px-4 py-3 oxygen-regular">{contact.role}</td>
                          <td className="px-4 py-3 max-w-xs oxygen-bold">
                            <button
                              onClick={() => toggleMessage(contact._id)}
                              className="flex items-center text-gray-800/90 hover:text-gray-800 cursor-pointer focus:outline-none"
                            >
                              <span className="truncate max-w-[130px] inline-block text-left">
                                {contact.message.length > 40
                                  ? `${contact.message.slice(0, 40)}...`
                                  : contact.message}
                              </span>
                              {isOpen ? (
                                <ChevronDown className="ml-1 w-4 h-4" />
                              ) : (
                                <ChevronRight className="ml-1 w-4 h-4" />
                              )}
                            </button>
                          </td>
                          <td className="px-4 py-3">
                            {new Date(contact.createdAt).toLocaleString(
                              "en-IN",
                              {
                                dateStyle: "medium",
                                timeStyle: "short",
                              }
                            )}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => handleDeleteClick(contact)}
                              className="text-red-600 hover:text-red-800 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                        {isOpen && (
                          <tr className="bg-white border-t">
                            <td
                              colSpan="9"
                              className="px-6 py-3 text-sm text-gray-700 bg-white rounded-sm oxygen-regular"
                            >
                              <strong className="oxygen-bold">Full Message:</strong> {contact.message}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination (always visible) */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex cursor-pointer items-center gap-1 px-2 py-1 text-gray-100 bg-gray-800/80 rounded hover:bg-gray-800 disabled:opacity-50 oxygen-regular"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>

            <span className="text-sm text-gray-800 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex cursor-pointer items-center gap-1 px-2 py-1 text-orange-100 bg-gray-800/80 rounded hover:bg-gray-800 disabled:opacity-50"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-orange-50 p-6 rounded shadow-lg w-full max-w-md">
            <Dialog.Title className="text-lg font-bold mb-4 text-red-600 oxygen-bold">
              Confirm Deletion
            </Dialog.Title>
            <p className="oxygen-regular">
              Are you sure you want to delete the message from{" "}
              <strong >{selectedContact?.name}</strong> (
              <strong>{selectedContact?.email}</strong>)?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer oxygen-regular"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer oxygen-regular"
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
