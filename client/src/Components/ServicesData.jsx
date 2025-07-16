// import React, { useEffect, useState } from 'react';
// import { Pencil, Trash2, Plus } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import getIconComponent from '../utils/iconMap';
// import { Dialog } from '@headlessui/react';
// import { jwtDecode } from 'jwt-decode';
// import Navbar from './Navbar';

// export default function AdminServices() {
//   const [services, setServices] = useState([]);
//   const [showMessage, setShowMessage] = useState(false);
//   const [deletingServiceId, setDeletingServiceId] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);

//   const navigate = useNavigate();

//   const token = localStorage.getItem('token');
//   let isPermAdmin = false;

//   if (token) {
//     try {
//       const decoded = jwtDecode(token);
//       isPermAdmin = decoded.role === 'admin' && !decoded.isTemporaryAdmin;
//     } catch (error) {
//       console.error('Invalid JWT Token:', error);
//     }
//   }

//   const fetchServices = async () => {
//     try {
//       const res = await fetch('http://localhost:3000/api/services');
//       const data = await res.json();
//       // Assuming response is an array
//       setServices(Array.isArray(data) ? data : data.services);
//     } catch (error) {
//       console.error('Error fetching services:', error);
//     }
//   };

//   useEffect(() => {
//     fetchServices();
//     if (!isPermAdmin) setShowMessage(true);
//   }, [isPermAdmin]);

//   const confirmDelete = async () => {
//     try {
//       await fetch(`http://localhost:3000/api/services/${deletingServiceId}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setDeletingServiceId(null);
//       fetchServices();
//     } catch (error) {
//       console.error('Error deleting service:', error);
//     }
//   };

//   // Pagination
//   const servicesPerPage = 10;
//   const totalPages = Math.ceil(services.length / servicesPerPage);
//   const indexOfLastService = currentPage * servicesPerPage;
//   const indexOfFirstService = indexOfLastService - servicesPerPage;
//   const currentServices = services.slice(indexOfFirstService, indexOfLastService);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   return (
//     <div>
//       <Navbar />
//     <div className="pt-20 min-h-screen bg-blue-50 py-6 px-4">
//       <div className="max-w-7xl mx-auto bg-white p-6 rounded-sm shadow-md">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-blue-900">All Services</h1>
//           <button
//             onClick={() => isPermAdmin && navigate('/admin-dashboard/services/add-service')}
//             className={`flex items-center gap-2 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer text-sm ${
//               !isPermAdmin && 'opacity-50 cursor-not-allowed'
//             }`}
//             disabled={!isPermAdmin}
//           >
//             <Plus size={16} /> Create Service
//           </button>
//         </div>

//         {showMessage && (
//           <div className="mb-4 text-red-600 font-semibold">
//             You have limited access as a temporary admin. You cannot edit or delete services.
//           </div>
//         )}

