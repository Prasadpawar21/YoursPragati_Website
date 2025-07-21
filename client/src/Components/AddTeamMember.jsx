import React, { useRef, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';
import Navbar from './Navbar';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Dialog } from '@headlessui/react';

export default function AddTeamMember() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [facebook, setFacebook] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({ name: false, role: false, image: false });

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setImage({ file, preview: URL.createObjectURL(file) });
      setTouched(prev => ({ ...prev, image: true }));
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleOk = () => {
    setSuccessModalOpen(false);
    navigate('/admin-dashboard/teams');
  };

  const handleSubmit = async () => {
    const missing = {
      name: !name,
      role: !role,
      image: !image
    };
    setTouched({ name: true, role: true, image: true });

    if (missing.name || missing.role || missing.image) return;

    const formData = new FormData();
    formData.append('image', image.file);
    formData.append('name', name);
    formData.append('role', role);
    formData.append('instagram', instagram);
    formData.append('twitter', twitter);
    formData.append('linkedin', linkedin);
    formData.append('facebook', facebook);

    setIsLoading(true);
    try {
      const response = await fetch(`${backendURL}/api/admin-dashboard/teams/add`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setModalMessage('Team member added successfully!');
        setSuccessModalOpen(true);
        setName('');
        setRole('');
        setInstagram('');
        setTwitter('');
        setLinkedin('');
        setFacebook('');
        setImage(null);
        fileInputRef.current.value = null;
        setTouched({ name: false, role: false, image: false });
      } else {
        alert(result.message || 'Failed to add team member');
      }
    } catch (err) {
      console.error(err);
      alert('Server error while adding team member.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-color py-10 px-4 pt-20">
        <div className="max-w-2xl mx-auto pb-3 pl-1">
          <button className="relative flex gap-2 transition text-orange-950" onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </button>
        </div>
        <div className="max-w-2xl mx-auto bg-orange-100 rounded-sm shadow-xl p-8 md:p-10 border border-orange-200">
          <h2 className="text-3xl font-semibold text-orange-950 mb-10">Add Team Member</h2>

          {/* Image Upload */}
          <div
            className={`relative border-2 border-dashed rounded-sm p-6 text-center mb-6 transition-all duration-300 ${
              isDragging ? 'border-orange-900 bg-orange-50' : touched.image && !image ? 'border-red-500' : 'border-orange-900'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !image && fileInputRef.current.click()}
          >
            {!image ? (
              <div className="flex flex-col items-center gap-2">
                <FiUploadCloud className="text-orange-950 text-8xl" />
                <p className="text-sm text-gray-600">Drag and Drop Image</p>
                <p className="text-sm text-gray-600">or</p>
                <button
                  type="button"
                  className="px-4 py-2 text-white bg-gray-900/80 rounded hover:bg-gray-900"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current.click();
                  }}
                >
                  Select Image
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <img
                  src={image.preview}
                  alt="Preview"
                  className="max-h-56 object-contain rounded-sm"
                />
                <button
                  type="button"
                  className="px-4 py-2 text-white bg-gray-900/80 rounded hover:bg-gray-900 text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current.click();
                  }}
                >
                  Select Another Image
                </button>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>

          {touched.image && !image && (
            <p className="text-red-600 text-sm mb-4">This field is required*</p>
          )}

          {/* Name */}
          <label className="block mb-6">
            <span className="text-gray-700 font-medium">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
              className={`mt-2 w-full px-4 py-2 border rounded-sm focus:ring-2 focus:outline-none ${
                touched.name && !name ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-orange-900'
              }`}
              placeholder="e.g. John Doe"
            />
            {touched.name && !name && (
              <p className="text-red-600 text-sm mt-1">This field is required*</p>
            )}
          </label>

          {/* Role */}
          <label className="block mb-6">
            <span className="text-gray-700 font-medium">Role</span>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, role: true }))}
              className={`mt-2 w-full px-4 py-2 border rounded-sm focus:ring-2 focus:outline-none ${
                touched.role && !role ? 'border-red-500 focus:ring-red-500' : 'border-gray-400 focus:ring-orange-900'
              }`}
              placeholder="e.g. Developer, Manager"
            />
            {touched.role && !role && (
              <p className="text-red-600 text-sm mt-1">This field is required*</p>
            )}
          </label>

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Instagram</label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 rounded-sm focus:ring-2 focus:ring-orange-900 focus:outline-none"
                placeholder="username only"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Twitter</label>
              <input
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 rounded-sm focus:ring-2 focus:ring-orange-900 focus:outline-none"
                placeholder="username only"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">LinkedIn</label>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 rounded-sm focus:ring-2 focus:ring-orange-900 focus:outline-none"
                placeholder="username only"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Facebook</label>
              <input
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 rounded-sm focus:ring-2 focus:ring-orange-900 focus:outline-none"
                placeholder="username only"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-auto px-3 py-2 flex items-center justify-center bg-gray-900/80 text-white font-medium rounded-sm hover:bg-gray-900 transition duration-200 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <ImSpinner2 className="animate-spin mr-2" size={18} />
                Adding Member...
              </>
            ) : (
              'Add Team Member'
            )}
          </button>
        </div>
      </div>

      {/* ✅ Modal */}
      <Dialog
        open={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="fixed inset-0 bg-black/10" aria-hidden="true" />
        <div className="relative bg-white rounded-sm shadow-xl p-6 z-50 w-full max-w-md mx-auto text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/190/190411.png"
            alt="Success"
            className="w-20 h-20 mx-auto mb-4"
          />
          <h2 className="text-xl font-bold text-green-700 mb-2">Action Completed!</h2>
          <p className="text-gray-600 mb-5">{modalMessage}</p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-emerald-600/80 hover:bg-emerald-600 text-white px-5 py-2 rounded-full cursor-pointer"
              onClick={handleOk}
            >
              OK
            </button>
            <button
              className="border border-gray-400 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-100 cursor-pointer"
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
