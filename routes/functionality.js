const router = require('express').Router();

const credentials = require('../config/apiConfig.js');
const gmapsApiKey = credentials.gmapsApiKey


router.get('/search-beers', (req, res) => {
    return res.render('./functionality/search-beers.ejs');
})

router.get('/search-bars', (req, res) => {
    return res.render('./functionality/search-bars.ejs',{gMapsApiKey : gmapsApiKey});
})

router.get('/rating', (req, res) => {
    return res.render('./functionality/rating.ejs');
})


module.exports = router;