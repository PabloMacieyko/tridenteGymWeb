import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Body from "./components/body/Body";
import Professor from "./components/professor/Professor";
import Login from "./components/login/Login";
import ImcCalculator from "./components/imcCalculator/ImcCalculator"; // Importar ImcCalculator
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Register from "./components/login/Register";
import ManageActivities from "./components/manageActivities/ManageActivities";
import Activities from "./components/activities/Activities";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";
import ProtectedRoute from "./components/route/protected/ProtectedRoute";
import { AuthenticationContextProvider } from "./services/authenticationContext/AuthenticationContext";
import ManageUsers from "./components/manageUsers/ManageUsers";
import Cart from "./components/cart/Cart";

const App = () => {
  React.useEffect(() => {
    AOS.init(); // Inicializar AOS
  }, []);

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "activities"));
        const activitiesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setActivities(activitiesData);
      } catch (error) {
        console.error("Error fetching activities", error);
      }
    };
    fetchActivities();
  }, []);

  const MainContent = () => (
    <div className="dark:bg-dark">
      <Body />
      <ImcCalculator /> {/* Renderizar ImcCalculator debajo de Body */}
      <Activities activities={activities} />
      <Professor />
    </div>
  );

  const Contacto = () => (
    <div className="dark:bg-dark">
      <Footer />
    </div>
  );

  return (
    <div className="dark:bg-dark">
      <AuthenticationContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route
              path="/clases"
              element={<ProtectedRoute component={ManageActivities} />}
            />
            <Route
              path="/usuarios"
              element={<ProtectedRoute component={ManageUsers} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </Router>
      </AuthenticationContextProvider>
    </div>
  );
};

export default App;
