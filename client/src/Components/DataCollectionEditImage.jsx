import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import { ImSpinner2 } from "react-icons/im";
import { Dialog } from "@headlessui/react";
import Navbar from "./Navbar";

const EditImage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null); // { file, preview }
  const [caption, setCaption] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({ caption: false });
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalSuccess, setModalSuccess] = useState(true);
  const backendURL = import.meta.env.VITE_BACKEND_URL ; 

  useEffect(() => {
    fetch(`${backendURL}/api/admin-dashboard/field-work/edit/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.imageUrl && data?.title) {
          setCaption(data.title);
          setImage({ file: null, preview: data.imageUrl });
        } else {
          setModalSuccess(false);
          setModalMessage("Invalid image data received.");
          setSuccessModalOpen(true);
        }
      })
      .catch((err) => {
        setModalSuccess(false);
        setModalMessage("Failed to load image. " + err.message);
        setSuccessModalOpen(true);
      });
  }, [id]);

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImage({ file, preview: URL.createObjectURL(file) });
    } else {
      setModalSuccess(false);
      setModalMessage("Please upload a valid image file.");
      setSuccessModalOpen(true);
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

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUpdate = async () => {
    if (!caption.trim()) {
      setTouched({ caption: true });
      return;
    }

    const formData = new FormData();
    formData.append("title", caption);
    if (image?.file) {
      formData.append("image", image.file);
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${backendURL}/api/admin-dashboard/field-work/edit/new/${id}`, {
        method: "PUT",
        body: formData,
      });

      const result = await res.json();
      setIsLoading(false);

      setModalSuccess(res.ok);
      setModalMessage(result.message || "Unexpected response.");
      setSuccessModalOpen(true);
    } catch (err) {
      setIsLoading(false);
      setModalSuccess(false);
      setModalMessage("Something went wrong while updating." + err.message);
      setSuccessModalOpen(true);
    }
  };

  const handleOk = () => {
    setSuccessModalOpen(false);
    if (modalSuccess) {
      navigate("/admin-dashboard/field-work");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-color flex items-center justify-center px-4 py-8 pt-20">
        <div
          className="bg-orange-100 p-6 rounded-sm shadow-xl w-full max-w-3xl pt-8 pb-8"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <h2 className="text-2xl font-bold text-orange-950 mb-4">Edit Field Image</h2>

          {/* Drop zone with image or upload UI */}
          <div
            className={`border-2 border-dashed rounded-sm p-6 text-center mb-4 transition-all duration-300 ${
              isDragging ? "border-orange-900 bg-orange-50" : "border-orange-900"
            }`}
          >
            {image?.preview ? (
              <div>
                <img
                  src={image.preview}
                  alt="Preview"
                  className="mx-auto h-60 object-contain rounded mb-2"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="px-4 py-2 text-white bg-gray-900/80 rounded hover:bg-gray-900 cursor-pointer oxygen-regular"
                >
                  Select another Image
                </button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e) => handleFile(e.target.files[0])}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <FiUploadCloud className="text-orange-950 text-8xl" />
                <p className="text-sm text-gray-500 oxygen-regular">Drag and Drop Files to upload</p>
                <p className="text-sm text-gray-500 oxygen-regular">or</p>
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="px-4 py-2 text-white bg-gray-900/80 rounded hover:bg-gray-900 oxygen-regular"
                >
                  Select Files to upload
                </button>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={(e) => handleFile(e.target.files[0])}
                />
              </div>
            )}
          </div>

          {/* Caption Field */}
          <label className="block mb-1 text-sm font-medium text-gray-700 oxygen-regular">Caption</label>
          <input
            type="text"
            placeholder="Update caption for the image"
            className={`w-full px-4 py-2 border rounded-sm focus:outline-none focus:ring-2 mb-1 oxygen-regular ${
              touched.caption && !caption.trim()
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-400"
            }`}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, caption: true }))}
            onFocus={() => setTouched((prev) => ({ ...prev, caption: false }))}
          />
          {touched.caption && !caption.trim() && (
            <p className="text-red-500 text-sm mb-2">This field is required*</p>
          )}

          {/* Submit Button with Spinner */}
          <button
            onClick={handleUpdate}
            disabled={isLoading}
            className={`w-auto pl-5 pr-5 mt-5 py-2 flex items-center justify-center bg-gray-900/80 text-white rounded-sm hover:bg-gray-900 cursor-pointer ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <ImSpinner2 className="animate-spin mr-2 oxygen-regular" size={18} />
                Uploading an image...
              </>
            ) : (
              "Save & Update"
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
            src={
              modalSuccess
                ? "https://cdn-icons-png.flaticon.com/512/190/190411.png"
                : "https://cdn-icons-png.flaticon.com/512/463/463612.png"
            }
            alt={modalSuccess ? "Success" : "Error"}
            className="w-20 h-20 mx-auto mb-4"
          />
          <h2
            className={`text-xl font-bold mb-2 ${
              modalSuccess ? "text-green-700" : "text-red-700"
            }`}
          >
            {modalSuccess ? "Update Successful!" : "Action Failed"}
          </h2>
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
};

export default EditImage;
