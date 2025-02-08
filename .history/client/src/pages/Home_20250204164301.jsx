import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/auth";
import Navbar from "../components/Navbar.jsx";
import Projects from "../components/Projects.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Footer from "../components/Footer.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
    const { logout } = useAuthStore();
    const [details, setDetails] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchDetails = async () => {
        try {
            const response = await axios.get("http://localhost:5000/auth/profile", {
                withCredentials: true,
            });
            console.log(response.data)
            setDetails(response.data);
        } catch (error) {
            setError("You need to log in to access the dashboard.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    const handlesubmit = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Navbar userId={details?.user?._id || "67a20fc8b0d2021b64dc6466"} />
            <Dashboard />
            <p>Home {details.user.email}</p>
            <Projects />
            <Footer />
            <button onClick={handlesubmit} className="bg-red-500 text-white px-4 py-2 rounded">
                Logout
            </button>
        </div>
    );
}

export default Home;
