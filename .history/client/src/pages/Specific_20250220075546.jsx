import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Specific = () => {
    const { id } = useParams(); // Get task ID from URL
    const [task, setTask] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch specific task details
    const showSpecific = async () => {
        try {
            const response = await axios.get(`https://gessamubackend.onrender.com/task/onetask/${id}`);
            setTask(response.data);
        } catch (error) {
            setError('Failed to load task. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Toggle task completion
    const toggleTaskCompletion = async () => {
        if (!task) return;

        try {
            const updatedTask = {
                ...task,
                completed: !task.completed, // Toggle the current completed status
            };

            await axios.put(`https://gessamubackend.onrender.com/task/toggleComplete/${id}`, { completed: updatedTask.completed });

            // Update the task in state
            setTask(updatedTask);
        } catch (error) {
            setError('Failed to update task status. Please try again.');
        }
    };

    useEffect(() => {
        showSpecific();
    }, []); // Fetch task whenever ID changes

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    if (loading) {
        return <div>  <div className="flex items-center justify-center min-h-screen">
            <div className="mt-8 w-16 h-16 border-4 border-t-red-600 border-b-green-600 border-l-white border-r-white rounded-full animate-spin"></div>
        </div></div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-semibold mb-6">Task Details</h1>
            <p>
                <strong>Task Name:</strong> {task.task}
            </p>
            <p>
                <strong>Description:</strong> {task.description}
            </p>
            <p>
                <strong>Reference:</strong> {task.date}
            </p>
            <p>
                <strong>Status:</strong> {task.completed ? 'Completed' : 'Pending'}
            </p>

            {/* Mark as Complete/Pending Button */}
            <button
                onClick={toggleTaskCompletion}
                className={`px-4 py-2 mt-4 rounded-md ${task.completed ? 'bg-red-500' : 'bg-green-500'
                    } text-white`}
            >
                {task.completed ? 'Mark as Pending' : 'Mark as Complete'}
            </button>
        </div>
    );
};

export default Specific;
