import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useAuthStore } from '../store/auth';

function SignUpForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [admNo, setAdmNo] = useState('');
    const [email, setEmail] = useState('');
    const [year, setYear] = useState('');
    const [password, setPassword] = useState('');

    const { message, error, signup } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(firstName, lastName, admNo, year, email, password);
            navigate('/');
        } catch (error) {
            console.log(error.response ? error.response.data.message : 'Sign-up failed');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-lg transform transition-all duration-500 hover:scale-105">
                <h1 className="text-4xl font-bold text-blue-600 text-center mb-4">Sign Up</h1>
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create a New Account</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="mt-2 p-3 w-full border rounded-xl focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your first name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="mt-2 p-3 w-full border rounded-xl focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your last name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Adm. No</label>
                        <input
                            type="text"
                            name="admNo"
                            value={admNo}
                            onChange={(e) => setAdmNo(e.target.value)}
                            className="mt-2 p-3 w-full border rounded-xl focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your admission number"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-2 p-3 w-full border rounded-xl focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Year</label>
                        <input
                            type="text"
                            name="year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="mt-2 p-3 w-full border rounded-xl focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your year"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-2 p-3 w-full border rounded-xl focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300 transform hover:scale-105"
                    >
                        Sign Up
                    </button>
                </form>

                {message && (
                    <p
                        className={`mt-4 text-center text-sm ${error ? 'text-red-500' : 'text-green-500'}`}
                    >
                        {message}
                    </p>
                )}

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-600 hover:underline font-semibold">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;
