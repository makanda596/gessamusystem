import React, { useState } from "react";

const EmailVerification = () => {
    const [message, setMessage] = useState("");
    const [isValid, setIsValid] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple email validation logic (can be omitted here)
        // For now, we'll just assume the form submission is successful.

        setIsValid(true);
        setMessage("A verification link has been sent to your email.");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center mb-6">Email Verification</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <button
                        type="submit"
                        className="w-full p-3 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Verify Email
                    </button>
                </form>
                {message && (
                    <div className={`mt-4 text-center text-sm ${isValid ? "text-green-600" : "text-red-600"}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmailVerification;
