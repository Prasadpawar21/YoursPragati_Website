// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "./Navbar";

// export default function EditService() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     icon: "",
//   });

//   const [loading, setLoading] = useState(true);

//   // Fetch existing service data
//   useEffect(() => {
//     fetch(`http://localhost:3000/api/admin-dashboard/services/edit/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setFormData({
//           title: data.service.title,
//           description: data.service.description,
//           icon: data.service.icon,
//         });
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch service:", err);
//         setLoading(false);
//       });
//   }, [id]);

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle update submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`http://localhost:3000/api/admin-dashboard/services/edit/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("Service updated successfully.");
//         navigate("/admin-dashboard/services");
//       } else {
//         alert(`Error: ${data.message}`);
//       }
//     } catch (err) {
//       alert("Server error: " + err.message);
//     }
//   };

//   if (loading) return <div className="text-center mt-20 text-gray-600">Loading service...</div>;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-50 text-gray-800">
//       <Navbar />
//       <div className="pt-20 px-4 md:px-10">
//         <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
//           <h2 className="text-3xl font-bold text-yellow-700 mb-6">Edit Service</h2>

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Title */}
//             <div>
//               <label htmlFor="title" className="block text-sm font-semibold mb-1">
//                 Title
//               </label>
//               <input
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               />
//             </div>

//             {/* Description */}
//             <div>
//               <label htmlFor="description" className="block text-sm font-semibold mb-1">
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows="4"
//                 className="w-full px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               />
//             </div>

//             {/* Icon */}
//             <div>
//               <label htmlFor="icon" className="block text-sm font-semibold mb-1">
//                 Icon (e.g., "FaTools" or "fa-solid fa-user")
//               </label>
//               <input
//                 id="icon"
//                 name="icon"
//                 value={formData.icon}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 font-medium"
//             >
//               Save & Update
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import * as FaIcons from 'react-icons/fa';
// import * as MdIcons from 'react-icons/md';
// import * as BsIcons from 'react-icons/bs';
// import * as IoIcons from 'react-icons/io5';
// import * as RiIcons from 'react-icons/ri';
// import Navbar from './Navbar';

// const iconLibraries = {
//   fa: { name: 'FontAwesome', icons: FaIcons },
//   md: { name: 'Material Design', icons: MdIcons },
//   bs: { name: 'Bootstrap', icons: BsIcons },
//   io: { name: 'Ionicons', icons: IoIcons },
//   ri: { name: 'Remix Icons', icons: RiIcons },
// };

// export default function EditService() {
//   const [iconSet, setIconSet] = useState('fa');
//   const [search, setSearch] = useState('');
//   const [selectedIcon, setSelectedIcon] = useState('');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     // Fetch the service to prefill form
//     const fetchService = async () => {
//       try {
//         const res = await fetch(`http://localhost:3000/api/admin-dashboard/services/edit/${id}`);
//         const data = await res.json();
//         if (res.ok) {
//           setTitle(data.service.title);
//           setDescription(data.service.description);
//           setSelectedIcon(data.service.icon);

//           // Try to guess iconSet from the icon name
//           const foundSet = Object.entries(iconLibraries).find(([_, lib]) =>
//             Object.keys(lib.icons).includes(data.service.icon)
//           );
//           if (foundSet) setIconSet(foundSet[0]);
//         } else {
//           alert('Service not found');
//         }
//       } catch (err) {
//         console.error(err);
//         alert('Error fetching service data');
//       }
//     };
//     fetchService();
//   }, [id]);

