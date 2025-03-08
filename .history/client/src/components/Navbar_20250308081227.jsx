import { useState, useEffect, useRef } from "react";
import { FaUser, FaBell, FaHome, FaTasks, FaProjectDiagram, FaCog, FaBars, FaTimes } from "react-icons/fa";
import Logout from "./Logout";

const Navbar = ({ logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");

     
      try {
        const response = await fetch("http://localhost:5000/auth/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch user info");
        }

        setUser(data);;
      } catch (err) {
        err(err.message);
      }
    };

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
    <nav className="bg-gradient-to-r from-blue-500 to-green-500 p-4 shadow-md relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}               <p> <a href="mailto:gessamusuport@gmail.com" target="_blank"
          rel="noopener noreferrer" className="text-white">Email :gessamusuport@gmail.com</a></p>
          
        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white font-medium">
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

        {/* Icons & Mobile Menu Button */}
        <div className="flex items-center space-x-6 text-white relative">
          <FaBell className="text-xl cursor-pointer hover:opacity-80" />

          {/* User Icon with Popup */}
          <div className="relative" ref={userMenuRef}>
            {user ? (
              <img
                src={user.avatar}
                alt="Profile Picture"
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
          <li>
            <a href="/profile" className="px-4 py-2 flex items-center text-white hover:bg-gray-400">
              <FaUser />  Profile
            </a>
          </li>
          <li> <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
            <Logout logout={logout} />
          </button></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
