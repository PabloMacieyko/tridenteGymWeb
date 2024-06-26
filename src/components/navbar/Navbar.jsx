import React, { useContext, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../../public/logo.png";
import { AuthenticationContext } from "../../services/authenticationContext/AuthenticationContext";


const Navlinks = [
  {
    id: 1,
    name: "INICIO",
    link: "/", // Enlace a la página principal
  },
  {
    id: 2,
    name: "CONTACTO",
    link: "#contacto", // Enlace directo al ID de la sección Footer
  },
  {
    id: 3,
    name: "LOGIN",
    link: "/login", // Mantenemos el enlace a la página de Login
  },
  {
    id: 4,
    name: "CREAR CUENTA",
    link: "/register", // Mantenemos el enlace a la página de Register
  },
];

const Navbar = () => {
  const { isAdmin, user, handleLogout } = useContext(AuthenticationContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = (link) => {
    if (link.startsWith("#")) {
      const targetId = link.substring(1); // Eliminar el símbolo #
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (link === "/login") {
      if (menuOpen) {
        setMenuOpen(false);
      }
    } else {
      window.location.href = link;
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-dark text-white">
      <div className="flex items-center">
        <a href="/">
          <img
            src={Logo}
            alt="Logo"
            className="w-16 sm:w-24 transition duration-300 ease-in-out transform hover:scale-150 mr-2 cursor-pointer"
          />
        </a>
        <a
          href="/"
          className="text-xl font-bold text-white hover:text-primary duration-500 ease-in transform hover:scale-110 mr-2"
        >
          TRIDENTE GYM
        </a>
      </div>
      <div className="flex items-center justify-center sm:justify-end mt-4 sm:mt-0">
        <p className="text-center sm:text-right text-xl font-semibold hover:text-primary">
          El esfuerzo de hoy, es la victoria de mañana!
        </p>
      </div>
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={toggleMenu}
      >
        <GiHamburgerMenu className="h-6 w-6 text-white" />
      </button>
      <ul
        className={`md:flex md:items-center md:w-auto ${
          menuOpen ? "block" : "hidden"
        } md:block`}
      >
        {Navlinks.map(({ id, name, link }) => (
          <li key={id} className="py-2 px-4">
            <a
              href={link}
              className="text-xl font-bold text-white hover:text-primary duration-300"
              onClick={() => handleNavClick(link)}
            >
              {name}
            </a>
          </li>
        ))}
        {user && (
          <li className="py-2 px-4">
            <button
              className="text-xl font-bold text-white hover:text-primary duration-300"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          </li>
        )}
        {isAdmin && (
          <li className="py-2 px-4">
            <a
              href="/clases"
              className="text-xl font-bold text-white hover:text-primary duration-300"
              onClick={() => handleNavClick("/clases")}
            >
              CLASES
            </a>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
