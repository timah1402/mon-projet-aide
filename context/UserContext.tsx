// context/UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [activeRole, setActiveRole] = useState(null);
  const loadUser = async () => {
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setActiveRole(parsedUser.role); // on définit le rôle actif initial
    }
  };

  

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (userData) => {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setActiveRole(userData.role);
  };


  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    setActiveRole(null);
  };

  return (
    
        <UserContext.Provider value={{ user, activeRole, setActiveRole, login, logout }}>
          {children}
        </UserContext.Provider>
      );
};
