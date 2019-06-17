const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

// clientID and secret is comming from console.developers.google.com
// keys were outsourced to config/keys.js and added to .gitignore!
passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback' // after sign in, user will be redirected to this route
    }, 
    // callback is fired once permission from a user was granted
    (accessToken, refreshToken, profile, done) => {
        console.log('Access Token', accessToken);
        console.log('Refresh Token', refreshToken);
        console.log('profile', profile);
    })
);