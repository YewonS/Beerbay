const router = require('express').Router();

const credentials = require('../config/apiConfig.js');
const gmapsApiKey = credentials.gmapsApiKey

const Rating = require('../models/Rating.js');

const goToLoginPage = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

router.get('/search-beers', goToLoginPage, (req, res) => {
    return res.render('./functionality/search-beers.ejs', { sessionUser: req.session.user });
})

router.get('/search-bars', goToLoginPage,(req, res) => {
    return res.render('./functionality/search-bars.ejs', { gMapsApiKey : gmapsApiKey, sessionUser: req.session.user });
})

router.get('/search-bars:barId', goToLoginPage, (req, res) => {
    return res.render('./functionality/search-bars.ejs',{gMapsApiKey : gmapsApiKey, sessionUser: req.session.user});
})

router.get('/rating', goToLoginPage, (req, res) => {
    return res.render('./functionality/rating.ejs', { sessionUser: req.session.user });
})

router.post('/add-rating', goToLoginPage, async(req, res) => { 

    const { userID, beerID, rating } = req.body;
    console.log(userID, beerID, rating);

    if (userID && beerID && rating) {

        const createRating = await Rating.query().insert({
            ratings: rating,
            beerId: beerID,
            userId: userID
        });

        return res.send(createRating);

    } else { 
        return res.send({});
    }


})

router.get('/chat', goToLoginPage, (req, res) => {
    return res.render('./functionality/chat.ejs', { sessionUser: req.session.user });
})


module.exports = router;