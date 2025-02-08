import React, { useState } from 'react';

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [stats, setStats] = useState({
        students: 120,
        weeklyProjects: 15,
        totalProjects: 150,
        totalTasks: 320
    });

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
            case 'projects':
                return <div>Project Section</div>;
            case 'tasks':
                return <div>Task Section</div>;
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
                        <li><button onClick={() => setActiveSection('projects')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Projects</button></li>
                        <li><button onClick={() => setActiveSection('tasks')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Tasks</button></li>
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
