import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Student = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState('');

    const fetchStudents = async () => {
        try {
            const response = await axios.get("http://localhost:5000/auth/getStudents");
            setStudents(response.data);
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Student List</h2>

            {/* Error Message */}
            {error && <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">{error}</div>}

            {/* Student List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {students.map(student => (
                    <div key={student._id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        <h3 className="text-xl font-semibold text-gray-800">{student.firstName} {student.lastName}</h3>
                        <p className="text-gray-600 mt-2"><strong>Email:</strong> {student.email}</p>
                        <p className="text-gray-600"><strong>Admission No:</strong> {student.admNo}</p>
                        <p className="text-gray-600"><strong>Year:</strong> {student.year}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Student;