//         <div className="overflow-x-auto rounded-sm border border-gray-200">
//           <table className="w-full text-sm text-left text-gray-700">
//             <thead className="bg-blue-100 uppercase text-xs text-gray-700">
//               <tr>
//                 <th className="p-4">S.NO</th>
//                 <th className="p-4">ICON</th>
//                 <th className="p-4">TITLE</th>
//                 <th className="p-4">DESCRIPTION</th>
//                 <th className="p-4 w-[120px]">ACTION</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentServices.length === 0 ? (
//                 <tr>
//                   <td colSpan="5" className="text-center p-6 text-gray-500">
//                     No services available.
//                   </td>
//                 </tr>
//               ) : (
//                 currentServices.map((service, index) => {
//                   const Icon = getIconComponent(service.icon);
//                   return (
//                     <tr
//                       key={service._id}
//                       className="border-b hover:bg-blue-50 transition duration-300"
//                     >
//                       <td className="p-4 font-medium">{indexOfFirstService + index + 1}</td>
//                       <td className="p-4">
//                         {Icon && <Icon className="text-blue-600 text-xl" />}
//                       </td>
//                       <td className="p-4 font-semibold">{service.title}</td>
//                       <td className="p-4 max-w-[300px] truncate">{service.description}</td>
//                       <td className="p-4 w-[120px] flex gap-2 items-center">
//                         <button
//                           onClick={() =>
//                             isPermAdmin && navigate(`/admin-dashboard/services/edit/${service._id}`)
//                           }
//                           className={`text-blue-600 hover:text-blue-800 cursor-pointer ${
//                             !isPermAdmin && 'opacity-50 cursor-not-allowed'
//                           }`}
//                           disabled={!isPermAdmin}
//                         >
//                           <Pencil size={18} />
//                         </button>
//                         <button
//                           onClick={() => isPermAdmin && setDeletingServiceId(service._id)}
//                           className={`text-red-600 hover:text-red-800 cursor-pointer ${
//                             !isPermAdmin && 'opacity-50 cursor-not-allowed'
//                           }`}
//                           disabled={!isPermAdmin}
//                         >
//                           <Trash2 size={18} />
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         {services.length > servicesPerPage && (
//           <div className="flex justify-center mt-4 gap-4 text-sm font-medium">
//             <button
//               onClick={handlePrevPage}
//               disabled={currentPage === 1}
//               className={`px-4 py-1 rounded ${
//                 currentPage === 1
//                   ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
//                   : 'bg-blue-500 text-white hover:bg-blue-600'
//               }`}
//             >
//               Prev
//             </button>
//             <span className="text-blue-800">Page {currentPage} of {totalPages}</span>
//             <button
//               onClick={handleNextPage}
//               disabled={currentPage === totalPages}
//               className={`px-4 py-1 rounded ${
//                 currentPage === totalPages
//                   ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
//                   : 'bg-blue-500 text-white hover:bg-blue-600'
//               }`}
//             >
//               Next
//             </button>
//           </div>
//         )}

//         {/* Delete Modal */}
//         <Dialog open={!!deletingServiceId} onClose={() => setDeletingServiceId(null)} className="relative z-50">
//           {/* Light overlay */}
//           <div className="fixed inset-0 bg-black/10" aria-hidden="true" />

//           <div className="fixed inset-0 flex items-center justify-center p-4">
//             <Dialog.Panel className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md border border-gray-200">
//               <Dialog.Title className="text-lg font-bold mb-4 text-red-600">
//                 Confirm Deletion
//               </Dialog.Title>
//               <p className="text-gray-700">
//                 Are you sure you want to delete this service?
//               </p>
//               <div className="mt-6 flex justify-end gap-4">
//                 <button
//                   onClick={() => setDeletingServiceId(null)}
//                   className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 cursor-pointer"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={confirmDelete}
//                   className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </Dialog.Panel>
//           </div>
//         </Dialog>
//       </div>
//     </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { Trash2, Edit, ChevronLeft, ChevronRight } from "lucide-react";
// import { Dialog } from "@headlessui/react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";

// export default function AdminServicesPage() {
//   const [services, setServices] = useState([]);
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedService, setSelectedService] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const navigate = useNavigate();
//   const itemsPerPage = 6;

//   useEffect(() => {
//     fetch("http://localhost:3000/api/services")
//       .then((res) => res.json())
//       .then((data) => {
//         setServices(data.services || []);
//         console.log("Fetched services:", data.services);
//       })
//       .catch((err) => console.error("Error fetching services:", err));
//   }, []);

//   const handleDeleteClick = (service) => {
//     setSelectedService(service);
//     setIsModalOpen(true);
//   };

//   const confirmDelete = async () => {
//     try {
//       const res = await fetch(
//         `http://localhost:3000/api/admin-dashboard/services/${selectedService._id}`,
//         { method: "DELETE" }
//       );
//       const data = await res.json();
//       if (res.ok) {
//         alert(`Service "${selectedService.title}" deleted.`);
//         setServices(services.filter((s) => s._id !== selectedService._id));
//       } else {
//         alert(data.message || "Error deleting service.");
//       }
//     } catch (err) {
//       alert("Server error: " + err.message);
//     }
//     setIsModalOpen(false);
//     setSelectedService(null);
//   };

//   const filteredServices = services.filter((s) =>
//     s.title?.toLowerCase().includes(search.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredServices.length / itemsPerPage) || 1;
//   const paginatedServices = filteredServices.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white text-gray-800">
//       <Navbar />
//       <div className="pt-20 px-4 md:px-10">
//         <div className="max-w-6xl mx-auto bg-white rounded-sm shadow-lg p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-3xl font-bold text-blue-700">Services</h2>
//             <button
//               onClick={() => navigate("/admin-dashboard/services/add-service")}
//               className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Add Service
//             </button>
//           </div>

//           {/* Search Bar */}
//           <div className="mb-6">
//             <input
//               type="text"
//               placeholder="Search by service title..."
//               value={search}
//               onChange={(e) => {
//                 setSearch(e.target.value);
//                 setCurrentPage(1);
//               }}
//               className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
//             />
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto mb-10">
//             <table className="w-full border border-separate border-spacing-y-2 text-sm">
//               <thead className="bg-blue-100 text-blue-900 uppercase text-xs font-semibold">
//                 <tr>
//                   <th className="px-4 py-3">S.No</th>
//                   <th className="px-6 py-3">Icon</th>
//                   <th className="px-6 py-3">Title</th>
//                   <th className="px-6 py-3">Description</th>
//                   <th className="px-6 py-3 text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paginatedServices.length === 0 ? (
//                   <tr>
//                     <td colSpan="5" className="text-center py-6 text-gray-500">
//                       No results found.
//                     </td>
//                   </tr>
//                 ) : (
//                   paginatedServices.map((service, index) => (
//                     <tr
//                       key={service._id}
//                       className={`rounded-md ${
//                         index % 2 === 0 ? "bg-blue-50" : "bg-white"
//                       } hover:bg-blue-100 transition`}
//                     >
//                       <td className="px-4 py-3 font-medium">
//                         {(currentPage - 1) * itemsPerPage + index + 1}
//                       </td>
//                       <td className="px-6 py-3">
//                         <div
//                           dangerouslySetInnerHTML={{ __html: service.icon }}
//                           className="text-xl"
//                         />
//                       </td>
//                       <td className="px-6 py-3">{service.title}</td>
//                       <td className="px-6 py-3 max-w-xs truncate">{service.description}</td>
//                       <td className="px-6 py-3 text-center flex items-center justify-center gap-4">
//                         <button
//                           onClick={() =>
//                             navigate(`/admin-dashboard/services/edit-service/${service._id}`)
//                           }
//                           className="text-blue-600 hover:text-blue-800"
//                           title="Edit Service"
//                         >
//                           <Edit className="w-5 h-5" />
//                         </button>
//                         <button
//                           onClick={() => handleDeleteClick(service)}
//                           className="text-red-600 hover:text-red-800"
//                           title="Delete Service"
//                         >
//                           <Trash2 className="w-5 h-5" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-between items-center mt-6">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="flex items-center gap-1 px-3 py-2 text-blue-600 bg-blue-100 rounded hover:bg-blue-200 disabled:opacity-50"
//             >
//               <ChevronLeft className="w-4 h-4" /> Prev
//             </button>

//             <span className="text-sm text-blue-800 font-medium">
//               Page {currentPage} of {totalPages}
//             </span>

//             <button
//               onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="flex items-center gap-1 px-3 py-2 text-blue-600 bg-blue-100 rounded hover:bg-blue-200 disabled:opacity-50"
//             >
//               Next <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Delete Modal */}
//       <Dialog
//         open={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         className="relative z-50"
//       >
//         <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//         <div className="fixed inset-0 flex items-center justify-center p-4">
//           <Dialog.Panel className="bg-white p-6 rounded shadow-lg w-full max-w-md">
//             <Dialog.Title className="text-lg font-bold mb-4 text-red-600">
//               Confirm Deletion
//             </Dialog.Title>
//             <p>
//               Are you sure you want to delete the service{" "}
//               <strong>{selectedService?.title}</strong>?
//             </p>
//             <div className="mt-6 flex justify-end gap-4">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
//               >
//                 Delete
//               </button>
//             </div>
//           </Dialog.Panel>
//         </div>
//       </Dialog>
//     </div>
//   );
// }


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
      const res = await fetch('http://localhost:3000/api/services');
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
      await fetch(`http://localhost:3000/api/admin-dashboard/services/${deletingServiceId}`, {
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

