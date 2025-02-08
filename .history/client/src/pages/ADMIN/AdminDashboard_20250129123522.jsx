import React, { useState } from 'react';

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        admNo: '',
        year: '',
        password: '',
    });
    const [students, setStudents] = useState([
        { id: 1, firstName: 'John', lastName: 'Doe', admNo: '1234', year: '2023' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', admNo: '5678', year: '2022' },
        { id: 3, firstName: 'Sam', lastName: 'Wilson', admNo: '9101', year: '2024' },
    ]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add new student to the list
        const newStudent = { id: students.length + 1, ...formData };
        setStudents([...students, newStudent]);

        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            admNo: '',
            year: '',
            password: '',
        });
        alert('New student added successfully!');
    };

    const renderMainContent = () => {
        if (activeSection === 'dashboard') {
            return (
                <div className="flex flex-col items-center justify-center h-full">
                    <h2 className="text-3xl font-extrabold mb-6 text-blue-600">Welcome to Admin Dashboard</h2>
                    <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 md:w-2/3 text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Overview</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
                                <h4 className="font-bold text-2xl">{students.length}</h4>
                                <p>Students</p>
                            </div>
                            {/* Add other stats like Weekly Projects, Total Projects, Total Tasks */}
                        </div>
                    </div>

                    <div className="w-full max-w-lg mt-6">
                        <h4 className="text-xl font-semibold mb-4">Create a New Student</h4>
                        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Admission Number</label>
                                <input
                                    type="text"
                                    name="admNo"
                                    value={formData.admNo}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Year</label>
                                <input
                                    type="text"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    required
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                                Create Student
                            </button>
                        </form>
                    </div>
                </div>
            );
        }
        switch (activeSection) {
            case 'students':
                return (
                    <div className="flex flex-col items-center justify-center w-full">
                        <h3 className="text-xl font-bold mb-4">Manage Students</h3>
                        {/* Display students here */}
                        <ul className="w-full max-w-lg">
                            {students.map((student) => (
                                <li key={student.id} className="bg-white p-4 rounded-lg shadow-md mb-2">
                                    <p className="text-sm font-semibold">{student.firstName} {student.lastName}</p>
                                    <p className="text-xs text-gray-500">Admission No: {student.admNo}</p>
                                    <p className="text-xs text-gray-500">Year: {student.year}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-blue-600 text-white shadow-lg p-4">
                <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
                <nav>
                    <ul className="space-y-2">
                        <li><button onClick={() => setActiveSection('dashboard')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700">Dashboard</button></li>
                        <li><button onClick={() => setActiveSection('students')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700">Manage Students</button></li>
                        <li><button onClick={() => setActiveSection('users')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700">Create a User</button></li>
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
