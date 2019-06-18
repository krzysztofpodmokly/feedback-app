// keys.js figure out what set of credentials to return
if (process.env.NODE_ENV === 'production') { // Heroku will automatically assign NODE_ENV as 'production'
    // we are in production - return the prod set of keys
    module.exports = require('./prod');
} else {
    // we are in development - return dev keys! - set up for local machine
    module.exports = require('./dev');
}
