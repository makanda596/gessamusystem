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
            window.location.reload();
        } catch (error) {
            setMessage('Error posting project.');
        }
        setLoading(false);
    };

    return (
        <div className=" min-h-screen w-full ">
            <div className="w-full  bg-white shadow-lg rounded-lg p-6 transform transition-all hover:scale-105">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Post a New Project</h2>
                {message && <p className={`mb-2 text-center ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block font-medium text-gray-700">Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-400" />
                    </div>
                    <div>
                        <label htmlFor="description" className="block font-medium text-gray-700">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-400 resize-none" rows="3"></textarea>
                    </div>
                    <div>
                        <label htmlFor="reference" className="block font-medium text-gray-700">Reference</label>
                        <input type="text" name="reference" value={formData.reference} onChange={handleChange} required className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-400" />
                    </div>
                    <div>
                        <label htmlFor="year" className="block font-medium text-gray-700">Year</label>
                        <input type="number" name="year" value={formData.year} onChange={handleChange} required className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-indigo-400" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-indigo-500 text-white font-bold p-2 rounded-lg shadow-md hover:bg-indigo-600 transition-all flex justify-center items-center">
                        {loading ? <span className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></span> : 'Post Project'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostProject;