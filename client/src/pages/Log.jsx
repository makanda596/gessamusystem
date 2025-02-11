import React, { useState } from 'react';
import axios from 'axios';

const Log = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [admNo, setAdmNo] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${import.meta.env.BCKEND_URL}/login`, {
                username,
                email,
                admNo
            }, {
                withCredentials: true  // Include cookies with the request
            });

            // If login is successful
            if (response.status === 200) {
                setLoggedIn(true); // Set loggedIn to true
                console.log('Logged in:', response.data);
            }
            window.location.href='/user'
        } catch (err) {
            setError('Login failed: ' + err.response.data.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Admission Number"
                    value={admNo}
                    onChange={(e) => setAdmNo(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Log;
