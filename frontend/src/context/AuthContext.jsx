// src/context/AuthContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import React from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Set axios default headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  }, [token]);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/me`);
          setUser(response.data.data);
        } catch (error) {
          console.error('Failed to load user:', error);
          setToken(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const signup = async (fullName, email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        fullName,
        email,
        password
      });
      
      const { token: newToken, ...userData } = response.data.data;
      setToken(newToken);
      setUser(userData);
      
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Signup failed'
      };
    }
  };

  const signin = async (email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signin`, {
        email,
        password
      });
      
      const { token: newToken, ...userData } = response.data.data;
      setToken(newToken);
      setUser(userData);
      
      return { success: true, message: response.data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const signout = () => {
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    signup,
    signin,
    signout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
