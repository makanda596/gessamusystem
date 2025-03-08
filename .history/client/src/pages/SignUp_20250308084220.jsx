import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/auth/signup", formData);
            alert("Sign up successful! You can now log in.");
        } catch (error) {
            console.error("Signup error:", error);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            

        >
              <div className="min-h-screen flex flex-col items-center bg-gray-100 ">
                    <div className="w-full h-48 md:h-64 bg-gray-300 relative rounded-b-lg shadow-md overflow-hidden">
                      
                        <img src={bg} alt="Background" className="w-full h-full  object-cover" />
                    
                    
                    </div>
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative bg-white p-8 rounded-lg shadow-lg w-96 z-10">
                <h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label className="block text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-all"
                    >
                        Sign Up
                    </button>

                    <p className="text-gray-600 text-sm text-center mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
