const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');

/**
 * QR Code Routes
 */

// Generate QR code
router.get('/generate', qrController.generateQRCode);

// Generate styled QR code
router.post('/generate/styled', qrController.generateStyledQRCode);

// List all QR codes
router.get('/list', qrController.listQRCodes);

// Download QR code
router.get('/download/:fileName', qrController.downloadQRCode);

// Delete QR code
router.delete('/:fileName', qrController.deleteQRCode);

module.exports = router;
