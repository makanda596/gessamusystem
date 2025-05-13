import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import logo from '../assets/logo.jpg';
import { debounce } from 'lodash';
import { Search } from "lucide-react";
import SubmitProject from '../components/SubmitProject';

const Trainings = () => {
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isPopup, setIsPopup] = useState(false);
    const [showInput, setShowInput] = useState(false);

    const projectsPerPage = 9;

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://gessamusystem-back.onrender.com/projects/getweekly-projects');
            setProjects(response.data);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = debounce(() => {
        if (!searchTerm.trim()) return;
        setLoading(true);
        try {
            const filteredProjects = projects.filter((project) =>
                [project.title, project.description, project.trainer]
                    .join(' ')
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
            setProjects(filteredProjects);
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    }, 500);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    return (
        <>
            <Navbar />
            <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h1 className="text-2xl font-bold text-gray-800">Weekly Training Projects</h1>

                        <div className="flex items-center gap-2 w-full max-w-md">
                            <button
                                onClick={() => setShowInput(!showInput)}
                                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                            >
                                <Search size={20} />
                            </button>

                            {showInput && (
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        placeholder="Search projects..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-3 pr-24 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                                    />
                                    <button
                                        onClick={handleSearch}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition"
                                    >
                                        Search
                                    </button>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setIsPopup(true)}
                            className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-md transition"
                        >
                            Post Project
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center mt-16">
                            <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentProjects.length > 0 ? (
                                currentProjects.map((project, index) => (
                                    <div key={index} className="bg-white border rounded-lg shadow p-4 hover:shadow-md transition">
                                        <div className="flex items-center gap-4 mb-3">
                                            <img src={logo} alt="Logo" className="w-12 h-12 object-cover rounded" />
                                            <a
                                                href={`/training/${project._id}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-lg font-semibold text-blue-600 hover:underline"
                                            >
                                                {project.title}
                                            </a>
                                        </div>
                                        <p className="text-gray-700 text-sm mb-2">
                                            {project.description.length > 100 ? `${project.description.slice(0, 100)}...` : project.description}
                                        </p>
                                        <p className="text-sm font-medium text-gray-800">
                                            Done by: <span className="text-green-700 font-semibold">{project.trainer}</span>
                                        </p>
                                        <p className="text-sm font-medium text-gray-800">
                                            Email: <a href="mailto:gessamusuport@gmail.com" className="text-blue-600 underline">gessamusuport@gmail.com</a>
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 col-span-full">No projects available.</p>
                            )}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="mt-6 flex justify-center items-center gap-4">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                            >
                                Prev
                            </button>
                            <span className="text-gray-800">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </main>

                <aside className="hidden lg:block w-full max-w-xs p-6 border-l bg-white shadow-lg">
                    <h2 className="text-lg font-semibold mb-4">Trending Projects</h2>
                    {projects.slice(6, 11).map((project, index) => (
                        <div key={index} className="mb-4 border-b pb-2">
                            <a
                                href={`/project/${project._id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 hover:text-black font-medium underline"
                            >
                                {project.title}
                            </a>
                            <p className="text-sm text-gray-800 font-semibold">{project.trainer}</p>
                        </div>
                    ))}
                </aside>

                <SubmitProject isPopup={isPopup} setIsPopup={setIsPopup} />
            </div>
        </>
    );
};

export default Trainings;
