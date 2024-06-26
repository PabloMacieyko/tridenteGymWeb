import React, { createContext, useContext, useState, useEffect  } from 'react';




const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Restaurar sesión si existe
    const authData = pb.authStore.isValid && pb.authStore.model;
    setUser(authData);
  }, []);

  const login = async (username, password) => {
    try {
      const authData = await pb.collection('users').authWithPassword(username, password);
      setUser(authData.user);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const logout = async () => {
    pb.authStore.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};