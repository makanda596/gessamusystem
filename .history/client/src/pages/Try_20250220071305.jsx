import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.jpg';
import { debounce } from 'lodash'; // Debounce import

const Allprojects = () => {
    const [projects, setProjects] = useState([]);
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    const [viewWeeklyProjects, setViewWeeklyProjects] = useState(true);
    const [yearSubmitted, setYearSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const projectsPerPage = 6;

    useEffect(() => {
        const fetchWeeklyProjects = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://gessamubackend.onrender.com/projects/getweekly-projects');
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
            const response = await axios.get(`https://gessamubackend.onrender.com/projects/getprojects?year=${year}`);
            setProjects(response.data);
        } catch (error) {
            setError('Failed to fetch projects. Please check the year and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = debounce(async () => {
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
    }, 500);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-gray-800 text-white md:h-screen sticky top-0 p-4">
                <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
                <ul>
                    <li className="mb-4">
                        <button
                            onClick={() => setViewWeeklyProjects(true)}
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
                            onClick={() => setYear('')}
                            className="bg-gray-500 text-white p-2 rounded-md w-full hover:bg-gray-600 mt-2"
                        >
                            Clear Year Selection
                        </button>
                        {error && <p className="text-red-500 mt-2">{error}</p>}
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-50 overflow-y-auto min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-center md:text-left">All Projects</h1>

                {/* Search Bar */}
                <div className="flex flex-col sm:flex-row justify-center mb-6">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search projects..."
                        className="border border-gray-300 p-2 rounded-md w-full sm:w-1/2 text-black"
                    />
                    <button
                        onClick={handleSearch}
                        className="bg-blue-500 text-white p-2 mt-2 sm:mt-0 sm:ml-2 rounded-md hover:bg-blue-600"
                    >
                        Search
                    </button>
                </div>

                {/* Loading Indicator */}
                {loading && <div className="text-center">Loading...</div>}

                {/* Projects List */}
                {!loading && (viewWeeklyProjects || yearSubmitted) && (
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                        {currentProjects.length > 0 ? (
                            currentProjects.map((project, index) => (
                                <div
                                    key={index}
                                    className="mb-4 p-2 border bg-gray-200 border-gray-200 rounded-lg shadow-md"
                                >
                                    <h2 className="text-lg font-semibold text-blue-600 p-1 rounded-md transition-colors duration-300">
                                        <a href={`/project/${project._id}`} target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-600">
                                            {project.title}
                                        </a>
                                    </h2>
                                    <img
                                        src={logo}
                                        alt={project.task || "Task Image"}
                                        className="mt-4 w-full h-56 object-cover rounded-md mb-4"
                                    />
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 mt-8">No projects available at the moment.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Allprojects;
