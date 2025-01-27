import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Allprojects = () => {
    const [projects, setProjects] = useState([]);
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    const [viewWeeklyProjects, setViewWeeklyProjects] = useState(true); // Default to view weekly projects
    const [yearSubmitted, setYearSubmitted] = useState(false);
    const [loading, setLoading] = useState(false); // For loading state
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState(''); // For search term
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

    const handleSearch = async () => {
        if (searchTerm.trim() === '') {
            setError('Please enter a search term.');
            return;
        }

        setLoading(true);
        try {
            const filteredProjects = projects.filter(project => {
                const title = project.title || '';
                const description = project.description || '';
                const trainer = project.trainer || '';

                return (
                    title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    trainer.toLowerCase().includes(searchTerm.toLowerCase())
                );
            });

            if (filteredProjects.length > 0) {
                setProjects(filteredProjects);
            } else {
                setError('No projects found.');
            }
        } catch (error) {
            setError('Failed to fetch search results.');
        } finally {
            setLoading(false);
        }
    };

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Navbar />

            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-gray-800 text-white h-screen sticky top-0 p-4">
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
                <div className="flex-1 p-8 bg-gray-50 overflow-y-auto h-screen">
                    <h1 className="text-3xl font-bold mb-6">All Projects</h1>

                    {/* Search Bar */}
                    <div className="flex justify-center mb-6">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search projects..."
                            className="border border-gray-300 p-2 rounded-md w-1/2 text-black"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 text-white p-2 ml-2 rounded-md hover:bg-blue-600"
                        >
                            Search
                        </button>
                    </div>

                    {/* Loading Indicator */}
                    {loading && <div className="text-center">Loading...</div>}

                    {!loading && (viewWeeklyProjects || yearSubmitted) ? (
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentProjects.length > 0 ? (
                                currentProjects.map((project, index) => (
                                    <div key={index} className="mb-4 p-4 border bg-gray-200 border-gray-200 rounded-lg shadow-md hover:shadow-lg ">
                                        <h2 className="text-2xl font-semibold text-black bg-blue-400 p-2 rounded-md hover:bg-green-500">
                                            <a a href={`/project/${project._id}`} target="_blank" rel="noreferrer">{project.title}</a>
                                        </h2>
                                        <img
                                            src={project.doc || "/images/default.jpg"}
                                            alt={project.task || "Task Image"}
                                            className="mt-4 w-full h-56 object-cover rounded-md"
                                        />
                                        <p className="text-black mt-2">{project.description}</p>
                                        <p className="text-sm text-gray-500">{project.doc}</p>

                                        <p className="text-sm text-blue-400 mt-2">
                                            Link: <a href={project.reference} target="_blank" rel="noreferrer">{project.reference}</a>
                                        </p>
                                        <p className="text-sm text-yellow-300">Trainer: {project.trainer}</p>
                                        <p className="text-sm text-gray-500">Date: {project.date}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 mt-8">No projects available at the moment.</p>
                            )}
                            : (
                            <p>No {viewWeeklyProjects ? 'weekly' : 'year-specific'} projects found.</p>
                            )}
                        </div >
                    ) : (
                        <div className="flex items-center justify-center min-h-screen">
                            <div className="mt-8 w-16 h-16 border-4 border-t-red-600 border-b-green-600 border-l-white border-r-white rounded-full animate-spin"></div>
                        </div>
                    )}

                    {/* Pagination */}
                    {
                        totalPages > 1 && (
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
                        )
                    }
                </div >
            </div >
        </>
    );
};

export default Allprojects;
