const router = require('express').Router();
const passport = require('passport');
const { User } = require('../db');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = router;

// Google authentication and login (GET /auth/google)
router.get('/', passport.authenticate('google', { scope: 'email' }));

// handles the callback after Google has authenticated the user (GET /auth/google/callback)
router.get(
  '/callback',
  passport.authenticate('google', {
    successRedirect: '/home', // or wherever
    failureRedirect: '/', // or wherever
  })
);

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  },
  // Google will send back the token and profile
  async (token, refreshToken, profile, done) => {
    // the callback will pass back user profile information and each service (Facebook, Twitter, and Google) will pass it back a different way. Passport standardizes the information that comes back in its profile object.
    const info = {
      email: profile.emails[0].value,
      imageUrl: profile.photos ? profile.photos[0].value : undefined,
    };
    try {
      const [user] = await User.findOrCreate({
        where: { googleId: profile.id },
        defaults: info,
      });
      done(null, user);
    } catch (err) {
      done(err);
    }
  }
);

passport.use(googleStrategy);
