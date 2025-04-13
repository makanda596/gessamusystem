import { useState, useEffect, useRef } from "react";
import { FaUser, FaBell, FaHome, FaTasks, FaProjectDiagram, FaCog, FaBars, FaTimes } from "react-icons/fa";
import Logout from "./Logout";
import logo from '../../src/assets/logo.jpg'
import { useAuthStore } from "../store/auth";
const Navbar = ({ logout }) => {
  const [isOpen, setIsOpen] = useState(false); 
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const { fetchUserInfo, user, alerts, countAlerts } = useAuthStore()

  useEffect(() => {
    countAlerts()
    fetchUserInfo();
  }, []);

  // Close the user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-green-500 p-2 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center">
                   <div className="flex items-center"> 
                    <img src={logo} alt='' className="h-10 w-10 object-cover rounded-lg"/>
                    <a href="mailto:gessamusuport@gmail.com" target="_blank"
          rel="noopener noreferrer" className="text-white hover:text-black">  gessamusuport@gmail.com
          </a></div>
          
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white font-medium">
          <li>
            <a href="/dashboard" className="flex items-center space-x-1 hover:text-black">
              <FaHome /> <span>Home</span>
            </a>
          </li>
          <li>{alerts}</li>
          <li>
            <a href="/task" className="flex items-center space-x-1 hover:text-black">
              <FaTasks /> <span>Tasks</span>
            </a>
          </li>
          <li>
            <a href="/projects" className="flex items-center space-x-1 hover:text-black">
              <FaProjectDiagram /> <span>Projects</span>
            </a>
          </li>
          <li>
            <a href="/settings" className="flex items-center space-x-1 hover:text-black">
              <FaCog /> <span>Settings</span>
            </a>  
          </li>
        </ul>

        {/* Icons & Mobile Menu Button */}
        <div className="flex items-center space-x-6 text-white relative">
          {/* <a href="/alert" className="flex items-center space-x-1 hover:text-black">
            <FaBell className="text-xl cursor-pointer hover:opacity-80" />
          </a> */}
          <FaBell className="text-xl cursor-pointer hover:opacity-80" />

          {/* User Icon with Popup */}
          <div className="relative" ref={userMenuRef}>
            {user ? (
              <img
                src={user.avatar}
                alt=""
                className="w-10 h-10 rounded-full border-2 border-gray-300 shadow-md cursor-pointer hover:opacity-80 transition-all"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
              />
) : (<FaUser/>)}

            {/* User Popup Menu */}
            {userMenuOpen && (
              <div className="z-10 absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg p-2">
                <a href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  Profile
                </a>
                <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                 <Logout logout={logout}/>
                </button>
              </div>
            )}
          </div>
 
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col items-center space-y-4 mt-4 text-white font-medium">
          <li>
            <a href="/dashboard" className="flex items-center space-x-1 hover:opacity-80">
              <FaHome /> <span>Home</span>
            </a>
          </li>
          <li>
            <a href="/task" className="flex items-center space-x-1 hover:opacity-80">
              <FaTasks /> <span>Tasks</span>
            </a>
          </li>
          <li>
            <a href="/projects" className="flex items-center space-x-1 hover:opacity-80">
              <FaProjectDiagram /> <span>Projects</span>
            </a>
          </li>
          <li>
            <a href="/settings" className="flex items-center space-x-1 hover:opacity-80">
              <FaCog /> <span>Settings</span>
            </a>
          </li>
         
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
