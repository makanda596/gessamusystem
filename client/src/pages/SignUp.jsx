import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { useAuthStore } from '../store/auth';
function SignUpForm() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [admNo, setAdmNo] = useState('')
    const [email, setEmail] = useState('')
    const [year, setYear] = useState('')
    const [password, setPassword] = useState('')


    const { message, error } = useAuthStore();
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("localhost:5000/auth/signup", { firstName, lastName, admNo, year, email, password })
            console.log(response)
            navigate('/email-verification')
        } catch (error) {

            console.log(error.response ? error.response.data.message : 'sign up  failed');
        }
    };

    return (
        <div className="min-h-screen bg-blue-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">Sign Up</h1>
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Welcome Back</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">firstName</label>
                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your firstname"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">LastName</label>
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your lastname"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">admNo</label>
                        <input
                            type="text"
                            name="admNo"
                            value={admNo}
                            onChange={(e) => setAdmNo(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your admNo"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">year</label>
                        <input
                            type="text"
                            name="year"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
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
                            onChange={(e) => { setPassword(e.target.value) }}
                            className="mt-1 p-2 w-full border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                {message && (
                    <p
                        className={`mt-4 text-center text-sm ${error ? 'text-red-500' : 'text-green-500'
                            }`}
                    >
                        {message}
                    </p>
                )}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-600 hover:underline">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;
