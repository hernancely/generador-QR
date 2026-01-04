import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FileUpload from './components/FileUpload';
import Gallery from './components/Gallery';
import Stats from './components/Stats';
import Footer from './components/Footer';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = (files) => {
    // Trigger gallery refresh
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="App min-h-screen bg-gradient-to-b from-white to-wedding-secondary">
      <Header />
      <Hero />
      <Stats />
      <FileUpload onUploadSuccess={handleUploadSuccess} />
      <Gallery refreshTrigger={refreshTrigger} />
      <Footer />
    </div>
  );
}

export default App;
