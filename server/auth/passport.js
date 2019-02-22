const passport = require('passport');
const { User } = require('../db');

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    if (user) done(null, user);
  } catch (err) {
    done(err);
  }
});
