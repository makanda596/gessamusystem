import axios from 'axios';
import React, { useState } from 'react';
import { FaSpinner, FaUpload, FaTimes, FaCheck } from 'react-icons/fa';

const SubmitTask = ({ setIsPopup, isPopup }) => {
    const [formData, setFormData] = useState({ title: "" });
    const [loading, setLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // ... keep your existing logic handlers unchanged ...

    return (
        <div className={`fixed inset-0 z-50 ${isPopup ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsPopup(false)}></div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6">
                <form 
                    onSubmit={handleSubmit}
                    className="bg-white rounded-xl shadow-2xl p-6 space-y-6"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900">Submit New Task</h2>
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
                                Task Image
                            </label>
                            <div
                                className={`relative group w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all
                                    ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
                                    ${image ? 'p-0 overflow-hidden' : 'p-4'}`}
                                onDragEnter={handleDragEnter}
                                onDragLeave={handleDragLeave}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={handleDrop}
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
                                            className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow-sm hover:bg-white transition-colors"
                                        >
                                            <FaTimes className="text-red-500" />
                                        </button>
                                    </>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center">
                                        <FaUpload className="mx-auto text-gray-400 text-3xl mb-3" />
                                        <p className="text-sm text-gray-600">
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
                        </div>

                        {/* Title Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Task Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Enter task title"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
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
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => setIsPopup(false)}
                            className="flex-1 py-3 px-6 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
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
                                'Submit Task'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SubmitTask;