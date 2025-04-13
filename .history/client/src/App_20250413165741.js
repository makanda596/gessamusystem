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
import Allprojects from './pages/Trainings.jsx';
import Tasks from './pages/Tasks.jsx';
import Alert from './pages/Alert.jsx';
import Specific from './pages/Specific.jsx';
import OneProject from './pages/OneProject.jsx';
import AdminDashboard from './pages/ADMIN/AdminDashboard.jsx';
import Training from './pages/Training.jsx';
import Settings from './pages/Settings.jsx';
import Profile from './pages/Profile.jsx';
import Try from './pages/Try.jsx'
import Mytasks from './pages/Mytasks.jsx';
import MyProjects from './pages/MyProjects.jsx';
import Trainings from './pages/Trainings.jsx';
import AlluserProjects from './pages/AlluserProjects.jsx';


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

function App({user}) {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

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
            <Route path="/try" element={<Try />} />
            <Route path="/signup" element={<RedirectAuthenticatedUser><SignUp /></RedirectAuthenticatedUser>} />
            <Route path="/forgot-password" element={<RedirectAuthenticatedUser><ForgotPassword /></RedirectAuthenticatedUser>} />
            <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser><Resetpassword /></RedirectAuthenticatedUser>} />
            <Route path="/trainings" element={<ProtectedRoute><Trainings /></ProtectedRoute>} />
            <Route path="/Myprojects" element={<ProtectedRoute><MyProjects /></ProtectedRoute>} />
            <Route path="/task" element={<ProtectedRoute><Tasks user={user} /></ProtectedRoute>} />
            <Route path="/Mytasks" element={<ProtectedRoute><Mytasks  /></ProtectedRoute>} />
            <Route path="/alert" element={<ProtectedRoute><Alert /></ProtectedRoute>} />
            <Route path="/Mytask" element={<ProtectedRoute><Mytasks /></ProtectedRoute>} />
            <Route path="/task/:id" element={<ProtectedRoute><Specific /></ProtectedRoute>} />
            <Route path="/trainings" element={<ProtectedRoute><Training /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/Quiz" element={<ProtectedRoute><Quiz  /></ProtectedRoute>} />
            <Route path='/projects' element={<ProtectedRoute><AlluserProjects /></ProtectedRoute>}/>
            <Route path="/project/:id" element={<ProtectedRoute><OneProject /></ProtectedRoute>} />
            <Route path="/boa" element={<AdminDashboard />} />
          </Routes>
        </div>
      </Router>
    );
  }


export default App;
