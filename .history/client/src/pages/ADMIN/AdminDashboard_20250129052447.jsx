import React, { useState } from 'react';

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('projects');
    const [showTaskDropdown, setShowTaskDropdown] = useState(false);
    const [showProjectDropdown, setShowProjectDropdown] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    // State for forms and success popup (same as before)
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectYear, setProjectYear] = useState('');
    const [projectReference, setProjectReference] = useState('');
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskLevel, setTaskLevel] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState('user');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Form handlers and other logic (same as before)
    const handleProjectSubmit = (e) => { /* ... */ };
    const handleTaskSubmit = (e) => { /* ... */ };
    const handleUserCreate = (e) => { /* ... */ };
    const closePopup = () => { /* ... */ };

    // Render main content (same as before)
    const renderMainContent = () => { /* ... */ };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Admin Panel</h2>
                <nav>
                    <ul className="space-y-2">
                        {/* Tasks Dropdown */}
                        <li>
                            <button
                                onClick={() => setShowTaskDropdown(!showTaskDropdown)}
                                className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 flex justify-between items-center"
                            >
                                Tasks
                                <span>{showTaskDropdown ? '▲' : '▼'}</span>
                            </button>
                            {showTaskDropdown && (
                                <ul className="pl-4 mt-2 space-y-2">
                                    <li>
                                        <button
                                            onClick={() => setActiveSection('postTask')}
                                            className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                                        >
                                            Post Task
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setActiveSection('getAllTasks')}
                                            className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                                        >
                                            Get All Tasks
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Projects Dropdown */}
                        <li>
                            <button
                                onClick={() => setShowProjectDropdown(!showProjectDropdown)}
                                className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 flex justify-between items-center"
                            >
                                Projects
                                <span>{showProjectDropdown ? '▲' : '▼'}</span>
                            </button>
                            {showProjectDropdown && (
                                <ul className="pl-4 mt-2 space-y-2">
                                    <li>
                                        <button
                                            onClick={() => setActiveSection('postProject')}
                                            className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                                        >
                                            Post Project
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setActiveSection('postWeeklyProject')}
                                            className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                                        >
                                            Post Weekly Project
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setActiveSection('getAllProjects')}
                                            className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                                        >
                                            Get All Projects
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Users Dropdown */}
                        <li>
                            <button
                                onClick={() => setShowUserDropdown(!showUserDropdown)}
                                className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 flex justify-between items-center"
                            >
                                Users
                                <span>{showUserDropdown ? '▲' : '▼'}</span>
                            </button>
                            {showUserDropdown && (
                                <ul className="pl-4 mt-2 space-y-2">
                                    <li>
                                        <button
                                            onClick={() => setActiveSection('createUser')}
                                            className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                                        >
                                            Create User
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => setActiveSection('getAllUsers')}
                                            className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                                        >
                                            Get All Users
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>

                        {/* Quizzes */}
                        <li>
                            <button
                                onClick={() => setActiveSection('quizzes')}
                                className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                            >
                                Quizzes
                            </button>
                        </li>

                        {/* Settings */}
                        <li>
                            <button
                                onClick={() => setActiveSection('settings')}
                                className="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
                            >
                                Settings
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
                {renderMainContent()}
            </div>

            {/* Success Pop-up */}
            {showSuccessPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-xl font-semibold text-green-600 mb-4">Success!</h3>
                        <p className="text-gray-700 mb-4">{successMessage}</p>
                        <button
                            onClick={closePopup}
                            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;