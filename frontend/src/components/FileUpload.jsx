import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Progress, Alert } from 'flowbite-react';
import { uploadFiles } from '../utils/api';

const FileUpload = ({ onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    setUploadStatus(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      'video/*': ['.mp4', '.mov', '.avi'],
    },
    multiple: true,
  });

  const removeFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setUploadStatus({
        type: 'warning',
        message: 'Por favor selecciona al menos un archivo',
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadStatus(null);

    try {
      const result = await uploadFiles(selectedFiles, (progress) => {
        setUploadProgress(progress);
      });

      setUploadStatus({
        type: 'success',
        message: `${result.files.length} archivo(s) subido(s) exitosamente`,
      });

      setSelectedFiles([]);
      setUploadProgress(0);

      if (onUploadSuccess) {
        onUploadSuccess(result.files);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadStatus({
        type: 'failure',
        message: error.response?.data?.error || 'Error al subir archivos. Por favor intenta de nuevo.',
      });
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div id="upload" className="max-w-4xl mx-auto py-12 px-4">
      <h2 className="text-4xl font-bold text-center text-wedding-dark mb-8 font-serif">
        Comparte Tus Fotos y Videos
      </h2>

      {uploadStatus && (
        <Alert color={uploadStatus.type} className="mb-6">
          <span>{uploadStatus.message}</span>
        </Alert>
      )}

      <div
        {...getRootProps()}
        className={`border-4 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragActive
            ? 'border-wedding-primary bg-wedding-secondary'
            : 'border-gray-300 hover:border-wedding-primary hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <svg
          className="mx-auto h-16 w-16 text-gray-400 mb-4"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {isDragActive ? (
          <p className="text-xl text-wedding-primary font-semibold">
            Suelta los archivos aquí...
          </p>
        ) : (
          <div>
            <p className="text-xl text-gray-700 mb-2">
              Arrastra y suelta archivos aquí, o haz clic para seleccionar
            </p>
            <p className="text-sm text-gray-500">
              Soporta imágenes (JPG, PNG, GIF, WebP) y videos (MP4, MOV, AVI)
            </p>
          </div>
        )}
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">
            Archivos seleccionados ({selectedFiles.length})
          </h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white p-3 rounded-lg shadow"
              >
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  {file.type.startsWith('image/') ? (
                    <svg
                      className="h-8 w-8 text-green-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-8 w-8 text-blue-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  disabled={uploading}
                  className="ml-4 text-red-500 hover:text-red-700 disabled:opacity-50"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {uploading && (
            <div className="mt-4">
              <Progress
                progress={uploadProgress}
                size="lg"
                color="yellow"
                labelProgress
              />
              <p className="text-center text-sm text-gray-600 mt-2">
                Subiendo archivos...
              </p>
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleUpload}
              disabled={uploading}
              size="xl"
              className="bg-wedding-primary hover:bg-opacity-90"
            >
              {uploading ? 'Subiendo...' : `Subir ${selectedFiles.length} archivo(s)`}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
