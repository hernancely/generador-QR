const QRCode = require('qrcode');
const fs = require('fs').promises;
const path = require('path');

/**
 * QR Code Service
 * Generates QR codes for the wedding gallery application
 */
class QRCodeService {
  constructor() {
    this.qrCodesDir = path.join(__dirname, '../../../qr-codes');
  }

  /**
   * Generate QR code for the application URL
   * @param {string} url - URL to encode in QR code
   * @param {Object} options - QR code generation options
   */
  async generateQRCode(url, options = {}) {
    try {
      // Ensure QR codes directory exists
      await this.ensureDirectory();

      const defaultOptions = {
        errorCorrectionLevel: 'H', // High error correction
        type: 'image/png',
        quality: 0.95,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        width: 800,
        ...options
      };

      // Generate filename with timestamp
      const timestamp = Date.now();
      const fileName = `wedding-gallery-qr-${timestamp}.png`;
      const filePath = path.join(this.qrCodesDir, fileName);

      // Generate QR code and save to file
      await QRCode.toFile(filePath, url, defaultOptions);

      return {
        success: true,
        filePath: filePath,
        fileName: fileName,
        url: url
      };
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw new Error(`Failed to generate QR code: ${error.message}`);
    }
  }

  /**
   * Generate QR code as data URL (base64)
   * @param {string} url - URL to encode in QR code
   * @param {Object} options - QR code generation options
   */
  async generateQRCodeDataURL(url, options = {}) {
    try {
      const defaultOptions = {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        quality: 0.95,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        },
        width: 800,
        ...options
      };

      const dataURL = await QRCode.toDataURL(url, defaultOptions);

      return {
        success: true,
        dataURL: dataURL,
        url: url
      };
    } catch (error) {
      console.error('Error generating QR code data URL:', error);
      throw new Error(`Failed to generate QR code: ${error.message}`);
    }
  }

  /**
   * Generate QR code with custom styling (colored, with logo, etc.)
   * @param {string} url - URL to encode
   * @param {Object} customOptions - Custom styling options
   */
  async generateStyledQRCode(url, customOptions = {}) {
    try {
      await this.ensureDirectory();

      const options = {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        quality: 0.95,
        margin: 2,
        color: {
          dark: customOptions.darkColor || '#1a1a1a',
          light: customOptions.lightColor || '#ffffff'
        },
        width: customOptions.width || 1000,
        ...customOptions
      };

      const timestamp = Date.now();
      const fileName = `wedding-qr-styled-${timestamp}.png`;
      const filePath = path.join(this.qrCodesDir, fileName);

      await QRCode.toFile(filePath, url, options);

      return {
        success: true,
        filePath: filePath,
        fileName: fileName,
        url: url
      };
    } catch (error) {
      console.error('Error generating styled QR code:', error);
      throw new Error(`Failed to generate styled QR code: ${error.message}`);
    }
  }

  /**
   * Ensure QR codes directory exists
   */
  async ensureDirectory() {
    try {
      await fs.access(this.qrCodesDir);
    } catch (error) {
      // Directory doesn't exist, create it
      await fs.mkdir(this.qrCodesDir, { recursive: true });
    }
  }

  /**
   * List all generated QR codes
   */
  async listQRCodes() {
    try {
      await this.ensureDirectory();
      const files = await fs.readdir(this.qrCodesDir);
      const pngFiles = files.filter(file => file.endsWith('.png'));

      const fileDetails = await Promise.all(
        pngFiles.map(async (file) => {
          const filePath = path.join(this.qrCodesDir, file);
          const stats = await fs.stat(filePath);
          return {
            fileName: file,
            filePath: filePath,
            size: stats.size,
            createdAt: stats.birthtime
          };
        })
      );

      return fileDetails.sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
      console.error('Error listing QR codes:', error);
      throw new Error(`Failed to list QR codes: ${error.message}`);
    }
  }

  /**
   * Delete a QR code file
   * @param {string} fileName - Name of the file to delete
   */
  async deleteQRCode(fileName) {
    try {
      const filePath = path.join(this.qrCodesDir, fileName);
      await fs.unlink(filePath);
      return { success: true, message: 'QR code deleted successfully' };
    } catch (error) {
      console.error('Error deleting QR code:', error);
      throw new Error(`Failed to delete QR code: ${error.message}`);
    }
  }
}

module.exports = new QRCodeService();
