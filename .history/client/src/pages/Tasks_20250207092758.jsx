import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const showTask = async () => {
        try {
            const response = await axios.get("http://localhost:5000/task/takeTask");
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

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 p-8">
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">My Tasks</h1>
                {loading && <div className="text-center text-gray-600">Loading tasks...</div>}
                {error && <div className="text-center text-red-500">{error}</div>}

                {tasks.length === 0 && !loading && !error ? (
                    <div className="text-center text-gray-600">No tasks available.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tasks.map((task) => (
                            <div key={task.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
                                <h2 className="text-xl font-bold text-blue-700 mb-2">{task.title}</h2>
                                <p className="text-gray-700 mb-4">{task.description}</p>
                                <p className="text-sm text-gray-500 mb-2">Level: <span className="font-medium">{task.level}</span></p>
                                <p className="text-sm text-gray-500 mb-4">Due: <span className="font-medium">{task.date}</span></p>
                                <div className="flex justify-between items-center">
                                    <button
                                        className={`px-4 py-2 rounded-md text-white ${task.completed ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}`}
                                    >
                                        {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                                    </button>
                                    <button
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Tasks;
