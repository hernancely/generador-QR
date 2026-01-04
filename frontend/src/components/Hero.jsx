import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/hero-wedding.jpg"
          alt="Hernan y Johana"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-serif drop-shadow-lg">
            Hernan & Johana
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto drop-shadow-md">
            Nuestra Boda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/upload"
              className="bg-wedding-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition duration-300 shadow-lg"
            >
              Subir Fotos
            </Link>
            <a
              href="#gallery"
              className="bg-white/90 text-wedding-dark border-2 border-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white transition duration-300 shadow-lg"
            >
              Ver Galería
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
