import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/auth';
import logo from '../assets/logo.jpg'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loading state
    const [retryTimer, setRetryTimer] = useState(0); // Timer for retry
    const { forgotPassword } = useAuthStore();

    // Countdown effect for retryTimer
    useEffect(() => {
        if (retryTimer > 0) {
            const timer = setInterval(() => setRetryTimer((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [retryTimer]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true); // Start loading
        try {
            await forgotPassword(email);
            setMessage('Check your email to reset your password.');
            setError('');
            setRetryTimer(60); // Start 1-minute cooldown
        } catch (err) {
            setError(err.response ? err.response.data.message : 'Something went wrong');
            setMessage('');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleRetry = () => {
        setMessage('');
        setError('');
        setRetryTimer(0); // Reset timer
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-500">
            <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <img
                        src={logo} // Replace with the correct path to your logo
                        alt="Logo"
                        className="w-20 h-20"
                    />
                </div>

                <h2 className="text-xl font-semibold text-center mb-4">Forgot Password</h2>

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
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                        disabled={loading || retryTimer > 0} // Disable button if loading or in cooldown
                    >
                        {loading ? 'Processing...' : 'Reset Password'}
                    </button>
                </form>

                {/* Didn't receive email and retry option */}
                {retryTimer > 0 ? (
                    <p className="text-gray-500 text-center mt-4">
                        You can retry in {retryTimer} seconds.
                    </p>
                ) : (
                    message && (
                        <div className="text-center mt-4">
                            <p className="text-gray-700">Didn't receive the email?</p>
                            <button
                                onClick={handleRetry}
                                className="text-blue-600 underline mt-2 focus:outline-none"
                            >
                                Retry the process
                            </button>
                        </div>
                    )
                )}

                <div className="text-center mt-4">
                    <p>
                        <a href="/" className="text-blue-600 underline">Remembered your password? Login here.</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
