import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
      const data = await authService.checkSession();
      if (data && data.logged_in) {
        setUser({ username: data.username, role: data.role });
        setLoggedIn(true);
      } else {
        setUser(null);
        setLoggedIn(false);
      }
    } catch (err) {
      setUser(null);
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (username, password) => {
    const data = await authService.login(username, password);
    if (data && data.status === 'success') {
      setUser({ username: data.user.username, role: data.user.role });
      setLoggedIn(true);
      return data.user;
    }
    throw new Error(data.detail || 'Login failed');
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
    setUser(null);
    setLoggedIn(false);
  };

  const setUserSession = (userData) => {
    setUser(userData);
    setLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{ user, loggedIn, loading, login, logout, checkSession, setUserSession }}>
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
