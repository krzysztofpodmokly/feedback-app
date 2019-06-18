const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout(); // logout() is a function attached by passport and it takes a cookie
        // that contains user's id and it kills the id which is inside
        res.send(req.user);
    });

    // req => incoming request
    // res => outgoing response
    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
        // res.send(req.session); // cookie-session library extracts data out of the cookie and then assigns it to req.session 
        // Passport pull all of the data it needs from req.session and passes that data to deserializeUser
    });
}