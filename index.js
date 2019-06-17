const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();
const PORT = process.env.PORT || 3000;

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

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'));

app.listen(PORT, () => {
    console.log(`Listening from ${PORT}`);
});