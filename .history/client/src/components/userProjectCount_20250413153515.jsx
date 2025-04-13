import React, { useEffect } from 'react';
import { useAuthStore } from '../store/auth';

const UserProjectCount = () => {
    const { userProjects, countUserProjects } = useAuthStore();

    useEffect(() => {
        countUserProjects();
    }, []);

    return (
        <div to="MyProjects" className="bg-white shadow-md rounded-xl p-2 w-full max-w-md mx-auto mt-2" >
            <a href="/MyProjects">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">projects</h2>
            {userProjects === null || userProjects === undefined ? (
                <p className="text-center text-gray-500">O</p>
            ) : (
                <div className="text-center text-2xl font-bold text-blue-600" >
                    {userProjects}
                </div>
            )}
            </a>
        </div>
    );
};

export default UserProjectCount;
