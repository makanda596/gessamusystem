import React, { useState, useEffect } from 'react';
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
            const response = await axios.post('https://gessamubackend.onrender.com/login', {
                username,
                email,
                admNo
            });

            if (response.status === 200) {
                setLoggedIn(true);
                console.log('Logged in:', response.data);
                window.location.href = '/user'; // Redirect after successful login
            }
        } catch (err) {
            setError('Login failed: ' + (err.response?.data?.message || 'Unknown error'));
        }
    };

    useEffect(() => {
        fetch('https://gessamubackend.onrender.com/api/test', {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => console.log(data))
            .catch((error) => console.error('Error:', error));
    }, []);

    return (
        <div>
            <h1>GESSAMU Login</h1>
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
