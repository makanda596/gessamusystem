import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
    const [projectDropdown, setProjectDropdown] = useState(false);
    const [taskDropdown, setTaskDropdown] = useState(false);
    const [quizDropdown, setQuizDropdown] = useState(false);
    const [userDropdown, setUserDropdown] = useState(false);

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

    useEffect(() => {
        const fetchWeeklyCount = async () => {
            try {
                const response = await axios.get("http://localhost:5000/projects/countWeekly");
                setWeeklyProjects(response.data.count);
            } catch (error) {
                setError("Failed to fetch weekly count");
            }
        };
        fetchWeeklyCount();
    }, []);

    useEffect(() => {
        const fetchTotalCount = async () => {
            try {
                const response = await axios.get("http://localhost:5000/projects/countProject");
                setProjects(response.data.count);
            } catch (error) {
                setError("Failed to fetch total projects count");
            }
        };
        fetchTotalCount();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:5000/admin/adminLogout");
            window.location.href = '/';
        } catch (error) {
            console.log(error.message);
        }
    };

    const renderMainContent = () => {
        switch (activeSection) {
            case 'postProject':
                return <PostProject />;
            case 'getProjects':
                return <GetProjects />;
            case 'users':
                return <CreateUser />;
            case 'students':
                return <Student />;
            default:
                return (
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-blue-600">Admin Dashboard</h2>
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md text-center">
                                <p className="text-3xl font-semibold">{studentCount}</p>
                                <p>Students</p>
                            </div>
                            <div className="bg-teal-500 text-white p-6 rounded-lg shadow-md text-center">
                                <p className="text-3xl font-semibold">{weeklyProjects}</p>
                                <p>Weekly Projects</p>
                            </div>
                            <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md text-center">
                                <p className="text-3xl font-semibold">{projects}</p>
                                <p>Total Projects</p>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            <div className="w-64 bg-blue-600 text-white shadow-lg p-4 h-screen fixed">
                <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
                <nav className="space-y-2">
                    <button onClick={() => setActiveSection('dashboard')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700">Dashboard</button>
                    <button onClick={() => setActiveSection('students')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700">Manage Students</button>
                    <button onClick={() => setProjectDropdown(!projectDropdown)} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700 flex justify-between">Projects {projectDropdown ? '▲' : '▼'}</button>
                    {projectDropdown && (
                        <div className="pl-4 space-y-2">
                            <button onClick={() => setActiveSection('postProject')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700">Post a Project</button>
                            <button onClick={() => setActiveSection('getProjects')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700">Get All Projects</button>
                        </div>
                    )}
                    <button onClick={() => setUserDropdown(!userDropdown)} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700 flex justify-between">Users {userDropdown ? '▲' : '▼'}</button>
                    {userDropdown && (
                        <div className="pl-4 space-y-2">
                            <button onClick={() => setActiveSection('users')} className="block w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700">Create a User</button>
                        </div>
                    )}
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 mt-4 bg-red-500 hover:bg-red-700 rounded-lg">Logout</button>
                </nav>
            </div>
            <div className="flex-1 p-6 ml-64 flex items-center justify-center">
                {renderMainContent()}
            </div>
        </div>
    );
};

export default AdminDashboard;
