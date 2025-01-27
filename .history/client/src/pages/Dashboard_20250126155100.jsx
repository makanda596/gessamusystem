import React, { useState } from 'react';

const Dashboard = () => {
    const [content, setContent] = useState('Welcome to the Dashboard!');

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-1/4 bg-gray-800 text-white p-5 sticky top-0 h-screen overflow-y-auto">
                <h2 className="text-2xl font-bold mb-5">Dashboard</h2>
                <ul className="space-y-3">
                    {/* Personal Information */}
                    <li
                        className="cursor-pointer hover:bg-gray-700 p-2 rounded"
                        onClick={() => setContent('Personal Profile')}
                    >
                        Personal Information
                    </li>
                    <ul className="ml-5 space-y-2">
                        <li
                            className="cursor-pointer hover:bg-gray-700 p-2 rounded"
                            onClick={() => setContent('Personal Profile')}
                        >
                            Personal Profile
                        </li>
                    </ul>

                    {/* Projects */}
                    <li className="cursor-pointer hover:bg-gray-700 p-2 rounded">
                        Projects
                    </li>
                    <ul className="ml-5 space-y-2">
                        <li
                            className="cursor-pointer hover:bg-gray-700 p-2 rounded"
                            onClick={() => setContent('Weekly Projects')}
                        >
                            Weekly Projects
                        </li>
                        <li
                            className="cursor-pointer hover:bg-gray-700 p-2 rounded"
                            onClick={() => setContent('Year 1 Projects')}
                        >
                            Year 1
                        </li>
                        <li
                            className="cursor-pointer hover:bg-gray-700 p-2 rounded"
                            onClick={() => setContent('Year 2 Projects')}
                        >
                            Year 2
                        </li>
                        <li
                            className="cursor-pointer hover:bg-gray-700 p-2 rounded"
                            onClick={() => setContent('Year 3 Projects')}
                        >
                            Year 3
                        </li>
                        <li
                            className="cursor-pointer hover:bg-gray-700 p-2 rounded"
                            onClick={() => setContent('Year 4 Projects')}
                        >
                            Year 4
                        </li>
                    </ul>

                    {/* Tasks */}
                    <li className="cursor-pointer hover:bg-gray-700 p-2 rounded">
                        Tasks
                    </li>
                    <ul className="ml-5 space-y-2">
                        <li
                            className="cursor-pointer hover:bg-gray-700 p-2 rounded"
                            onClick={() => setContent('Create Task')}
                        >
                            Create Task
                        </li>
                        <li
                            className="cursor-pointer hover:bg-gray-700 p-2 rounded"
                            onClick={() => setContent('Do Task')}
                        >
                            Do Task
                        </li>
                    </ul>
                </ul>
            </div>

            {/* Main Content */}
            <div className="w-3/4 p-10 overflow-y-auto">
                <div className="text-xl font-semibold mb-5">{content}</div>

                {/* Content Sections */}
                {content === 'Personal Profile' && (
                    <div>
                        <p>Here is your personal profile information...</p>
                        <button className="mt-5 bg-blue-500 text-white py-2 px-4 rounded">
                            Edit Profile
                        </button>
                    </div>
                )}

                {content === 'Weekly Projects' && (
                    <div>
                        <p>Here are your weekly projects...</p>
                    </div>
                )}

                {content === 'Year 1 Projects' && (
                    <div>
                        <p>Here are your Year 1 projects...</p>
                    </div>
                )}

                {content === 'Create Task' && (
                    <div>
                        <p>Here you can create a new task...</p>
                        <button className="mt-5 bg-green-500 text-white py-2 px-4 rounded">
                            Create Task
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
