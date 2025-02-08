import React, { useState } from 'react';
import { useAuthStore } from '../../store/auth';

const AdminDashboard = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [level, setLevel] = useState('');
    const [reference, setReference] = useState('');
    const [doc, setDoc] = useState('');
    const [year, setYear] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false); // State for pop-up visibility

    const { postTask, postProject } = useAuthStore();

    const postHandle = async () => {
        try {
            await postTask(title, description, date, level);
        } catch (error) {
            console.log(error.message);
        }
    };

    const postProjectHandle = async () => {
        window.location.reload()
        try {
            await postProject(title, description, year, reference);
            setShowSuccessPopup(true); // Show success pop-up
            setTimeout(() => setShowSuccessPopup(false), 3000); // Hide pop-up after 3 seconds
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Admin Dashboard
            </h1>

            {/* Project Posting Section */}
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                    Post a Project
                </h2>

                <form className="space-y-4">
                    {/* Project Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Project Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter project title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Reference */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Reference
                        </label>
                        <input
                            type="text"
                            value={reference}
                            onChange={(e) => setReference(e.target.value)}
                            placeholder="Enter reference"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Year */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Year
                        </label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            placeholder="Enter year"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter project description"
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="button"
                        onClick={postProjectHandle}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit Project
                    </button>
                </form>
            </div>

            {/* Success Pop-up */}
            {showSuccessPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-xl font-semibold text-green-600 mb-4">
                            Success!
                        </h3>
                        <p className="text-gray-700">
                            The project has been successfully submitted.
                        </p>
                    </div>
                </div>
            )}

            {/* Task Posting Section (Commented Out) */}
            {/* <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                    Post a Task
                </h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Task Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter task title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Date
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Level
                        </label>
                        <input
                            type="number"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            placeholder="Enter level"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter task description"
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={postHandle}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit Task
                    </button>
                </form>
            </div> */}
        </div>
    );
};

export default AdminDashboard;