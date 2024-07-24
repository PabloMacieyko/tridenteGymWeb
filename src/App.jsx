import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Professor from "./components/professor/Professor";
import Footer from "./components/footer/Footer";
import ImcCalculator from "./components/imcCalculator/ImcCalculator";
import Body from "./components/body/Body";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthenticationContextProvider } from "./services/authenticationContext/AuthenticationContext";
import Register from "./components/login/Register";
import ManageUsers from "./components/manageUsers/ManageUsers";
import ProtectedRoute from "./components/route/protected/ProtectedRoute";
import Activities from "./components/activities/Activities";
import ManageActivities from "./components/manageActivities/ManageActivities";
import Cart from "./components/cart/Cart";
import { ActivitiesProvider } from "./services/activitiesContext/ActivitiesContext";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const MainContent = () => (
    <div className="dark:bg-dark">
      <Body />
      <ImcCalculator />
      <Activities />
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
        <ActivitiesProvider>
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
        </ActivitiesProvider>
      </AuthenticationContextProvider>
    </div>
  );
}

export default App;
