

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
            const response = await axios.get("https://gessamubackend.onrender.com/auth/profile", {
                withCredentials: true,
            });
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
            navigate("/");
        } catch (error) {
            console.log(error);   
        }
    };

    if (loading) {
        return <div>Loading...</div>;  // Display a loading message or spinner
    }

    if (error) {
        return <div>{error}</div>;  // Show the error message if any
    }

    return (
        <div>
            <Navbar userId="67a2084a137a44a6b6f49e32"/>
            <Dashboard />
            <Footer />
            {/* <button onClick={handlesubmit} className="bg-red-500 text-white px-4 py-2 rounded">
                Logout
            </button> */}
        </div>
    );
} 
// details?.user?.id

export default Home;
