const express = require('express');
const passport = require('passport');
const jwtService = require('../utils/jwt');

const router = express.Router();

/**
 * OAuth Success Handler
 * Generates JWT tokens and redirects to frontend with tokens
 */
const handleOAuthSuccess = async (req, res) => {
  try {
    const user = req.user;
    
    if (!user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
    }

    // Generate tokens
    const tokens = jwtService.generateTokenPair(user);

    // Add refresh token to user
    await user.addRefreshToken(tokens.refreshToken);

    // Set refresh token as httpOnly cookie
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    // Redirect to frontend with access token
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    const redirectUrl = `${frontendUrl}/auth/callback?token=${encodeURIComponent(tokens.accessToken)}&success=true`;
    
    res.redirect(redirectUrl);
  } catch (error) {
    console.error('OAuth success handler error:', error);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/login?error=oauth_error`);
  }
};

/**
 * OAuth Error Handler
 */
const handleOAuthError = (req, res) => {
  console.error('OAuth error:', req.query.error);
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  res.redirect(`${frontendUrl}/login?error=oauth_failed`);
};

// Google OAuth Routes
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/api/auth/oauth/error',
    session: false
  }),
  handleOAuthSuccess
);

// Facebook OAuth Routes
router.get('/facebook',
  passport.authenticate('facebook', {
    scope: ['email']
  })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/api/auth/oauth/error',
    session: false
  }),
  handleOAuthSuccess
);

// GitHub OAuth Routes
router.get('/github',
  passport.authenticate('github', {
    scope: ['user:email']
  })
);

router.get('/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api/auth/oauth/error',
    session: false
  }),
  handleOAuthSuccess
);

// OAuth Error Route
router.get('/error', handleOAuthError);

/**
 * @route   GET /api/auth/oauth/providers
 * @desc    Get available OAuth providers
 * @access  Public
 */
router.get('/providers', (req, res) => {
  const providers = [];

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push({
      name: 'google',
      displayName: 'Google',
      authUrl: '/api/auth/oauth/google'
    });
  }

  if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    providers.push({
      name: 'facebook',
      displayName: 'Facebook',
      authUrl: '/api/auth/oauth/facebook'
    });
  }

  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    providers.push({
      name: 'github',
      displayName: 'GitHub',
      authUrl: '/api/auth/oauth/github'
    });
  }

  res.json({
    success: true,
    data: {
      providers,
      totalProviders: providers.length
    }
  });
});

module.exports = router;