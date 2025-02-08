import React, { useState, useEffect } from "react";
import { FaSearch, FaBell } from "react-icons/fa"; // Combined import
import { useAuthStore } from "../store/auth";
import axios from "axios";

const Navbar = ({ userId }) => {
  const { logout } = useAuthStore();
  const [details, setDetails] = useState(null);
  const [error, setError] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [alertCount, setAlertCount] = useState(0);

  // Fetch user profile
  const fetchDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/profile", {
        withCredentials: true,
      });
      setDetails(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  // Fetch alert count
  const countAlert = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/alert/countAlert/${userId}`);
      setAlertCount(response.data.count);
    } catch (error) {
      console.error("Error fetching alert count:", error);
    }
  };

  useEffect(() => {
    fetchDetails();
    countAlert();
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const logoutHandle = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <nav className="bg-green-800 flex items-center justify-between p-4 text-white">
      {/* Left - Profile Section */}
      <div className="flex items-center space-x-2 relative">
        <img
          src={details?.user.avatar || "https://via.placeholder.com/100"}
          alt=""
          onClick={handleProfileClick}
          className="w-14 h-14 rounded-full border-4 border-white cursor-pointer"
        />

        {isDropdownOpen && (
          <div className="absolute right-0 mt-10 bg-white text-black p-2 rounded shadow-lg">
            <ul>
              <li className="py-1 px-4 hover:bg-gray-200 cursor-pointer">Profile</li>
              <li className="py-1 px-4 hover:bg-gray-200 cursor-pointer" onClick={logoutHandle}>
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="flex items-center bg-green-700 rounded-full px-4 py-2 mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-white outline-none placeholder:text-white"
        />
        <FaSearch className="ml-2 text-white" />
      </div>

      {/* Right - Navigation Links */}
      <div className="flex items-center space-x-6">
        <a href="/dashboard" className="hover:text-gray-300">
          Home
        </a>
        <a href="/Projects" className="hover:text-gray-300">
          Dash Projects
        </a>
        <a href="#asqQuiz" className="hover:text-gray-300">
          asqQuiz
        </a>
        <a href="/task" className="hover:text-gray-300">
          Tasks
        </a>
        <a href="#settings" className="hover:text-gray-300">
          Settings
        </a>

        {/* Alert Icon with Count - Placed last */}
        <a href="/alert" className="relative hover:text-gray-300">
          <FaBell className="text-xl" />
          {alertCount > 0 ? (
            <span className="absolute top-0 right-0 text-xs bg-red-600 text-black rounded-full w-5 h-5 flex items-center justify-center">
              {alertCount}
            </span>
          ) : (
            <span className="absolute top-0 right-0 text-xs bg-gray-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          )}
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
