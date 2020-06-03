const router = require('express').Router();

const Collection = require('../models/Collection.js');

router.get('/collections/beer/:id', async(req, res) => {
    const beerID = req.params.id;
    const collections = await Collection.query().select().where({ 'beerId': beerID });
    if (collections.length > 0) {
        return res.send({ response: collections });
    } else {
        return res.status(400).send({ response: "No collections of the beer found." });
    }

})

router.get('/collections/bar/:id', async(req, res) => {
    const barID = req.params.id;
    const collections = await Collection.query().select().where({ 'barId': barID });
    if (collections.length > 0) {
        return res.send({ response: collections });
    } else {
        res.status(400).send({ response: "No collection of the bar found." });
    }

})

module.exports = router;