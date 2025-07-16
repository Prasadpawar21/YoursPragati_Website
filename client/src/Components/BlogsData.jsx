import React, { useEffect, useState } from "react";
import { Trash2, Pencil, Plus , ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { FaArrowLeft } from "react-icons/fa";

export default function BlogsData() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const blogsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/admin-dashboard/blog-data")
      .then((res) => res.json())
      .then((data) => setBlogs(data.blogs || []))
      .catch((err) => console.error("Failed to fetch blogs:", err));
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const title = blog.title.toLowerCase();
    const tags = (blog.tags || []).join(" ").toLowerCase();
    return (
      title.includes(search.toLowerCase()) ||
      tags.includes(search.toLowerCase())
    );
  });

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const handleDeleteClick = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/admin-dashboard/blog-data/${selectedBlog._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        alert(`Blog "${selectedBlog.title}" deleted.`);
        setBlogs(blogs.filter((b) => b._id !== selectedBlog._id));
      } else {
        alert(`Error: ${data.message || "Could not delete blog."}`);
      }
    } catch (err) {
      alert("Server error while deleting blog: " + err.message);
    }
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  const handleEdit = (id) => {
    navigate(`/admin-dashboard/blogs-data/edit-blog/${id}`);
  };

  const handleCreate = () => {
    navigate("/admin-dashboard/blogs-data/create-blog");
  };

  const stripHTML = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
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
        <div className="max-w-6xl mx-auto bg-orange-100 rounded-sm shadow-lg p-6 bg-orange-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-orange-950 oxygen-bold">All Blogs</h2>
            <button
              onClick={handleCreate}
              className="flex cursor-pointer items-center gap-2 px-6 py-2 bg-gray-900/90 text-white hover:bg-gray-900 cursor-pointer text-sm oxygen-regular rounded-sm"
            >
              <Plus className="w-5 h-5" /> Create Blog
            </button>
          </div>

          <input
            type="text"
            placeholder="Search by title or tag"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-6 w-full md:w-1/2 px-4 py-2 border border-orange-950 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-950 oxygen-regular"
          />

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 text-sm rounded-sm text-left  border-spacing-y-2">
              <thead className="bg-gray-900 text-orange-100 uppercase text-xs font-semibold rounded-sm oxygen-bold">
                <tr>
                  <th className="px-4 py-3">S.No</th>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Description</th>
                  <th className="px-6 py-3">Tags</th>
                  <th className="px-6 py-3">Created At</th>
                  <th className="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentBlogs.map((blog, index) => (
                  <tr
                    key={blog._id}
                    className={`rounded-md transition ${
                      index % 2 === 0 ? "bg-orange-50" : "bg-orange-200"
                    } hover:bg-orange-300`}
                  >
                    <td className="px-4 py-3 font-medium oxygen-regular">
                      {(currentPage - 1) * blogsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-3">
                      <img
                        src={blog.imageUrl}
                        alt="blog"
                        className="h-12 w-20 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-3 oxygen-regular">{blog.title}</td>
                    <td className="px-6 py-3 oxygen-regular">
                      {stripHTML(blog.description).slice(0, 80)}...
                    </td>
                    <td className="px-6 py-3 oxygen-regular">
                      {blog.tags && blog.tags.length > 0 ? blog.tags.join(", ") : "-"}
                    </td>
                    <td className="px-6 py-3 oxygen-regular">
                      {blog.createdAt
                        ? new Date(blog.createdAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })
                        : "N/A"}
                    </td>
                    <td className="px-6 py-3 text-center flex gap-3 items-center oxygen-regular">
                      <button
                        onClick={() => handleEdit(blog._id)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer transition"
                        title="Edit"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(blog)}
                        className="text-red-600 hover:text-red-800 cursor-pointer transition"
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
              className="flex cursor-pointer items-center gap-1 px-3 py-1 text-orange-100 bg-gray-800/80 rounded hover:bg-gray-800 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>

            <span className="text-sm text-gray-950 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex cursor-pointer items-center gap-1 px-3 py-1 text-orange-100 bg-gray-800/80 rounded hover:bg-gray-800 disabled:opacity-50"
            >
              Next<ChevronRight className="w-4 h-4" />
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
              Are you sure you want to delete blog{" "}
              <strong>{selectedBlog?.title}</strong>?
            </p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer text-gray-700"
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