//   const currentIcons = iconLibraries[iconSet].icons;
//   const filteredIcons = Object.keys(currentIcons)
//     .filter((name) => name.toLowerCase().includes(search.toLowerCase()))
//     .slice(0, 30);

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!title || !description || !selectedIcon) {
//       alert('All fields are required');
//       return;
//     }

//     try {
//       const res = await fetch(`http://localhost:3000/api/admin-dashboard/services/edit/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ title, description, icon: selectedIcon }),
//       });

//       if (res.ok) {
//         alert('Service updated successfully');
//         navigate('/admin-dashboard/services');
//       } else {
//         const error = await res.json();
//         alert(error.message || 'Failed to update service');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Server error while updating service');
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//     <div className="min-h-screen bg-gray-50 py-6 px-4 pt-20">
//       <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
//         <h1 className="text-3xl font-bold text-blue-900 mb-6">Edit Service</h1>
//         <form onSubmit={handleUpdate} className="space-y-6">
//           {/* Title */}
//           <div>
//             <label className="block font-medium mb-2">Service Title</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Enter service title"
//               className="w-full px-3 py-2 border border-gray-300 rounded"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block font-medium mb-2">Service Description</label>
//             <textarea
//               rows={4}
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Enter service description"
//               className="w-full px-3 py-2 border border-gray-300 rounded"
//             ></textarea>
//           </div>

//           {/* Icon Picker */}
//           <div>
//             <label className="block font-medium mb-2">Select Icon Set</label>
//             <select
//               value={iconSet}
//               onChange={(e) => {
//                 setIconSet(e.target.value);
//                 setSearch('');
//               }}
//               className="w-full px-3 py-2 mb-3 border border-gray-300 rounded"
//             >
//               {Object.entries(iconLibraries).map(([key, lib]) => (
//                 <option key={key} value={key}>
//                   {lib.name}
//                 </option>
//               ))}
//             </select>

//             <label className="block font-medium mb-2">Search Icon</label>
//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search icon name"
//               className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
//             />

//             <div className="grid grid-cols-5 gap-3 max-h-64 overflow-y-auto border p-2 rounded">
//               {filteredIcons.map((iconName) => {
//                 const IconComponent = currentIcons[iconName];
//                 return (
//                   <button
//                     key={iconName}
//                     type="button"
//                     onClick={() => setSelectedIcon(iconName)}
//                     className={`flex flex-col items-center p-2 rounded text-blue-700 hover:bg-blue-100 ${
//                       selectedIcon === iconName ? 'bg-blue-200' : ''
//                     }`}
//                   >
//                     <IconComponent className="text-2xl" />
//                     <span className="text-[10px] text-center">{iconName}</span>
//                   </button>
//                 );
//               })}
//             </div>

//             {selectedIcon && (
//               <div className="mt-3 text-sm text-green-700 font-medium">
//                 Selected Icon: {selectedIcon} ({iconSet})
//               </div>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div>
//             <button
//               type="submit"
//               className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               Save & Update
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io5';
import * as RiIcons from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';
import Navbar from './Navbar';
import { FaArrowLeft } from "react-icons/fa";

const iconLibraries = {
  fa: { name: 'FontAwesome', icons: FaIcons },
  md: { name: 'Material Design', icons: MdIcons },
  bs: { name: 'Bootstrap', icons: BsIcons },
  io: { name: 'Ionicons', icons: IoIcons },
  ri: { name: 'Remix Icons', icons: RiIcons },
};

export default function EditService() {
  const [iconSet, setIconSet] = useState('fa');
  const [search, setSearch] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/admin-dashboard/services/edit/${id}`);
        const data = await res.json();
        if (res.ok) {
          setTitle(data.service.title);
          setDescription(data.service.description);
          setSelectedIcon(data.service.icon);

          const foundSet = Object.entries(iconLibraries).find(([_, lib]) =>
            Object.keys(lib.icons).includes(data.service.icon)
          );
          if (foundSet) setIconSet(foundSet[0]);
        } else {
          alert('Service not found');
        }
      } catch (err) {
        console.error(err);
        alert('Error fetching service data');
      }
    };
    fetchService();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'This field is required*';
    if (!description.trim()) newErrors.description = 'This field is required*';
    if (!selectedIcon) newErrors.icon = 'Please select an icon*';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setTouched({ title: true, description: true, icon: true });
    if (!validate()) return;

    try {
      const res = await fetch(`http://localhost:3000/api/admin-dashboard/services/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title, description, icon: selectedIcon }),
      });

      if (res.ok) {
        setSuccessModalOpen(true);
      } else {
        const error = await res.json();
        alert(error.message || 'Failed to update service');
      }
    } catch (err) {
      console.error(err);
      alert('Server error while updating service');
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const clearErrorOnFocus = (field) => {
    setErrors((prev) => ({ ...prev, [field]: null }));
    setTouched((prev) => ({ ...prev, [field]: false }));
  };

  const currentIcons = iconLibraries[iconSet].icons;
  const filteredIcons = Object.keys(currentIcons)
    .filter((name) => name.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 30);

  const handleOk = () => {
    setSuccessModalOpen(false);
    navigate('/admin-dashboard/services');
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-orange-50 py-6 px-4 pt-20">
        {/* Overlaid Back Button */ }
                <div className="max-w-3xl mx-auto pb-3 pl-1">
                  <button className="relative flex gap-2 transition text-orange-950"
                  onClick={() => navigate(-1)}
                  >
                    <FaArrowLeft />
                  </button>
                </div>
        <div className="max-w-3xl mx-auto bg-orange-100 p-6 rounded-sm shadow-md border border-orange-200">
          <h1 className="text-3xl font-bold text-orange-900 mb-6 oxygen-bold">Edit Service</h1> 
          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block font-medium mb-2 oxygen-regular text-orange-900">Service Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onFocus={() => clearErrorOnFocus('title')}
                onBlur={() => handleBlur('title')}
                placeholder="Enter service title"
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-900 oxygen-regular ${
                  errors.title && touched.title ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.title && touched.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-2 oxygen-regular text-orange-900">Service Description</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onFocus={() => clearErrorOnFocus('description')}
                onBlur={() => handleBlur('description')}
                placeholder="Enter service description"
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-900 oxygen-regular ${
                  errors.description && touched.description ? 'border-red-500' : 'border-gray-300'
                }`}
              ></textarea>
              {errors.description && touched.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>

            {/* Icon Selection */}
            <div>
              <label className="block font-medium mb-2 oxygen-regular text-orange-900">Select Icon Set</label>
              <select
                value={iconSet}
                onChange={(e) => {
                  setIconSet(e.target.value);
                  setSearch('');
                }}
                className="w-full px-3 py-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-900 oxygen-regular"
              >
                {Object.entries(iconLibraries).map(([key, lib]) => (
                  <option key={key} value={key}>
                    {lib.name}
                  </option>
                ))}
              </select>

              <label className="block font-medium mb-2 oxygen-regular text-orange-900">Search Icon</label>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => clearErrorOnFocus('icon')}
                onBlur={() => handleBlur('icon')}
                placeholder="Search icon name"
                className={`w-full px-3 py-2 border mb-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-900 oxygen-regular ${
                  errors.icon && touched.icon ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.icon && touched.icon && (
                <p className="text-red-500 text-sm mt-1">{errors.icon}</p>
              )}

              <div className="grid grid-cols-5 gap-3 max-h-64 overflow-y-auto border p-2 rounded oxygen-bold">
                {filteredIcons.map((iconName) => {
                  const IconComponent = currentIcons[iconName];
                  return (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => {
                        setSelectedIcon(iconName);
                        setSearch(iconName);
                        clearErrorOnFocus('icon');
                      }}
                      className={`flex flex-col items-center p-2 rounded text-orange-900 hover:bg-orange-950/20 oxygen-regular ${
                        selectedIcon === iconName ? 'bg-orange-950/20' : ''
                      }`}
                    >
                      <IconComponent className="text-2xl" />
                      <span className="text-[10px] text-center oxygen-regular">{iconName}</span>
                    </button>
                  );
                })}
              </div>

              {selectedIcon && (
                <div className="mt-3 flex items-center gap-2 text-sm text-green-700 font-medium oxygen-bold">
                  Selected Icon: {selectedIcon} ({iconSet})
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedIcon('');
                      setSearch('');
                      setErrors((prev) => ({ ...prev, icon: 'Please select an icon*' }));
                      setTouched((prev) => ({ ...prev, icon: true }));
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <IoClose className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="px-6 py-2 bg-gray-800/80 text-white rounded hover:bg-gray-800 oxygen-regular"
              >
                Save & Update
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ✅ Success Modal */}
      <Dialog open={successModalOpen} onClose={() => setSuccessModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/10 bg-opacity-10" aria-hidden="true" />
        <div className="relative bg-orange-50 rounded-sm shadow-xl p-6 z-50 w-full max-w-md mx-auto text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
            alt="Success"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h2 className="text-xl font-bold text-green-700 mb-2 oxygen-regular">Service updated successfully!</h2>
          <p className="text-gray-600 mb-5 oxygen-regular">Your service changes have been saved.</p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full oxygen-regular"
              onClick={handleOk}
            >
              OK
            </button>
            <button
              className="border border-gray-400 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-100 oxygen-regular"
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
