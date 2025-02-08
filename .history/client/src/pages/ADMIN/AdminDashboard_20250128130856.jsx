import React, { useState } from 'react';
import { useAuthStore } from '../../store/auth';
import { TextField, Button, Container, Typography, Box, TextareaAutosize } from '@mui/material';

const AdminDashboard = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [level, setLevel] = useState('');
    const [reference, setReference] = useState('');
    const [doc, setDoc] = useState('');
    const [year, setYear] = useState('');

    const { postTask, postProject } = useAuthStore();

    const postHandle = async () => {
        try {
            await postTask(title, description, date, level);
        } catch (error) {
            console.log(error.message);
        }
    };

    const postProjectHandle = async () => {
        try {
            await postProject(title, description, year, reference);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Container className="p-6 bg-gray-50 min-h-screen">
            <Typography variant="h4" className="text-center mb-6 font-bold text-gray-800">
                Admin Dashboard
            </Typography>

            {/* Project Posting Section */}
            <Box className="bg-white p-6 rounded-lg shadow-md">
                <Typography variant="h5" className="mb-4 font-semibold text-gray-700">
                    Post a Project
                </Typography>

                <form className="space-y-4">
                    <TextField
                        fullWidth
                        label="Project Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mb-4"
                    />
                    <TextField
                        fullWidth
                        label="Reference"
                        variant="outlined"
                        value={reference}
                        onChange={(e) => setReference(e.target.value)}
                        className="mb-4"
                    />
                    <TextField
                        fullWidth
                        label="Year"
                        variant="outlined"
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="mb-4"
                    />
                    <TextareaAutosize
                        minRows={4}
                        placeholder="Project Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={postProjectHandle}
                        className="w-full py-2"
                    >
                        Submit Project
                    </Button>
                </form>
            </Box>

            {/* Task Posting Section (Commented Out) */}
            {/* <Box className="bg-white p-6 rounded-lg shadow-md mt-6">
                <Typography variant="h5" className="mb-4 font-semibold text-gray-700">
                    Post a Task
                </Typography>
                <form className="space-y-4">
                    <TextField
                        fullWidth
                        label="Task Title"
                        variant="outlined"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mb-4"
                    />
                    <TextField
                        fullWidth
                        label="Date"
                        variant="outlined"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="mb-4"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        fullWidth
                        label="Level"
                        variant="outlined"
                        type="number"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="mb-4"
                    />
                    <TextareaAutosize
                        minRows={4}
                        placeholder="Task Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={postHandle}
                        className="w-full py-2"
                    >
                        Submit Task
                    </Button>
                </form>
            </Box> */}
        </Container>
    );
};

export default AdminDashboard;