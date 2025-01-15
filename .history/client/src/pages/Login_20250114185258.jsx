// src/components/LoginPage.js
import React, { useState } from 'react';
import axios from 'axios'
import { useAuthStore } from '../store/auth';
const LoginPage = () => {
    const [admNo, setAdmNo] = useState('');
    const [password, setPassword] = useState('');
    const { login, error } = useAuthStore();

    axios.defaults.withCredentials = true
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(admNo, password)
            window.location.href = '/dashboard'
        } catch (error) {
            console.log(error.response ? error.response.data.message : 'Login failed');
        }


    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Login</h1>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="admNo" className="block text-gray-700 font-medium mb-2">
                            Email Address
                        </label>
                        <input
                            type="text"
                            value={admNo}
                            onChange={(e) => setAdmNo(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Login
                    </button>
                </form>
                <p className="text-gray-600 text-sm mt-4 text-center">
                    Don’t have an account?{' '}
                    <a href="/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
