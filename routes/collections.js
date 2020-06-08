const router = require('express').Router();

const Collection = require('../models/Collection.js');


// find all bars that has specific beer - with the bar name and address
router.get('/api/collections/beer/:id', async(req, res) => {
    const beerID = req.params.id;
    const collections = await Collection.query().select('collections.bar_id', 'bars.name', 'bars.address', 'collections.beer_id', 'beers.beername')
                        .where({ 'beerId': beerID })
                        .join('beers', 'collections.beer_id', '=', 'beers.id').join('bars', 'collections.bar_id', '=', 'bars.id');
    if (collections.length > 0) {
        return res.send({ response: collections });
    } else {
        return res.status(400).send({ response: "No collections of the beer found." });
    }

})


// find all the collections a bar has - with beer names!!
router.get('/api/collections/bar/:id', async(req, res) => {
    const barID = req.params.id;
    const collections = await Collection.query().select('collections.bar_id', 'bars.name', 'collections.beer_id', 'beers.*')
                        .where({ 'barId': barID })
                        .join('beers', 'collections.beer_id', '=', 'beers.id').join('bars', 'collections.bar_id', '=', 'bars.id');
    if (collections.length > 0) {
        return res.send({ response: collections });
    } else {
        res.status(400).send({ response: "No collection of the bar found." });
    }

})

// get all bars with all collections
router.get('/api/bars/collections', async(req, res) => {
    const collections = await Collection.query().select('bars.*', 'bars.id as bar_id', 'beers.*', 'beers.id as beer_id')
                        .join('beers', 'collections.beer_id', '=', 'beers.id').join('bars', 'collections.bar_id', '=', 'bars.id');
    if (collections.length > 0) {
        return res.send({ response: collections });
    } else {
        res.status(400).send({ response: "No collection of the bar found." });
    }

})







module.exports = router;