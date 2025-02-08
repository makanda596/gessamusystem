import React, { useState } from 'react';
import { ExpandMore, ExpandLess } from '@mui/icons-material';

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [stats, setStats] = useState({
        students: 120,
        weeklyProjects: 15,
        totalProjects: 150,
        totalTasks: 320
    });
    const [projectDropdown, setProjectDropdown] = useState(false);
    const [taskDropdown, setTaskDropdown] = useState(false);
    const [quizDropdown, setQuizDropdown] = useState(false);

    const renderMainContent = () => {
        if (activeSection === 'dashboard') {
            return (
                <div className="flex flex-col items-center justify-center h-full">
                    <h2 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h2>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md w-1/2 text-center">
                        <p><strong>Students:</strong> {stats.students}</p>
                        <p><strong>Weekly Projects:</strong> {stats.weeklyProjects}</p>
                        <p><strong>Total Projects:</strong> {stats.totalProjects}</p>
                        <p><strong>Total Tasks:</strong> {stats.totalTasks}</p>
                    </div>
                </div>
            );
        }
        switch (activeSection) {
            case 'postWeeklyProject':
                return <div>Post Weekly Project</div>;
            case 'postProject':
                return <div>Post a Project</div>;
            case 'postTask':
                return <div>Post a Task</div>;
            case 'getTask':
                return <div>Get Tasks</div>;
            case 'postQuiz':
                return <div>Post a Quiz</div>;
            case 'users':
                return <div>User Management</div>;
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
                        <li><button onClick={() => setActiveSection('dashboard')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Dashboard</button></li>
                        <li>
                            <button onClick={() => setProjectDropdown(!projectDropdown)} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex justify-between">
                                Projects {projectDropdown ? <ExpandLess /> : <ExpandMore />}
                            </button>
                            {projectDropdown && (
                                <ul className="pl-4 mt-2 space-y-1">
                                    <li><button onClick={() => setActiveSection('postWeeklyProject')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Post Weekly Project</button></li>
                                    <li><button onClick={() => setActiveSection('postProject')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Post a Project</button></li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button onClick={() => setTaskDropdown(!taskDropdown)} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex justify-between">
                                Tasks {taskDropdown ? <ExpandLess /> : <ExpandMore />}
                            </button>
                            {taskDropdown && (
                                <ul className="pl-4 mt-2 space-y-1">
                                    <li><button onClick={() => setActiveSection('postTask')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Post a Task</button></li>
                                    <li><button onClick={() => setActiveSection('getTask')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Get Tasks</button></li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button onClick={() => setQuizDropdown(!quizDropdown)} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex justify-between">
                                Quiz {quizDropdown ? <ExpandLess /> : <ExpandMore />}
                            </button>
                            {quizDropdown && (
                                <ul className="pl-4 mt-2 space-y-1">
                                    <li><button onClick={() => setActiveSection('postQuiz')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Post a Quiz</button></li>
                                </ul>
                            )}
                        </li>
                        <li><button onClick={() => setActiveSection('users')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Users</button></li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 flex items-center justify-center">
                {renderMainContent()}
            </div>
        </div>
    );
};

export default AdminDashboard;
