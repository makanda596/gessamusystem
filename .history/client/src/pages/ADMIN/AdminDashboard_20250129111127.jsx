import React, { useState } from 'react';

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('projects');
    const [stats, setStats] = useState({
        students: 120,
        weeklyProjects: 15,
        totalProjects: 150,
        totalTasks: 320
    });

    const renderMainContent = () => {
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
                        <li><button onClick={() => setActiveSection('projects')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Projects</button></li>
                        <li><button onClick={() => setActiveSection('tasks')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Tasks</button></li>
                        <li><button onClick={() => setActiveSection('users')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Users</button></li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
                {renderMainContent()}
            </div>

            {/* Right Sidebar */}
            <div className="w-64 bg-white shadow-lg p-4">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Dashboard Stats</h2>
                <div className="space-y-4">
                    <div className="bg-gray-100 p-3 rounded-lg"><strong>Students:</strong> {stats.students}</div>
                    <div className="bg-gray-100 p-3 rounded-lg"><strong>Weekly Projects:</strong> {stats.weeklyProjects}</div>
                    <div className="bg-gray-100 p-3 rounded-lg"><strong>Total Projects:</strong> {stats.totalProjects}</div>
                    <div className="bg-gray-100 p-3 rounded-lg"><strong>Total Tasks:</strong> {stats.totalTasks}</div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
