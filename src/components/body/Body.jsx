import React, { useState } from 'react';
import video from '../../../public/video.mp4';

const Body = () => {
  const [showText, setShowText] = useState(false);

  return (
    <div className="relative">
      <video autoPlay loop muted className="w-full h-250">
        <source src={video} type="video/mp4" />
        Tu navegador no admite videos HTML5.
      </video>
      <div className="z-10 text-white text-center p-5 absolute bottom-0 left-0 right-0 mb-1">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 hover:text-primary">
          BIENVENIDO A TRIDENTE GYM
        </h1>
        <button
          className="bg-green-600 hover:text-primary text-white py-2 px-4 mt-4 rounded-md"
          onClick={() => setShowText(!showText)}
        >
          ÚNETE A NUESTRO EQUIPO
        </button>
      </div>
    </div>
  );
};

export default Body;
