import React, { useState } from 'react';
import axios from 'axios';

const PostTask = () => {
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [level, setLevel] = useState('');
    const [completed, setCompleted] = useState('false');
    const [tasks , setTasks] = useState('')

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:5000/task/makeTask', );
            setSuccessMessage('Task submitted successfully!');
            setTasks(response.data)
            console.log(response.data)
            // Clear the form fields
            setTask('');
            setDescription('');
            setDate('');
            setLevel('');
            setCompleted('false');
        } catch (error) {
            setErrorMessage('Failed to submit the task. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Post a New Task</h1>

                {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
                {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="task" className="block text-gray-700 font-medium mb-2">Task Name</label>
                        <input
                            type="text"
                            id="task"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            placeholder="Enter task name"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter task description"
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Due Date</label>
                        <input
                            type="datetime-local"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="level" className="block text-gray-700 font-medium mb-2">Level (1-5)</label>
                        <input
                            type="number"
                            id="level"
                            value={level}
                            onChange={(e) => setLevel(e.target.value)}
                            min="1"
                            max="5"
                            required
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="completed" className="block text-gray-700 font-medium mb-2">Completed</label>
                        <select
                            id="completed"
                            value={completed}
                            onChange={(e) => setCompleted(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
                    >
                        Submit Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostTask;
