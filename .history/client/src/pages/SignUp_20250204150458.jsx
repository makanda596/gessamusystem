import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/auth';
import { FiUser, FiMail, FiLock, FiHash } from 'react-icons/fi';

function SignUpForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [admNo, setAdmNo] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('')
    const [email, setEmail] = useState('');
    const [year, setYear] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const { message, error, signup } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            await signup(firstName, lastName, admNo, year, email, password);
            navigate('/');
        } catch (error) {
            console.log(error.response ? error.response.data.message : 'Sign up failed');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
                <h1 className="text-4xl font-extrabold text-indigo-600 text-center mb-4">Create Account</h1>
                <p className="text-gray-600 text-center mb-6">Join us and start your journey!</p>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <div className="relative">
                        <FiHash className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="number"
                            value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="pl-10 w-full p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="phone number"
                                        required
                        />            
                    </div>            
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
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
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
                        <a href="/login" className="text-indigo-600 hover:underline">
                            Login
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;
