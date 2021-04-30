const router = require('express').Router();

const User = require('../models/User.js');

const goToLoginPage = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

router.get('/api/username/:username', goToLoginPage, async (req, res) => {
    const username = req.params.username;
    const userFound = await User.query().select('user.id').where({ 'name': username });
    if (userFound.length > 0) {
        return res.send({ response: userFound });
    } else {
        return res.status(400).send({ response: "User with the username not found." });
    }

});

router.get('/api/reviews/user/username/:username', goToLoginPage, async (req, res) => {
    const username = req.params.username;
    const userFound = await User.query().select('user.name', 'review.*', 'beer.*', 'category.name')
        .where({ 'user.name': username })
        .join('review', 'user.id', '=', 'review.user')
        .join('beer', 'review.beer', '=', 'beer.id')
        .join('category', 'beer.category', '=', 'category.id');
    if (userFound.length > 0) {
        return res.send({ response: userFound });
    } else {
        return res.status(400).send({ response: "User with the username not found." });
    }

});


module.exports = router;