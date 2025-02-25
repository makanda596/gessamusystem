import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { FaEllipsisV } from 'react-icons/fa';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [notification, setNotification] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 6;

    const showTask = async () => {
        try {
            const response = await axios.get('https://gessamubackend.onrender.com/task/takeTask');
            setTasks(response.data);
        } catch (error) {
            setError('Failed to load tasks. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    useEffect(() => {
        showTask();
    }, []);

    const filteredTasks = tasks.filter(
        (task) =>
            (task.task && task.task.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
    const startIndex = (currentPage - 1) * tasksPerPage;
    const displayedTasks = filteredTasks.slice(startIndex, startIndex + tasksPerPage);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-2 md:p-4">
                <h1 className="text-xl md:text-xl font-bold text-center text-blue-600 mb-2">Available Tasks</h1>

                {notification && (
                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded shadow-lg">
                        {notification}
                    </div>
                )}

                <div className="max-w-sm mx-auto mb-2">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {loading && <div className="text-center text-gray-600">Loading tasks...</div>}
                {error && <div className="text-center text-red-500">{error}</div>}

                {filteredTasks.length === 0 && !loading && !error ? (
                    <div className="text-center text-gray-600">No tasks found.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {displayedTasks.map((task) => (
                            <TaskCard key={task._id} task={task} showNotification={showNotification} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

const TaskCard = ({ task, showNotification }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    const shareTask = () => {
        const taskUrl = `${window.location.origin}/task/${task._id}`;
        navigator.clipboard.writeText(taskUrl);
        showNotification('Task link copied to clipboard!');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition relative">
            <h2 className="text-xl font-bold text-blue-700 mb-2">{task.task}</h2>
            <p className="text-gray-700 mb-4">{task.description}</p>

            <div className="absolute top-3 right-3 cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                <FaEllipsisV className="text-gray-600 hover:text-gray-800" />
            </div>

            {menuOpen && (
                <div className="absolute top-8 right-3 bg-white shadow-md rounded-md p-2 w-24 flex flex-col">
                    <button onClick={shareTask} className="text-sm p-1 text-blue-500 hover:bg-gray-200 rounded-md">
                        Share
                    </button>
                    <button onClick={() => setShowPopup(true)} className="text-sm p-1 text-green-500 hover:bg-gray-200 rounded-md">
                        Submit
                    </button>
                </div>
            )}

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
                        <h2 className="text-lg font-bold text-blue-700">Task Submitted!</h2>
                        <p className="text-gray-700 mt-2">Your task submission was successful.</p>
                        <button
                            onClick={() => setShowPopup(false)}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tasks;
