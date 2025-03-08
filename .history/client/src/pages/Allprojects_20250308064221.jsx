import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import logo from '../assets/logo.jpg';
import { debounce } from 'lodash';

const AllProjects = () => {
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [newProject, setNewProject] = useState({ title: '', description: '', trainer: '', reference: '' });

    const projectsPerPage = 6;

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/projects/getweekly-projects');
            setProjects(response.data);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = debounce(() => {
        if (searchTerm.trim() === '') return;
        setLoading(true);
        try {
            const filteredProjects = projects.filter((project) =>
                [project.title, project.description, project.trainer]
                    .join(' ')
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
            );
            setProjects(filteredProjects.length > 0 ? filteredProjects : []);
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
            <div className="p-6 bg-gray-50 min-h-screen flex flex-col md:flex-row gap-6">
                {/* Main Section (Projects) */}
                <div className="flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">All Projects</h1>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-2 md:mt-0"
                        >
                            Post a Project
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row mb-6 gap-2">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search projects..."
                            className="border border-gray-300 p-2 rounded-md w-full sm:w-1/2"
                        />
                        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                            Search
                        </button>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center">
                            <div className="w-16 h-16 border-4 border-t-red-600 border-b-green-600 border-l-white border-r-white rounded-full animate-spin"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {currentProjects.length > 0 ? (
                                currentProjects.map((project, index) => (
                                    <div key={index} className="p-4 border bg-white shadow rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <img src={logo} alt="Task" className="w-14 h-14 object-cover rounded-sm" />
                                            <h2 className="text-md font-semibold text-blue-600">
                                                <a href={`/project/${project._id}`} className="hover:underline">
                                                    {project.title}
                                                </a>
                                            </h2>
                                        </div>
                                        <p className="text-gray-700 mt-2">
                                            {project.description.length > 100 ? `${project.description.slice(0, 100)}...` : project.description}
                                        </p>
                                        <p className="text-sm text-black font-bold">Done by: <span className="text-green-600">{project.trainer}</span></p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No projects available.</p>
                            )}
                        </div>
                    )}
                </div>

                {/* Trending Projects Section */}
                <div className="w-full md:w-1/3 p-4 border-l border-gray-300 bg-white shadow rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Trending Projects</h2>
                    {projects.slice(0, 4).map((project, index) => (
                        <div key={index} className="p-2 border-b">
                            <h3 className="text-blue-600 font-medium">{project.title}</h3>
                            <p className="text-sm text-gray-700">{project.trainer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AllProjects;
