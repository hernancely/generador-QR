import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/**
 * API client configuration
 */
const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor
 */
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

/**
 * Upload files to Google Drive
 */
export const uploadFiles = async (files, onUploadProgress) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await api.post('/api/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onUploadProgress) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onUploadProgress(percentCompleted);
      }
    },
  });

  return response.data;
};

/**
 * Get all files from gallery
 */
export const getGalleryFiles = async (pageSize = 50, pageToken = null) => {
  const params = { pageSize };
  if (pageToken) {
    params.pageToken = pageToken;
  }

  const response = await api.get('/api/gallery/files', { params });
  return response.data;
};

/**
 * Get file by ID
 */
export const getFileById = async (fileId) => {
  const response = await api.get(`/api/gallery/files/${fileId}`);
  return response.data;
};

/**
 * Delete file
 */
export const deleteFile = async (fileId) => {
  const response = await api.delete(`/api/gallery/files/${fileId}`);
  return response.data;
};

/**
 * Get gallery statistics
 */
export const getGalleryStats = async () => {
  const response = await api.get('/api/gallery/stats');
  return response.data;
};

/**
 * Generate QR code
 */
export const generateQRCode = async (format = 'dataurl') => {
  const response = await api.get('/api/qr/generate', {
    params: { format },
  });
  return response.data;
};

/**
 * Get upload statistics
 */
export const getUploadStats = async () => {
  const response = await api.get('/api/upload/stats');
  return response.data;
};

export default api;
