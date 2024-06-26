import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pilates from "../../../public/pilates.png";
import spinning from "../../../public/spinning.png";
import gimnasio from "../../../public/gimnasio.png";
import running from "../../../public/running.png";
import yoga from "../../../public/yoga.png";
import funcional from "../../../public/funcional.png";

const professorTestimonials = [
  {
    id: 1,
    name: "Estefania Pena",
    text:
      "Fortalece tu cuerpo y mente con nuestro entrenamiento de Pilates, ideal para mejorar tu flexibilidad, equilibrio y bienestar general.",
    img: pilates,
  },
  {
    id: 2,
    name: "Juan Pablo Carrera",
    text:
      "Siente la energía del spinning y pedalea hacia tus metas. ¡Cada giro de la rueda te lleva más lejos!",
    img: spinning,
  },
  {
    id: 3,
    name: "Rodrigo Rimache",
    text:
      "Desarrolla tu fuerza y resistencia con nuestro entrenamiento de gimnasio, diseñado para mejorar tu condición física y alcanzar tus objetivos de forma integral.",
    img: gimnasio,
  },
  {
    id: 4,
    name: "Héctor Mendoza",
    text:
      "Mejora tu resistencia y velocidad con nuestro entrenamiento de running, ideal para fortalecer tu condición física y vitalidad diaria.",
    img: running,
  },
  {
    id: 5,
    name: "Pablo Macieyko",
    text:
      "Encuentra equilibrio físico y mental con nuestras clases de yoga, diseñadas para mejorar tu flexibilidad, fuerza y bienestar interior.",
    img: yoga,
  },
  {
    id: 6,
    name: "Lara Croft",
    text:
      "Mejora tu vida diaria con nuestro entrenamiento funcional, enfocado en fortalecer tu cuerpo de manera integral y potenciar tu capacidad física en todas tus actividades.",
    img: funcional,
  },
];

const Professor = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000, // Cambiado a 2 segundos por slide
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true, // Activar autoplay
    autoplaySpeed: 4000, // 4 segundos por slide
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10 my-10 bg-gray-100 dark:bg-dark ">
      <div className="container">
        <div className="text-center mb-10 max-w-[600px] mx-auto">
          <h1 className="text-3xl font-bold text-white hover:text-primary">
            NUESTROS PROFESORES
          </h1>
        </div>
        <div className="mx-auto" style={{ maxWidth: "800px" }}>
          <Slider {...settings}>
            {professorTestimonials.map((professor) => (
              <div key={professor.id} className="px-2">
                <div className="flex flex-col items-center text-white hover:text-primary dark:bg-dark p-4 rounded-lg shadow-lg">
                  <img
                    src={professor.img}
                    alt={professor.name}
                    className="w-24 h-24 rounded-full mb-4"
                  />
                  <h2 className="text-lg font-bold mb-2">{professor.name}</h2>
                  <p className="text-sm text-center">{professor.text}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Professor;
