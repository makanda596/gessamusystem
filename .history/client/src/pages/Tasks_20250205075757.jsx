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
            console.log(response.data)
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

    const [details, setDetails] = useState(null);

    const fetchDetails = async () => {
        try {
            const response = await axios.get("http://localhost:5000/auth/profile", {
                withCredentials: true,
            });
            console.log(response.data)
            setDetails(response.data);
        } catch (error) {
            console.log("You need to log in to access the dashboard.");
        }
    };
    useEffect(() => {
        fetchDetails();
    }, []);
    return (
        <>
            <Navbar userI={details?.user?.id} />
            <div className="p-6">
                <h1 className="text-3xl font-semibold mb-6">Tasks</h1>
                {loading && <div>Loading tasks...</div>}
                {error && <div className="text-red-500">{error}</div>}
                <div className="task-list">
                    {tasks.length === 0 && !loading && !error ? (
                        <div>No tasks available.</div>
                    ) : (
                        <ul>
                            {tasks.map((task) => (
                                <li key={task.id} className="task-item mb-4 p-4 border border-gray-200 rounded-md shadow-md">
                                    <h2 className="text-xl font-semibold">
                                        <a href={`/task/${task._id}`} target="_blank" rel="noreferrer">
                                            {task.title} {/* or whatever field represents the task */}
                                        </a>
                                    </h2> <p>{task.description}</p>
                                    <p className="text-sm text-gray-500">level: {task.level}</p>
                                    <p className="text-sm text-gray-500">Due: {task.date}</p>
                                    <div className="task-actions mt-2 flex justify-between items-center">
                                        <button
                                            // onClick={() => handleToggleComplete(task.id)}
                                            className={`px-4 py-2 rounded-md ${task.completed ? 'bg-green-500' : 'bg-red-500'} text-white`}
                                        >
                                            {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                                        </button>
                                        <button
                                            // onClick={() => handleDeleteTask(task.id)}
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
            </div>
        </>
    );
};

export default Tasks;
