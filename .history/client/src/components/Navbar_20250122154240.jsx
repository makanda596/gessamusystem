import React, { useEffect } from 'react';
import { Link } from 'react-router-component';

const Navbar = ({ user }) => {
    useEffect(() => {
        console.log('Navbar user:', user);
    }, [user]);
    return (
        <nav>
            {user.email && <p>Welcome, {user.email}!</p>}
            <Link href="/home">Home</Link>
        </nav>
    );
};

export default Navbar;