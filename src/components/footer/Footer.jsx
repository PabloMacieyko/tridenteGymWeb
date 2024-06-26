import React from 'react';
import Logo from "../../../public/logo.png";
import { FaFacebook, FaInstagram, FaMailBulk, FaWhatsapp, FaMapMarkerAlt, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const location = 'California 1711, Buenos Aires';

  const openGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="py-10 w-full dark:bg-dark dark:text-white duration-300 relative">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center">
            <div className="flex items-center justify-center gap-3">
              <img
                src={Logo}
                alt="Logo"
                className="w-16 sm:w-24 transition duration-300 ease-in-out transform hover:scale-150 mr-2 cursor-pointer"
                onClick={scrollToTop}
              />
              <div>
                <div className="flex items-center gap-8">
                  <a href="https://www.instagram.com/animaescuela/">
                    <FaInstagram className="text-3xl hover:text-primary duration-300" />
                  </a>
                  <a href="https://www.facebook.com/animaescuela">
                    <FaFacebook className="text-3xl hover:text-primary duration-300" />
                  </a>
                  <a href="mailto:tridente@tridente.com">
                    <FaMailBulk className="text-3xl hover:text-primary duration-300" />
                  </a>
                  <a href="https://wa.me/3476596041">
                    <FaWhatsapp className="text-3xl hover:text-primary duration-300" />
                  </a>
                  <FaMapMarkerAlt
                    className="text-3xl hover:text-primary duration-300 cursor-pointer"
                    onClick={openGoogleMaps}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-end mt-4 sm:mt-0">
              <p className="text-center sm:text-right text-xl font-semibold hover:text-primary">
                Superación diaria, victoria asegurada!
              </p>
            </div>
          </div>
        </div>
        <div
          className="absolute right-4 bottom-4 cursor-pointer"
          onClick={scrollToTop}
        >
          <FaArrowUp className="text-3xl hover:text-primary duration-300" />
        </div>
      </div>
      <span id="contacto"></span> {/* Identificador para la sección de contacto */}
    </>
  );
};

export default Footer;