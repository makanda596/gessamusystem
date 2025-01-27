import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import SignUp from './pages/SignUp.jsx';
import { useAuthStore } from './store/auth.js';
import AdminLoginPage from './pages/ADMIN/adminLogin.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/Resetpassword .jsx';

// Protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // if (!user?.isVerified) {
  //   return <Navigate to="/email-verification" replace />;
  // }

  return children;
};

// Redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  // Check authentication on app load
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Show a loading spinner or placeholder while checking authentication
  if (isCheckingAuth)
    return <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="mt-8 border-4 border-t-red-600 border-b-green-600 border-l-white border-r-white rounded-full animate-spin"></div>
      </div>
    </>




  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
          <Route path="/"
            element={
              <RedirectAuthenticatedUser>
                <Login />
              </RedirectAuthenticatedUser>
            } />
          <Route path="/adminLogin"
            element={
              <RedirectAuthenticatedUser>
                <AdminLoginPage />
              </RedirectAuthenticatedUser>
            } />
          <Route path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignUp />
              </RedirectAuthenticatedUser>
            } />
          <Route path="/forgot-password" element={
            <RedirectAuthenticatedUser>
              <ForgotPassword />
            </RedirectAuthenticatedUser>} />
          <Route path="/reset-password/:token" element={
            <RedirectAuthenticatedUser>
              <ResetPassword />
            </RedirectAuthenticatedUser>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
