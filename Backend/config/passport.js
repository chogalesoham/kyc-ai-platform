const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const jwtService = require('../utils/jwt');

// Serialize user for session
passport.serializeUser((user, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// JWT Strategy for API authentication
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  issuer: 'kyc-platform',
  audience: 'kyc-users'
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.userId);
    if (user && user.isActive && !user.isLocked) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

// Google OAuth Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/auth/oauth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      const name = profile.displayName || profile.name?.givenName || 'Google User';
      const googleId = profile.id;
      const avatar = profile.photos && profile.photos[0] ? profile.photos[0].value : null;

      // Check if user exists with this Google ID
      let user = await User.findByOAuth('google', googleId);
      
      if (user) {
        // User exists, update last login
        user.lastLoginAt = new Date();
        await user.save();
        return done(null, user);
      }

      // Check if user exists with this email (only if email is available)
      if (email) {
        user = await User.findByEmail(email);
        
        if (user) {
          // User exists with email, link Google account
          await user.addOAuthProvider('google', googleId);
          user.lastLoginAt = new Date();
          if (!user.avatar && avatar) {
            user.avatar = avatar;
          }
          await user.save();
          return done(null, user);
        }
      }

      // Create new user
      user = new User({
        name,
        email: email || `google_${googleId}@google.local`, // Use Google ID if no email
        avatar,
        isEmailVerified: email ? true : false, // Only verified if we got real email
        oauthProviders: [{
          provider: 'google',
          providerId: googleId,
          connectedAt: new Date()
        }],
        lastLoginAt: new Date()
      });

      await user.save();
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

// Facebook OAuth Strategy
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:5000/api/auth/oauth/facebook/callback',
    profileFields: ['id', 'emails', 'name', 'picture.type(large)']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const name = `${profile.name.givenName} ${profile.name.familyName}`;
      const facebookId = profile.id;
      const avatar = profile.photos[0]?.value;

      // Check if user exists with this Facebook ID
      let user = await User.findByOAuth('facebook', facebookId);
      
      if (user) {
        // User exists, update last login
        user.lastLoginAt = new Date();
        await user.save();
        return done(null, user);
      }

      // Check if user exists with this email
      user = await User.findByEmail(email);
      
      if (user) {
        // User exists with email, link Facebook account
        await user.addOAuthProvider('facebook', facebookId);
        user.lastLoginAt = new Date();
        if (!user.avatar && avatar) {
          user.avatar = avatar;
        }
        await user.save();
        return done(null, user);
      }

      // Create new user
      user = new User({
        name,
        email,
        avatar,
        isEmailVerified: true, // Facebook emails are verified
        oauthProviders: [{
          provider: 'facebook',
          providerId: facebookId,
          connectedAt: new Date()
        }],
        lastLoginAt: new Date()
      });

      await user.save();
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

// GitHub OAuth Strategy
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/auth/oauth/github/callback',
    scope: ['user:email'] // Request email access
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // GitHub might not provide email if user's email is private
      const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
      const name = profile.displayName || profile.username || profile.login;
      const githubId = profile.id;
      const avatar = profile.photos && profile.photos[0] ? profile.photos[0].value : null;

      // Check if user exists with this GitHub ID
      let user = await User.findByOAuth('github', githubId);
      
      if (user) {
        // User exists, update last login
        user.lastLoginAt = new Date();
        await user.save();
        return done(null, user);
      }

      // If no email provided, we can't link to existing user by email
      if (email) {
        // Check if user exists with this email
        user = await User.findByEmail(email);
        
        if (user) {
          // User exists with email, link GitHub account
          await user.addOAuthProvider('github', githubId);
          user.lastLoginAt = new Date();
          if (!user.avatar && avatar) {
            user.avatar = avatar;
          }
          await user.save();
          return done(null, user);
        }
      }

      // Create new user
      // For GitHub users without email, use GitHub username as identifier
      const userData = {
        name,
        email: email || `${profile.login}@github.local`, // Use GitHub username if no email
        avatar,
        isEmailVerified: email ? true : false, // Only verified if we got real email from GitHub
        oauthProviders: [{
          provider: 'github',
          providerId: githubId,
          connectedAt: new Date()
        }],
        lastLoginAt: new Date()
      };

      user = new User(userData);

      await user.save();
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

module.exports = passport;