import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserGraduate, FaProjectDiagram, FaTasks, FaBell, FaSignOutAlt } from 'react-icons/fa';
import PostProject from './PostProject';
import GetProjects from './GetProjects';
import Student from './Student';
import CreateUser from './CreateUser';

const AdminDashboard = () => {
    axios.defaults.withCredentials = true;
    const [studentCount, setStudentCount] = useState(0);
    const [error, setError] = useState("");
    const [weeklyProjects, setWeeklyProjects] = useState(0);
    const [projects, setProjects] = useState(0);
    const [activeSection, setActiveSection] = useState('dashboard');
    const [notifications, setNotifications] = useState([
        "New student John Doe registered.",
        "Weekly project 'Project 1' is due soon.",
        "New quiz posted: 'Math Quiz 2025'.",
        "Task 'Complete Assignment 5' marked as pending."
    ]);

    // Fetching student count
    useEffect(() => {
        const fetchStudentCount = async () => {
            try {
                const response = await axios.get("http://localhost:5000/auth/studentCount");
                setStudentCount(response.data.count);
            } catch (error) {
                setError("Failed to fetch student count");
            }
        };
        fetchStudentCount();
    }, []);

    const renderMainContent = () => {
        if (activeSection === 'dashboard') {
            return (
                <div className="flex flex-col items-center w-full p-8">
                    <h2 className="text-3xl font-extrabold mb-6 text-blue-600">Welcome to Admin Dashboard</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
                            <FaUserGraduate className="text-4xl" />
                            <div>
                                <h4 className="text-3xl font-semibold">{studentCount}</h4>
                                <p>Students</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
                            <FaProjectDiagram className="text-4xl" />
                            <div>
                                <h4 className="text-3xl font-semibold">{weeklyProjects}</h4>
                                <p>Weekly Projects</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
                            <FaTasks className="text-4xl" />
                            <div>
                                <h4 className="text-3xl font-semibold">{projects}</h4>
                                <p>Total Projects</p>
                            </div>
                        </div>
                        <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
                            <FaBell className="text-4xl" />
                            <div>
                                <h4 className="text-3xl font-semibold">{notifications.length}</h4>
                                <p>Notifications</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <div className="w-64 bg-blue-700 text-white p-6 shadow-lg h-full fixed">
                <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                <nav>
                    <ul className="space-y-3">
                        <li>
                            <button onClick={() => setActiveSection('dashboard')} className="w-full text-left px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-900 transition">
                                Dashboard
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveSection('students')} className="w-full text-left px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-900 transition">
                                Manage Students
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveSection('postProject')} className="w-full text-left px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-900 transition">
                                Post a Project
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveSection('getProjects')} className="w-full text-left px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-900 transition">
                                View Projects
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveSection('users')} className="w-full text-left px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-900 transition">
                                Create User
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveSection('postQuiz')} className="w-full text-left px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-900 transition">
                                Post a Quiz
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveSection('postTask')} className="w-full text-left px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-900 transition">
                                Post a Task
                            </button>
                        </li>
                        <li>
                            <button onClick={() => setActiveSection('getTask')} className="w-full text-left px-4 py-2 rounded-lg bg-blue-800 hover:bg-blue-900 transition">
                                View Tasks
                            </button>
                        </li>
                        <li>
                            <button onClick={() => window.location.href = '/'} className="w-full flex items-center gap-2 text-left px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition">
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
            {/* Main Content */}
            <div className="flex-1 p-8 ml-64 flex items-center justify-center">
                {renderMainContent()}
            </div>
        </div>
    );
};

export default AdminDashboard;