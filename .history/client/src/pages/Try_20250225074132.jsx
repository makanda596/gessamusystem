import React, { useState, useEffect } from "react";
import { FaSearch, FaBell, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { useAuthStore } from "../store/auth";
import axios from "axios";

const Navbar = ({ userId }) => {
  const { logout } = useAuthStore();
  const [details, setDetails] = useState(null);
  const [alertCount, setAlertCount] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get("https://gessamubackend.onrender.com/auth/profile", {
          withCredentials: true,
        });
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching details:", error.message);
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

    fetchDetails();
    countAlert();
  }, [userId]);

  const logoutHandle = async () => {
    try {
      await logout();
      window.location.href = "/";
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="bg-green-800 p-2 text-white flex items-center justify-between relative shadow-lg ">
        <div className="flex flex-col">
          <p className="text-green-700">brian</p>
          <h4 className="text-md font-bold">GESSAMU PORTAL</h4>
        </div>

        {/* Search Bar - Hidden on Small Screens */}
        <div className="hidden md:flex items-center bg-green-700 rounded-full px-4 py-1">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-white outline-none placeholder:text-white w-full"
          />
          <FaSearch className="ml-2 text-white cursor-pointer" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-6">
          <a href="/dashboard" className="hover:text-gray-300">Home</a>
          <a href="/projects" className="hover:text-gray-300">Projects</a>
          <a href="/trainings" className="hover:text-gray-300">Trainings</a>
          {/* <a href="/asqQuiz" className="hover:text-gray-300">asqQuiz</a> */}
          <a href="/task" className="hover:text-gray-300">Tasks</a>
          <a href="/settings" className="hover:text-gray-300">Settings</a>
          {/* Alert Icon */}
          <a href="/alert" className="relative hover:text-gray-300">
            <FaBell className="text-2xl" />
            {alertCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {alertCount}
              </span>
            )}
          </a>

          {/* Profile */}
          <div className="relative">
            <FaUserCircle
              alt="Profile"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-12 h-12 text-4xl rounded-full border-4 border-white cursor-pointer"
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black p-3 rounded-lg shadow-lg w-40">
                <ul>
                  <a href='/profile' className="py-1 px-4 hover:bg-gray-200 cursor-pointer">My Profie</a>
                  <li className="py-1 px-4 hover:bg-gray-200 cursor-pointer" onClick={logoutHandle}>
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <label htmlFor="menu-toggle" className="lg:hidden cursor-pointer">
          <FaBars className="text-white text-2xl" />
        </label>
      </nav>

      {/* Mobile Sidebar */}
      <input type="checkbox" id="menu-toggle" className="hidden peer" />
      <div className="fixed inset-0 bg-black bg-opacity-50 hidden peer-checked:block lg:hidden"></div>
      <div className="fixed top-0 left-0 h-full w-64 bg-green-900 text-white p-5 transform -translate-x-full peer-checked:translate-x-0 transition-transform duration-300 ease-in-out shadow-lg lg:hidden">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-bold">Menu</h4>
          <label htmlFor="menu-toggle" className="cursor-pointer">
            <FaTimes className="text-2xl" />
          </label>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex flex-col space-y-4 z-10">
          <a href="/dashboard" className="hover:text-gray-300 transition duration-300 ease-in-out hover:underline">
            Home
          </a>
          <a href="/projects" className="hover:text-gray-300 transition duration-300 ease-in-out hover:underline">
            Projects
          </a>
          <a href="/trainings" className="hover:text-gray-300 transition duration-300 ease-in-out hover:underline">
            Trainings
          </a>
          <a href="/settings" className="hover:text-gray-300 transition duration-300 ease-in-out hover:underline">
            Settings
          </a>
          {/* <a href="/asqQuiz" className="hover:text-gray-300 transition duration-300 ease-in-out hover:underline">
            asqQuiz
          </a> */}
          <a href="/task" className="hover:text-gray-300 transition duration-300 ease-in-out hover:underline">
            Tasks
          </a>

          {/* Alert */}
          <a href="/alert" className="relative hover:text-gray-300 flex items-center">
            <FaBell className="text-2xl mr-2" />
            {alertCount > 0 && (
              <span className="bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {alertCount}
              </span>
            )}
          </a>

          <a href='/profile'>  <FaUserCircle className="text-4xl" /></a>

          <button
            onClick={logoutHandle}
            className="text-red-500 mt-1 font-bold text-xl  hover:underline"
          >
            Logout
          </button>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
