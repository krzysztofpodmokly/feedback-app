const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');

const app = express();

// Nothing is returned from passport.js so there is no need to assign it to variable
// This file is only meant to be executed
// const passportConfig = require('./services/passport');
require('./models/User'); // order matters => we are using model class in ./services/passport
require('./services/passport'); // so we must first load model to be able to use it there

mongoose
    .connect(keys.mongoURI, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to database')
    })
    .catch(err => {
        console.log('Database error', err)
    })

// body-parser package must be used whenever we are making POST/PATCH requests to the server
app.use(bodyParser.json())

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
billingRoutes(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets
    // like our main.js file or main.css file
    app.use(express.static('client/build'));

    // Express will serve up the index.html file
    // if it doesn't recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Listening from ${PORT}`);
});