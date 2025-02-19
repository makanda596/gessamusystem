import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.PNG';
import { debounce } from 'lodash';

const Allprojects = () => {
    const [projects, setProjects] = useState([]);
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    const [viewWeeklyProjects, setViewWeeklyProjects] = useState(true);
    const [yearSubmitted, setYearSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

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

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex relative">
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-4 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <button onClick={toggleSidebar} className="absolute top-4 right-4 text-white text-2xl">
                    ✖
                </button>
                <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
                <ul>
                    <li className="mb-4">
                        <button onClick={() => setViewWeeklyProjects(true)} className="hover:text-blue-400 text-blue-500">
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
                        <button onClick={() => setYearSubmitted(true)} className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600">
                            Submit Year
                        </button>
                    </li>
                </ul>
            </div>

            {/* Sidebar Toggle Button (Hidden when sidebar is open) */}
            {!sidebarOpen && (
                <button
                    onClick={toggleSidebar}
                    className="fixed top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    ☰
                </button>
            )}

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-50 overflow-y-auto h-screen">
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
                    <button onClick={toggleSidebar} className="bg-blue-500 text-white p-2 ml-2 rounded-md hover:bg-blue-600">
                        Search
                    </button>
                </div>

                {/* Projects List */}
                {!loading && (viewWeeklyProjects || yearSubmitted) && (
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {projects.length > 0 ? (
                            projects.map((project, index) => (
                                <div key={index} className="mb-4 p-2 border bg-gray-200 border-gray-200 rounded-lg shadow-md">
                                    <h2 className="text-lg font-semibold text-blue-600 p-1 rounded-md transition-colors duration-300">
                                        <a href={`/project/${project._id}`} target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-600">
                                            {project.title}
                                        </a>
                                    </h2>
                                    <img src={logo} alt="Task" className="mt-4 w-full h-56 object-cover rounded-md mb-4" />
                                    <p className="text-black font-bold mt-2">{project.description}</p>
                                    <p className="text-md text-black font-bold">
                                        Trainer: <span className="text-green-600 text-xl font-bold">{project.trainer}</span>
                                    </p>
                                    <p className="text-sm text-black font-bold">
                                        Date: <span className="text-red-700">{new Date(project?.date).toLocaleDateString()}</span>
                                    </p>
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.PNG';
import { debounce } from 'lodash';

const Allprojects = () => {
    const [projects, setProjects] = useState([]);
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    const [viewWeeklyProjects, setViewWeeklyProjects] = useState(true);
    const [yearSubmitted, setYearSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

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

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex relative">
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white p-4 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out`}>
                <button onClick={toggleSidebar} className="absolute top-4 right-4 text-white text-2xl">
                    ✖
                </button>
                <h2 className="text-xl font-semibold mb-6">Dashboard</h2>
                <ul>
                    <li className="mb-4">
                        <button onClick={() => setViewWeeklyProjects(true)} className="hover:text-blue-400 text-blue-500">
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
                        <button onClick={() => setYearSubmitted(true)} className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600">
                            Submit Year
                        </button>
                    </li>
                </ul>
            </div>

            {/* Sidebar Toggle Button (Hidden when sidebar is open) */}
            {!sidebarOpen && (
                <button
                    onClick={toggleSidebar}
                    className="fixed top-4 left-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                >
                    ☰
                </button>
            )}

            {/* Main Content */}
            <div className="flex-1 p-6 bg-gray-50 overflow-y-auto h-screen">
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
                    <button onClick={toggleSidebar} className="bg-blue-500 text-white p-2 ml-2 rounded-md hover:bg-blue-600">
                        Search
                    </button>
                </div>

                {/* Projects List */}
                {!loading && (viewWeeklyProjects || yearSubmitted) && (
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {projects.length > 0 ? (
                            projects.map((project, index) => (
                                <div key={index} className="mb-4 p-2 border bg-gray-200 border-gray-200 rounded-lg shadow-md">
                                    <h2 className="text-lg font-semibold text-blue-600 p-1 rounded-md transition-colors duration-300">
                                        <a href={`/project/${project._id}`} target="_blank" rel="noreferrer" className="hover:underline hover:text-blue-600">
                                            {project.title}
                                        </a>
                                    </h2>
                                    <img src={logo} alt="Task" className="mt-4 w-full h-56 object-cover rounded-md mb-4" />
                                    <p className="text-black font-bold mt-2">{project.description}</p>
                                    <p className="text-md text-black font-bold">
                                        Trainer: <span className="text-green-600 text-xl font-bold">{project.trainer}</span>
                                    </p>
                                    <p className="text-sm text-black font-bold">
                                        Date: <span className="text-red-700">{new Date(project?.date).toLocaleDateString()}</span>
                                    </p>
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
