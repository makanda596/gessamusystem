import React, { useState } from 'react';
import axios from 'axios';

const Allprojects = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState('');
    const [viewProjects, setViewProjects] = useState(false);

    const fetchProjectsByYear = async (selectedYear) => {
        setError(''); // Clear errors
        try {
            const response = await axios.get(`http://localhost:5000/projects/getprojects?year=${selectedYear}`);
            setProjects(response.data);
            setViewProjects(true); // Trigger project view
        } catch (error) {
            console.error(error);
            setError('Failed to fetch projects. Please try again.');
            setViewProjects(false); // Hide projects on error
        }
    };

    const handleViewAllProjects = async () => {
        setError(''); // Clear errors
        try {
            const response = await axios.get(`http://localhost:5000/projects/getweekly-projects`);
            setProjects(response.data);
            setViewProjects(true); // Show all projects
        } catch (error) {
            console.error(error);
            setError('Failed to fetch all projects.');
        }
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
                <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
                <ul>
                    <li className="mb-4">
                        <button
                            onClick={handleViewAllProjects}
                            className="hover:text-blue-400 cursor-pointer"
                        >
                            All Projects
                        </button>
                    </li>
                    <li className="mb-6">
                        <p className="text-white mb-4">Select Year</p>
                        {/* Year Buttons */}
                        {['Year One', 'Year Two', 'Year Three', 'Year Four'].map((year, index) => (
                            <button
                                key={index}
                                onClick={() => fetchProjectsByYear(year)}
                                className="bg-blue-500 text-white p-2 mb-2 rounded-md w-full hover:bg-blue-600"
                            >
                                {year}
                            </button>
                        ))}
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">All Projects</h1>

                {/* Display Projects */}
                {viewProjects ? (
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.length > 0 ? (
                            projects.map((project, index) => (
                                <div
                                    key={index}
                                    className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                                >
                                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h2>
                                    <p className="text-gray-600 mb-4">{project.description}</p>
                                    {project.doc && (
                                        <img
                                            src={project.doc}
                                            alt={`Project ${index}`}
                                            className="w-full h-40 object-cover rounded-md mb-4"
                                        />
                                    )}
                                    <p className="text-sm text-gray-500">Date: {project.date}</p>
                                    <p className="text-sm text-gray-500">Trainer: {project.trainer}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 text-center col-span-full">No projects found.</p>
                        )}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center mt-6">Select a year or view all projects to see the content.</p>
                )}
            </div>
        </div>
    );
};

export default Allprojects;
