import React, { useState } from 'react';
import axios from 'axios';
import { useAuthStore } from '../store/auth';

const LoginPage = () => {
    const [admNo, setAdmNo] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
    const { login, error } = useAuthStore();

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(admNo, password);
            window.location.href = '/dashboard';
        } catch (error) {
            console.log(error.response ? error.response.data.message : 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-blue-600 shadow-lg rounded-lg p-8 w-full max-w-md">
                {/* Logo Section */}
                <div className="flex justify-center mb-6">
                    <img
                        src="/path-to-logo.png" // Replace with the correct path to your logo
                        alt="Moi University Logo"
                        className="w-20 h-20"
                    />
                </div>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Registration Number Input */}
                    <div>
                        <label className="block text-white font-medium mb-2">
                            Reg. Number
                        </label>
                        <input
                            type="text"
                            value={admNo}
                            onChange={(e) => setAdmNo(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Reg. Number"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label className="block text-white font-medium mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'} // Toggle input type
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                                placeholder="Password"
                                required
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                            >
                                {showPassword ? '🙈' : '👁️'} {/* Toggle icon */}
                            </span>
                        </div>
                    </div>

                    {/* Remember Me Checkbox */}
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)}
                            className="mr-2"
                        />
                        <label htmlFor="rememberMe" className="text-white">
                            Remember me
                        </label>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Log In
                    </button>
                </form>

                {/* Forgot Password Link */}
                <p className="text-center mt-4">
                    <a href="/forgot-password" className="text-white underline">
                        Forgot your password?
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;