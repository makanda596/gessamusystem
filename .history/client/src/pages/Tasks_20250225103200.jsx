import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { FaEllipsisV } from 'react-icons/fa';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [notification, setNotification] = useState('');
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
        // setNotification(message);
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
            <Navbar className="z-10"/>
            <div className="min-h-screen bg-gray-100 p-4 md:p-4">
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
                        className="w-80 p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
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
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');


    const shareTask = () => {
        const taskUrl = `${ window.location.origin }/task/${ task._id }`;
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
    const handleSubmitTask = async () => {
        if (!title.trim()) {
            showNotification('Please enter a title for your submission.');
            return;
        }

        try {
            await axios.post(`https://gessamubackend.onrender.com/task/submitTask/${task._id}`, { title });
                showNotification('Task submitted successfully!');
            setShowModal(false);
            setTitle('');
        } catch (error) {
            showNotification('Failed to submit the task. Please try again.');
        }
    };


    return (
        <div >
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition relative">
            <h2 className="text-xl font-bold text-blue-700 mb-2">{task.task}</h2>
            <p className="text-gray-700 mb-4">{task.description}</p>
                <p className="text-sm text-gray-500 mb-2">
                    Level: <span className="font-medium">{task.level}</span>
                </p>
            <div className="absolute top-3 right-3 cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                <FaEllipsisV className="text-gray-600 hover:text-gray-800" />
            </div>

            {menuOpen && (
                <div className="absolute top-8 right-3 bg-white shadow-md rounded-md p-2 w-24 flex flex-col">
                    <button onClick={shareTask} className="text-sm p-1 text-blue-500 hover:bg-gray-200 rounded-md">Share</button>
                    <button onClick={() => setShowModal(true)} className="text-sm p-1 text-green-500 hover:bg-gray-200 rounded-md">Submit</button>
                </div>
            )}
        </div>
           {showModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-8 rounded-md shadow-lg max-w-md w-full">
                    <h3 className="text-2xl font-bold mb-4">Submit </h3>
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
                        <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600" onClick={() => setShowModal(false)}>
                            Cancel
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={handleSubmitTask}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    </div>
    );
};

export default Tasks;
