

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Dashboard from "../components/Dashboard.jsx";
import Footer from "../components/Footer.jsx";
import axios from "axios";

function Home() {
 
   
    return (
        <div>
            <Navbar />
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
