import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Tasks = () => {
    const [details, setDetails] = useState(null);

    const fetchDetails = async () => {
        try {
            const response = await axios.get("http://localhost:5000/auth/profile", {
                withCredentials: true,
            });
            console.log(response.data);
            setDetails(response.data);
        } catch (error) {
            console.log("You need to log in to access the dashboard.");
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [notification, setNotification] = useState(null); // Notification state

    const showTask = async () => {
        try {
            const response = await axios.get('http://localhost:5000/task/takeTask');
            setTasks(response.data);
        } catch (error) {
            setError('Failed to load tasks. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const showNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 3000); // Hide after 3 seconds
    };

    useEffect(() => {
        showTask();
    }, []);

    const filteredTasks = tasks.filter(
        (task) =>
            (task.task && task.task.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-8">
                <p>{details?.user?.admNo}</p>
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">My Tasks</h1>

                {notification && (
                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white py-2 px-4 rounded shadow-lg">
                        {notification}
                    </div>
                )}

                <div className="max-w-md mx-auto mb-6">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {loading && <div className="text-center text-gray-600">Loading tasks...</div>}
                {error && <div className="text-center text-red-500">{error}</div>}

                {filteredTasks.length === 0 && !loading && !error ? (
                    <div className="text-center text-gray-600">No tasks found.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTasks.map((task) => (
                            <TaskCard key={task._id} task={task} showNotification={showNotification} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

const TaskCard = ({ task, showNotification }) => {
    const [countdown, setCountdown] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');

    useEffect(() => {
        const updateCountdown = () => {
            setCountdown(calculateCountdown(task.date));
        };

        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [task.date]);

    const shareTask = () => {
        const taskUrl = `${window.location.origin}/task/${task._id}`;
        if (navigator.share) {
            navigator
                .share({
                    title: task.title,
                    text: task.description,
                    url: taskUrl,
                })
                .catch((error) => console.error('Error sharing:', error));
        } else {
            navigator.clipboard.writeText(taskUrl);
            showNotification('Task link copied to clipboard!');
        }
    };

    const handleSubmitTask = async ({id}) => {
        if (!title.trim()) {
            showNotification('Please enter a title for your submission.');
            return;
        }

        try {
            await axios.post('http://localhost:5000/task/submitTask/:id', { id ,title });
            showNotification('Task submitted successfully!');
            setShowModal(false);
            setTitle('');
        } catch (error) {
            showNotification('Failed to submit the task. Please try again.');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-blue-700 mb-2">{task.task}</h2>
            <p className="text-gray-700 mb-4">{task.description}</p>
            <p className="text-sm text-gray-500 mb-2">
                Level: <span className="font-medium">{task.level}</span>
            </p>
            <p className="text-sm text-gray-500 mb-4">
                Due: <span className="font-medium">{new Date(task.date).toLocaleString()}</span>
            </p>
            <p className="text-sm text-red-600 font-semibold">Time Remaining: {countdown}</p>
            <div className="flex justify-between items-center mt-4">
                <button
                    className={`px-4 py-2 rounded-md text-white ${task.completed ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                >
                    {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                </button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition">
                    Delete
                </button>
                <button
                    onClick={shareTask}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                    Share Task
                </button>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                >
                    Submit Task
                </button>
            </div>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-md shadow-lg max-w-md w-full">
                        <h3 className="text-2xl font-bold mb-4">Submit Task</h3>
                        <p className="mb-2"><strong>Selected Task:</strong> {task.task}</p>
                        <p>Enter a title for your submission:</p>
                        <input
                            type="text"
                            placeholder="Submission Title"
                            className="w-full p-3 border border-gray-300 rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                onClick={handleSubmitTask}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const calculateCountdown = (dueDate) => {
    const timeDiff = new Date(dueDate) - new Date();
    if (timeDiff <= 0) return "Time's up!";

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDiff / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

export default Tasks;
