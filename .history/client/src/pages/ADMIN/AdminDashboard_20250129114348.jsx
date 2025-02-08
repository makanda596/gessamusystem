import React, { useState } from 'react';

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
    const [students, setStudents] = useState([
        { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', admNo: '001', year: '2023', dateSignedIn: '2024-01-10' },
        { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', admNo: '002', year: '2022', dateSignedIn: '2024-01-12' }
    ]);

    const handleDelete = (admNo) => {
        setStudents(students.filter(student => student.admNo !== admNo));
    };

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
                return (
                    <div>
                        <h2 className="text-xl font-bold mb-4">Registered Students</h2>
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border border-gray-300 px-4 py-2">First Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Last Name</th>
                                    <th className="border border-gray-300 px-4 py-2">Email</th>
                                    <th className="border border-gray-300 px-4 py-2">Adm No</th>
                                    <th className="border border-gray-300 px-4 py-2">Year</th>
                                    <th className="border border-gray-300 px-4 py-2">Date Signed In</th>
                                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student.admNo} className="text-center">
                                        <td className="border border-gray-300 px-4 py-2">{student.firstName}</td>
                                        <td className="border border-gray-300 px-4 py-2">{student.lastName}</td>
                                        <td className="border border-gray-300 px-4 py-2">{student.email}</td>
                                        <td className="border border-gray-300 px-4 py-2">{student.admNo}</td>
                                        <td className="border border-gray-300 px-4 py-2">{student.year}</td>
                                        <td className="border border-gray-300 px-4 py-2">{student.dateSignedIn}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <button className="bg-red-500 text-white px-2 py-1 rounded mr-2" onClick={() => handleDelete(student.admNo)}>Delete</button>
                                            <button className="bg-blue-500 text-white px-2 py-1 rounded">Update</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                        <li><button onClick={() => setActiveSection('dashboard')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Dashboard</button></li>
                        <li>
                            <button onClick={() => setProjectDropdown(!projectDropdown)} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex justify-between">
                                Projects {projectDropdown ? '▲' : '▼'}
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
                                Tasks {taskDropdown ? '▲' : '▼'}
                            </button>
                            {taskDropdown && (
                                <ul className="pl-4 mt-2 space-y-1">
                                    <li><button onClick={() => setActiveSection('postTask')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Post a Task</button></li>
                                    <li><button onClick={() => setActiveSection('getTask')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Get Tasks</button></li>
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
