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
    const [studentDropdown, setStudentDropdown] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        admNo: '',
        year: '',
        password: ''
    });

    const [students, setStudents] = useState([
        { id: 1, firstName: 'John', lastName: 'Doe', admNo: '1234', year: '2023' },
        { id: 2, firstName: 'Jane', lastName: 'Smith', admNo: '5678', year: '2022' },
        { id: 3, firstName: 'Sam', lastName: 'Wilson', admNo: '9101', year: '2024' }
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
        console.log('New User Data:', formData);
        // Add your form submission logic here
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
                    <div className="flex flex-col items-center justify-center w-full">
                        <h3 className="text-xl font-bold mb-4">Create a New User</h3>
                        <form className="bg-white p-6 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
                            <div className="mb-4">

                                <label className="block text-sm font-semibold mb-2">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">{formData.email}</label>
                                {/* <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                /> */}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Admission Number</label>
                                <input
                                    type="text"
                                    name="admNo"
                                    value={formData.admNo}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Year</label>
                                <input
                                    type="text"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">Create User</button>
                        </form>

                        <div className="mt-6 w-full max-w-md">
                            <h4 className="text-lg font-semibold mb-4">Existing Students</h4>
                            <button
                                onClick={() => setStudentDropdown(!studentDropdown)}
                                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex justify-between"
                            >
                                Students {studentDropdown ? '▲' : '▼'}
                            </button>
                            {studentDropdown && (
                                <ul className="pl-4 mt-2 space-y-1 bg-gray-100 rounded-lg">
                                    {students.map((student) => (
                                        <li key={student.id} className="px-4 py-2 hover:bg-gray-200">
                                            {student.firstName} {student.lastName} - {student.admNo} ({student.year})
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
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
                        <li>
                            <button onClick={() => setQuizDropdown(!quizDropdown)} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex justify-between">
                                Quiz {quizDropdown ? '▲' : '▼'}
                            </button>
                            {quizDropdown && (
                                <ul className="pl-4 mt-2 space-y-1">
                                    <li><button onClick={() => setActiveSection('postQuiz')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Post a Quiz</button></li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button onClick={() => setUserDropdown(!userDropdown)} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 flex justify-between">
                                Users {userDropdown ? '▲' : '▼'}
                            </button>
                            {userDropdown && (
                                <ul className="pl-4 mt-2 space-y-1">
                                    <li><button onClick={() => setActiveSection('users')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100">Create a User</button></li>
                                </ul>
                            )}
                        </li>
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
