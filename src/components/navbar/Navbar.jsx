import React, { useContext, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Logo from '../../../public/logo.png';
import { AuthenticationContext } from '../../services/authenticationContext/AuthenticationContext';

const Navlinks = [
  {
    id: 1,
    name: 'INICIO',
    link: '/',
  },
  {
    id: 2,
    name: 'CONTACTO',
    link: '#contacto',
  },
];

const Navbar = () => {
  const { isAdmin, isProfe, user, handleLogout } = useContext(AuthenticationContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = (link) => {
    if (link.startsWith('#')) {
      const targetId = link.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
          menuOpen ? 'block' : 'hidden'
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
        {(isAdmin || isProfe) && (
          <li className="py-2 px-4">
            <a
              href="/clases"
              className="text-xl font-bold text-white hover:text-primary duration-300"
              onClick={() => handleNavClick('/clases')}
            >
              CLASES
            </a>
          </li>
        )}
        {isAdmin && (
          <li className="py-2 px-4">
            <a
              href="/usuarios"
              className="text-xl font-bold text-white hover:text-primary duration-300"
              onClick={() => handleNavClick('/usuarios')}
            >
              USUARIOS
            </a>
          </li>
        )}
        {!isAdmin && !isProfe && user && (
          <li className="py-2 px-4">
            <a
              href="/cart"
              className="text-xl font-bold text-white hover:text-primary duration-300"
              onClick={() => handleNavClick('/cart')}
            >
              MIS ACTIVIDADES
            </a>
          </li>
        )}
        {user ? (
          <>
            <li className="py-2 px-4">
              <span className="text-xl font-bold italic text-white">{user.email}</span>
            </li>
            <li className="py-2 px-4">
              <button
                className="text-xl font-bold italic text-white hover:text-primary duration-300"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="py-2 px-4">
              <a
                href="/login"
                className="text-xl font-bold text-white hover:text-primary duration-300"
                onClick={() => handleNavClick('/login')}
              >
                LOGIN
              </a>
            </li>
            <li className="py-2 px-4">
              <a
                href="/register"
                className="text-xl font-bold text-white hover:text-primary duration-300"
                onClick={() => handleNavClick('/register')}
              >
                CREAR CUENTA
              </a>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
