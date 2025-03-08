import { FaUser, FaBell, FaHome, FaTasks, FaProjectDiagram, FaCog } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-green-500 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left - Logo and Links */}
        <div className="flex items-center space-x-6">
          <h1 className="text-white text-2xl font-bold">MyApp</h1>
          <ul className="flex space-x-6 text-white font-medium">
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
        </div>

        {/* Right - Alerts and User Icon */}
        <div className="flex items-center space-x-6 text-white">
          <FaBell className="text-xl cursor-pointer hover:opacity-80" />
          <FaUser className="text-xl cursor-pointer hover:opacity-80" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
