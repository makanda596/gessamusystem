import React, { useState } from 'react';
import axios from 'axios';

const ResendEmailCard = ({ userEmail }) => { // Receive email as a prop
  const [isResending, setIsResending] = useState(false);
    const [resendMessage, setResendMessage] = useState({ text: '', type: '' });

   

    const handleResendEmail = async () => {
        setIsResending(true);
        setResendMessage({ text: '', type: '' });

        try {
            await axios.post('http://localhost:5000/auth/resend-verification-email', { email: userEmail }); // Use the prop
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
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Verify your email {userEmail}
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Enter the verification code sent to your email address.
                        </p>
                    </div>
                    {/* ... rest of your form and resend button */}
                </div>
            </div>
        </>
    );
};

export default ResendEmailCard