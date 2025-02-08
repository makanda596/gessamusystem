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

            {/* Table Container */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-6 text-left">First Name</th>
                            <th className="py-3 px-6 text-left">Last Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Admission No</th>
                            <th className="py-3 px-6 text-left">Year</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                <td className="py-3 px-6">{student.firstName}</td>
                                <td className="py-3 px-6">{student.lastName}</td>
                                <td className="py-3 px-6">{student.email}</td>
                                <td className="py-3 px-6">{student.admNo}</td>
                                <td className="py-3 px-6">{student.year}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Student;
