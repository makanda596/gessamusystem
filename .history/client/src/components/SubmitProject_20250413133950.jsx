import axios from 'axios';
import React, { useState } from 'react';
import { FaCheck, FaSpinner, FaUpload, FaTimes } from 'react-icons/fa';

const SubmitProject= ({ setIsPopup, isPopup }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        resources: ""
    });
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        validateAndSetImage(file);
    };

    const validateAndSetImage = (file) => {
        setError("");
        if (!file) return;

        if (!file.type.match('image.*')) {
            setError("Please select an image file (JPEG, PNG, etc.)");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError("Image size should be less than 5MB");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => setImage(reader.result);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!image) {
            setError("Please upload an image of your product");
            return;
        }

        if (!formData.title || !formData.description || !formData.resources) {
            setError("Please fill all required fields");
            return;
        }

        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:5000/userprojects/submitProject",
                { ...formData, image },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setSuccess("Project submitted successfully!");
            setFormData({ title: "", description: "", resources: "" });
            setImage(null);
            setTimeout(() => setIsPopup(false), 2000);
        } catch (error) {
            setError(error.response?.data?.message || "Failed to submit project. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`fixed inset-0 z-50 ${isPopup ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsPopup(false)}></div>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl shadow-2xl p-6 space-y-6"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900">Submit New Project</h2>
                        <button
                            type="button"
                            onClick={() => setIsPopup(false)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <FaTimes className="text-xl text-gray-500" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Project Image
                            </label>
                            <label
                                htmlFor="image-upload"
                                className={`block w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors
                                    ${image ? 'p-0 overflow-hidden' : 'p-4'} 
                                    hover:border-blue-400 border-gray-300`}
                            >
                                {image ? (
                                    <>
                                        <img
                                            src={image}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setImage(null)}
                                            className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow-sm hover:bg-white"
                                        >
                                            <FaTimes className="text-red-500" />
                                        </button>
                                    </>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center">
                                        <FaUpload className="text-3xl text-gray-400 mb-3" />
                                        <p className="text-sm text-gray-600">Click to upload image</p>
                                        <p className="text-xs text-gray-400 mt-1">JPEG, PNG (Max 5MB)</p>
                                    </div>
                                )}
                            </label>
                            <input
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Project title"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    placeholder="Project description"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-24"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Resources
                                </label>
                                <input
                                    type="text"
                                    name="resources"
                                    placeholder="Required resources"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    value={formData.resources}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {/* Status Messages */}
                        {error && (
                            <div className="p-3 bg-red-50 text-red-700 rounded-lg flex items-start gap-3">
                                <FaTimes className="flex-shrink-0 mt-1 text-red-600" />
                                <div>{error}</div>
                            </div>
                        )}

                        {success && (
                            <div className="p-3 bg-green-50 text-green-700 rounded-lg flex items-start gap-3">
                                <FaCheck className="flex-shrink-0 mt-1 text-green-600" />
                                <div>{success}</div>
                            </div>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => setIsPopup(false)}
                            className="flex-1 py-3 px-6 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`flex-1 py-3 px-6 rounded-lg font-medium text-white transition-colors flex items-center justify-center
                                ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <FaSpinner className="animate-spin mr-2" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Project'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmitProject;