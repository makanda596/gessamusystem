import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 6;

  useEffect(() => {
    axios.get('https://gessamubackend.onrender.com/task/takeTask')
      .then((res) => setTasks(res.data))
      .catch(() => setNotification('Failed to load tasks'));
  }, []);

  const filteredTasks = tasks.filter(({ task, description }) =>
    (task && task.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (description && description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const displayedTasks = filteredTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-xl font-bold text-center text-blue-600 mb-2">My Tasks</h1>
        {notification && <div className="text-center text-red-500">{notification}</div>}
        <input
          type="text" placeholder="Search tasks..."
          className="w-full p-2 border rounded mb-4"
          value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
        />
        {filteredTasks.length ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedTasks.map((task) => <TaskCard key={task._id} task={task} />)}
            </div>
            <div className="flex justify-center mt-4 gap-4">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400">Back</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400">Next</button>
            </div>
          </div>
        ) : <p className="text-center text-gray-600">No tasks found.</p>}
      </div>
    </>
  );
};

const TaskCard = ({ task }) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const interval = setInterval(() => setCountdown(calculateCountdown(task.date)), 1000);
    return () => clearInterval(interval);
  }, [task.date]);

  return (
    <div className="bg-white p-4 rounded shadow border">
      <h2 className="text-lg font-bold text-blue-700">{task.task}</h2>
      <p className="text-gray-700">{task.description}</p>
      <p className="text-sm text-gray-500">Due: {new Date(task.date).toLocaleString()}</p>
      <p className="text-sm text-red-600 font-semibold">Time Remaining: {countdown}</p>
    </div>
  );
};

const calculateCountdown = (dueDate) => {
  const timeDiff = new Date(dueDate) - new Date();
  return timeDiff <= 0 ? "Time's up!" : `${Math.floor(timeDiff / (1000 * 60 * 60 * 24))}d left`;
};

export default Tasks;
