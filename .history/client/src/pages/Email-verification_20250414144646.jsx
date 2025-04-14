import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../utilis/auth';

const EmailVerification = () => {
    const [digits, setDigits] = useState(Array(6).fill(''));
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ content: '', type: '' });
    const [countdown, setCountdown] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { SendAnotherCode } = useAuthStore();
    const email = location.state?.email || '';

    const handleDigitChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newDigits = [...digits];
        newDigits[index] = value.slice(-1);
        setDigits(newDigits);

        if (value && index < 5) {
            document.getElementById(`digit-${index + 1}`).focus();
        }
    };

    const handlePaste = (e) => {
        const paste = e.clipboardData.getData('text').slice(0, 6);
        if (/^\d+$/.test(paste)) {
            const newDigits = paste.split('').concat(Array(6 - paste.length).fill(''));
            setDigits(newDigits.slice(0, 6));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code = digits.join('');

        if (code.length !== 6) {
            setMessage({ content: 'Please enter a 6-digit code', type: 'error' });
            return;
        }

        setIsLoading(true);
        setMessage({ content: '', type: '' });

        try {
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/email-verification`, {
                params: { code }
            });

            setMessage({
                content: 'Email verified successfully!',
                type: 'success'
            });

            setTimeout(() => navigate('/dashboard', { replace: true }), 1500);
        } catch (error) {
            setDigits(Array(6).fill(''));
            setMessage({
                content: error.response?.data?.message || 'Verification failed. Please try again.',
                type: 'error'
            });
            document.getElementById('digit-0').focus();
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        if (!canResend || !email) return;

        setIsLoading(true);
        setMessage({ content: '', type: '' });

        try {
            await SendAnotherCode(email);
            setMessage({
                content: 'New verification code sent!',
                type: 'success'
            });
            startCountdown();
        } catch (error) {
            setMessage({
                content: error.response?.data?.message || 'Failed to resend code.',
                type: 'error'
            });
        } finally {
            setIsLoading(false);
        }
    };

    const startCountdown = () => {
        setCanResend(false);
        setCountdown(60);

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setCanResend(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    useEffect(() => {
        startCountdown();
        if (!email) navigate('/login');
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center bg-purple-100 rounded-full p-4 text-purple-600 text-xl font-bold">
                        🔒
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Verify Your Email</h1>
                    <p className="text-gray-600">
                        We sent a 6-digit code to <span className="font-medium">{email}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="flex justify-center gap-3">
                        {digits.map((digit, index) => (
                            <input
                                key={index}
                                id={`digit-${index}`}
                                type="text"
                                inputMode="numeric"
                                pattern="\d*"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleDigitChange(index, e.target.value)}
                                onPaste={handlePaste}
                                className="w-12 h-12 text-2xl text-center border-2 border-gray-200 rounded-lg
                                       focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none
                                       transition-all duration-200"
                                autoFocus={index === 0}
                                disabled={isLoading}
                            />
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg
                               font-medium flex items-center justify-center gap-2 transition-all duration-200
                               disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Verifying...
                            </>
                        ) : (
                            <>Continue ➔</>
                        )}
                    </button>

                    <div className="text-center text-sm text-gray-600">
                        <p>Didn't receive the code?</p>
                        <button
                            type="button"
                            onClick={handleResendCode}
                            disabled={!canResend || isLoading}
                            className={`mt-2 text-purple-600 font-medium ${!canResend ? 'text-gray-400 cursor-default' : 'hover:text-purple-700'
                                } transition-colors duration-200`}
                        >
                            Resend Code {!canResend && `(${countdown}s)`}
                        </button>
                    </div>
                </form>

                {message.content && (
                    <div className={`mt-6 p-4 rounded-lg border ${message.type === 'success'
                            ? 'bg-green-50 border-green-200 text-green-800'
                            : 'bg-red-50 border-red-200 text-red-800'
                        }`}
                    >
                        {message.content}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmailVerification;
