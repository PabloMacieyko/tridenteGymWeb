import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "../../../public/logo.png";

export const Navlinks = [
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
    name: "CLASES",
    link: "/clases", // Enlace directo al ID de la sección Activity
  },
  {
    id: 4,
    name: "LOGIN",
    link: "/login", // Mantenemos el enlace a la página de Login
  },
  {
    id: 5,
    name: "CREAR CUENTA",
    link: "/register", // Mantenemos el enlace a la página de Register
  },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = (link) => {
    if (link.startsWith("#")) {
      // Si el enlace es un ID (Contacto o Clases), hacer scroll suave
      const targetId = link.substring(1); // Eliminar el símbolo #
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else if (link === "/login") {
      // Si el enlace es Login, cerrar el menú y no hacer nada más
      if (menuOpen) {
        setMenuOpen(false);
      }
    } else {
      // Si es un enlace externo (como Inicio), simplemente navegar
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
      </ul>
    </nav>
  );
};

export default Navbar;
