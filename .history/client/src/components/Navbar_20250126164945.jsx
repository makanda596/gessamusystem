import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  // State to toggle dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown on profile click
  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-green-800 flex items-center justify-between p-4 text-white">
      {/* Left - Menu Icon */}
      <div className="flex items-center">
        <FaBars className="text-white text-2xl cursor-pointer" />
      </div>

      {/* Center - Navigation Links */}
      <div className="flex items-center space-x-6">
        <a href="#dashProjects" className="hover:text-gray-300">Dash Projects</a>
        <a href="#asqQuiz" className="hover:text-gray-300">asqQuiz</a>
        <a href="#tasks" className="hover:text-gray-300">Tasks</a>
        <a href="#settings" className="hover:text-gray-300">Settings</a>
      </div>

      {/* Right - Search Bar and Profile Section */}
      <div className="flex items-center space-x-2 relative">
        {/* Search Bar */}
        <div className="flex items-center bg-green-700 rounded-full px-4 py-2">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-white outline-none placeholder:text-white"
          />
          <FaSearch className="ml-2 text-white" />
        </div>

        {/* Profile Section */}
        <div className="flex items-center space-x-2 relative">
          <img
            src="https://via.placeholder.com/40" // Replace with actual profile image URL
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
            onClick={handleProfileClick}
          />
          <span className="text-sm font-semibold">Profile</span>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-10 bg-white text-black p-2 rounded shadow-lg">
              <ul>
                <li className="py-1 px-4 hover:bg-gray-200 cursor-pointer">Profile</li>
                <li className="py-1 px-4 hover:bg-gray-200 cursor-pointer">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
