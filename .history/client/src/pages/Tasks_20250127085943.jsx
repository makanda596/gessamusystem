import React, { useState, useEffect } from 'react';

const TaskPage = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;

    useEffect(() => {
        setLoading(true);
        setError('');
        // Simulate API call to fetch tasks
        setTimeout(() => {
            const fetchedTasks = [
                { id: 1, title: 'Task 1', description: 'Description for task 1', dueDate: '2025-01-30', completed: false },
                { id: 2, title: 'Task 2', description: 'Description for task 2', dueDate: '2025-02-10', completed: true },
                { id: 3, title: 'Task 3', description: 'Description for task 3', dueDate: '2025-03-15', completed: false },
                // Add more tasks for demonstration...
            ];
            setTasks(fetchedTasks);
            setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        setFilteredTasks(tasks);
    }, [tasks]);

    useEffect(() => {
        let filtered = tasks;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by status
        if (statusFilter !== 'All') {
            const isCompleted = statusFilter === 'Completed';
            filtered = filtered.filter(task => task.completed === isCompleted);
        }

        setFilteredTasks(filtered);
    }, [searchTerm, statusFilter, tasks]);

    const handleAddTask = () => {
        if (!newTask.title || !newTask.description || !newTask.dueDate) {
            setError('Please fill in all the fields.');
            return;
        }
        const newTaskObj = { ...newTask, id: tasks.length + 1, completed: false };
        setTasks([...tasks, newTaskObj]);
        setNewTask({ title: '', description: '', dueDate: '' });
    };

    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleToggleComplete = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    return (
        <div className="task-page">
            <h1 className="text-2xl font-bold mb-4">Task Management</h1>

            {loading && <div>Loading tasks...</div>}

            {/* Error Message */}
            {error && <div className="error-message text-red-500">{error}</div>}

            {/* Task Filters and Search */}
            <div className="filters mb-6 flex justify-between">
                <div>
                    <input
                        type="text"
                        className="p-2 border border-gray-300"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <select
                        className="p-2 border border-gray-300"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>
            </div>

            {/* Task Form */}
            <div className="task-form mb-6">
                <input
                    type="text"
                    className="p-2 border border-gray-300 mb-2"
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <textarea
                    className="p-2 border border-gray-300 mb-2"
                    placeholder="Task description"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                ></textarea>
                <input
                    type="date"
                    className="p-2 border border-gray-300 mb-2"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
                <button
                    className="bg-blue-500 text-white p-2 rounded-md"
                    onClick={handleAddTask}
                >
                    Add Task
                </button>
            </div>

            {/* Task List */}
            <div className="task-list">
                {currentTasks.length === 0 ? (
                    <p>No tasks found</p>
                ) : (
                    <ul>
                        {currentTasks.map(task => (
                            <li key={task.id} className="task-item mb-4 p-4 border border-gray-200 rounded-md">
                                <h2 className="text-xl font-semibold">{task.title}</h2>
                                <p>{task.description}</p>
                                <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                                <div className="task-actions mt-2">
                                    <button
                                        onClick={() => handleToggleComplete(task.id)}
                                        className={`bg-${task.completed ? 'green' : 'red'}-500 text-white p-2 rounded-md mr-2`}
                                    >
                                        {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTask(task.id)}
                                        className="bg-gray-500 text-white p-2 rounded-md"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="pagination mt-6 flex justify-center">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-gray-300 text-gray-700 p-2 rounded-md mx-2"
                    >
                        Prev
                    </button>
                    <span className="text-gray-700">{currentPage} of {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="bg-gray-300 text-gray-700 p-2 rounded-md mx-2"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskPage;
