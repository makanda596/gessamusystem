import React, { useEffect } from 'react';
import { useAuthStore } from '../store/auth';

const UserProjectCount = () => {
    const { userProjects, countUserProjects } = useAuthStore();

    useEffect(() => {
        countUserProjects();
    }, []);

    return (
        <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md mx-auto mt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Your Project Count</h2>
            {userProjects === null || userProjects === undefined ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div className="text-center text-3xl font-bold text-blue-600">
                    {userProjects}
                </div>
            )}
        </div>
    );
};

export default UserProjectCount;
