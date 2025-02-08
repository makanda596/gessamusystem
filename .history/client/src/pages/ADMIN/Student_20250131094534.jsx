import React, { useEffect, useState } from "react";
import axios from "axios";

const Student = () => {
    const [students, setStudents] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

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

    // Delete a student with confirmation
    const confirmDeleteStudent = (id) => {
        setSelectedStudent(id);
        setShowConfirm(true);
    };

    const deleteStudent = async () => {
        try {
            await axios.delete(`http://localhost:5000/auth/deleteUser/${selectedStudent}`);
            setMessage("Student deleted successfully!");
            setStudents(students.filter(student => student._id !== selectedStudent));
        } catch (error) {
            console.error("Error deleting student:", error);
        }
        setShowConfirm(false);
        setSelectedStudent(null);
    };

    // Update student placeholder
    const updateStudent = (id) => {
        console.log("Update student", id);
        // Add your update logic here
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Student List</h2>

            {error && <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">{error}</div>}
            {message && <div className="bg-green-500 text-white p-3 rounded mb-4 text-center">{message}</div>}

            {/* Confirmation Popup */}
            {showConfirm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <p className="mb-4 text-lg font-semibold">Are you sure you want to delete this student?</p>
                        <div className="flex justify-center gap-4">
                            <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={deleteStudent}>Yes</button>
                            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={() => setShowConfirm(false)}>No</button>
                        </div>
                    </div>
                </div>
            )}

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
                            <th className="py-3 px-6 text-left">Created At</th>
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
                                <td className="py-3 px-6">{new Date(student.createdAt).toLocaleDateString()}</td>
                                <td className="py-3 px-6 flex gap-2">
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                        onClick={() => confirmDeleteStudent(student._id)}
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
