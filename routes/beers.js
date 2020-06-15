const router = require('express').Router();

const Beer = require('../models/Beer.js');

router.get('/api/beers', async (req, res) => {
    const beers = await Beer.query().select('beers.*', 'categories.category').join('categories', 'beers.category_id', '=', 'categories.id');
    return res.send({ response: beers });
});

router.get('/api/beers/category/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
    const beersInCategory = await Beer.query().select('beers.*', 'categories.category').where({ 'categoryId': categoryId })
        .join('categories', 'beers.category_id', '=', 'categories.id');
    if (beersInCategory.length > 0) {
        return res.send({ response: beersInCategory });
    } else {
        return res.status(400).send({ response: "No beer in the requested category has found." });
    }

});

router.get('/api/beers/name/:beername', async (req, res) => {
    const beername = req.params.beername;
    const beerFound = await Beer.query().select('beers.*', 'categories.category').where({ 'beername': beername })
        .join('categories', 'beers.category_id', '=', 'categories.id').limit(1);
    if (beerFound.length > 0) {
        return res.send({ response: beerFound });
    } else {
        return res.status(400).send({ response: "No beer of the name has found." });
    }
});

router.get('/api/beername/:beername/category/:category', async (req, res) => {
    const beername = req.params.beername;
    const category = req.params.category;

    const beersFound = await Beer.query().select('beers.*', 'categories.category').where({ 'beername': beername, 'categoryId': category })
        .join('categories', 'beers.category_id', '=', 'categories.id').limit(1);

    if (beersFound.length > 0) {
        return res.send({ response: beersFound });
    } else {
        return res.status(400).send({ response: "No beers of the options found." });
    }

});



module.exports = router;