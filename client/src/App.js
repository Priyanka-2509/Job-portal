// job-portal-frontend/src/App.js
// job-portal-frontend/src/App.js
// job-portal-frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AuthChoice from './pages/Auth/AuthChoice';
import LoginCandidate from './pages/Auth/LoginCandidate';
import LoginEmployer from './pages/Auth/LoginEmployer';
import SignupCandidate from './pages/Auth/SignupCandidate';
import SignupEmployer from './pages/Auth/SignupEmployer';
import BrowseJobs from './pages/BrowseJobs';
import JobDetail from './pages/JobDetail';
import AuthProvider from "./context/AuthContext";
import EmployerDashboard from './pages/Dashboard/EmployerDashboard';
import CandidateDashboard from "./pages/Dashboard/Candidate/Dashboards";
import Profile from "./pages/Dashboard/Candidate/Profile";
import Overview from "./pages/Dashboard/Candidate/Overview";
//import DarkThemeProvider from "./components/DarkThemeProvider";

function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userRole = (user?.role || "").toLowerCase();

  // Not logged in → go to /auth
  if (!token || !user) {
    return <Navigate to="/auth" replace />;
  }

  // Logged in but wrong role → go home
  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    // This wrapper div activates the dark theme and ensures the background covers the full screen.
    <div className="dark bg-gray-900 text-gray-100 min-h-screen">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthChoice />} />
            <Route path="/login-candidate" element={<LoginCandidate />} />
            <Route path="/login-employer" element={<LoginEmployer />} />
            <Route path="/signup-candidate" element={<SignupCandidate />} />
            <Route path="/signup-employer" element={<SignupEmployer />} />
            <Route path="/browse-jobs" element={<BrowseJobs />} />
            <Route path="/job/:id" element={<JobDetail />} />

            {/* Candidate Protected Routes */}
            <Route
              path="/candidate-dashboard"
              element={
                <PrivateRoute role="candidate">
                  <CandidateDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/overview"
              element={
                <PrivateRoute role="candidate">
                  <Overview />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute role="candidate">
                  <Profile />
                </PrivateRoute>
              }
            />

            {/* Employer Protected Routes */}
            <Route
              path="/employer-dashboard"
              element={
                <PrivateRoute role="employer">
                  <EmployerDashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
