const googleDriveConfig = require('../config/googleDrive');
const stream = require('stream');

/**
 * Google Drive Service
 * Handles all Google Drive operations (upload, list, download)
 */
class GoogleDriveService {
  constructor() {
    this.drive = googleDriveConfig.getDrive();
    this.folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  }

  /**
   * Upload a file to Google Drive
   * @param {Buffer} fileBuffer - File buffer
   * @param {string} fileName - Name of the file
   * @param {string} mimeType - MIME type of the file
   */
  async uploadFile(fileBuffer, fileName, mimeType) {
    try {
      const bufferStream = new stream.PassThrough();
      bufferStream.end(fileBuffer);

      const fileMetadata = {
        name: fileName,
        parents: [this.folderId]
      };

      const media = {
        mimeType: mimeType,
        body: bufferStream
      };

      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, name, mimeType, createdTime, size, webViewLink, thumbnailLink'
      });

      // Make file publicly readable
      await this.drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      });

      // Get the web content link for direct access
      const file = await this.drive.files.get({
        fileId: response.data.id,
        fields: 'id, name, mimeType, createdTime, size, webViewLink, webContentLink, thumbnailLink'
      });

      return file.data;
    } catch (error) {
      console.error('Error uploading file to Google Drive:', error);
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  /**
   * Upload multiple files to Google Drive
   * @param {Array} files - Array of file objects with buffer, name, and mimeType
   */
  async uploadMultipleFiles(files) {
    const uploadPromises = files.map(file =>
      this.uploadFile(file.buffer, file.name, file.mimeType)
    );

    try {
      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      console.error('Error uploading multiple files:', error);
      throw error;
    }
  }

  /**
   * List all files in the wedding folder
   * @param {number} pageSize - Number of files per page
   * @param {string} pageToken - Token for pagination
   */
  async listFiles(pageSize = 50, pageToken = null) {
    try {
      const params = {
        q: `'${this.folderId}' in parents and trashed=false`,
        fields: 'nextPageToken, files(id, name, mimeType, createdTime, size, webViewLink, webContentLink, thumbnailLink)',
        orderBy: 'createdTime desc',
        pageSize: pageSize
      };

      if (pageToken) {
        params.pageToken = pageToken;
      }

      const response = await this.drive.files.list(params);

      return {
        files: response.data.files,
        nextPageToken: response.data.nextPageToken
      };
    } catch (error) {
      console.error('Error listing files from Google Drive:', error);
      throw new Error(`Failed to list files: ${error.message}`);
    }
  }

  /**
   * Get file metadata by ID
   * @param {string} fileId - Google Drive file ID
   */
  async getFileMetadata(fileId) {
    try {
      const response = await this.drive.files.get({
        fileId: fileId,
        fields: 'id, name, mimeType, createdTime, size, webViewLink, webContentLink, thumbnailLink'
      });

      return response.data;
    } catch (error) {
      console.error('Error getting file metadata:', error);
      throw new Error(`Failed to get file metadata: ${error.message}`);
    }
  }

  /**
   * Delete a file from Google Drive
   * @param {string} fileId - Google Drive file ID
   */
  async deleteFile(fileId) {
    try {
      await this.drive.files.delete({
        fileId: fileId
      });

      return { success: true, message: 'File deleted successfully' };
    } catch (error) {
      console.error('Error deleting file:', error);
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  /**
   * Get storage info for the folder
   */
  async getStorageInfo() {
    try {
      const response = await this.listFiles(1000); // Get all files
      const files = response.files;

      const totalSize = files.reduce((acc, file) => {
        return acc + (parseInt(file.size) || 0);
      }, 0);

      const imageCount = files.filter(f => f.mimeType.startsWith('image/')).length;
      const videoCount = files.filter(f => f.mimeType.startsWith('video/')).length;

      return {
        totalFiles: files.length,
        totalSize: totalSize,
        imageCount: imageCount,
        videoCount: videoCount,
        totalSizeFormatted: this.formatBytes(totalSize)
      };
    } catch (error) {
      console.error('Error getting storage info:', error);
      throw new Error(`Failed to get storage info: ${error.message}`);
    }
  }

  /**
   * Format bytes to human-readable format
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
}

module.exports = new GoogleDriveService();
