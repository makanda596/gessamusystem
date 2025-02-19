import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.PNG';
import { Menu, X } from 'lucide-react';

const Allprojects = () => {
    const [projects, setProjects] = useState([]);
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    const [viewWeeklyProjects, setViewWeeklyProjects] = useState(true);
    const [yearSubmitted, setYearSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);
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

    const handleSearch = debounce(() => {
        if (searchTerm.trim() === '') {
            setError('Please enter a search term.');
            return;
        }
        setLoading(true);
        try {
            const filteredProjects = projects.filter(project => {
                const title = project.title || '';
                return title.toLowerCase().includes(searchTerm.toLowerCase());
            });
            setProjects(filteredProjects.length > 0 ? filteredProjects : []);
        } catch (error) {
            setError('Failed to fetch search results.');
        } finally {
            setLoading(false);
        }
    }, 500);

    const totalPages = Math.ceil(projects.length / projectsPerPage);
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const currentProjects = projects.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage);

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Mobile Sidebar Toggle */}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-4">
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            {/* Sidebar */}
            <div className={`absolute md:relative bg-gray-800 text-white p-4 md:w-64 w-3/4 h-full transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 duration-300`}>
                <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
                <button onClick={() => setViewWeeklyProjects(true)} className="block w-full text-left mb-4 hover:text-blue-400">View Weekly Projects</button>
                <div className="mb-6">
                    <p className="text-white">Enter Year</p>
                    <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Enter your year" className="border p-2 mb-2 w-full text-black" />
                    <button onClick={onSubmit} className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600">Submit</button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-y-auto">
                <h1 className="text-3xl font-bold mb-6">All Projects</h1>

                {/* Search */}
                <div className="flex mb-6">
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search projects..." className="border p-2 rounded-md w-1/2 text-black" />
                    <button onClick={handleSearch} className="bg-blue-500 text-white p-2 ml-2 rounded-md hover:bg-blue-600">Search</button>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentProjects.length > 0 ? currentProjects.map((project, index) => (
                        <div key={index} className="bg-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                            <h2 className="text-lg font-semibold text-blue-600 hover:underline">
                                <a href={`/project/${project._id}`} target="_blank">{project.title}</a>
                            </h2>
                            <img src={logo} alt={project.task || 'Task Image'} className="mt-4 w-full h-40 object-cover rounded-md" />
                            <p className="mt-2 text-gray-700">{project.description.length > 100 ? `${project.description.slice(0, 100)}...` : project.description}</p>
                            <p className="text-md font-bold text-green-600">Trainer: {project.trainer}</p>
                            <p className="text-sm text-red-700">Date: {new Date(project?.date).toLocaleDateString()}</p>
                        </div>
                    )) : <p className="text-center text-gray-500">No projects available.</p>}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 flex justify-center">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="bg-gray-300 text-gray-700 p-2 rounded-md mx-2">Prev</button>
                        <span className="text-gray-700">{currentPage} of {totalPages}</span>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="bg-gray-300 text-gray-700 p-2 rounded-md mx-2">Next</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Allprojects;
