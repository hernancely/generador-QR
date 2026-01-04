const qrCodeService = require('../services/qrCodeService');
const path = require('path');

/**
 * QR Code Controller
 * Handles QR code generation operations
 */
class QRController {
  /**
   * Generate QR code for the application
   */
  async generateQRCode(req, res, next) {
    try {
      const appUrl = process.env.APP_URL || 'http://localhost:3000';
      const { format = 'file', darkColor, lightColor, width } = req.query;

      if (format === 'dataurl') {
        // Generate QR code as data URL
        const result = await qrCodeService.generateQRCodeDataURL(appUrl, {
          darkColor,
          lightColor,
          width: width ? parseInt(width) : undefined
        });

        res.status(200).json({
          success: true,
          dataURL: result.dataURL,
          url: result.url
        });
      } else {
        // Generate QR code as file
        const result = await qrCodeService.generateQRCode(appUrl, {
          darkColor,
          lightColor,
          width: width ? parseInt(width) : undefined
        });

        res.status(200).json({
          success: true,
          fileName: result.fileName,
          url: result.url,
          downloadUrl: `/api/qr/download/${result.fileName}`
        });
      }
    } catch (error) {
      next(error);
    }
  }

  /**
   * Generate styled QR code
   */
  async generateStyledQRCode(req, res, next) {
    try {
      const appUrl = process.env.APP_URL || 'http://localhost:3000';
      const { darkColor, lightColor, width } = req.body;

      const result = await qrCodeService.generateStyledQRCode(appUrl, {
        darkColor,
        lightColor,
        width: width ? parseInt(width) : undefined
      });

      res.status(200).json({
        success: true,
        fileName: result.fileName,
        url: result.url,
        downloadUrl: `/api/qr/download/${result.fileName}`
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * List all generated QR codes
   */
  async listQRCodes(req, res, next) {
    try {
      const qrCodes = await qrCodeService.listQRCodes();

      res.status(200).json({
        success: true,
        qrCodes: qrCodes
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Download QR code file
   */
  async downloadQRCode(req, res, next) {
    try {
      const { fileName } = req.params;
      const filePath = path.join(__dirname, '../../../qr-codes', fileName);

      res.download(filePath, fileName, (err) => {
        if (err) {
          next(err);
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete QR code
   */
  async deleteQRCode(req, res, next) {
    try {
      const { fileName } = req.params;
      const result = await qrCodeService.deleteQRCode(fileName);

      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new QRController();
