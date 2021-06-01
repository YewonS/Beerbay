const router = require('express').Router();

const Beer = require('../models/Beer.js');
const { route } = require('./images.js');

router.get('/api/beers', async (req, res) => {
    const beers = await Beer.query().select('beer.*', 'category.name').join('category', 'beer.category', '=', 'category.id');
    return res.send({ response: beers });
});

router.get('/api/beers/:id', async (req, res) => {
    const beerID = req.params.id;
    const beerName = await Beer.query().select('beername').where({ 'id': beerID });
    if (beerName.length > 0) {
        return res.send({ response: beerName});
    } else {
        return res.status(400).send({ response: "No beername of the id found. " });
    }
})

router.get('/api/beers/category/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
    const beersInCategory = await Beer.query().select('beer.*', 'category.name').where({ 'category': categoryId })
        .join('category', 'beer.category', '=', 'category.id');
    if (beersInCategory.length > 0) {
        return res.send({ response: beersInCategory });
    } else {
        return res.status(400).send({ response: "No beer in the requested category has found." });
    }

});

router.get('/api/beers/name/:beername', async (req, res) => {
    const beername = req.params.beername;
    const beerFound = await Beer.query().select('beer.*', 'category.name').where({ 'beername': beername })
        .join('category', 'beer.category', '=', 'category.id').limit(1);
    if (beerFound.length > 0) {
        return res.send({ response: beerFound });
    } else {
        return res.status(400).send({ response: "No beer of the name has found." });
    }
});

router.get('/api/beername/:beername/category/:category', async (req, res) => {
    const beername = req.params.beername;
    const category = req.params.category;

    const beersFound = await Beer.query().select('beer.*', 'category.name').where({ 'beername': beername, 'category': category })
        .join('category', 'beer.category', '=', 'category.id');

    if (beersFound.length > 0) {
        return res.send({ response: beersFound });
    } else {
        return res.status(400).send({ response: "No beers of the options found." });
    }

});



module.exports = router;