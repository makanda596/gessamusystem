import React, { useState } from 'react';
import { useAuthStore } from '../store/auth';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const { forgotPassword } = useAuthStore()
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await forgotPassword(email)
            setError('');
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Something went wrong');
            setMessage('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-500">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <img
                        src="/path-to-logo.png" // Replace with the correct path to your logo
                        alt="Logo"
                        className="w-20 h-20"
                    />
                </div>

                <h2 className="text-2xl font-semibold text-center mb-4">Forgot Password</h2>

                {/* Success or Error Message */}
                {message && <p className="text-green-500 text-center mb-4">{message}</p>}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Forgot Password Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Enter Your Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Email Address"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        Reset Password
                    </button>
                </form>

                <div className="text-center mt-4">
                    <p>
                        <a href="/login" className="text-blue-600 underline">Remembered your password? Login here.</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
