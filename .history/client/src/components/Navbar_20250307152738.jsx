import { useState } from "react";
import { FaUser, FaBell, FaHome, FaTasks, FaProjectDiagram, FaCog, FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-green-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-white text-2xl font-bold">gessamusuport@gmail.com</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-white font-medium">
          <li className="flex items-center space-x-1 cursor-pointer hover:opacity-80" >
            <FaHome /> <a href='/dashboard'>Home</a>
          </li>
          <li className="flex items-center space-x-1 cursor-pointer hover:opacity-80">
            <FaTasks /> <a href='/task'>Tasks</a>
          </li>
          <li className="flex items-center space-x-1 cursor-pointer hover:opacity-80">
            <FaProjectDiagram /> <span>Projects</span>
          </li>
          <li className="flex items-center space-x-1 cursor-pointer hover:opacity-80">
            <FaCog /> <span>Settings</span>
          </li>
        </ul>

        {/* Icons & Mobile Menu Button */}
        <div className="flex items-center space-x-6 text-white">
          <FaBell className="text-xl cursor-pointer hover:opacity-80" />
          <FaUser className="text-xl cursor-pointer hover:opacity-80" />

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
          <li className="flex items-center space-x-1 cursor-pointer hover:opacity-80">
            <FaHome /> <span>Home</span>
          </li>
          <li className="flex items-center space-x-1 cursor-pointer hover:opacity-80">
            <FaTasks /> <span>Tasks</span>
          </li>
          <li className="flex items-center space-x-1 cursor-pointer hover:opacity-80">
            <FaProjectDiagram /> <span>Projects</span>
          </li>
          <li className="flex items-center space-x-1 cursor-pointer hover:opacity-80">
            <FaCog /> <span>Settings</span>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
