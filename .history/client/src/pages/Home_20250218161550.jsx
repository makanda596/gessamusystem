

import React, { useState, useEffect } from "react";
import { useAuthStore } from "../store/auth";
import Navbar from "../components/Navbar.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Footer from "../components/Footer.jsx";
import axios from "axios";

function Home() {
    const [details, setDetails] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

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


    if (loading) {
        return <div>Loading...</div>;  // Display a loading message or spinner
    }

    // if (error) {
    //     return <div>{error}</div>;  // Show the error message if any
    // }

    return (
        <div>
            <Navbar userId={details?.user?.id}/>
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
