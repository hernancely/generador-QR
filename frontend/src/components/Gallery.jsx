import React, { useState, useEffect, useCallback } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Spinner, Alert } from 'flowbite-react';
import { getGalleryFiles } from '../utils/api';
import { useInView } from 'react-intersection-observer';
import 'react-photo-view/dist/react-photo-view.css';

const Gallery = ({ refreshTrigger }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const loadFiles = useCallback(async (pageToken = null, isRefresh = false) => {
    try {
      if (isRefresh) {
        setLoading(true);
        setFiles([]);
      } else if (pageToken) {
        setLoadingMore(true);
      }

      const result = await getGalleryFiles(50, pageToken);

      if (isRefresh) {
        setFiles(result.files);
      } else {
        setFiles((prevFiles) => [...prevFiles, ...result.files]);
      }

      setNextPageToken(result.nextPageToken);
      setHasMore(result.hasMore);
      setError(null);
    } catch (err) {
      console.error('Error loading gallery:', err);
      setError('Error al cargar la galería. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  useEffect(() => {
    loadFiles(null, true);
  }, [loadFiles, refreshTrigger]);

  useEffect(() => {
    if (inView && hasMore && !loadingMore && nextPageToken) {
      loadFiles(nextPageToken);
    }
  }, [inView, hasMore, loadingMore, nextPageToken, loadFiles]);

  const getMediaUrl = (file) => {
    // For images, use thumbnailLink if available, otherwise webContentLink
    if (file.mimeType.startsWith('image/')) {
      return file.thumbnailLink?.replace('=s220', '=s800') || file.webContentLink;
    }
    // For videos, use webContentLink
    return file.webContentLink;
  };

  const getFullSizeUrl = (file) => {
    if (file.mimeType.startsWith('image/')) {
      return file.thumbnailLink?.replace('=s220', '=s2000') || file.webContentLink;
    }
    return file.webContentLink;
  };

  const isVideo = (mimeType) => {
    return mimeType.startsWith('video/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spinner size="xl" color="warning" />
        <span className="ml-3 text-xl">Cargando galería...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Alert color="failure">
          <span>{error}</span>
        </Alert>
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <svg
          className="mx-auto h-24 w-24 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
          No hay fotos aún
        </h3>
        <p className="text-gray-500">
          Sé el primero en compartir recuerdos de este día especial
        </p>
      </div>
    );
  }

  return (
    <div id="gallery" className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold text-center text-wedding-dark mb-8 font-serif">
        Galería de Recuerdos
      </h2>
      <p className="text-center text-gray-600 mb-8">
        {files.length} archivo(s) compartido(s)
      </p>

      <PhotoProvider
        maskOpacity={0.9}
        speed={() => 300}
        easing={(type) => (type === 2 ? 'cubic-bezier(0.36, 0, 0.66, -0.56)' : 'cubic-bezier(0.34, 1.56, 0.64, 1)')}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div
              key={file.id}
              className="photo-item relative overflow-hidden rounded-lg shadow-lg bg-gray-200 aspect-square"
            >
              {isVideo(file.mimeType) ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <a
                    href={file.webContentLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center text-white hover:text-wedding-primary transition"
                  >
                    <svg
                      className="h-16 w-16 mb-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    <span className="text-sm">Ver video</span>
                  </a>
                </div>
              ) : (
                <PhotoView src={getFullSizeUrl(file)}>
                  <img
                    src={getMediaUrl(file)}
                    alt={file.name}
                    className="w-full h-full object-cover cursor-pointer"
                    loading="lazy"
                  />
                </PhotoView>
              )}
            </div>
          ))}
        </div>
      </PhotoProvider>

      {hasMore && (
        <div ref={ref} className="flex justify-center items-center py-8">
          {loadingMore && (
            <>
              <Spinner size="lg" color="warning" />
              <span className="ml-3 text-lg">Cargando más fotos...</span>
            </>
          )}
        </div>
      )}

      {!hasMore && files.length > 0 && (
        <p className="text-center text-gray-500 py-8">
          Has visto todas las fotos
        </p>
      )}
    </div>
  );
};

export default Gallery;
