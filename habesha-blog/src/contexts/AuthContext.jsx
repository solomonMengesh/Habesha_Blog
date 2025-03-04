import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // ✅ Correct

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          logout();
        } else {
          setUser({
            id: decoded.id,
            username: decoded.username,
            email: decoded.email,
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        logout();
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    try {
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
