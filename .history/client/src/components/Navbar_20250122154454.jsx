import React, { useEffect } from 'react';

const Navbar = ({ user }) => {
    useEffect(() => {
        console.log('Navbar user:', user);
    }, [user]);
    return (
        <nav>
            {user?.email && <p>Welcome, {user?.email}!</p>}
        </nav>
    );
};

export default Navbar;