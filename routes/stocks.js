const router = require('express').Router();

const Stock = require('../models/Stock.js');


// find all shops that has specific beer - with the shop name and address
router.get('/api/stocks/beer/:id', async (req, res) => {
    const beerID = req.params.id;
    const collections = await Stock.query().select('stock.*', 'shop.name', 'shop.address', 'beer.beername', 'beer.abv', 'beer.picture', 'beer.category')
        .where('beer.id', '=', beerID)
        .join('shop', 'stock.shop', '=', 'shop.id').join('beer', 'stock.beer', '=', 'beer.id');
    if (collections.length > 0) {
        return res.send({ response: collections });
    } else {
        return res.status(400).send({ response: "No collections of the beer found." });
    }

});


// find all the collections a shop has - with beer names!!
router.get('/api/stocks/shop/:id', async (req, res) => {
    const shopID = req.params.id;
    const collections = await Stock.query().select('shop.name', 'shop.address', 'stock.*', 'beer.*')
        .where({ 'shop': shopID })
        .join('beer', 'stock.beer', '=', 'beer.id')
        .join('shop', 'stock.shop', '=', 'shop.id');
    if (collections.length > 0) {
        return res.send({ response: collections });
    } else {
        res.status(400).send({ response: "No collection of the bar found." });
    }

});

// get all shops with all collections
router.get('/api/stocks', async (req, res) => {
    const collections = await Stock.query().select('shop.*', 'stock.*', 'beer.*')
        .join('shop', 'stock.shop', '=', 'shop.id').join('beer', 'stock.beer', '=', 'beer.id');
    if (collections.length > 0) {
        return res.send({ response: collections });
    } else {
        res.status(400).send({ response: "No collection found." });
    }

});







module.exports = router;