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

    const handleSubmits = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/projects/sendprojects', formData);
            setMessage('Project posted successfully!');
            setFormData(response.data);
        } catch (error) {
            setMessage('Error posting project.');
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <card className="w-full max-w-md p-6">
                <cardContent>
                    <h2 className="text-xl font-semibold mb-4">Post a New Project</h2>
                    {message && <p className="mb-2 text-center text-green-600">{message}</p>}
                    <form className="space-y-4">
                        <div>
                            <label htmlFor="title">Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <input type="text" name="description" value={formData.description} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="reference">Reference</label>
                            <input type="text" name="reference" value={formData.reference} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="year">Year</label>
                            <input type="number" name="year" value={formData.year} onChange={handleChange} required />
                        </div>
                        <button type="submit" disabled={loading} className="w-full" onClick={handleSubmits} >
                            {loading ? 'Posting...' : 'Post Project'}
                        </button>
                    </form>
                </cardContent>
            </card>
        </div>
    );
};

export default PostProject;
