const router = require('express').Router();

const Shop = require('../models/Shop.js');

router.get('/api/shops', async (req, res) => {
    const shop = await Shop.query().select();
    return res.send({ response: shop });
});

router.get('/api/shops/name/:name', async (req, res) => {
    const name = req.params.name;
    const shopsFound = await Shop.query().select().where({ 'name': name }).limit(1);
    if (shopsFound.length > 0) {
        return res.send({ response: shopsFound });
    } else {
        return res.status(400).send({ response: "No shop of the name found." });
    }

});


module.exports = router;