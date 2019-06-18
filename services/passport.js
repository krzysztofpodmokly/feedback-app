const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users'); // Giving a single argument to model() pulls out whole model
// 1 argument means we want to fetch something from mongoose
// 2 arguments mean we want to load something into it

// user passed as an argument is the user pulled out of the database
// .serializeUser function is used to give a user some identifying token 
// that proves that this is the expected user (verified one)
passport.serializeUser((user, done) => {
    done(null, user._id); // null indicates that there are no errors
    // user._id is and id given by mongoDB (_id) this is not a profile.id
});

// serializeUser => turning user model to id
// deserializeUser => turning id to user model

passport.deserializeUser((id, done) => {
    User
        .findById(id)
        .then(user => {
            done(null, user);
        })
});

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
        User.findOne({ googleId: profile.id }) // query returns a promise
            .then(existingUser => {
                // if no User has a googleId of profile.id then existingUser = null
                if (existingUser) {
                    // we already have a record with the given profle id
                    done(null, existingUser); // null indicates that everything went fine
                } else {
                    // we don't have a user record with this ID, mae a new record
                    new User({ googleId: profile.id }) // New Instance of the User is created...
                        .save() // ... and saved to the database
                        .then(user => done(null, user)); // saving a user is asynchronous function that's why .then must be chained
                }
            })
        
    })
);