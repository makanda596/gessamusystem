// Navbar.jsx
import React from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" className="bg-blue-600">
            <Toolbar className="flex justify-between">
                {/* Logo */}
                <Typography variant="h6" component="div" className="font-bold">
                    MU Portal
                </Typography>

                {/* Links for desktop */}
                <div className="hidden md:flex space-x-8">
                    <a href="#dashboard" className="hover:text-gray-300 text-white">
                        Dashboard
                    </a>
                    <a href="#profile" className="hover:text-gray-300 text-white">
                        Profile
                    </a>
                    <a href="#resources" className="hover:text-gray-300 text-white">
                        Resources
                    </a>
                    <a href="#settings" className="hover:text-gray-300 text-white">
                        Settings
                    </a>
                </div>

                {/* Mobile Menu and Profile */}
                <div className="flex items-center md:hidden">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        className="mt-2"
                    >
                        <MenuItem onClick={handleClose} component="a" href="#dashboard">
                            Dashboard
                        </MenuItem>
                        <MenuItem onClick={handleClose} component="a" href="#profile">
                            Profile
                        </MenuItem>
                        <MenuItem onClick={handleClose} component="a" href="#resources">
                            Resources
                        </MenuItem>
                        <MenuItem onClick={handleClose} component="a" href="#settings">
                            Settings
                        </MenuItem>
                    </Menu>
                </div>

                {/* User Profile */}
                <div className="hidden md:flex items-center space-x-2">
                    <AccountCircleIcon fontSize="large" />
                    <Typography variant="body1" className="text-white">
                        John Doe
                    </Typography>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
