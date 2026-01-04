import React from 'react';

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-wedding-secondary to-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-wedding-dark mb-6 font-serif">
          Hernan & Johana
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
          Ayúdanos a capturar cada momento especial de nuestro día.
          Sube tus fotos y videos para crear juntos un álbum inolvidable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#upload"
            className="bg-wedding-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition duration-300 shadow-lg"
          >
            Subir Fotos
          </a>
          <a
            href="#gallery"
            className="bg-white text-wedding-primary border-2 border-wedding-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-wedding-primary hover:text-white transition duration-300 shadow-lg"
          >
            Ver Galería
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
