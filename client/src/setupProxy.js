// There is no need to import this file anywhere, 
// CRA looks for a file by this name and loads it.

const proxy = require('http-proxy-middleware');
 
// define some sort of proxy if anybody tries to visit the route /api or /auth/google
// on our React server automatically forward the request to http://localhost:5000
module.exports = function(app) {
    app.use(proxy(['/api', '/auth/google'], { target: 'http://localhost:5000' }));
}