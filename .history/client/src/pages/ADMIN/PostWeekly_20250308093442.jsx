import React, { useState } from 'react';
import axios from 'axios';

const PostWeekly = () => {
    const [title, setTitle] = useState('');
    const [email, setEmail] = useState('');
    const [trainer, setTrainer] = useState('');
    const [description, setDescription] = useState('');
    const [reference, setReference] = useState(''); // Start with one empty reference
    const [date, setDate] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        if (!title || !trainer || !description || !date || !file || reference.length === 0) {
            setError('All fields are required');
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('trainer', trainer);
            formData.append('description', description);
            formData.append('reference', reference); // Send reference as a JSON string
            formData.append('date', date);
            formData.append('file', file);

            await axios.post('https://gessamusystem.onrender.com/projects/weekly-projects', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage('Weekly project submitted successfully!');
            setTitle('');
            setTrainer('');
            setDescription('');
            setReference();
            setDate('');
            setFile(null);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to submit the project.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full  flex items-center justify-center p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Post Weekly Project</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {message && <p className="text-green-500 text-center mb-4">{message}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium">Project Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Enter project title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Owner</label>
                        <input
                            type="text"
                            value={trainer}
                            onChange={(e) => setTrainer(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Enter trainer's name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block font-medium">email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Enter project title"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="Enter project description"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <input
                            type="text"
                            value={reference}
                            onChange={(e) => setReference(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            placeholder="reference links"
                            required
                        />
                    </div>
                        {/* {reference.map((ref, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    value={ref}
                                    onChange={(e) => handleReferenceChange(index, e.target.value)}
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                                    placeholder="Enter reference"
                                />
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveReference(index)}
                                        className="text-red-500"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))} */}
                        {/* <button
                            type="button"
                            onClick={handleAddReference}
                            className="text-blue-500 mt-2"
                        >
                            Add another reference
                        </button>
                    </div> */}

                    <div>
                        <label className="block font-medium">Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Upload File</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostWeekly;
