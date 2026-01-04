import React from 'react';
import FileUpload from '../components/FileUpload';
import { useNavigate } from 'react-router-dom';

const UploadPage = () => {
  const navigate = useNavigate();

  const handleUploadSuccess = (files) => {
    // Redirect to gallery after successful upload
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-wedding-secondary py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-wedding-dark mb-4 font-serif">
            Compartir Fotos y Videos
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Ayúdanos a capturar cada momento especial.
            Sube tus fotos y videos de nuestra boda.
          </p>
        </div>

        <FileUpload onUploadSuccess={handleUploadSuccess} />

        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-wedding-primary hover:text-wedding-dark transition duration-300 underline"
          >
            ← Volver a la galería
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
