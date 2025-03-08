import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import logo from '../assets/logo.jpg';
import { debounce } from 'lodash';
import { Search } from "lucide-react";

const AllProjects = () => {
    const [projects, setProjects] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [newProject, setNewProject] = useState({ title: '', description: '', trainer: '', reference: '' });

    const projectsPerPage = 9;

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

    const handleFormChange = (e) => {
        setNewProject({ ...newProject, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/projects/add', newProject);
            setShowForm(false);
            fetchProjects();
        } catch (error) {
            console.error('Failed to submit project:', error);
        }
    };

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    return (
        <>
            <Navbar />
            <div className="flex p-6 bg-gray-50 h-screen overflow-hidden">
                <div className="flex-1 overflow-y-auto px-4">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-xl font-bold">Projects</h1>
                        <div className="relative flex items-centerw-full mt-2 max-w-sm">
                            {/* Show Input Field when `showInput` is true */}
                            <button
                                onClick={() => setShowInput(!showInput)}
                                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-all"
                            >
                                <Search size={20} />
                            </button>
                            {showInput && (
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-1 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    />

                                    {/* Search Button Inside Input */}
                                    <button
                                        onClick={handleSearch}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-all"
                                    >
                                        Search
                                    </button>
                                </div>
                            )}

                        
                        </div>


                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-500 text-sm text-white px-1 py-1 rounded-md hover:bg-blue-600"
                        >
                            Post  Project
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
                                                <a href={`/project/${project._id}`} target="_blank" rel="noreferrer" className="hover:underline">
                                                    {project.title}
                                                </a>
                                            </h2>
                                            
                                        </div>
                                        <p className="text-gray-700 mt-2">
                                            {project.description.length > 100 ? `${project.description.slice(0, 100)}...` : project.description}
                                        </p>
                                        <p className="text-sm text-black font-bold">
                                            Done by: <span className="text-green-600">{project.trainer}</span>
                                        </p>
                                        <p> <a href="mailto:gessamusuport@gmail.com" target="_blank"
                                            rel="noopener noreferrer" className="text-black">Email :<span className='text-blue'>gessamusuport@gmail.com</span></a></p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-gray-500">No projects available.</p>
                            )}
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="bg-gray-300 text-gray-700 p-2 rounded-md mx-2"
                            >
                                Prev
                            </button>
                            <span className="text-gray-700">
                                {currentPage} of {totalPages}
                            </span>
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

                <div className="w-1/4 p-4 border-l border-gray-300 bg-white shadow rounded-lg hidden sm:block">
                    <h2 className="text-xl font-semibold mb-4">Trending Projects</h2>
                    {projects.slice(2, 6).map((project, index) => (
                        <div key={index} className="p-2 border-b ">
                            <h3 className="text-blue-600 font-medium">{project.title}</h3>
                            <p className="text-sm text-white">{project.trainer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AllProjects;
