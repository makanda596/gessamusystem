import React, { useEffect, useState } from "react";
import axios from "axios";

const Student = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState("");

    // Fetch students from backend
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

    // Delete a student
    const deleteStudent = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/auth/deleteStudent/${id}`);
            setStudents(students.filter(student => student._id !== id));
            alert("Student deleted successfully!");
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    // Update student placeholder
    const updateStudent = (id) => {
        console.log("Update student", id);
        // Add your update logic here
    };

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
                            <th className="py-3 px-6 text-left">#</th>
                            <th className="py-3 px-6 text-left">Avatar</th>
                            <th className="py-3 px-6 text-left">First Name</th>
                            <th className="py-3 px-6 text-left">Last Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Admission No</th>
                            <th className="py-3 px-6 text-left">Year</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                <td className="py-3 px-6">{index + 1}</td>
                                <td className="py-3 px-6">
                                    <img
                                        src={student.avatar || "https://via.placeholder.com/50"}
                                        alt="Avatar"
                                        className="w-10 h-10 rounded-full"
                                    />
                                </td>
                                <td className="py-3 px-6">{student.firstName}</td>
                                <td className="py-3 px-6">{student.lastName}</td>
                                <td className="py-3 px-6">{student.email}</td>
                                <td className="py-3 px-6">{student.admNo}</td>
                                <td className="py-3 px-6">{student.year}</td>
                                <td className="py-3 px-6 flex gap-2">
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        onClick={() => deleteStudent(student._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        onClick={() => updateStudent(student._id)}
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Student;
