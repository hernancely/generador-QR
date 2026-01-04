const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const upload = require('../middleware/upload');

/**
 * Upload Routes
 */

// Upload files (single or multiple)
router.post(
  '/',
  upload.array('files', parseInt(process.env.MAX_FILES_PER_UPLOAD) || 10),
  uploadController.uploadFiles
);

// Get upload statistics
router.get('/stats', uploadController.getUploadStats);

module.exports = router;
