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
    const [userDropdown, setUserDropdown] = useState(false);
    const [students, setStudents] = useState([
        { firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', admNo: '001', year: '2023', dateSignedIn: '2024-01-10' },
        { firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', admNo: '002', year: '2022', dateSignedIn: '2024-01-12' }
    ]);

    const handleDelete = (admNo) => {
        setStudents(students.filter(student => student.admNo !== admNo));
    };

    const renderMainContent = () => {
        if (activeSection === 'users') {
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
                    <div className="mt-6">
                        <h2 className="text-xl font-bold mb-4">Create New User</h2>
                        <form className="bg-white p-6 rounded-lg shadow-md">
                            <div className="mb-4">
                                <label className="block text-gray-700">First Name</label>
                                <input type="text" className="w-full px-3 py-2 border rounded" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Last Name</label>
                                <input type="text" className="w-full px-3 py-2 border rounded" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input type="email" className="w-full px-3 py-2 border rounded" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Adm No</label>
                                <input type="text" className="w-full px-3 py-2 border rounded" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Year</label>
                                <input type="text" className="w-full px-3 py-2 border rounded" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Password</label>
                                <input type="password" className="w-full px-3 py-2 border rounded" />
                            </div>
                            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Create User</button>
                        </form>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            <div className="w-64 bg-white shadow-lg p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Admin Panel</h2>
                <nav>
                    <ul className="space-y-2">
                        <li>
                            <button onClick={() => setUserDropdown(!userDropdown)} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex justify-between">
                                Users {userDropdown ? '▲' : '▼'}
                            </button>
                            {userDropdown && (
                                <ul className="pl-4 mt-2 space-y-1">
                                    <li><button onClick={() => setActiveSection('users')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Create New User</button></li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="flex-1 p-6 flex items-center justify-center">
                {renderMainContent()}
            </div>
        </div>
    );
};

export default AdminDashboard;
