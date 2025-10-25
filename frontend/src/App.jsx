

// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import FileUpload from './components/upload/FileUpload';
import DatasetView from './components/dashboard/DatasetView';
import HomePage from './components/home/HomePage';
import React from 'react';
// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/signin" />;
}

// Public Route Component (redirect to dashboard if already logged in)
function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
}

function App() {
  return (
    <Router>
     
        <AuthProvider>
          <Routes>
            {/* Home/Landing Page - Available to all */}
            <Route path="/" element={<HomePage />} />

            {/* Public Routes */}
            <Route
              path="/signin"
              element={
                <PublicRoute>
                  <SignIn />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/upload"
              element={
                <ProtectedRoute>
                  <FileUpload />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/dataset/:id"
              element={
                <ProtectedRoute>
                  <DatasetView />
                </ProtectedRoute>
              }
            />

            {/* 404 - Redirect to home */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </AuthProvider>
    
    </Router>
  );
}

export default App;