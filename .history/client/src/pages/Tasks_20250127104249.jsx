import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch tasks from the API
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

    // Toggle task completion
    const handleToggleComplete = async (taskId) => {
        try {
            // Update task completion status in the backend
            const updatedTask = tasks.find((task) => task.id === taskId);
            const response = await axios.put(`http://localhost:5000/task/toggleComplete/${taskId}`, {
                completed: !updatedTask.completed,
            });

            // Update task in the state
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskId ? { ...task, completed: response.data.completed } : task
                )
            );
        } catch (error) {
            setError('Failed to update task status. Please try again.');
        }
    };

    useEffect(() => {
        showTask();
    }, []);

    return (
        <>
            <Navbar />
            <div className="p-6">
                <h1 className="text-3xl font-semibold mb-6">Tasks</h1>

                {/* Loading and error states */}
                {loading && <div>Loading tasks...</div>}
                {error && <div className="text-red-500">{error}</div>}

                {/* Available Tasks */}
                <div className="task-list">
                    <h2 className="text-2xl font-semibold mb-4">Available Tasks</h2>
                    {tasks.filter((task) => !task.completed).length === 0 && !loading && !error ? (
                        <div>No tasks available.</div>
                    ) : (
                        <ul>
                            {tasks
                                .filter((task) => !task.completed)
                                .map((task) => (
                                    <li
                                        key={task.id}
                                        className="task-item mb-4 p-4 border border-gray-200 rounded-md shadow-md"
                                    >
                                        <h2 className="text-xl font-semibold">{task.task}</h2>
                                        <p>{task.description}</p>
                                        <p className="text-sm text-gray-500">Due: {task.date}</p>
                                        <p className="text-sm text-gray-500">Level: {task.level}</p>

                                        <div className="task-actions mt-2 flex justify-between items-center">
                                            <button
                                                onClick={() => handleToggleComplete(task.id)}
                                                className="bg-green-500 text-white px-4 py-2 rounded-md"
                                            >
                                                Mark as Completed
                                            </button>
                                            <button
                                                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>

                {/* Completed Tasks */}
                <div className="completed-task-list mt-10">
                    <h2 className="text-2xl font-semibold mb-4">Completed Tasks</h2>
                    {tasks.filter((task) => task.completed).length === 0 ? (
                        <div>No tasks completed yet.</div>
                    ) : (
                        <ul>
                            {tasks
                                .filter((task) => task.completed)
                                .map((task) => (
                                    <li
                                        key={task.id}
                                        className="task-item mb-4 p-4 border border-gray-200 rounded-md shadow-md bg-gray-100"
                                    >
                                        <h2 className="text-xl font-semibold">{task.task}</h2>
                                        <p>{task.description}</p>
                                        <p className="text-sm text-gray-500">Completed</p>

                                        <div className="task-actions mt-2 flex justify-between items-center">
                                            <button
                                                onClick={() => handleToggleComplete(task.id)}
                                                className="bg-red-500 text-white px-4 py-2 rounded-md"
                                            >
                                                Mark as Pending
                                            </button>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default Tasks;
