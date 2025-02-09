import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiHash, FiPhone } from 'react-icons/fi';
import { useAuthStore } from '../../../src/store/auth';

const CreateUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [admNo, setAdmNo] = useState('');
    const [email, setEmail] = useState('');
    const [year, setYear] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [customError, setCustomError] = useState('');  // New state for custom error messages

    const { message, error, signup } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setCustomError('');  // Clear any previous error
        try {
            await signup(firstName, lastName, admNo, year, email, phoneNumber, password);
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : 'Sign up failed';
            if (errorMessage === 'User already exists') {
                setCustomError('A user with this email or admission number already exists.');
            } else {
                setCustomError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h1 className="text-4xl font-extrabold text-indigo-600 text-center mb-4">Create Account</h1>
                <p className="text-gray-600 text-center mb-6">Join us and start your journey!</p>
                {customError && <p className="text-red-500 text-center mb-4">{customError}</p>}
                {message && <p className="text-green-500 text-center mb-4">{message}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* First Name */}
                    <div className="relative">
                        <FiUser className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="pl-10 w-full p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="First Name"
                            required
                        />
                    </div>

                    {/* Last Name */}
                    <div className="relative">
                        <FiUser className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="pl-10 w-full p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Last Name"
                            required
                        />
                    </div>

                    {/* Admission Number */}
                    <div className="relative">
                        <FiHash className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="text"
                            value={admNo}
                            onChange={(e) => setAdmNo(e.target.value)}
                            className="pl-10 w-full p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Admission Number"
                            required
                        />
                    </div>

                    {/* Email Address */}
                    <div className="relative">
                        <FiMail className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10 w-full p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Email Address"
                            required
                        />
                    </div>

                    {/* Year of Study */}
                    <div className="relative">
                        <FiHash className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="text"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="pl-10 w-full p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Year of Study"
                            required
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="relative">
                        <FiPhone className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="pl-10 w-full p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Phone Number"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <FiLock className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 w-full p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-indigo-600 hover:underline">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
