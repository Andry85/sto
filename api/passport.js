const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

const GOOGLE_CLIENT_ID = "58800646258-eq8uhldgmpvhvenfd73cuu12o95b9brc.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile);

    // const user = {
    //     username: profile.displayName,
    //     avatar: profile.photos[0]
    // }
  }
));

passport.serializeUser((user, done)=> {
    done(null, user);
});

passport.deserializeUser((user, done)=> {
    done(null, user);
});