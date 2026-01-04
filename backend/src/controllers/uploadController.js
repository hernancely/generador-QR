const googleDriveService = require('../services/googleDriveService');

/**
 * Upload Controller
 * Handles file upload operations
 */
class UploadController {
  /**
   * Upload single or multiple files
   */
  async uploadFiles(req, res, next) {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          error: 'No files provided'
        });
      }

      // Prepare files for Google Drive upload
      const files = req.files.map(file => ({
        buffer: file.buffer,
        name: file.originalname,
        mimeType: file.mimetype
      }));

      // Upload to Google Drive
      const uploadedFiles = await googleDriveService.uploadMultipleFiles(files);

      res.status(200).json({
        success: true,
        message: `Successfully uploaded ${uploadedFiles.length} file(s)`,
        files: uploadedFiles
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get upload statistics
   */
  async getUploadStats(req, res, next) {
    try {
      const stats = await googleDriveService.getStorageInfo();

      res.status(200).json({
        success: true,
        stats: stats
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UploadController();
