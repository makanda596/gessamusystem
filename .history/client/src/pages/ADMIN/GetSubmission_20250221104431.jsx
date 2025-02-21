import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetSubmission = () => {
    const [submissions, setSubmissions] = useState([]);
    const [error, setError] = useState('');

    const fetchSubmissions = async () => {
        try {
            const response = await axios.get('https://gessamubackend.onrender.com/task/getSubmittedTask');
            setSubmissions(response.data);
        } catch (error) {
            setError('No submitted tasks found.');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-12">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">Submissions</h1>

                {error && <p className="text-red-600 text-center mb-6">{error}</p>}

                {submissions.length > 0 ? (
                    <div className="space-y-4">
                        {submissions.map((submittedTask) => (
                            <div key={submittedTask._id} className="bg-gray-50 p-4 rounded-md shadow-sm">
                                <h2 className="text-xl font-semibold text-gray-800">{submittedTask.title}</h2>
                                <p className="text-gray-600">Submitted by: {submittedTask._id || 'Anonymous'}</p>
                                <p className="text-sm text-gray-500">
                                    Submitted on: {new Date(submittedTask.date).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    !error && <p className="text-gray-600 text-center">No submissions found.</p>
                )}
            </div>
        </div>
    );
};

export default GetSubmission;
