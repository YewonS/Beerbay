const router = require('express').Router();

const Stock = require('../models/Stock.js');


// find all shops that has specific beer - with the shop name and address
router.get('/api/stocks/beer/:id', async (req, res) => {
    const beerID = parseInt(req.params.id);
    const collections = await Stock.query().select('stock.amount', 'shop.id', 'shop.name', 'shop.address', 'beer.beername', 'price_history.price', 'price_history.start_date')
        .where({ 'price_history.beer': beerID})
        .where({ 'stock.beer': beerID})
        .where({ 'beer.id': beerID})
        .join('shop', 'stock.shop', '=', 'shop.id')
        .join('beer', 'stock.beer', '=', 'beer.id')
        .join('price_history', 'stock.shop', '=', 'price_history.shop')
        .orderBy('shop.name', 'asc')
        .orderBy('price_history.start_date', 'desc');
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

// find all shops that has specific beer - with the shop name and address
router.get('/api/stocks/beer-shop/:beerID/:shopID', async (req, res) => {
    const beerID = req.params.beerID;
    const shopID = req.params.shopID;
    const collections = await Stock.query().select('stock.*', 'shop.name', 'shop.address', 'beer.beername', 'beer.abv', 'beer.category')
        .where('beer.id', '=', beerID).andWhere({ 'shop': shopID })
        .join('shop', 'stock.shop', '=', 'shop.id').join('beer', 'stock.beer', '=', 'beer.id');
    if (collections.length > 0) {
        return res.send({ response: collections[0] });
    } else {
        return res.status(400).send({ response: "No collections of the beer found." });
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