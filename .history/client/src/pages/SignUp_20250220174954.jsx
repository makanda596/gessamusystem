import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthStore } from '../store/auth';
import { FiUser, FiMail, FiLock, FiHash, FiEye, FiEyeOff } from 'react-icons/fi';

function SignUpForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [admNo, setAdmNo] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [year, setYear] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const { message, error, signup } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPasswordError('');

        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await signup(firstName, lastName, admNo, year, email, phoneNumber, password);
            window.location.href = '/';
        } catch (error) {
            console.log(error.response ? error.response.data.message : 'Sign up failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="bg-white px-8 py-2 rounded-2xl shadow-2xl w-full max-w-md">
                <h1 className="text-2xl font-extrabold text-indigo-600 text-center mb-2">Create Account</h1>
                <p className="text-gray-600 text-center mb-4">Join us and start your journey!</p>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {passwordError && <p className="text-red-500 text-center mb-4">{passwordError}</p>}

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
                            placeholder="Phone Number"
                            required
                        />
                    </div>
                    <div className="relative">
                        <FiHash className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type="number"
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
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10 w-full p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Password"
                            required
                        />
                        <div className="absolute top-3 right-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </div>
                    </div>
                    <div className="relative">
                        <FiLock className="absolute top-3 left-3 text-gray-400" />
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="pl-10 w-full p-2 border rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Confirm Password"
                            required
                        />
                        <div className="absolute top-3 right-3 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
                        disabled={loading}
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">Already have an account? <a href="/" className="text-indigo-600 hover:underline">Log in</a></p>
            </div>
        </div>
    );
}

export default SignUpForm;
