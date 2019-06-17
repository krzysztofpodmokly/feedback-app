const express = require('express');

// Nothing is returned from passport.js so there is no need to assign it to variable
// This file is only meant to be executed
// const passportConfig = require('./services/passport');
require('./services/passport');

const authRoutes = require('./routes/authRoutes');

const app = express();
authRoutes(app);

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log(`Listening from ${PORT}`);
});