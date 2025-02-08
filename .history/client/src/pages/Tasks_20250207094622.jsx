import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState(''); // State for search query

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

    useEffect(() => {
        showTask();
    }, []);

    // Filter tasks based on the search query
    const filteredTasks = tasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-8">
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">My Tasks</h1>

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
                            <TaskCard key={task._id} task={task} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

const TaskCard = ({ task }) => {
    const [countdown, setCountdown] = useState('');

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
            navigator.share({
                title: task.title,
                text: task.description,
                url: taskUrl,
            }).catch((error) => console.error('Error sharing:', error));
        } else {
            navigator.clipboard.writeText(taskUrl);
            alert('Task link copied to clipboard!');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
            <h2 className="text-xl font-bold text-blue-700 mb-2">{task.title}</h2>
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
            </div>
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
