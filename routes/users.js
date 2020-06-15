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
    const userFound = await User.query().select('users.id').where({ 'username': username });
    if (userFound.length > 0) {
        return res.send({ response: userFound });
    } else {
        return res.status(400).send({ response: "User with the username not found." });
    }

})

router.get('/api/ratings/user/username/:username', goToLoginPage, async(req, res) => {
    const username = req.params.username;
    const userFound = await User.query().select('users.username', 'ratings.*', 'beers.*', 'categories.category')
                        .where({ 'username': username })
                        .join('ratings', 'users.id', '=', 'ratings.user_id').join('beers', 'ratings.beer_id', '=', 'beers.id').join('categories', 'beers.category_id', '=', 'categories.id');
    if (userFound.length > 0) {
        return res.send({ response: userFound });
    } else {
        return res.status(400).send({ response: "User with the username not found." });
    }

})


module.exports = router;