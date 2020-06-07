const router = require('express').Router();


router.get('/search-beers', (req, res) => {
    return res.render('./functionality/search-beers.ejs');
})

router.get('/search-bars', (req, res) => {
    return res.render('./functionality/search-bars.ejs');
})

router.get('/rating', (req, res) => {
    return res.render('./functionality/rating.ejs');
})


module.exports = router;