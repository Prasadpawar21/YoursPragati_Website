import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { Dialog } from "@headlessui/react";
import Navbar from "./Navbar";
import { FaArrowLeft } from "react-icons/fa";

export default function DataCollectionAddImage() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ caption: false });
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImage({ file, preview: URL.createObjectURL(file) });
    } else {
      setModalMessage("Please upload a valid image file.");
      setSuccessModalOpen(true);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image || !caption.trim()) {
      setTouched({ caption: true });
      return;
    }

    const formData = new FormData();
    formData.append("image", image.file);
    formData.append("title", caption);

    try {
      setLoading(true);
      const res = await fetch(`${backendURL}/api/admin-dashboard/field-work/create`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setModalMessage("Image uploaded successfully!");
        setSuccessModalOpen(true);
      } else {
        const data = await res.json();
        setModalMessage(data.message || "Something went wrong.");
        setSuccessModalOpen(true);
      }
    } catch (error) {
      setModalMessage("Something went wrong while uploading." + error.message);
      setSuccessModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleOk = () => {
    setSuccessModalOpen(false);
    navigate("/admin-dashboard/field-work");
  };

  return (
    <div>
      <Navbar />
      
      <div className="min-h-screen bg-color flex items-center justify-center px-4 py-8">
        
        <div className="bg-orange-100 p-6 rounded-sm shadow-xl w-full max-w-3xl pt-8 pb-8">
          
          <h2 className="text-2xl font-bold text-orange-950 mb-4">Upload Field Image</h2>

          {/* Upload Image Section */}
          <div
            className={`border-2 border-dashed rounded-sm p-6  mb-4 transition-all duration-300 ${
              isDragging ? "border-oragne-950 bg-orange-50" : "border-orange-900"
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
          >
            {image ? (
              <div className="text-center">
                <img
                  src={image.preview}
                  alt="Preview"
                  className="mx-auto h-60 object-contain rounded mb-4"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-950 cursor-pointer"
                >
                  Select another Image
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-center">
                <FiUploadCloud className="text-orange-950 text-8xl" />
                <p className="text-sm text-gray-500 oxygen-regular">Drag and Drop Files to upload</p>
                <p className="text-sm text-gray-500 oxygen-regular">or</p>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="px-4 py-2 text-white bg-gray-800 rounded hover:bg-gray-950 cursor-pointer"
                >
                  Select Files to upload
                </button>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </div>

          {/* Caption Field */}
          <label className="block mb-1 text-sm font-medium text-gray-700 oxygen-regular">Caption</label>
          <input
            type="text"
            placeholder="Enter caption for the image"
            className={`w-full oxygen-regular px-4 py-2 border rounded-sm mb-1 focus:outline-none focus:ring-2 ${
              touched.caption && !caption.trim()
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-orange-900"
            }`}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, caption: true }))}
            onFocus={() => setTouched((prev) => ({ ...prev, caption: false }))}
          />
          {touched.caption && !caption.trim() && (
            <p className="text-red-500 text-sm mb-2">This field is required*</p>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`w-auto pl-5 pr-5 flex justify-center items-center gap-2 py-2 rounded-sm text-white mt-5 cursor-pointer ${
              loading
                ? "bg-gray-800/80 cursor-not-allowed"
                : "bg-gray-800/80 hover:bg-gray-800"
            }`}
          >
            {loading ? (
              <>
                <ImSpinner2 className="animate-spin mr-2" size={18} />
                Uploading an image...
              </>
            ) : (
              "Save & Upload"
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full cursor-pointer"
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
