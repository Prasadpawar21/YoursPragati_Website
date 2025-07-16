// import React, { useState } from 'react';
// import * as FaIcons from 'react-icons/fa';
// import * as MdIcons from 'react-icons/md';
// import * as BsIcons from 'react-icons/bs';
// import * as IoIcons from 'react-icons/io5';
// import * as RiIcons from 'react-icons/ri';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';

// const iconLibraries = {
//   fa: { name: 'FontAwesome', icons: FaIcons },
//   md: { name: 'Material Design', icons: MdIcons },
//   bs: { name: 'Bootstrap', icons: BsIcons },
//   io: { name: 'Ionicons', icons: IoIcons },
//   ri: { name: 'Remix Icons', icons: RiIcons },
// };

// export default function AddService() {
//   const [iconSet, setIconSet] = useState('fa');
//   const [search, setSearch] = useState('');
//   const [selectedIcon, setSelectedIcon] = useState('');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const navigate = useNavigate();

//   const currentIcons = iconLibraries[iconSet].icons;
//   const filteredIcons = Object.keys(currentIcons)
//     .filter((name) => name.toLowerCase().includes(search.toLowerCase()))
//     .slice(0, 30);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title || !description || !selectedIcon) {
//       alert('Please fill in all fields');
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:3000/api/admin-dashboard/services/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({
//           title,
//           description,
//           icon: selectedIcon,
//         }),
//       });

//       if (res.ok) {
//         alert('Service added successfully');
//         navigate('/admin-dashboard/services');
//       } else {
//         const error = await res.json();
//         alert(error.message || 'Something went wrong');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Failed to add service');
//     }
//   };

//   return (
//     <div>
//     <Navbar />
//     <div className="min-h-screen bg-gray-50 py-6 px-4 pt-20">
//       <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
//         <h1 className="text-3xl font-bold text-blue-900 mb-6">Add New Service</h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
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
//               Add Service
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//     </div>
//   );
// }


// import React, { useState } from 'react';
// import * as FaIcons from 'react-icons/fa';
// import * as MdIcons from 'react-icons/md';
// import * as BsIcons from 'react-icons/bs';
// import * as IoIcons from 'react-icons/io5';
// import * as RiIcons from 'react-icons/ri';
// import * as TbIcons from 'react-icons/tb';
// import * as GiIcons from 'react-icons/gi';
// import * as HiIcons from 'react-icons/hi2';
// import { X } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';

// const iconLibraries = {
//   fa: { name: 'FontAwesome', icons: FaIcons },
//   md: { name: 'Material Design', icons: MdIcons },
//   bs: { name: 'Bootstrap', icons: BsIcons },
//   io: { name: 'Ionicons', icons: IoIcons },
//   ri: { name: 'Remix Icons', icons: RiIcons },
//   tb: { name: 'Tabler Icons', icons: TbIcons },
//   gi: { name: 'Game Icons', icons: GiIcons },
//   hi: { name: 'Heroicons', icons: HiIcons },
// };

// export default function AddService() {
//   const [iconSet, setIconSet] = useState('fa');
//   const [search, setSearch] = useState('');
//   const [selectedIcon, setSelectedIcon] = useState('');
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const currentIcons = iconLibraries[iconSet].icons;
//   const filteredIcons = Object.keys(currentIcons)
//     .filter((name) => name.toLowerCase().includes(search.toLowerCase()))
//     .slice(0, 30);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = {};
//     if (!title.trim()) newErrors.title = 'This field is required*';
//     if (!description.trim()) newErrors.description = 'This field is required*';
//     if (!selectedIcon) newErrors.icon = 'Please select an icon*';

//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) return;

//     try {
//       const res = await fetch('http://localhost:3000/api/admin-dashboard/services/create', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({
//           title,
//           description,
//           icon: selectedIcon,
//         }),
//       });

//       if (res.ok) {
//         alert('Service added successfully');
//         navigate('/admin-dashboard/services');
//       } else {
//         const error = await res.json();
//         alert(error.message || 'Something went wrong');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Failed to add service');
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="min-h-screen bg-gray-50 py-6 px-4 pt-20">
//         <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
//           <h1 className="text-3xl font-bold text-blue-900 mb-6">Add New Service</h1>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Title */}
//             <div>
//               <label className="block font-medium mb-2">Service Title</label>
//               <input
//                 type="text"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 placeholder="Enter service title"
//                 className={`w-full px-3 py-2 border rounded ${
//                   errors.title ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               />
//               {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block font-medium mb-2">Service Description</label>
//               <textarea
//                 rows={4}
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Enter service description"
//                 className={`w-full px-3 py-2 border rounded ${
//                   errors.description ? 'border-red-500' : 'border-gray-300'
//                 }`}
//               ></textarea>
//               {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
//             </div>

//             {/* Icon Picker */}
//             <div>
//               <label className="block font-medium mb-2">Select Icon Set</label>
//               <select
//                 value={iconSet}
//                 onChange={(e) => {
//                   setIconSet(e.target.value);
//                   setSearch('');
//                 }}
//                 className="w-full px-3 py-2 mb-3 border border-gray-300 rounded"
//               >
//                 {Object.entries(iconLibraries).map(([key, lib]) => (
//                   <option key={key} value={key}>
//                     {lib.name}
//                   </option>
//                 ))}
//               </select>

//               <label className="block font-medium mb-2">Search Icon</label>
//               <input
//                 type="text"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search icon name"
//                 className="w-full px-3 py-2 border border-gray-300 rounded mb-3"
//               />

//               <div className="grid grid-cols-5 gap-3 max-h-64 overflow-y-auto border p-2 rounded">
//                 {filteredIcons.map((iconName) => {
//                   const IconComponent = currentIcons[iconName];
//                   return (
//                     <button
//                       key={iconName}
//                       type="button"
//                       onClick={() => {
//                         setSelectedIcon(iconName);
//                         setSearch(iconName);
//                         setErrors((prev) => ({ ...prev, icon: '' }));
//                       }}
//                       className={`flex flex-col items-center p-2 rounded text-blue-700 hover:bg-blue-100 ${
//                         selectedIcon === iconName ? 'bg-blue-200' : ''
//                       }`}
//                     >
//                       <IconComponent className="text-2xl" />
//                       <span className="text-[10px] text-center">{iconName}</span>
//                     </button>
//                   );
//                 })}
//               </div>
//               {errors.icon && <p className="text-red-500 text-sm mt-1">{errors.icon}</p>}

//               {selectedIcon && (
//                 <div className="mt-3 text-sm text-green-700 font-medium flex items-center gap-2 bg-green-50 p-2 rounded">
//                   Selected Icon: {selectedIcon} ({iconSet})
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setSelectedIcon('');
//                       setSearch('');
//                     }}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <X size={16} />
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* Submit Button */}
//             <div>
//               <button
//                 type="submit"
//                 className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 Add Service
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io5';
import * as RiIcons from 'react-icons/ri';
import * as TbIcons from 'react-icons/tb';
import * as HiIcons from 'react-icons/hi2';
import { IoClose } from 'react-icons/io5';
import { Dialog } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { FaArrowLeft } from "react-icons/fa";

const iconLibraries = {
  fa: { name: 'FontAwesome', icons: FaIcons },
  md: { name: 'Material Design', icons: MdIcons },
  bs: { name: 'Bootstrap', icons: BsIcons },
  io: { name: 'Ionicons', icons: IoIcons },
  ri: { name: 'Remix Icons', icons: RiIcons },
  tb: { name: 'Tabler Icons', icons: TbIcons },
  hi: { name: 'Heroicons', icons: HiIcons }
};

export default function AddService() {
  const [iconSet, setIconSet] = useState('fa');
  const [search, setSearch] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const navigate = useNavigate();

  const currentIcons = iconLibraries[iconSet].icons;
  const filteredIcons = Object.keys(currentIcons).filter((name) =>
    name.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 30);

  const validateField = (fieldName, value) => {
    if (!value || (fieldName === 'icon' && !selectedIcon)) {
      return 'This field is required*';
    }
    return '';
  };

  const handleBlur = (fieldName) => {
    setTouched((prev) => ({ ...prev, [fieldName]: true }));
    const value =
      fieldName === 'icon' ? selectedIcon : fieldName === 'title' ? title : description;
    const errorMessage = validateField(fieldName, value);
    setErrors((prev) => ({ ...prev, [fieldName]: errorMessage }));
  };

  const clearErrorOnFocus = (field) => {
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      title: validateField('title', title),
      description: validateField('description', description),
      icon: validateField('icon', selectedIcon),
    };

    setErrors(newErrors);
    setTouched({ title: true, description: true, icon: true });

    if (!newErrors.title && !newErrors.description && !newErrors.icon) {
      try {
        const res = await fetch('http://localhost:3000/api/admin-dashboard/services/create', {
          method: 'POST',
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
          alert(error.message || 'Something went wrong');
        }
      } catch (err) {
        console.error(err);
        alert('Failed to add service');
      }
    }
  };

  const handleOk = () => {
    setSuccessModalOpen(false);
    navigate('/admin-dashboard/services');
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-color py-6 px-4 pt-20">
        {/* Overlaid Back Button */ }
                <div className="max-w-3xl mx-auto pb-3 pl-1">
                  <button className="relative flex gap-2 transition text-orange-950"
                  onClick={() => navigate(-1)}
                  >
                    <FaArrowLeft />
                  </button>
                </div>
        <div className="max-w-3xl mx-auto bg-orange-100 border border-orange-200 p-6 rounded-sm shadow-md">
          <h1 className="text-3xl font-bold text-orange-950 mb-6 oxygen-bold">Add New Service</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block font-medium mb-2 oxygen-bold">Service Title</label>
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
                <p className="text-red-500 text-sm mt-1 ">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-2 oxygen-bold">Service Description</label>
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
              <label className="block font-medium mb-2 oxygen-bold">Select Icon Set</label>
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

              <label className="block font-medium mb-2 oxygen-bold">Search Icon</label>
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

              <div className="grid grid-cols-5 gap-3 max-h-64 overflow-y-auto border p-2 rounded">
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
                      className={`flex flex-col items-center p-2 rounded text-orange-900 hover:bg-orange-900/20 oxygen-regular ${
                        selectedIcon === iconName ? 'bg-orange-900/20' : ''
                      }`}
                    >
                      <IconComponent className="text-2xl" />
                      <span className="text-[10px] text-center">{iconName}</span>
                    </button>
                  );
                })}
              </div>

              {selectedIcon && (
                <div className="mt-3 flex items-center gap-2 text-sm text-green-700 font-medium">
                  Selected Icon: {selectedIcon} ({iconSet})
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedIcon('');
                      setSearch('');
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <IoClose className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="px-6 py-2 bg-gray-800/80 text-orange-100 rounded hover:bg-gray-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-800"
              >
                Add Service
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ✅ Success Modal */}
      <Dialog open={successModalOpen} onClose={() => setSuccessModalOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/10 bg-opacity-10" aria-hidden="true" />
        <div className="relative bg-orange-50  rounded-sm shadow-xl p-6 z-50 w-full max-w-md mx-auto text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
            alt="Success"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h2 className="text-xl font-bold text-green-700 mb-2 oxygen-bold">Service added successfully !</h2>
          <p className="text-gray-600 mb-5 oxygen-regular">Your service has been saved successfully.</p>
          <div className="flex justify-center gap-4 oxygen-regular">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-full"
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
