import React, { useState } from 'react';
import axios from 'axios';

const Allprojects = () => {
    const [projects, setProjects] = useState([]);
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    const [viewProjects, setViewProjects] = useState(false);

    const onSubmit = async () => {
        if (!year) {
            setError('Please enter a year.');
            return;
        }
        setError(''); // Clear any previous errors
        try {
            const response = await axios.get(`http://localhost:5000/projects/getprojects?year=${year}`);
            setProjects(response.data);
            setViewProjects(true); // Trigger project view
        } catch (error) {
            console.error(error);
            setError('Failed to fetch projects. Please check the year and try again.');
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
                        {/* Enter Year Form */}
                        <p className="text-white">Enter Year</p>
                        <input
                            type="number"
                            placeholder="Enter your year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="border border-gray-300 p-2 mb-2 w-full"
                        />
                        <button
                            onClick={onSubmit}
                            className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
                        >
                            Submit Year
                        </button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold mb-6">All Projects</h1>

                {/* Display Projects */}
                {viewProjects ? (
                    <div className="mt-6">
                        {projects.length > 0 ? (
                            projects.map((project, index) => (
                                <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                                    <h2 className="text-2xl font-semibold">{project.title}</h2>
                                    <p className="text-gray-700">{project.description}</p>
                                    <img src={project.doc} alt={project.doc} />

                                    <p className="text-sm text-gray-500">Date: {project.date}</p>
                                </div>
                            ))
                        ) : (
                            <p>No projects found.</p>
                        )}
                    </div>
                ) : (
                    <p>Select a year or view all projects to see the content.</p>
                )}
            </div>
        </div>
    );
};

export default Allprojects;
