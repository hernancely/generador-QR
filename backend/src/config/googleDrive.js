const { google } = require('googleapis');
require('dotenv').config();

/**
 * Google Drive Configuration
 * Configures OAuth2 client for Google Drive API access
 */
class GoogleDriveConfig {
  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );

    // Set credentials if refresh token is available
    if (process.env.GOOGLE_REFRESH_TOKEN) {
      this.oauth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_REFRESH_TOKEN
      });
    }

    this.drive = google.drive({ version: 'v3', auth: this.oauth2Client });
  }

  /**
   * Get OAuth2 client instance
   */
  getAuth() {
    return this.oauth2Client;
  }

  /**
   * Get Google Drive API instance
   */
  getDrive() {
    return this.drive;
  }

  /**
   * Generate OAuth URL for getting refresh token
   */
  generateAuthUrl() {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.readonly'
      ],
      prompt: 'consent'
    });
  }

  /**
   * Exchange authorization code for tokens
   */
  async getTokenFromCode(code) {
    const { tokens } = await this.oauth2Client.getToken(code);
    return tokens;
  }
}

module.exports = new GoogleDriveConfig();
