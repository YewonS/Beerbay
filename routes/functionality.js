const router = require('express').Router();

const credentials = require('../config/apiConfig.js');
const gmapsApiKey = credentials.gmapsApiKey;

const Review = require('../models/Review.js');

const goToLoginPage = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

router.get('/search-beers', goToLoginPage, (req, res) => {
    return res.render('./functionality/search-beers.ejs', { sessionUser: req.session.user });
});

router.get('/search-bars', goToLoginPage, (req, res) => {
    return res.render('./functionality/search-bars.ejs', { gMapsApiKey: gmapsApiKey, sessionUser: req.session.user });
});

router.get('/show-collections:id', goToLoginPage, (req, res) => {
    return res.render('./functionality/show-collections.ejs', { sessionUser: req.session.user });
});

router.get('/cart', goToLoginPage, (req, res) => {
    return res.render('./functionality/cart.ejs', {sessionUser: req.session.user});
});

router.get('/order-history', goToLoginPage, (req, res) => {
    return res.render('./functionality/order-history.ejs', {sessionUser: req.session.user});
});


router.get('/rating', goToLoginPage, (req, res) => {
    return res.render('./functionality/rating.ejs', { sessionUser: req.session.user });
});

router.post('/add-rating', goToLoginPage, async (req, res) => {

    console.log('req.body', req.body)

    const { user, beer, rating } = req.body;

    if (user && beer && rating) {

        const createReview = await Review.query().insert({
            beer: beer,
            rating: rating,
            user: user
        });

        return res.send(createReview);

    } else {
        return res.send({});
    }

});

router.get('/chat', goToLoginPage, (req, res) => {
    return res.render('./functionality/chat.ejs', { sessionUser: req.session.user });
});


module.exports = router;