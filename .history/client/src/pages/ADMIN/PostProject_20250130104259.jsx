import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';

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
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md p-6 shadow-md rounded-lg">
                <CardContent>
                    <Typography variant="h5" component="h2" className="mb-4 text-center">
                        Post a New Project
                    </Typography>
                    {message && <Alert severity={message.includes('successfully') ? 'success' : 'error'} className="mb-2">{message}</Alert>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <TextField fullWidth label="Title" name="title" value={formData.title} onChange={handleChange} required />
                        <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} required />
                        <TextField fullWidth label="Reference" name="reference" value={formData.reference} onChange={handleChange} required />
                        <TextField fullWidth label="Year" name="year" type="number" value={formData.year} onChange={handleChange} required />
                        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'Post Project'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default PostProject;
