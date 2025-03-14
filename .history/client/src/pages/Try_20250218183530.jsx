import React, { useState, useEffect } from "react";
import { FaSearch, FaBell, FaBars, FaTimes } from "react-icons/fa";
import { useAuthStore } from "../store/auth";
import axios from "axios";

const Navbar = ({ userId }) => {
  const { logout } = useAuthStore();
  const [details, setDetails] = useState(null);
  const [error, setError] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [alertCount, setAlertCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const fetchDetails = async () => {
    try {
      const response = await axios.get("https://gessamubackend.onrender.com/auth/profile", {
        withCredentials: true,
      });
      setDetails(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  const countAlert = async () => {
    try {
      const response = await axios.get(`https://gessamubackend.onrender.com/alert/countAlert/${userId}`);
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
    <nav className="bg-green-800 p-4 text-white flex items-center justify-between">
      <h4 className="text-xl">GESSAMU PORTAL</h4>
      {/* Search Bar */}
      <div className="flex items-center bg-green-700 rounded-full px-4 py-2">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-white outline-none placeholder:text-white"
        />
        <FaSearch className="ml-2 text-white" />
      </div>

      {/* Mobile Hamburger */}
      <div className="lg:hidden flex items-center">
        <FaBars
          className="text-white text-3xl cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
      </div>

      {/* Right - Navigation Links */}
      <div
        className={`flex items-center space-x-6 lg:flex ${
          isMobileMenuOpen ? "block absolute top-0 left-0 w-full bg-green-800 p-4" : "hidden"
        } lg:block`}
      >
        <a href="/dashboard" className="hover:text-gray-300">Home</a>
        <a href="/alert" className="relative hover:text-gray-300">
          <FaBell className="text-4xl" />
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
        <a href="/Projects" className="hover:text-gray-300">Projects</a>
        <a href="/trainings" className="hover:text-gray-300">Live Trainings</a>
        <a href="/asqQuiz" className="hover:text-gray-300">asqQuiz</a>
        <a href="/task" className="hover:text-gray-300">Tasks</a>

        {/* Profile Icon */}
        <div className="flex items-center space-x-2 relative">
          <img
            src={details?.user.avatar || "https://via.placeholder.com/100"}
            alt=""
            onClick={handleProfileClick}
            className="w-14 h-14 rounded-full border-4 border-white cursor-pointer"
          />
          {isDropdownOpen && (
            <div className="absolute right-[-4px] mt-32 bg-white text-black p-2 rounded shadow-lg">
              <ul>
                <li className="py-1 px-4 hover:bg-gray-200 cursor-pointer">Settings</li>
                <li className="py-1 px-4 hover:bg-gray-200 cursor-pointer" onClick={logoutHandle}>
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Close Menu for Mobile */}
      <div className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <FaTimes
          className="text-white text-3xl cursor-pointer"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </nav>
  );
};

export default Navbar;
