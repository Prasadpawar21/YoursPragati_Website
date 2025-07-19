import React, { useRef, useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';
import Navbar from './Navbar';

export default function AddTeamMember() {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null); // { file, preview }
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [instagram, setInstagram] = useState('');
  const [twitter, setTwitter] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [facebook, setFacebook] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setImage({ file, preview: URL.createObjectURL(file) });
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

  const handleSubmit = async () => {
    if (!image || !name || !role) {
      alert('Image, Name, and Role are required.');
      return;
    }

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

      if (response.ok) {
        alert('Team member added!');
        setName('');
        setRole('');
        setInstagram('');
        setTwitter('');
        setLinkedin('');
        setFacebook('');
        setImage(null);
        fileInputRef.current.value = null;
      } else {
        alert('Failed to add team member');
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
      <div className="min-h-screen bg-gray-50 py-10 px-4 pt-20">
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-100">
          <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-10">
            Add Team Member
          </h2>

          {/* Image Upload */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center mb-6 transition-all duration-300 ${
              isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-indigo-300'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {image?.preview && (
              <div className="mb-4">
                <img src={image.preview} alt="Preview" className="mx-auto h-44 object-contain rounded-lg" />
              </div>
            )}
            <div className="flex flex-col items-center gap-2">
              <FiUploadCloud className="text-indigo-500 text-4xl" />
              <p className="text-sm text-gray-600">Drag and Drop Image</p>
              <p className="text-sm text-gray-600">or</p>
              <button
                onClick={() => fileInputRef.current.click()}
                className="px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700"
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
          </div>

          {/* Name */}
          <label className="block mb-6">
            <span className="text-gray-700 font-medium">Name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="e.g. John Doe"
            />
          </label>

          {/* Role */}
          <label className="block mb-6">
            <span className="text-gray-700 font-medium">Role</span>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="e.g. Developer, Manager"
            />
          </label>

          {/* Socials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Instagram</label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="username only"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Twitter</label>
              <input
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="username only"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">LinkedIn</label>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="username only"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Facebook</label>
              <input
                type="text"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                placeholder="username only"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full py-3 flex items-center justify-center bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 ${
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
    </div>
  );
}
