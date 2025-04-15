import React, { useState } from 'react';
import axios from 'axios';

const ResendEmailCard = ({ userEmail }) => { // Receive email as a prop
  const [isResending, setIsResending] = useState(false);
    const [resendMessage, setResendMessage] = useState({ text: '', type: '' });

   

    const handleResendEmail = async () => {
        setIsResending(true);
        setResendMessage({ text: '', type: '' });

        try {
            await axios.post('https://gessamusystem.onrender.com/auth/resendcode', { email: userEmail }); // Use the prop
            setResendMessage({ text: 'Verification email resent successfully!', type: 'success' });
        } catch (error) {
            setResendMessage({
                text: error.response?.data?.message || 'Failed to resend verification email. Please try again.',
                type: 'error',
            });
        } finally {
            setIsResending(false);
            setTimeout(() => {
                setResendMessage({ text: '', type: '' });
            }, 3000);
        }
    };

    return (
        // ... (rest of your rendering logic, using userEmail in the heading if needed)
        <>
            <div className="mt-6 text-center text-sm">
                        <p className="text-gray-600">
                            Didn't receive the code?{' '}
                            <button
                                type="button"
                                className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline"
                                onClick={handleResendEmail}
                                disabled={isResending}
                            >
                                {isResending ? 'Resending...' : 'Resend email'}
                            </button>
                        </p>
                        {resendMessage.text && (
                            <div
                                className={`mt-2 p-2 rounded-md text-center text-sm ${resendMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                    }`}
                            >
                                {resendMessage.text}
                            </div>
                        )}
                    </div>
        </>
    );
};

export default ResendEmailCard