import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Demo user database
const DEMO_USERS = {
  'client@melome.com': {
    id: 1,
    email: 'client@melome.com',
    password: 'client123',
    name: 'John Client',
    role: 'client',
    company: 'Mining Corp SA',
    phone: '+27781234567'
  },
  'thabo@melome.com': {
    id: 2,
    email: 'thabo@melome.com',
    password: 'thabo123',
    name: 'Thabo Nkosi',
    role: 'client',
    company: 'Construction Solutions',
    phone: '+27782345678'
  },
  'admin@melome.com': {
    id: 99,
    email: 'admin@melome.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'admin',
    company: 'Melome Logistics',
    phone: '+27789467636'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('melome_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = DEMO_USERS[email];
    if (userData && userData.password === password) {
      // Create user object without password
      const { password: _, ...userWithoutPassword } = userData;
      setUser(userWithoutPassword);
      localStorage.setItem('melome_user', JSON.stringify(userWithoutPassword));
      
      // Save to users array for notifications
      const users = JSON.parse(localStorage.getItem('melome_users') || '[]');
      if (!users.find(u => u.id === userWithoutPassword.id)) {
        users.push(userWithoutPassword);
        localStorage.setItem('melome_users', JSON.stringify(users));
      }
      
      toast.success(`Welcome back, ${userWithoutPassword.name}!`);
      return userWithoutPassword;
    } else {
      toast.error('Invalid email or password');
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('melome_user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};