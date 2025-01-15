import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, IconButton, Avatar, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const Navbar = () => {
    const [user, setUser] = useState({ username: '', admNo: '', profilePic: '' }); // State for user info
    const [searchTerm, setSearchTerm] = useState('');

    // useEffect(() => {
    //     // Fetch user data from the backend
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await axios.get('/api/user'); // Replace with your actual API endpoint
    //             const { username, admNo, profilePic } = response.data;
    //             setUser({ username, admNo, profilePic });
    //         } catch (error) {
    //             console.error('Error fetching user data:', error);
    //         }
    //     };

    //     fetchUserData();
    // }, []);

    return (
        <AppBar position="static" sx={{ backgroundColor: '#006400' }}>
            <Toolbar>
                {/* Profile Picture */}
                <IconButton edge="start" color="inherit" sx={{ mr: 2 }}>
                    <Avatar src={user.profilePic} alt={user.username} />
                </IconButton>

                {/* Username */}
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                    {user.username || 'Username'} ({user.admNo || 'AdmNo'})
                </Typography>

                {/* Search Bar */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '4px',
                            minWidth: '200px',
                        }}
                    />
                    <IconButton color="inherit">
                        <SearchIcon />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
