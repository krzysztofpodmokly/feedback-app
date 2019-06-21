const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    app.post('/api/stripe', requireLogin, async (req, res) => {
        // if (!req.user) {
        //     // checking if the user is logged in
        //     return res
        //             .status(401) // setting status 401 which means unathorized user
        //             .send({ error: 'You must log in'}); 
        // }

        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id,
        });
        // Passport allows us to access current user model (who is logged in) with req.user
        req.user.credits += 5; // adding 5$ to user model
        const user = await req.user.save(); // saving user to database
        
        res.send(user);
    });
}