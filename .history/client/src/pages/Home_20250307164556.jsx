

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Dashboard from "../components/Dashboard.jsx";
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


    // if (loading) {
    //     return <div>  <div className="flex items-center justify-center min-h-screen">
    //         <div className="mt-8 w-16 h-16 border-4 border-t-red-600 border-b-green-600 border-l-white border-r-white rounded-full animate-spin"></div>
    //     </div></div>;  // Display a loading message or spinner
    // }

    // if (error) {
    //     return <div>{error}</div>;  // Show the error message if any
    // }

    return (
        <div>
            <Navbar userId="67a20fc8b0d2021b64dc6466"/>
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
