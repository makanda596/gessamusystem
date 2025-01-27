import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Allprojects = () => {
    const [projects, setProjects] = useState([]);
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    const [viewWeeklyProjects, setViewWeeklyProjects] = useState(true); // Default to view weekly projects
    const [yearSubmitted, setYearSubmitted] = useState(false);
    const [loading, setLoading] = useState(false); // For loading state
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 6; // Number of projects per page

    // Fetch weekly projects on page load
    useEffect(() => {
        const fetchWeeklyProjects = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/projects/getweekly-projects');
                setProjects(response.data);
            } catch (error) {
                setError('Failed to fetch weekly projects.');
            } finally {
                setLoading(false);
            }
        };

        fetchWeeklyProjects();
    }, []);

    const onSubmit = async () => {
        if (!year) {
            setError('Please enter a year.');
            return;
        }
        setYearSubmitted(true);
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/projects/getprojects?year=${year}`);
            setProjects(response.data);
        } catch (error) {
            setError('Failed to fetch projects. Please check the year and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleViewWeeklyProjects = async () => {
        setError('');
        setYearSubmitted(false); // Hide year-specific projects
        setViewWeeklyProjects(true); // Show weekly projects
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/projects/getweekly-projects');
            setProjects(response.data);
        } catch (error) {
            setError('Failed to fetch weekly projects.');
        } finally {
            setLoading(false);
        }
    };

    const handleClearYear = () => {
        setYear('');
        setYearSubmitted(false);
        setViewWeeklyProjects(true); // Go back to weekly projects view
    };

    // Pagination logic
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
                <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
                <ul>
                    <li className="mb-4">
                        <button
                            onClick={handleViewWeeklyProjects}
                            className="hover:text-blue-400 text-blue-500"
                        >
                            View Weekly Projects
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
                            className="border border-gray-300 p-2 mb-2 w-full text-black"
                        />
                        <button
                            onClick={onSubmit}
                            className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
                        >
                            Submit Year
                        </button>
                        <button
                            onClick={handleClearYear}
                            className="bg-gray-500 text-white p-2 rounded-md w-full hover:bg-gray-600 mt-2"
                        >
                            Clear Year Selection
                        </button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 bg-gray-50 min-h-screen">
                <h1 className="text-3xl font-bold mb-6">All Projects</h1>

                {/* Loading Indicator */}
                {loading && <div className="text-center">Loading...</div>}

                {/* Display Projects based on Year or Weekly Projects */}
                {!loading && (viewWeeklyProjects || yearSubmitted) ? (
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentProjects.length > 0 ? (
                            currentProjects.map((project, index) => (
                                <div key={index} className="mb-4 p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg">
                                    <h2 className="text-2xl font-semibold">{project.title}</h2>
                                    <p className="text-gray-700">{project.description}</p>
                                    <p className="text-sm text-gray-500">{project.doc}</p>
                                    <p>
                                        Link: <a className="text-sm text-gray-500" href={project.reference} target="_blank" rel="noreferrer">{project.reference}</a>
                                    </p>
                                    <p className="text-sm text-gray-500">Trainer: {project.trainer}</p>
                                    <p className="text-sm text-gray-500">Date: {project.date}</p>
                                </div>
                            ))
                        ) : (
                            <p>No {viewWeeklyProjects ? 'weekly' : 'year-specific'} projects found.</p>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-center min-h-screen">
                            <div className="mt-8 w-16 h-16 border-4 border-t-red-600 border-b-green-600 border-l-white border-r-white rounded-full animate-spin"></div>
                        </div></>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="bg-gray-300 text-gray-700 p-2 rounded-md mx-2"
                        >
                            Prev
                        </button>
                        <span className="text-gray-700">{currentPage} of {totalPages}</span>
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="bg-gray-300 text-gray-700 p-2 rounded-md mx-2"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Allprojects;
