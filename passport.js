const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const GOOGLE_CLIENT_ID="58800646258-eq8uhldgmpvhvenfd73cuu12o95b9brc.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET="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";

const FACEBOOK_AP_ID="521812843229560";
const FACEBOOK_AP_SECRET="8b1b0ce94c78f66bb5d72a535b1548ea";

const passport = require("passport");

let CLIENT_URL;
if (process.env.NODE_ENV === "production") {
  CLIENT_URL = 'https://parkovka.in.ua';
} else {
  CLIENT_URL = 'http://localhost:5000'; 
}

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `/auth/google/callback`
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile)
  }
));


passport.use(new FacebookStrategy({
  clientID: FACEBOOK_AP_ID,
  clientSecret: FACEBOOK_AP_SECRET,
  callbackURL: `/auth/facebook/callback`
},
function(accessToken, refreshToken, profile, done) {
  done(null, profile)
}
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});