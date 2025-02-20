import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.jpg';
import { debounce } from 'lodash';

const Allprojects = () => {
    const [projects, setProjects] = useState([]);
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    const [viewWeeklyProjects, setViewWeeklyProjects] = useState(true);
    const [yearSubmitted, setYearSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(true);
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

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="flex">
            <button
                className="p-2 bg-blue-500 text-white rounded-md m-2"
                onClick={handleSidebarToggle}
            >
                {sidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
            </button>

            {sidebarOpen && (
                <div className="w-64 bg-gray-800 text-white h-screen sticky top-0 p-4">
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
            )}

            <div className="flex-1 p-6 bg-gray-50 overflow-y-auto h-screen">
                <h1 className="text-3xl font-bold mb-6">All Projects</h1>
                {/* Other main content remains unchanged */}
            </div>
        </div>
    );
};

export default Allprojects;
