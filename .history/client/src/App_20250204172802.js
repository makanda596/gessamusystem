import React, { useEffect,useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth.js';

import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import AdminLoginPage from './pages/ADMIN/adminLogin.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/Resetpassword .jsx';
import Allprojects from './pages/Allprojects.jsx';
import Tasks from './pages/Tasks.jsx';
import Alert from './pages/Alert.jsx';
import Specific from './pages/Specific.jsx';
import OneProject from './pages/OneProject.jsx';
import AdminDashboard from './pages/ADMIN/AdminDashboard.jsx';
import UserProfile from './pages/UserProfle.jsx';
import Log from './pages/Log.jsx';
import axios from 'axios'

// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

function App() {
  const [details, setDetails] = useState(null);

  const fetchDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/profile", {
        withCredentials: true,
      });
      console.log(response.data);
      setDetails(response.data);
    } catch (error) {
      console.log("You need to log in to access the dashboard.");
    } 
  };

  useEffect(() => {
    fetchDetails();
  }, []);
  const { isAuthenticated, isCheckingAuth, checkAuth, user } = useAuthStore();

  useEffect(() => {
    checkAuth(); // Check authentication on app load
  }, [checkAuth]);

  // Show a loading spinner or placeholder while checking authentication
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
          <Route path='/user' element={<UserProfile />} />
          <Route path="/log" element={<Log />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <RedirectAuthenticatedUser>
                <Login />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/adminLogin"
            element={<AdminLoginPage />}
          />
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUp />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPassword />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPassword />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/projects"
            element={
              <ProtectedRoute>
                <Allprojects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/task"
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alert"
            element={
              <ProtectedRoute>
                {/* Pass the dynamic user ID here */}
                <Alert userId={details.user?.id || "default-id"} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/task/:id"
            element={
              <ProtectedRoute>
                <Specific />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project/:id"
            element={
              <ProtectedRoute>
                <OneProject />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/adminDashboard"
            element={<AdminDashboard />}
          />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
