const jwt = require('jsonwebtoken');
const crypto = require('crypto');

class JWTService {
  constructor() {
    this.accessTokenSecret = process.env.JWT_SECRET;
    this.refreshTokenSecret = process.env.JWT_REFRESH_SECRET;
    this.accessTokenExpiry = process.env.JWT_EXPIRES_IN || '15m';
    this.refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRES_IN || '30d';

    if (!this.accessTokenSecret || !this.refreshTokenSecret) {
      throw new Error('JWT secrets must be defined in environment variables');
    }
  }

  /**
   * Generate access token
   * @param {Object} payload - Token payload
   * @returns {String} JWT token
   */
  generateAccessToken(payload) {
    return jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: this.accessTokenExpiry,
      issuer: 'kyc-platform',
      audience: 'kyc-users'
    });
  }

  /**
   * Generate refresh token
   * @param {Object} payload - Token payload
   * @returns {String} JWT refresh token
   */
  generateRefreshToken(payload) {
    return jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: this.refreshTokenExpiry,
      issuer: 'kyc-platform',
      audience: 'kyc-users'
    });
  }

  /**
   * Generate both access and refresh tokens
   * @param {Object} user - User object
   * @returns {Object} Token pair
   */
  generateTokenPair(user) {
    const payload = {
      userId: user._id || user.id,
      email: user.email,
      name: user.name
    };

    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: this.accessTokenExpiry
    };
  }

  /**
   * Verify access token
   * @param {String} token - JWT token
   * @returns {Object} Decoded payload
   */
  verifyAccessToken(token) {
    try {
      return jwt.verify(token, this.accessTokenSecret, {
        issuer: 'kyc-platform',
        audience: 'kyc-users'
      });
    } catch (error) {
      throw new Error('Invalid or expired access token');
    }
  }

  /**
   * Verify refresh token
   * @param {String} token - JWT refresh token
   * @returns {Object} Decoded payload
   */
  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, this.refreshTokenSecret, {
        issuer: 'kyc-platform',
        audience: 'kyc-users'
      });
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }

  /**
   * Extract token from Authorization header
   * @param {String} authHeader - Authorization header
   * @returns {String|null} Token or null
   */
  extractTokenFromHeader(authHeader) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.substring(7);
  }

  /**
   * Decode token without verification (for expired token handling)
   * @param {String} token - JWT token
   * @returns {Object} Decoded payload
   */
  decodeToken(token) {
    try {
      return jwt.decode(token);
    } catch (error) {
      throw new Error('Invalid token format');
    }
  }

  /**
   * Generate secure random token for email verification, password reset, etc.
   * @param {Number} length - Token length (default 32)
   * @returns {String} Random hex token
   */
  generateSecureToken(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * Check if token is expired
   * @param {Object} decoded - Decoded token payload
   * @returns {Boolean} True if expired
   */
  isTokenExpired(decoded) {
    if (!decoded.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  }

  /**
   * Get token expiration time
   * @param {Object} decoded - Decoded token payload
   * @returns {Date} Expiration date
   */
  getTokenExpiration(decoded) {
    if (!decoded.exp) return null;
    return new Date(decoded.exp * 1000);
  }

  /**
   * Create token blacklist entry (for logout)
   * @param {String} token - Token to blacklist
   * @param {Object} decoded - Decoded token payload
   * @returns {Object} Blacklist entry
   */
  createBlacklistEntry(token, decoded) {
    return {
      token: crypto.createHash('sha256').update(token).digest('hex'),
      expiresAt: this.getTokenExpiration(decoded) || new Date(Date.now() + 24 * 60 * 60 * 1000)
    };
  }
}

// Create singleton instance
const jwtService = new JWTService();

module.exports = jwtService;