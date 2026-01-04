import React from 'react';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import Stats from '../components/Stats';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-wedding-secondary">
      <Hero />
      <Stats />
      <Gallery />
    </div>
  );
};

export default HomePage;
