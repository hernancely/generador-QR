const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');

/**
 * Gallery Routes
 */

// Get all files with pagination
router.get('/files', galleryController.getFiles);

// Get file by ID
router.get('/files/:fileId', galleryController.getFileById);

// Delete file
router.delete('/files/:fileId', galleryController.deleteFile);

// Get gallery statistics
router.get('/stats', galleryController.getStats);

module.exports = router;
