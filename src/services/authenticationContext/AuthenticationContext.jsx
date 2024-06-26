import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  query,
  where,
  collection,
  limit,
  getDocs,
} from "firebase/firestore";
import PropTypes from "prop-types";
import { auth, db } from "../../firebase/config";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setIsAdmin(userDoc.data().rol === "admin");
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const q = query(
        collection(db, "users"),
        where("email", "==", email),
        where("password", "==", password),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUser({ id: querySnapshot.docs[0].id, ...userData });
        setIsAdmin(userData.rol === "admin");
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error al iniciar sesión");
    }
  };

  const handleLogout = () => {
      setUser(null);
      setIsAdmin(false);
  };

  return (
    <AuthenticationContext.Provider
      value={{ user, isAdmin, handleLogin, handleLogout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
