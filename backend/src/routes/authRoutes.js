const express = require('express');
const router = express.Router();
const googleDriveConfig = require('../config/googleDrive');

/**
 * Authentication Routes for Google OAuth
 * These routes help you get the initial refresh token
 */

// Get OAuth URL
router.get('/google/url', (req, res) => {
  try {
    const authUrl = googleDriveConfig.generateAuthUrl();
    res.status(200).json({
      success: true,
      authUrl: authUrl,
      message: 'Visit this URL to authorize the application'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// OAuth callback - exchange code for tokens
router.get('/google/callback', async (req, res) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        success: false,
        error: 'Authorization code is required'
      });
    }

    const tokens = await googleDriveConfig.getTokenFromCode(code);

    res.status(200).json({
      success: true,
      tokens: tokens,
      message: 'Add the refresh_token to your .env file as GOOGLE_REFRESH_TOKEN'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
