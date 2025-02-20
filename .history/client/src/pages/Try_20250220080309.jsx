import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [notification, setNotification] = useState(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 6; // Number of tasks per page

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('https://gessamubackend.onrender.com/task/takeTask');
                setTasks(response.data);
            } catch (error) {
                setError('Failed to load tasks. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000);
    };

    // Filter tasks based on search query
    const filteredTasks = tasks.filter(
        (task) =>
            (task.task && task.task.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
    const startIndex = (currentPage - 1) * tasksPerPage;
    const displayedTasks = filteredTasks.slice(startIndex, startIndex + tasksPerPage);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-2 md:p-4">
                <h1 className="text-xl md:text-xl font-bold text-center text-blue-600 mb-2">My Tasks</h1>

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

                {displayedTasks.length === 0 && !loading && !error ? (
                    <div className="text-center text-gray-600">No tasks found.</div>
                ) : (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {displayedTasks.map((task) => (
                                <TaskCard key={task._id} task={task} showNotification={showNotification} />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-center items-center mt-6 gap-4">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                                className={`px-4 py-2 rounded bg-blue-500 text-white disabled:bg-gray-400`}
                            >
                                Back
                            </button>

                            <span className="text-gray-700 font-semibold">Page {currentPage} of {totalPages}</span>

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                className={`px-4 py-2 rounded bg-blue-500 text-white disabled:bg-gray-400`}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Tasks;
