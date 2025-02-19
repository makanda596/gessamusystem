import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth.js';
import axios from 'axios';

import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
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
import UserProfile from './pages/UserProfle.jsx';
import Log from './pages/Log.jsx';
import Try from './pages/Try.jsx';
import Training from './pages/Training.jsx';
import Quiz from './pages/Quiz.jsx';

// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? children : <Navigate to="/" replace />;
};

// Redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
 if (isAuthenticated){
return  <Navigate to="/dashboard" replace /> }
return children;
};

function App() {
  const [details, setDetails] = useState(null);
  const {  isCheckingAuth, checkAuth } = useAuthStore();
  const fetchDetails = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token found. Please log in.");
        return;
      }

      const response = await axios.get('https://gessamubackend.onrender.com/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      setDetails(response.data); // Use the data directly as you were doing
    } catch (error) {
      console.log("Failed to fetch user details. Please log in.", error);
    }
  };

  
  useEffect(() => {
    fetchDetails();
  }, []);

  useEffect(() => {
    checkAuth(); // Check authentication on app load
  }, [checkAuth]);

  // Show a loading spinner while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="mt-8 w-16 h-16 border-4 border-t-red-600 border-b-green-600 border-l-white border-r-white rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/try" element={<Try/>}/>
          <Route path="/user" element={<UserProfile />} />
          <Route path="/log" element={<Log />} />
          
          <Route path="/dashboard" element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="/" element={<RedirectAuthenticatedUser><Login /></RedirectAuthenticatedUser>} />
          <Route path="/adminLogin" element={<AdminLoginPage />} />
          <Route path="/signup" element={<RedirectAuthenticatedUser><SignUp /></RedirectAuthenticatedUser>} />
          <Route path="/forgot-password" element={<RedirectAuthenticatedUser><ForgotPassword /></RedirectAuthenticatedUser>} />
          <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser><Resetpassword /></RedirectAuthenticatedUser>} />
          <Route path="/projects" element={<ProtectedRoute><Allprojects /></ProtectedRoute>} />
          <Route path="/task" element={<ProtectedRoute><Tasks userId="67a20fc8b0d2021b64dc6466" /></ProtectedRoute>} />
          <Route path="/alert" element={<ProtectedRoute><Alert userId="67a20fc8b0d2021b64dc6466" /></ProtectedRoute>} />
          <Route path="/task/:id" element={<ProtectedRoute><Specific /></ProtectedRoute>} />
          <Route path="/trainings" element={<ProtectedRoute><Training /></ProtectedRoute>} />
          <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/project/:id" element={<ProtectedRoute><OneProject /></ProtectedRoute>} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          {/* <Route path="*" element={<h1>404 - Page Not Found</h1>} /> */}
        </Routes>
      </div>
    </Router>
  );
}
// userId = { details?.user?.id }

export default App;

