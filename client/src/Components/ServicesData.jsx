import React, { useEffect, useState } from 'react';
import { Pencil, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import getIconComponent from '../utils/iconMap';
import { Dialog } from '@headlessui/react';
import { jwtDecode } from 'jwt-decode';
import Navbar from './Navbar';
import { FaArrowLeft } from "react-icons/fa";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [deletingServiceId, setDeletingServiceId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const backendURL = import.meta.env.VITE_BACKEND_URL ; 

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  let isPermAdmin = false;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      isPermAdmin = decoded.role === 'admin' && !decoded.isTemporaryAdmin;
    } catch (error) {
      console.error('Invalid JWT Token:', error);
    }
  }

  const fetchServices = async () => {
    try {
      const res = await fetch(`${backendURL}/api/services`);
      const data = await res.json();
      setServices(Array.isArray(data) ? data : data.services);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  useEffect(() => {
    fetchServices();
    if (!isPermAdmin) setShowMessage(true);
  }, [isPermAdmin]);

  const confirmDelete = async () => {
    try {
      await fetch(`${backendURL}/api/admin-dashboard/services/${deletingServiceId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDeletingServiceId(null);
      fetchServices();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  // Pagination
  const servicesPerPage = 5;
  const totalPages = Math.ceil(services.length / servicesPerPage) || 1;
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(indexOfFirstService, indexOfLastService);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <Navbar />
      <div className="pt-20 min-h-screen bg-color py-6 px-4">
        {/* Overlaid Back Button */ }
                <div className="max-w-6xl mx-auto pb-3 pl-1">
                  <button className="relative flex gap-2 transition text-orange-950"
                  onClick={() => navigate(-1)}
                  >
                    <FaArrowLeft />
                  </button>
                </div>
        <div className="max-w-6xl mx-auto bg-orange-100 p-6 rounded-sm shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-orange-950 oxygen-bold">All Services</h1>
            <button
              onClick={() => isPermAdmin && navigate('/admin-dashboard/services/add-service')}
              className={`flex items-center gap-2 px-4 py-2 rounded bg-gray-800/90 text-white hover:bg-gray-800 cursor-pointer text-sm oxygen-regular ${
                !isPermAdmin && 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!isPermAdmin}
            >
              <Plus size={16} /> Create Service
            </button>
          </div>

          {showMessage && (
            <div className="mb-4 text-red-600 font-semibold oxygen-regular">
              You have limited access as a temporary admin. You cannot edit or delete services.
            </div>
          )}

          <div className="overflow-x-auto rounded-sm border border-gray-200">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-800 uppercase text-xs text-orange-100">
                <tr>
                  <th className="p-3 oxygen-bold">S.NO</th>
                  <th className="p-3 oxygen-bold">ICON</th>
                  <th className="p-3 oxygen-bold">TITLE</th>
                  <th className="p-3 oxygen-bold">DESCRIPTION</th>
                  <th className="p-3 w-[120px] oxygen-bold">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {currentServices.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-6 text-gray-500 oxygen-regular">
                      No services available.
                    </td>
                  </tr>
                ) : (
                  currentServices.map((service, index) => {
                    const Icon = getIconComponent(service.icon);
                    return (
                      <tr
                        key={service._id}
                        className="border-b hover:bg-orange-300 transition duration-300"
                      >
                        <td className="p-3 font-medium oxygen-regular">{indexOfFirstService + index + 1}</td>
                        <td className="p-3 oxygen-regular">{Icon && <Icon className="text-orange-950 text-xl" />}</td>
                        <td className="p-3 font-semibold oxygen-regular">{service.title}</td>
                        <td className="p-3 max-w-[300px] truncate oxygen-regular">{service.description}</td>
                        <td className="p-3 w-[120px] flex gap-2 items-center oxygen-regular">
                          <button
                            onClick={() =>
                              isPermAdmin &&
                              navigate(`/admin-dashboard/services/edit/${service._id}`)
                            }
                            className={`text-blue-600 hover:text-blue-800 cursor-pointer ${
                              !isPermAdmin && 'opacity-50 cursor-not-allowed'
                            }`}
                            disabled={!isPermAdmin}
                          >
                            <Pencil size={18} />
                          </button>
                          <button
                            onClick={() => isPermAdmin && setDeletingServiceId(service._id)}
                            className={`text-red-600 hover:text-red-800 cursor-pointer ${
                              !isPermAdmin && 'opacity-50 cursor-not-allowed'
                            }`}
                            disabled={!isPermAdmin}
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Always visible pagination */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-2 py-1 text-orange-100 bg-gray-800/80 rounded hover:bg-gray-800 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>

            <span className="text-sm text-gray-800 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-2 py-1 text-orange-100 bg-gray-800/80 rounded hover:bg-gray-800 disabled:opacity-50"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Delete Modal */}
          <Dialog open={!!deletingServiceId} onClose={() => setDeletingServiceId(null)} className="relative z-50">
            <div className="fixed inset-0 bg-black/10" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="bg-orange-50 p-6 rounded-sm shadow-xl w-full max-w-md border border-gray-200">
                <Dialog.Title className="text-lg font-bold mb-4 text-red-600 oxygen-bold  ">
                  Confirm Deletion
                </Dialog.Title>
                <p className="text-gray-700 oxygen-regular">
                  Are you sure you want to delete this service?
                </p>
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    onClick={() => setDeletingServiceId(null)}
                    className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer oxygen-regular "
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
      </div>
    </div>
  );
}

