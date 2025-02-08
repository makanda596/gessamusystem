import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get('http://localhost:5000/profile');
                console.log(response.data);
            } catch (err) {
                setError('You need to log in .');
            }
        };

        fetchUserDetails();
    }, []); // Runs once when the component mounts

    return (
        <div>
            {error && <p>{error}</p>}
            {userDetails ? (
                <div>
                    <h3>Welcome, {userDetails.user}</h3>
                    <p>Email: {userDetails.email}</p>
                    <p>Admission No: {userDetails.admNo}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserProfile;
