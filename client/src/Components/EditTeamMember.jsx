import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiUploadCloud } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';
import { Dialog } from '@headlessui/react';
import Navbar from './Navbar';

export default function EditTeamMember() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [facebook, setFacebook] = useState('');
  const [touched, setTouched] = useState({ name: false, role: false });
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    async function fetchMember() {
      try {
        const res = await fetch(`${backendURL}/api/admin-dashboard/teams/edit/${id}`);
        const data = await res.json();

        if (res.ok) {
          setName(data.name);
          setRole(data.role);
          setInstagram(data.instagram || '');
          setTwitter(data.twitter || '');
          setLinkedin(data.linkedin || '');
          setFacebook(data.facebook || '');
          setImage({ file: null, preview: data.imageUrl });
        } else {
          alert('Failed to load team member data');
        }
      } catch (err) {
        console.error(err);
        alert('Error fetching team member data');
      }
    }

    fetchMember();
  }, [id]);

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setImage({ file, preview: URL.createObjectURL(file) });
    } else {
      alert('Please upload a valid image file.');
    }
  };

  const handleFileChange = (e) => handleFile(e.target.files[0]);
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
  const handleDragLeave = () => setIsDragging(false);

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleUpdate = async () => {
    const missingFields = {
      name: !name.trim(),
      role: !role.trim(),
    };
    setTouched({ name: true, role: true });

    if (missingFields.name || missingFields.role) return;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('role', role);
    formData.append('instagram', instagram);
    formData.append('twitter', twitter);
    formData.append('linkedin', linkedin);
    formData.append('facebook', facebook);
    if (image?.file) {
      formData.append('image', image.file);
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${backendURL}/api/admin-dashboard/teams/edit/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (res.ok) {
        setModalMessage('Team member updated successfully.');
        setSuccessModalOpen(true);
      } else {
        alert('Failed to update team member');
      }
    } catch (err) {
      console.error(err);
      alert('Server error while updating team member');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOk = () => {
    setSuccessModalOpen(false);
    navigate('/admin-dashboard/teams');
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-color py-10 px-4 pt-20">
        <div className="max-w-2xl mx-auto bg-orange-100 rounded-sm shadow-xl p-8 md:p-10 border border-orange-200">
          <h2 className="text-3xl font-semibold text-orange-950 mb-10">Edit Team Member</h2>

          {/* Image Upload */}
          <div
            className={`relative border-2 border-dashed rounded-sm p-6 text-center mb-6 transition-all duration-300 ${
              isDragging ? 'border-orange-950 bg-orange-50' : 'border-orange-950'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {image?.preview ? (
              <div className="flex flex-col items-center mt-2">
                <img
                  src={image.preview}
                  alt="Preview"
                  className="max-h-64 object-contain rounded-sm border border-gray-300"
                />
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="mt-3 px-4 py-2 text-white bg-gray-900/80 rounded hover:bg-gray-900 oxygen-regular"
                >
                  Replace Image
                </button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 relative z-10">
                <FiUploadCloud className="text-orange-950 text-8xl" />
                <p className="text-sm text-gray-600 oxygen-regular">Drag and Drop Image</p>
                <p className="text-sm text-gray-600 oxygen-regular">or</p>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="px-4 py-2 text-white bg-gray-900/80 rounded hover:bg-gray-900 oxygen-regular"
                >
                  Select Image
                </button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
              </div>
            )}
          </div>

          {/* Name Field */}
          <label className="block mb-6">
            <span className="text-gray-700 font-medium oxygen-regular">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur('name')}
              className={`mt-2 w-full px-4 py-2 border rounded-sm focus:ring-2 focus:outline-none oxygen-regular ${
                touched.name && !name.trim()
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-400 focus:ring-orange-900'
              }`}
              placeholder="e.g. John Doe"
            />
            {touched.name && !name.trim() && (
              <p className="text-sm text-red-600 mt-1 oxygen-regular">This field is required*</p>
            )}
          </label>

          {/* Role Field */}
          <label className="block mb-6">
            <span className="text-gray-700 font-medium oxygen-regular">Role</span>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              onBlur={() => handleBlur('role')}
              className={`mt-2 w-full px-4 py-2 border rounded-sm focus:ring-2 focus:outline-none oxygen-regular ${
                touched.role && !role.trim()
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-400 focus:ring-orange-900'
              }`}
              placeholder="e.g. Developer, Manager"
            />
            {touched.role && !role.trim() && (
              <p className="text-sm text-red-600 mt-1 oxygen-regular">This field is required*</p>
            )}
          </label>

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1 oxygen-regular">Instagram</label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 rounded-sm focus:ring-2 focus:ring-orange-900 focus:outline-none oxygen-regular"
                placeholder="username only"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 oxygen-regular">Twitter</label>
              <input
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 rounded-sm focus:ring-2 focus:ring-orange-900 focus:outline-none oxygen-regular"
                placeholder="username only"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 oxygen-regular">LinkedIn</label>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 rounded-sm focus:ring-2 focus:ring-orange-900 focus:outline-none oxygen-regular"
                placeholder="username only"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 oxygen-regular">Facebook</label>
              <input
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 rounded-sm focus:ring-2 focus:ring-orange-900 focus:outline-none oxygen-regular"
                placeholder="username only"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className={`w-auto px-3 py-2 flex items-center justify-center bg-gray-900/80 text-white font-medium rounded-sm shadow-md hover:bg-gray-900 transition duration-200 oxygen-regular ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <ImSpinner2 className="animate-spin mr-2 oxygen-regular" size={18} />
                Saving...
              </>
            ) : (
              'Save & Update'
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
        <div className="fixed inset-0 bg-black/10 bg-opacity-10" aria-hidden="true" />
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
