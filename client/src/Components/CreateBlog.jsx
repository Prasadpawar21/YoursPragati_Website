import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiUploadCloud } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';
import { MdDateRange } from 'react-icons/md';
import { Dialog } from '@headlessui/react';
import Navbar from './Navbar';
import { FaArrowLeft } from "react-icons/fa";

export default function CreateBlog() {
  const navigate = useNavigate();
  const editor = useRef(null);
  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [createdAt, setCreatedAt] = useState(new Date());
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const backendURL = import.meta.env.VITE_BACKEND_URL


  const validate = () => {
    const newErrors = {};
    if (!image) newErrors.image = 'This field is required*';
    if (!title.trim()) newErrors.title = 'This field is required*';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFocus = (field) => {
    setErrors((prev) => ({ ...prev, [field]: null }));
    setTouched((prev) => ({ ...prev, [field]: false }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate();
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      setImage({ file, preview: URL.createObjectURL(file) });
      setErrors((prev) => ({ ...prev, image: null }));
    } else {
      setErrors((prev) => ({ ...prev, image: 'Please upload a valid image file.' }));
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
    setTouched({ title: true, image: true });

    if (editor.current) {
      // setDescription(editor.current.value);
      setDescription(editor.current?.editor?.getEditorValue?.() || '');
      // console.log("Editor content set") ;
    }

    if (!validate()) return;

    const formData = new FormData();
    // console.log(formData) ; 
    formData.append('image', image.file);
    formData.append('title', title);
    formData.append('createdAt', createdAt.toISOString());
    formData.append('description', description);
    formData.append('tags', JSON.stringify(tags.split(',').map(tag => tag.trim())));

    setIsLoading(true);
    // console.log("Near the post request") ;
    try {
      const response = await fetch(`${backendURL}/api/create-blog`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccessModalOpen(true);
        setTitle('');
        setDescription('');
        setTags('');
        setImage(null);
        fileInputRef.current.value = null;
      } else {
        alert('Failed to upload blog.');
      }
    } catch (error) {
      console.error('Error uploading blog:', error);
      alert('An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOk = () => {
    setSuccessModalOpen(false);
    navigate('/admin-dashboard/blogs-data');
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-color py-10 px-4 pt-20">
                <div className="max-w-4xl mx-auto pb-3 pl-1">
                  <button className="relative flex gap-2 transition text-orange-950"
                  onClick={() => navigate(-1)}
                  >
                    <FaArrowLeft />
                  </button>
                </div>
        <div className="max-w-4xl mx-auto bg-orange-100 rounded-sm shadow-xl p-8 md:p-10 border border-orange-200">
          {/* <h2 className="text-3xl font-semibold text-start text-indigo-700 mb-10">
            Create a New Blog Post
          </h2> */}
          <h1 className="text-3xl font-bold text-orange-950 mb-6 oxygen-bold">Create Blog</h1>

          {/* Image Upload */}
          <div
            className={`border-2 border-dashed rounded-sm p-6 text-center mb-1 transition-all duration-300 ${
              isDragging ? 'border-orange-950 bg-orange-50' : 'border-ornage-950'
            } ${errors.image && touched.image ? 'border-red-500' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {image?.preview ? (
              <>
                <img
                  src={image.preview}
                  alt="Preview"
                  className="mx-auto mb-4 h-66 object-contain rounded-sm"
                />
                <div className="flex justify-center">
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="px-4 py-2 text-white bg-gray-900/80 rounded hover:bg-gray-900 oxygen-regular"
                  >
                    Select another image
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <FiUploadCloud className="text-orange-950 text-8xl" />
                <p className="text-md text-gray-600 oxygen-regular">Drag and Drop Image to upload</p>
                <p className="text-sm text-gray-600 oxygen-regular">or</p>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="px-4 py-2 text-white bg-gray-950/80 rounded hover:bg-gray-950 oxygen-regular"
                >
                  Select Image to upload
                </button>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              onFocus={() => handleFocus('image')}
              onBlur={() => handleBlur('image')}
            />
          </div>
          {errors.image && touched.image && (
            <p className="text-red-500 text-sm mt-1 mb-4">{errors.image}</p>
          )}

          {/* Title */}
          <label className="block mb-6 mt-6">
            <span className="text-gray-700 font-medium oxygen-regular">Blog Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => handleFocus('title')}
              onBlur={() => handleBlur('title')}
              className={`mt-2 w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                errors.title && touched.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter blog title here"
            />
            {errors.title && touched.title && (
              <p className="text-red-500 text-sm mt-1 ">{errors.title}</p>
            )}
          </label>

          {/* Date Picker */}
          <label className="block mb-6 oxygen-regular">
            <span className="text-gray-700 font-medium oxygen-regular">Publish Date & Time</span>
            <div className="relative mt-2">
              <MdDateRange className="absolute right-3 top-3 text-gray-500" size={20} />
              <DatePicker
                selected={createdAt}
                onChange={(date) => setCreatedAt(date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </label>

          {/* Tags */}
          <label className="block mb-6 oxygen-regular">
            <span className="text-gray-700 font-medium oxygen-regular">Tags</span>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="e.g. react, frontend, mongodb"
            />
          </label>

          {/* Blog Description */}
          <label className="block mb-6 oxygen-regular">
            <span className="text-gray-700 font-medium oxygen-regular">Blog Content (optional)</span>
            <div className="mt-2 border border-gray-300 rounded-sm overflow-hidden">
              <JoditEditor
                ref={editor}
                onBlur={(newContent) => setDescription(newContent)}
                onFocus={() => handleFocus('description')}
                config={{
                  height: 300,
                  toolbarAdaptive: false,
                  toolbarSticky: false,
                  style: { backgroundColor: '#fff' },
                  toolbarButtonSize: 'medium',
                  buttons: [
                    'bold', 'italic', 'underline', '|',
                    'ul', 'ol', '|',
                    'outdent', 'indent', '|',
                    'link', 'image', '|',
                    'align', 'font', 'fontsize', 'brush', 'paragraph', '|',
                    'undo', 'redo', 'hr', 'copyformat', 'fullsize', 'preview', 'print', 'source',
                  ]
                }}
              />
            </div>
          </label>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-auto px-6 py-3 flex items-center justify-center bg-gray-800/90 text-white font-medium rounded-sm hover:bg-gray-800 transition duration-200 cursor-pointer text-sm oxygen-regular ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <ImSpinner2 className="animate-spin mr-2 oxygen-regular " size={18} />
                Creating Blog...
              </>
            ) : (
              'Create & Upload Blog'
            )}
          </button>
        </div>
      </div>

      {/* Success Modal */}
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
          <h2 className="text-xl font-bold text-green-700 mb-2">Blog created successfully!</h2>
          <p className="text-gray-600 mb-5 oxygen-regular ">Your blog has been uploaded successfully.</p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-gray-900/90 hover:bg-gray-900 text-white px-5 py-2 rounded-full cursor-pointer oxygen-regular "
              onClick={handleOk}
            >
              OK
            </button>
            <button
              className="border border-gray-400 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-100 cursor-pointer oxygen-regular "
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
