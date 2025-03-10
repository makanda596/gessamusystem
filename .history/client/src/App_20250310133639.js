import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth.js';

import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Quiz from './pages/Quiz.jsx';
import SignUp from './pages/SignUp.jsx';
import AdminLoginPage from './pages/ADMIN/adminLogin.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import Resetpassword from './pages/Resetpassword.jsx';
import Allprojects from './pages/Allprojects.jsx';
import Tasks from './pages/Tasks.jsx';
import Alert from './pages/Alert.jsx';
import Specific from './pages/Specific.jsx';
import OneProject from './pages/OneProject.jsx';
import AdminDashboard from './pages/ADMIN/AdminDashboard.jsx';
import Training from './pages/Training.jsx';
import Settings from './pages/Settings.jsx';
import Profile from './pages/Profile.jsx';


// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

// Redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized: No token found");
        return;
      }

      try {
        const response = await fetch("https://gessamusystem.onrender.com/auth/profile", {
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
        setError(err.message);
      }
    };

    fetchUserInfo();
  }, []);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;


  // Checking authentication - show loading screen
  if (isCheckingAuth) {
    return (
      
      <div className=" items-center justify-center min-h-screen hidden" >
        <div className="w-16 h-16 border-4 border-t-red-600 border-b-green-600 border-l-white border-r-white rounded-full animate-spin"></div>
      </div>
    );}
    // Main app content after auth check
    return (
      <Router>
        <div className="App">
          {/* ..d */}
          <Routes>           


            {/* routees */}
            <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/" element={<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>} />
            <Route path="/adminLogin" element={<AdminLoginPage />} />
            <Route path="/signup" element={<RedirectAuthenticatedUser><SignUp /></RedirectAuthenticatedUser>} />
            <Route path="/forgot-password" element={<RedirectAuthenticatedUser><ForgotPassword /></RedirectAuthenticatedUser>} />
            <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser><Resetpassword /></RedirectAuthenticatedUser>} />
            <Route path="/projects" element={<ProtectedRoute><Allprojects /></ProtectedRoute>} />
            <Route path="/task" element={<ProtectedRoute><Tasks user={user}/></ProtectedRoute>} />
            <Route path="/alert" element={<ProtectedRoute><Alert user={user} /></ProtectedRoute>} />
            <Route path="/task/:id" element={<ProtectedRoute><Specific /></ProtectedRoute>} />
            <Route path="/trainings" element={<ProtectedRoute><Training /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/Quiz" element={<ProtectedRoute><Quiz  /></ProtectedRoute>} />
            <Route path="/project/:id" element={<ProtectedRoute><OneProject /></ProtectedRoute>} />
            <Route path="/boa" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    );
  }


export default App;
