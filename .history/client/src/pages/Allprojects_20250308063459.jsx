import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import logo from '../assets/logo.jpg';
import { debounce } from 'lodash';

const AllProjects = () => {
    const [projects, setProjects] = useState([]);
    const [trendingProjects, setTrendingProjects] = useState([]);
    const [myProjects, setMyProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [newProject, setNewProject] = useState({ title: '', description: '', trainer: '', reference: '' });
    
    const projectsPerPage = 6;
    const userId = "1234"; // Replace with dynamic user ID

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/projects/getweekly-projects');
            const allProjects = response.data;
            
            setTrendingProjects(allProjects.filter(p => p.trending)); // Filter trending projects
            setMyProjects(allProjects.filter(p => p.userId === userId)); // Filter user-specific projects
            setProjects(allProjects.filter(p => !p.trending)); // Exclude trending projects from main section
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

    return (
        <>
            <Navbar />
            <div className="flex p-6 bg-gray-50 h-screen overflow-hidden">
                {/* Left Section - Trending Projects */}
                <div className="w-1/4 p-4 border-r border-gray-300 bg-white shadow rounded-lg overflow-y-auto">
                    <h2 className="text-xl font-semibold mb-4">Trending Projects</h2>
                    {trendingProjects.map((project, index) => (
                        <div key={index} className="p-2 border-b">
                            <h3 className="text-blue-600 font-medium">{project.title}</h3>
                            <p className="text-sm text-gray-700">{project.trainer}</p>
                        </div>
                    ))}
                </div>

                {/* Main Section - All Projects */}
                <div className="flex-1 px-6 overflow-y-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold">All Projects</h1>
                        <button
                            onClick={() => setShowForm(true)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Post a Project
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {projects.map((project, index) => (
                            <div key={index} className="p-4 border bg-white shadow rounded-lg">
                                <h2 className="text-md font-semibold text-blue-600">{project.title}</h2>
                                <p className="text-gray-700 mt-2">{project.description}</p>
                                <p className="text-sm text-black font-bold">Trainer: {project.trainer}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Section - My Projects */}
                <div className="w-1/4 p-4 border-l border-gray-300 bg-white shadow rounded-lg overflow-y-auto">
                    <h2 className="text-xl font-semibold mb-4">My Projects</h2>
                    {myProjects.map((project, index) => (
                        <div key={index} className="p-2 border-b">
                            <h3 className="text-blue-600 font-medium">{project.title}</h3>
                            <p className="text-sm text-gray-700">{project.trainer}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pop-up Form */}
            {showForm && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Post a New Project</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="title" placeholder="Project Title" className="border p-2 rounded w-full mb-2" onChange={handleFormChange} />
                            <textarea name="description" placeholder="Description" className="border p-2 rounded w-full mb-2" onChange={handleFormChange}></textarea>
                            <input type="text" name="trainer" placeholder="Trainer Name" className="border p-2 rounded w-full mb-2" onChange={handleFormChange} />
                            <div className="flex justify-end">
                                <button type="button" className="mr-2 bg-gray-400 px-4 py-2 rounded-md" onClick={() => setShowForm(false)}>Cancel</button>
                                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AllProjects;
