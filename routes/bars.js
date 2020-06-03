const router = require('express').Router();

const Bar = require('../models/Bar.js');

router.get('/bars', async(req, res) => {
    const bars = await Bar.query().select();
    return res.send({ response: bars });
})

router.get('/bars/name/:name', async(req, res) => {
    const name = req.params.name;
    const barFound = await Bar.query().select().where({ 'name': name }).limit(1);
    if (barFound.length > 0) {
        return res.send({ response: barFound });
    } else {
        return res.status(400).send({ response: "No bar of the name found." });
    }

})

router.get('/bars/address/:address', async(req, res) => {
    const address = req.params.address;
    const barFound = await Bar.query().select().where({ 'address': address }).limit(1);
    if (barFound.length > 0) {
        return res.send({ response: barFound });
    } else {
        return res.status(400).send({ response: "No bar of the address found."});
    }

})


module.exports = router;