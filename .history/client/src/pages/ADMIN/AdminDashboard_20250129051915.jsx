import React, { useState } from 'react';

const AdminDashboard = () => {
    // State for active section
    const [activeSection, setActiveSection] = useState('projects');

    // State for Project Form
    const [projectTitle, setProjectTitle] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [projectYear, setProjectYear] = useState('');
    const [projectReference, setProjectReference] = useState('');

    // State for Task Form
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDate, setTaskDate] = useState('');
    const [taskLevel, setTaskLevel] = useState('');

    // State for User Management
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userRole, setUserRole] = useState('user');

    // Success Pop-up State
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Handle Project Submission
    const handleProjectSubmit = (e) => {
        e.preventDefault();
        console.log('Project Submitted:', { projectTitle, projectDescription, projectYear, projectReference });
        setSuccessMessage('Project submitted successfully!');
        setShowSuccessPopup(true);
    };

    // Handle Task Submission
    const handleTaskSubmit = (e) => {
        e.preventDefault();
        console.log('Task Submitted:', { taskTitle, taskDescription, taskDate, taskLevel });
        setSuccessMessage('Task submitted successfully!');
        setShowSuccessPopup(true);
    };

    // Handle User Creation
    const handleUserCreate = (e) => {
        e.preventDefault();
        console.log('User Created:', { userName, userEmail, userRole });
        setSuccessMessage('User created successfully!');
        setShowSuccessPopup(true);
    };

    // Close Pop-up
    const closePopup = () => {
        setShowSuccessPopup(false);
        setSuccessMessage('');
    };

    // Render Main Content Based on Active Section
    const renderMainContent = () => {
        switch (activeSection) {
            case 'projects':
                return (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Post a Project</h2>
                        <form onSubmit={handleProjectSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                                <input
                                    type="text"
                                    value={projectTitle}
                                    onChange={(e) => setProjectTitle(e.target.value)}
                                    placeholder="Enter project title"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={projectDescription}
                                    onChange={(e) => setProjectDescription(e.target.value)}
                                    placeholder="Enter project description"
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                                <input
                                    type="number"
                                    value={projectYear}
                                    onChange={(e) => setProjectYear(e.target.value)}
                                    placeholder="Enter year"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Reference</label>
                                <input
                                    type="text"
                                    value={projectReference}
                                    onChange={(e) => setProjectReference(e.target.value)}
                                    placeholder="Enter reference"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Submit Project
                            </button>
                        </form>
                    </div>
                );
            case 'tasks':
                return (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Post a Task</h2>
                        <form onSubmit={handleTaskSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                                <input
                                    type="text"
                                    value={taskTitle}
                                    onChange={(e) => setTaskTitle(e.target.value)}
                                    placeholder="Enter task title"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    value={taskDescription}
                                    onChange={(e) => setTaskDescription(e.target.value)}
                                    placeholder="Enter task description"
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input
                                    type="date"
                                    value={taskDate}
                                    onChange={(e) => setTaskDate(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                                <input
                                    type="number"
                                    value={taskLevel}
                                    onChange={(e) => setTaskLevel(e.target.value)}
                                    placeholder="Enter level"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Submit Task
                            </button>
                        </form>
                    </div>
                );
            case 'users':
                return (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Create a User</h2>
                        <form onSubmit={handleUserCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    placeholder="Enter user name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={userEmail}
                                    onChange={(e) => setUserEmail(e.target.value)}
                                    placeholder="Enter user email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                                <select
                                    value={userRole}
                                    onChange={(e) => setUserRole(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Create User
                            </button>
                        </form>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-lg p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Admin Panel</h2>
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <button
                                onClick={() => setActiveSection('projects')}
                                className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'projects'
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                Projects
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('tasks')}
                                className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'tasks'
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                Tasks
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveSection('users')}
                                className={`w-full text-left px-4 py-2 rounded-lg ${activeSection === 'users'
                                        ? 'bg-blue-500 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                Users
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