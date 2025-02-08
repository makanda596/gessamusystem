import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/auth.js';

// Lazy loading components
const Login = React.lazy(() => import('./pages/Login.jsx'));
const Home = React.lazy(() => import('./pages/Home.jsx'));
const SignUp = React.lazy(() => import('./pages/SignUp.jsx'));
const AdminLoginPage = React.lazy(() => import('./pages/ADMIN/adminLogin.jsx'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword.jsx'));
const ResetPassword = React.lazy(() => import('./pages/Resetpassword .jsx'));
const Allprojects = React.lazy(() => import('./pages/Allprojects.jsx'));
const Tasks = React.lazy(() => import('./pages/Tasks.jsx'));
const Alert = React.lazy(() => import('./pages/Alert.jsx'));
const Specific = React.lazy(() => import('./pages/Specific.jsx'));
const OneProject = React.lazy(() => import('./pages/OneProject.jsx'));
const AdminDashboard = React.lazy(() => import('./pages/ADMIN/AdminDashboard.jsx'));

// Error boundary
import ErrorBoundary from './components/ErrorBoundary';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  // Check if authentication is still being processed
  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

function App() {
  const { user, isAuthenticated, isCheckingAuth, checkAuth } = useAuthStore();

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
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
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
                element={
                  <RedirectAuthenticatedUser>
                    <AdminLoginPage />
                  </RedirectAuthenticatedUser>
                }
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
                    {user ? <Alert userId={user._id} /> : <Navigate to="/" replace />}
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
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
