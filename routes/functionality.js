const router = require('express').Router();


const Rating = require('../models/Rating.js');

/* Add html files */

const fs = require('fs');
const header = fs.readFileSync("./views/global/header.html", "utf8");
const navbarHome = fs.readFileSync("./views/global/navbarHome.html", "utf8");
const footer = fs.readFileSync("./views/global/footer.html", "utf8");
const chat = fs.readFileSync("./views/global/chat.html", "utf8");
const searchBeers = fs.readFileSync("./views/functionality/search-beers.html", "utf8");
const searchBars = fs.readFileSync("./views/functionality/search-bars.html", "utf8");
const rating = fs.readFileSync("./views/functionality/rating.html", "utf8");


const goToLoginPage = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

router.get('/search-beers', goToLoginPage, (req, res) => {
    return res.send(header + navbarHome + searchBeers + chat + footer);
    // return res.render('./functionality/search-beers.ejs', { sessionUser: req.session.user });
});

router.get('/search-bars', goToLoginPage, (req, res) => {
    return res.send(header + navbarHome + searchBars + chat + footer);
    // return res.render('./functionality/search-bars.ejs', { sessionUser: req.session.user });
});

router.get('/search-bars:barId', goToLoginPage, (req, res) => {
    return res.send(header + navbarHome + searchBars + chat + footer);
    //return res.render('./functionality/search-bars.ejs', { sessionUser: req.session.user });
});

router.get('/rating', goToLoginPage, (req, res) => {
    return res.send(header + navbarHome + rating + chat + footer);
    //return res.render('./functionality/rating.ejs', { sessionUser: req.session.user });
});

router.post('/add-rating', goToLoginPage, async (req, res) => {

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

});


module.exports = router;