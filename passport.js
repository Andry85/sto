const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const GOOGLE_CLIENT_ID = "58800646258-eq8uhldgmpvhvenfd73cuu12o95b9brc.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"]
  },
  function(accessToken, refreshToken, profile, callback) {
    callback(null, profile);
  }
));

passport.serializeUser((user, callback)=> {
  callback(null, user);
});

passport.deserializeUser((user, callback)=> {
  callback(null, user);
});