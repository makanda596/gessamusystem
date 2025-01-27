import React, { useEffect } from 'react';
import { useAuthStore } from './store';

const Dashboard = () => {
    const { user, checkAuth, isLoading, isAuthenticated } = useAuthStore((state) => ({
        user: state.user,
        checkAuth: state.checkAuth,
        isLoading: state.isLoading,
        isAuthenticated: state.isAuthenticated,
    }));

    useEffect(() => {
        if (!isAuthenticated) {
            checkAuth(); // Call to check authentication on mount
        }
    }, [checkAuth, isAuthenticated]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <div>Please log in to view your dashboard.</div>;
    }

    return (
        <div className="dashboard">
            <div className="profile">
                <img src="https://via.placeholder.com/150" alt="Profile" className="profile-pic" />
                <h2>{user.firstName} {user.lastName}</h2>
                <p>Email: {user.email}</p>
                <p>Admission No: {user.admNo}</p>
            </div>
        </div>
    );
};

export default Dashboard;
