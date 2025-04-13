import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useAuthStore } from '../store/auth';
import SubmitTask from '../components/SubmitTask';
import SubmitProject from '../components/SubmitProject';
import {
    FiPlus, FiMoreVertical, FiShare2,
    FiUploadCloud, FiX, FiClock,
    FiCheck
} from 'react-icons/fi';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [notification, setNotification] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const { user } = useAuthStore();
    const [isPopup, setIsPopup] = useState(false);

    const tasksPerPage = 6;

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
            <Navbar />
            <div className="min-h-screen bg-gray-50 p-2">
                <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-xl font-bold text-gray-900">Try some Task </h1>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                className="w-48 h-10 px-2 py-1 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                onClick={() => setIsPopup(true)}
                                className="px-2 py-1 bg-blue-600 text-md text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                            >
                                New Task
                            </button>
                        </div>
                    </div>

                    {notification && (
                        <div className="fixed z-10 top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg flex items-center gap-2">
                            <FiCheck className="text-lg" />
                            {notification}
                        </div>
                    )}

                    {loading && (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    )}

                    {error && (
                        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                            ⚠️ {error}
                        </div>
                    )}

                    {filteredTasks.length === 0 && !loading && !error ? (
                        <div className="text-center text-gray-600 py-12">
                            <p className="text-xl">No tasks found matching your search</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {displayedTasks.map((task) => (
                                    <TaskCard
                                        key={task._id}
                                        task={task}
                                        showNotification={showNotification}
                                    />
                                ))}
                            </div>

                            <div className="flex justify-center gap-2 mt-8 mb-4">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-3 py-1 rounded-md ${currentPage === i + 1
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-200 hover:bg-gray-300'
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <SubmitTask isPopup={isPopup} setIsPopup={setIsPopup} />
                <SubmitProject isPopup={isPopup} setIsPopup={setIsPopup} />
            </div>
        </>
    );
};

const TaskCard = ({ task, showNotification }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');

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
            showNotification('Task link copied to clipboard!');
        }
    };

    const handleSubmitTask = async () => {
        if (!title.trim()) {
            showNotification('Please enter a title for your submission.');
            return;
        }

        try {
            await axios.post(`http://localhost:5000/task/submitTask/${task._id}`, { title });
            showNotification('Task submitted successfully!');
            setShowModal(false);
            setTitle('');
        } catch (error) {
            showNotification('Failed to submit the task. Please try again.');
        }
    };

    return (
        <div className="relative group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ease-out border border-gray-100">
            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
                        {task.level}
                    </span>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        aria-label="Task actions"
                    >
                        <FiMoreVertical className="text-gray-500" />
                    </button>
                </div>

                <h3 className="text-xl font-semibold mb-2 text-gray-900">{task.task}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{task.description}</p>

                <div className="flex items-center text-sm text-gray-500 mt-auto">
                    <FiClock className="mr-2" />
                    <span>Due: {new Date(task.deadline).toLocaleDateString()}</span>
                </div>
            </div>

            {menuOpen && (
                <div className="absolute right-4 top-14 bg-white shadow-xl rounded-lg py-2 w-48 z-10 border">
                    <button
                        onClick={shareTask}
                        className="flex items-center w-full px-4 py-3 hover:bg-gray-50 text-gray-700"
                    >
                        <FiShare2 className="mr-3" />
                        Share Task
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="flex items-center w-full px-4 py-3 hover:bg-gray-50 text-gray-700"
                    >
                        <FiUploadCloud className="mr-3" />
                        Submit Work
                    </button>
                </div>
            )}

            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold">Submit Work</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <FiX className="text-xl" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Submission Title
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                    placeholder="Enter submission title"
                                />
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmitTask}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Submit Task
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tasks;