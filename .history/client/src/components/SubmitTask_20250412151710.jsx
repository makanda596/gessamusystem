import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

const SubmitTask = ({ setIsPopup, isPopup }) => {
    const [formData, setFormData] = useState({
        title: "",
        

    });
    const [loading, setLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        validateAndSetImage(file);
    };
    const handleDragEnter = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        validateAndSetImage(file);
    };


    const validateAndSetImage = (file) => {
        setError("");

        if (!file) return;

        // Validate file type
        if (!file.type.match('image.*')) {
            setError("Please select an image file (JPEG, PNG, etc.)");
            return;
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            setError("Image size should be less than 5MB");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("");
        setSuccess("");

        // Validation
        if (!image) {
            setError("Please upload an image of your product");
            return;
        }



        if (!formData.productName || !formData.description || !formData.category) {
            setError("Please fill all required fields");
            return;
        }
        setLoading(true);

        try {
            const postData = {
                ...formData,
                image,
            };
            const token = localStorage.getItem("token");

            const response = await axios.post(
               "http://localhost:5000/task/submitTask",
                postData, // This is your request body
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );


            setSuccess("Post created successfully!");
            // Reset form
            setFormData({
                productName: "",
                description: "",
                category: "",

            });
            setImage(null);

           
            window.location.reload()
            setTimeout(() => {
            }, 100);
        } catch (error) {
            console.error("Error creating post:", error);
            setError(error.response?.data?.message || "Failed to create post. Please try again.");
        } finally {
            setLoading(false);
        }
    };
  return (
    <div className='fixed top-4 '>
          {isPopup &&
          (
              <div className='fixed top-4'>
                  <form onSubmit={handleSubmit} className="p-2 space-y-2">
                      <div className="space-y-1">
                          <label className="flex text-sm font-medium text-gray-700  items-center">
                              <IoMdImages className="mr-2 text-blue-500" />
                              Product Images
                          </label>
                          <div
                              className={`flex items-center justify-center w-full h-30 border-2 border-dashed rounded-xl cursor-pointer transition-all
                ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
                ${image ? 'p-0' : 'p-4'}`}
                              onDragEnter={handleDragEnter}
                              onDragLeave={handleDragLeave}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={handleDrop}
                          >
                              {image ? (
                                  <img
                                      src={image}
                                      alt="Preview"
                                      className="h-full w-full object-cover rounded-lg"
                                  />
                              ) : (
                                  <div className="text-center">
                                      <FaUpload className="mx-auto text-gray-400 text-3xl mb-2" />
                                      <p className="text-sm text-gray-500">
                                          {isDragging ? 'Drop image here' : 'Drag & drop or click to upload'}
                                      </p>
                                      <p className="text-xs text-gray-400 mt-1">JPEG, PNG (Max 5MB)</p>
                                  </div>
                              )}
                              <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageChange}
                                  className="hidden"
                                  id="image-upload"
                              />
                          </div>
                          <label
                              htmlFor="image-upload"
                              className="block text-center text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                          >
                              Click to select file
                          </label>
                      </div>

                      <div className="space-y-1">
                          <label className="flex text-sm font-medium text-gray-700 items-center">
                              title
                          </label>
                          <input
                              type="text"
                              name="title"
                              placeholder="What are you selling?"
                              className="w-full px-4 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                              value={formData.title}
                              onChange={handleChange}
                              required
                          />
                      </div>

                      
                    
                      {error && (
                          <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-start">
                              <div className="flex-shrink-0 mt-0.5">
                                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                  </svg>
                              </div>
                              <div className="ml-2">{error}</div>
                          </div>
                      )}

                      {success && (
                          <div className="p-3 bg-green-50 text-green-600 rounded-lg text-sm flex items-start">
                              <div className="flex-shrink-0">
                                  <FaCheck className="h-4 w-4" />
                              </div>
                              <div className="ml-2">{success}</div>
                          </div>
                      )}

                      <div className="flex space-x-2 pt-2">
                          <button
                              type="button"
                              onClick={() => setIsPopup(false)}
                              className="flex-1 py-1 px-2 rounded-lg font-medium text-gray-700 bg-gray-400 hover:bg-gray-200 transition-colors"
                              disabled={loading}
                          >
                              Cancel
                          </button>
                          <button
                              type="submit"
                              className={`flex-1 py-2 px-4 rounded-lg font-medium text-white transition-colors flex items-center justify-center
                ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                              disabled={loading}
                          >
                              {loading ? (
                                  <>
                                      <FaSpinner className="animate-spin mr-2" />
                                      submitting...
                                  </>
                              ) : (
                                  'submit task'
                              )}
                          </button>
                      </div>
                  </form>
                  </div>)


}
        </div>
  )
}

export default SubmitTask