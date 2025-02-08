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
            const response = await axios.post('http://localhost:5000/api/projects', formData);
            setMessage('Project posted successfully!');
            setFormData({ title: '', description: '', reference: '', year: '' });
        } catch (error) {
            setMessage('Error posting project.');
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md p-6">
                <CardContent>
                    <h2 className="text-xl font-semibold mb-4">Post a New Project</h2>
                    {message && <p className="mb-2 text-center text-green-600">{message}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input type="text" name="title" value={formData.title} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Input type="text" name="description" value={formData.description} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="reference">Reference</Label>
                            <Input type="text" name="reference" value={formData.reference} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="year">Year</Label>
                            <Input type="number" name="year" value={formData.year} onChange={handleChange} required />
                        </div>
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? 'Posting...' : 'Post Project'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default PostProject;
