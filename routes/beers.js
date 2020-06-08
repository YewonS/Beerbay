const router = require('express').Router();

const Beer = require('../models/Beer.js');

router.get('/api/beers', async (req, res) => {
    const beers = await Beer.query().select();
    return res.send({ response: beers });
})

router.get('/api/beers/category/:categoryId', async(req, res) => {
    const categoryId = req.params.categoryId;
    const beersInCategory = await Beer.query().select().where({ 'categoryId': categoryId });
    if (beersInCategory.length > 0) {
        return res.send({ response: beersInCategory });
    } else {
        return res.status(400).send({ response: "No beer in the requested category has found." });
    }

})

router.get('/api/beers/name/:beername', async(req, res) => {
    const beername = req.params.beername;
    const beerFound = await Beer.query().select().where({ 'beername': beername }).limit(1);
    if (beerFound.length > 0) {
        return res.send({ response: beerFound });
    } else {
        return res.status(400).send({ response: "No beer of the name has found." });
    }
})

router.get('/api/beers/brewery/:brewery', async(req, res) => {
    const brewery = req.params.brewery;
    const breweryBeers = await Beer.query().select().where({ 'brewery': brewery });
    if (breweryBeers.length > 0) {
        return res.send({ response: breweryBeers });
    } else {
        return res.status(400).send({ response: "No beers of the brewery has found." });
    }

})



module.exports = router;