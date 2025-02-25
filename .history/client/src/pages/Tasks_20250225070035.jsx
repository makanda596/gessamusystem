const TaskCard = ({ task, showNotification }) => {
    const [countdown, setCountdown] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const updateCountdown = () => {
            setCountdown(calculateCountdown(task.date));
        };
        updateCountdown();
        const interval = setInterval(updateCountdown, 1000);
        return () => clearInterval(interval);
    }, [task.date]);

    const shareTask = () => {
        const taskUrl = `${window.location.origin}/task/${task._id}`;
        if (navigator.share) {
            navigator.share({ title: task.title, text: task.description, url: taskUrl })
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
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition relative">
            <h2 className="text-xl font-bold text-blue-700 mb-2">{task.task}</h2>
            <p className="text-gray-700 mb-4">{task.description}</p>
            <p className="text-sm text-gray-500 mb-2">Level: <span className="font-medium">{task.level}</span></p>
            <p className="text-sm text-gray-500 mb-4">Due: <span className="font-medium">{new Date(task.date).toLocaleString()}</span></p>
            <p className="text-sm text-red-600 font-semibold">Time Remaining: {countdown}</p>

            {/* Three dots menu */}
            <div className="absolute top-4 right-4 cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
                <span className="text-gray-600 text-2xl">...</span>
            </div>

            {menuOpen && (
                <div className="absolute top-10 right-4 bg-white shadow-md rounded-md p-2 flex flex-col">
                    <button
                        onClick={shareTask}
                        className="text-sm px-4 py-2 hover:bg-gray-100 rounded"
                    >
                        Share
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className="text-sm px-4 py-2 hover:bg-gray-100 rounded"
                    >
                        Submit
                    </button>
                </div>
            )}

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
            )}
        </div>
    );
};

const calculateCountdown = (dueDate) => {
    const timeDiff = new Date(dueDate) - new Date();
    if (timeDiff <= 0) return "Time's up!";
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return `${days}d left`;
};
