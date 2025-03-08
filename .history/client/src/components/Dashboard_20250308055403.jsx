import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="p-4 bg-gray-800 text-white flex justify-between">
            <h1 className="text-xl font-bold">My App</h1>
            <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
