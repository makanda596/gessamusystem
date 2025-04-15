import React, { useEffect } from 'react';
import { useAuthStore } from '../store/auth';
import { Link } from 'react-router-dom';

const UserProjectCount = () => {
    const { userProjects, countUserProjects } = useAuthStore();

    useEffect(() => {
        countUserProjects();
    }, []);

    return (
        <div to="MyProjects" className="bg-white shadow-md rounded-xl p-2 w-full max-w-md mx-auto mt-2" >
            <Link to="/MyProjects">
            <h2 className="text-xl font-semibold flex text-gray-800 mb-2 text-center justify-center">projects</h2>
                    {userProjects || "0"}
            </Link>
        </div>
    );
};

export default UserProjectCount;
