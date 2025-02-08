import React from 'react';

const GetSubmission = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">Submissions</h1>
                <p className="text-gray-700 mb-6">
                    No submissions available at the moment. Please check back later.
                </p>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
                    Refresh
                </button>
            </div>
        </div>
    );
};

export default GetSubmission;
