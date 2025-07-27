import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data from backend
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        url: 'http://localhost:3000/api/user/profile',
        method: 'get',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const response = await axios(config);
      setUser(response.data.user);
      console.log('👤 User data fetched:', response.data.user);
    } catch (error) {
      console.error('❌ Failed to fetch user data:', error);
      // If token is invalid, clear it
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // Initialize user data on mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Clear user data on logout
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    loading,
    fetchUserData,
    updateUser,
    clearUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};