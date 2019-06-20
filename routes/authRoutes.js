const passport = require('passport');

module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));
    
    app.get(
        '/auth/google/callback',
        passport.authenticate('google'), // after user successfully authenticates 
        (req, res) => { // this function will be fired
            res.redirect('/surveys'); // user will be redirected to /surveys
        }
    );

    app.get('/api/logout', (req, res) => {
        req.logout(); // logout() is a function attached by passport and it takes a cookie
        // that contains user's id and it kills the id which is inside
        res.redirect('/');
    });

    // req => incoming request
    // res => outgoing response
    // This route will be responsible for comunicating backend with frontend
    // in React action creator will be created which will make ajax request to this route
    // and the result will be saved in state
    app.get('/api/current_user', (req, res) => {
        res.send(req.user); // this route responds with a model of a user which is currently logged in
        // res.send(req.session); // cookie-session library extracts data out of the cookie and then assigns it to req.session 
        // Passport pull all of the data it needs from req.session and passes that data to deserializeUser
    });
}