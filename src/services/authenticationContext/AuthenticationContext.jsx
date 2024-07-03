import React, { createContext, useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProfe, setIsProfe] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      setIsAdmin(storedUser.rol === 'admin');
      setIsProfe(storedUser.rol === 'profe');
    }
    setLoading(false);
  }, []);

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const q = query(collection(db, 'users'), where('email', '==', email), where('password', '==', password));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUser(userData);
        setIsAdmin(userData.rol === 'admin');
        setIsProfe(userData.rol === 'profe');
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        alert('Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    setIsProfe(false);
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <AuthenticationContext.Provider value={{ user, isAdmin, isProfe, loading, handleLogin, handleLogout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
