const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

// Nothing is returned from passport.js so there is no need to assign it to variable
// This file is only meant to be executed
// const passportConfig = require('./services/passport');
require('./models/User'); // order matters => we are using model class in ./services/passport
require('./services/passport'); // so we must first load model to be able to use it there

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const authRoutes = require('./routes/authRoutes');

const app = express();

// ! middlewares are functions which are initialized before route handlers
// middlewares can be also instructed to look at single, individual request aswell

// creating a cookie
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // = 30 days cookie expiration time
        keys: [keys.cookieKey] // setting random characters to protect cookie
    })
);

// Using cookies to manage our authentication
app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
// require('./routes/authRoutes')(app) => alternative way

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening from ${PORT}`);
});