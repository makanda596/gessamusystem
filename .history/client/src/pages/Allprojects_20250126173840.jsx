import React, { useState } from 'react';
import axios from 'axios';

const Allprojects = () => {
    const [projects, setProjects] = useState([]);
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    const [yearSubmitted, setYearSubmitted] = useState(false);

    const onSubmit = async () => {
        if (!year) {
            setError('Please enter a year.');
            return;
        }
        setYearSubmitted(true);
        try {
            const response = await axios.get(`http://localhost:5000/projects/getprojects?year=${year}`);
            setProjects(response.data);
        } catch (error) {
            console.error(error);
            setError('Failed to fetch projects. Please check the year and try again.');
        }
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
                <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
                <ul>
                    <li className="mb-4">
                        <a href="/allprojects" className="hover:text-blue-400">All Projects</a>
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

                {/* Display Projects only if year is submitted */}
                {yearSubmitted ? (
                    <div className="mt-6">
                        {projects.length > 0 ? (
                            projects.map((project, index) => (
                                <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg">
                                    <h2 className="text-2xl font-semibold">{project.title}</h2>
                                    <p className="text-gray-700">{project.description}</p>
                                    <p className="text-sm text-gray-500">{project.doc}</p>
                                    <p className="text-sm text-gray-500">Year: {project.year}</p>
                                </div>
                            ))
                        ) : (
                            <p>No projects found for the entered year.</p>
                        )}
                    </div>
                ) : (
                    <p>Please select a year to view the projects.</p>
                )}
            </div>
        </div>
    );
};

export default Allprojects;
