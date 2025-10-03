const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { authenticateToken, requireOwnership } = require('../middleware/auth');
const { catchAsync, AppError } = require('../middleware/errorHandler');

const router = express.Router();

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(error => ({
        field: error.path,
        message: error.msg
      }))
    });
  }
  next();
};

/**
 * @route   GET /api/users/profile
 * @desc    Get current user's profile
 * @access  Private
 */
router.get('/profile', 
  authenticateToken,
  catchAsync(async (req, res) => {
    res.json({
      success: true,
      data: {
        user: req.user.toJSON()
      }
    });
  })
);

/**
 * @route   PUT /api/users/profile
 * @desc    Update current user's profile
 * @access  Private
 */
router.put('/profile',
  authenticateToken,
  [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    body('dateOfBirth')
      .optional()
      .isISO8601()
      .withMessage('Date of birth must be a valid date')
      .custom((value) => {
        if (value && new Date(value) >= new Date()) {
          throw new Error('Date of birth must be in the past');
        }
        return true;
      })
  ],
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const { name, dateOfBirth } = req.body;
    const user = req.user;

    // Update allowed fields
    if (name !== undefined) user.name = name;
    if (dateOfBirth !== undefined) user.dateOfBirth = new Date(dateOfBirth);

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: user.toJSON()
      }
    });
  })
);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID (public profile)
 * @access  Public
 */
router.get('/:id',
  catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id);
    
    if (!user || !user.isActive) {
      throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    }

    // Return only public information
    const publicProfile = {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      createdAt: user.createdAt
    };

    res.json({
      success: true,
      data: {
        user: publicProfile
      }
    });
  })
);

/**
 * @route   DELETE /api/users/account
 * @desc    Deactivate user account
 * @access  Private
 */
router.delete('/account',
  authenticateToken,
  catchAsync(async (req, res) => {
    const user = req.user;

    // Deactivate account instead of deleting
    user.isActive = false;
    await user.removeAllRefreshTokens();
    await user.save();

    res.json({
      success: true,
      message: 'Account deactivated successfully'
    });
  })
);

/**
 * @route   POST /api/users/reactivate
 * @desc    Reactivate user account
 * @access  Public
 */
router.post('/reactivate',
  [
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
  ],
  handleValidationErrors,
  catchAsync(async (req, res) => {
    const { email, password } = req.body;

    // Find deactivated user
    const user = await User.findOne({ email, isActive: false }).select('+password');
    
    if (!user) {
      throw new AppError('No deactivated account found with this email', 404, 'USER_NOT_FOUND');
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AppError('Invalid password', 401, 'INVALID_PASSWORD');
    }

    // Reactivate account
    user.isActive = true;
    user.lastLoginAt = new Date();
    await user.save();

    res.json({
      success: true,
      message: 'Account reactivated successfully'
    });
  })
);

/**
 * @route   GET /api/users/oauth/providers
 * @desc    Get user's connected OAuth providers
 * @access  Private
 */
router.get('/oauth/providers',
  authenticateToken,
  catchAsync(async (req, res) => {
    const user = req.user;

    res.json({
      success: true,
      data: {
        providers: user.oauthProviders.map(provider => ({
          provider: provider.provider,
          connectedAt: provider.connectedAt
        }))
      }
    });
  })
);

/**
 * @route   DELETE /api/users/oauth/:provider
 * @desc    Disconnect OAuth provider
 * @access  Private
 */
router.delete('/oauth/:provider',
  authenticateToken,
  catchAsync(async (req, res) => {
    const { provider } = req.params;
    const user = req.user;

    // Check if provider is valid
    const validProviders = ['google', 'facebook', 'github'];
    if (!validProviders.includes(provider)) {
      throw new AppError('Invalid OAuth provider', 400, 'INVALID_PROVIDER');
    }

    // Check if user has password set (can't disconnect all OAuth if no password)
    if (!user.password && user.oauthProviders.length === 1) {
      throw new AppError('Cannot disconnect last authentication method. Please set a password first.', 400, 'LAST_AUTH_METHOD');
    }

    // Remove OAuth provider
    await user.removeOAuthProvider(provider);

    res.json({
      success: true,
      message: `${provider.charAt(0).toUpperCase() + provider.slice(1)} account disconnected successfully`
    });
  })
);

/**
 * @route   GET /api/users/stats
 * @desc    Get user statistics (for admin/analytics)
 * @access  Private (Admin only - would need role-based auth)
 */
router.get('/stats',
  authenticateToken,
  // requireRoles(['admin']), // Uncomment when roles are implemented
  catchAsync(async (req, res) => {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const verifiedUsers = await User.countDocuments({ isEmailVerified: true });
    const oauthUsers = await User.countDocuments({ 
      oauthProviders: { $exists: true, $not: { $size: 0 } }
    });

    // Users registered in the last 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentUsers = await User.countDocuments({ 
      createdAt: { $gte: thirtyDaysAgo }
    });

    res.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          activeUsers,
          verifiedUsers,
          oauthUsers,
          recentUsers,
          inactiveUsers: totalUsers - activeUsers,
          unverifiedUsers: totalUsers - verifiedUsers
        }
      }
    });
  })
);

module.exports = router;