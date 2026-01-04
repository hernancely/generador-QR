const googleDriveService = require('../services/googleDriveService');

/**
 * Gallery Controller
 * Handles gallery operations (list files, get file details)
 */
class GalleryController {
  /**
   * Get all files in the gallery with pagination
   */
  async getFiles(req, res, next) {
    try {
      const pageSize = parseInt(req.query.pageSize) || 50;
      const pageToken = req.query.pageToken || null;

      const result = await googleDriveService.listFiles(pageSize, pageToken);

      res.status(200).json({
        success: true,
        files: result.files,
        nextPageToken: result.nextPageToken,
        hasMore: !!result.nextPageToken
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get file metadata by ID
   */
  async getFileById(req, res, next) {
    try {
      const { fileId } = req.params;

      if (!fileId) {
        return res.status(400).json({
          success: false,
          error: 'File ID is required'
        });
      }

      const file = await googleDriveService.getFileMetadata(fileId);

      res.status(200).json({
        success: true,
        file: file
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a file from the gallery
   */
  async deleteFile(req, res, next) {
    try {
      const { fileId } = req.params;

      if (!fileId) {
        return res.status(400).json({
          success: false,
          error: 'File ID is required'
        });
      }

      const result = await googleDriveService.deleteFile(fileId);

      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get gallery statistics
   */
  async getStats(req, res, next) {
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

module.exports = new GalleryController();
