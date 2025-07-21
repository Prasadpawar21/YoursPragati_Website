import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiUploadCloud } from 'react-icons/fi';
import { ImSpinner2 } from 'react-icons/im';
import { MdDateRange } from 'react-icons/md';
import { Dialog } from '@headlessui/react';
import Navbar from './Navbar';
import { FaArrowLeft } from "react-icons/fa";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);
  const fileInputRef = useRef(null);
  const timer = useRef(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [createdAt, setCreatedAt] = useState(new Date());
  const [image, setImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const backendURL = import.meta.env.VITE_BACKEND_URL ;

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`${backendURL}/api/admin-dashboard/blog-data/${id}`);
        const data = await res.json();

        if (res.ok) {
          setTitle(data.title);
          setDescription(data.description);
          setTags(data.tags.join(', '));
          setCreatedAt(new Date(data.createdAt));
          setImage({ file: null, preview: data.imageUrl });
        } else {
          alert('Failed to fetch blog details');
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        alert('Error loading blog');
      }
    }
    fetchBlog();
  }, [id]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'This field is required*';
    if (!description.trim()) newErrors.description = 'This field is required*';
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
    } else {
      alert('Please upload a valid image file.');
    }
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

  const handleDragLeave = () => setIsDragging(false);

  const handleFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    setTouched({ title: true, description: true });
    if (!validate()) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('tags', tags);
    formData.append('createdAt', createdAt.toISOString());
    if (image?.file) formData.append('image', image.file);

    setIsLoading(true);

    try {
      const res = await fetch(`${backendURL}/api/admin-dashboard/blog-data/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (res.ok) {
        setSuccessModalOpen(true);
      } else {
        const error = await res.json();
        alert(`Failed to update blog: ${error.message}`);
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOk = () => {
    setSuccessModalOpen(false);
    navigate('/admin-dashboard/blogs-data');
  };

  const handleEditorChange = (newContent) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setDescription(newContent);
    }, 300); // debounce delay
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
          {/* <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-10">Edit Blog Post</h2> */}
          <h1 className="text-3xl font-bold text-orange-950 mb-6 oxygen-bold">Edit Blog</h1>
          <div
            className={`border-2 border-dashed rounded-sm p-6 text-center mb-6 transition-all duration-300 ${
              isDragging ? 'border-orange-950 bg-orange-50' : 'border-orange-950'
            }`}
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
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="px-4 py-2 text-white bg-gray-900/80 rounded hover:bg-gray-900 cursor-pointer oxygen-regular"
                >
                  Replace Image
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <FiUploadCloud className="text-orange-950 text-8xl" />
                <p className="text-sm text-gray-600">Drag and Drop new Image to upload</p>
                <p className="text-sm text-gray-600">or</p>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="px-4 py-2 text-white bg-gray-900/80 rounded hover:bg-orange-900 cursor-pointer"
                >
                  Select new Image to upload
                </button>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden oxygen-regular"
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>

          <label className="block mb-6">
            <span className="text-gray-700 font-medium oxygen-regular">Blog Title</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => handleFocus('title')}
              onBlur={() => handleBlur('title')}
              className={`mt-2 w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-900 oxygen-regular ${
                errors.title && touched.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter blog title here"
            />
            {errors.title && touched.title && (
              <p className="text-red-500 text-sm mt-1 oxygen-regular">{errors.title}</p>
            )}
          </label>

          <label className="block mb-6">
            <span className="text-gray-700 font-medium oxygen-regular">Publish Date & Time</span>
            <div className="relative mt-2">
              <MdDateRange className="absolute right-3 top-3 text-gray-500" size={20} />
              <DatePicker
                selected={createdAt}
                onChange={(date) => setCreatedAt(date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-900"
              />
            </div>
          </label>

          <label className="block mb-6">
            <span className="text-gray-700 font-medium oxygen-regular">Tags</span>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-900 oxygen-regular"
              placeholder="e.g. react, frontend, mongodb"
            />
          </label>

          <label className="block mb-6">
            <span className="text-gray-700 font-medium oxygen-regular">Blog Content</span>
            <div className={`mt-2 border rounded-sm overflow-hidden oxygen-regular ${errors.description && touched.description ? 'border-red-500' : 'border-gray-300'}`}>
              {/* <JoditEditor
                ref={editor}
                value={description}
                onChange={(newContent) => setDescription(newContent)}
                onBlur={() => handleBlur('description')}
                onFocus={() => handleFocus('description')}
                config={{
                  height: 300,
                  readonly: false,
                  toolbarAdaptive: false,
                  toolbarSticky: false,
                  toolbarButtonSize: 'medium',
                  buttons: [
                    'bold', 'italic', 'underline', '|',
                    'ul', 'ol', '|',
                    'outdent', 'indent', '|',
                    'link', 'image', '|',
                    'align', 'font', 'fontsize', 'brush', 'paragraph', '|',
                    'undo', 'redo', 'hr', 'copyformat', 'fullsize', 'preview', 'print', 'source'
                  ]
                }}
              /> */}
              <JoditEditor
                ref={editor}
                value={description}
                onChange={handleEditorChange}
                onBlur={() => handleBlur("description")}
                onFocus={() => handleFocus("description")}
                config={{
                  height: 300,
                  readonly: false,
                  toolbarAdaptive: false,
                  toolbarSticky: false,
                  toolbarButtonSize: "medium",
                  buttons: [
                    "bold", "italic", "underline", "|",
                    "ul", "ol", "|",
                    "outdent", "indent", "|",
                    "link", "image", "|",
                    "align", "font", "fontsize", "brush", "paragraph", "|",
                    "undo", "redo", "hr", "copyformat", "fullsize", "preview", "print", "source"
                  ]
                }}
              />

            </div>
            {errors.description && touched.description && (
              <p className="text-red-500 text-sm mt-1 oxygen-regular">{errors.description}</p>
            )}
          </label>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-auto pl-6 pr-6 py-2 flex items-center justify-center bg-gray-900/80 text-white font-medium rounded-sm hover:bg-gray-900 transition duration-200 cursor-pointer oxygen-regular ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <ImSpinner2 className="animate-spin mr-2 oxygen-regular" size={18} />
                Updating Blog...
              </>
            ) : (
              'Save & Update Blog'
            )}
          </button>
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
          <h2 className="text-xl font-bold text-green-700 mb-2 oxygen-bold">Blog updated successfully!</h2>
          <p className="text-gray-600 mb-5 oxygen-regular">Your blog has been saved successfully.</p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-emerald-600/80 hover:bg-emerald-600 text-white px-5 py-2 rounded-full cursor-pointer oxygen-regular"
              onClick={handleOk}
            >
              OK
            </button>
            <button
              className="border border-gray-400 text-gray-700 px-5 py-2 rounded-full hover:bg-gray-100 cursor-pointer oxygen-regular"
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
