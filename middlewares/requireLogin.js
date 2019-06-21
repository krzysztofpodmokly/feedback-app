module.exports = (req, res, next) => {
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in!' })
    }
    next(); // if everything is ok, user is logged in, go to the next middleware
}