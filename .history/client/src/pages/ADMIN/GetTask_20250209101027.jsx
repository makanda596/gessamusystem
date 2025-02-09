import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetTask = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/task/takeTask');
            setTasks(response.data);
            setFilteredTasks(response.data);
        } catch (err) {
            setError('Failed to fetch tasks. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredTasks(
            tasks.filter(
                (task) =>
                    (task.task && task.task.toLowerCase().includes(query)) ||
                    (task.description && task.description.toLowerCase().includes(query))
            )
        );
    };

    return (
        <div className="min-h-screen w-full p-8">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">All Tasks</h1>

            <div className="max-w-md mx-auto mb-6">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {loading && <p className="text-center text-gray-600">Loading tasks...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            {filteredTasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTasks.map((task) => (
                        <div key={task._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                            <h2 className="text-2xl font-bold text-blue-700">{task.task}</h2>
                            <p className="text-gray-700 mt-2">{task.description}</p>
                            <p className="text-sm text-gray-500 mt-4">
                                <strong>Level:</strong> {task.level}
                            </p>
                            <p className="text-sm text-gray-500">
                                <strong>Due:</strong> {new Date(task.date).toLocaleString()}
                            </p>
                            <p className={`mt-4 text-sm ${task.completed ? 'text-green-600' : 'text-red-600'}`}>
                                <strong>Status:</strong> {task.completed ? 'Completed' : 'Pending'}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                !loading && <p className="text-center text-gray-600">No tasks found.</p>
            )}
        </div>
    );
};

export default GetTask;
