import React, { useState } from 'react';
import axios from 'axios';

const PostProject = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        reference: '',
        year: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/projects/sendprojects', formData);
            setMessage('Project posted successfully!');
            setFormData({ title: '', description: '', reference: '', year: '' });
            windowreload();
        } catch (error) {
            setMessage('Error posting project.');
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Post a New Project</h2>
                {message && <p className="mb-2 text-center text-green-600">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block font-medium">Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label htmlFor="description" className="block font-medium">Description</label>
                        <input type="text" name="description" value={formData.description} onChange={handleChange} required className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label htmlFor="reference" className="block font-medium">Reference</label>
                        <input type="text" name="reference" value={formData.reference} onChange={handleChange} required className="w-full border p-2 rounded" />
                    </div>
                    <div>
                        <label htmlFor="year" className="block font-medium">Year</label>
                        <input type="number" name="year" value={formData.year} onChange={handleChange} required className="w-full border p-2 rounded" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        {loading ? 'Posting...' : 'Post Project'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostProject;