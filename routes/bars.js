const router = require('express').Router();

const Bar = require('../models/Bar.js');

router.get('/api/bars', async (req, res) => {
    const bars = await Bar.query().select();
    return res.send({ response: bars });
});

router.get('/api/bars/name/:name', async (req, res) => {
    const name = req.params.name;
    const barFound = await Bar.query().select().where({ 'name': name }).limit(1);
    if (barFound.length > 0) {
        return res.send({ response: barFound });
    } else {
        return res.status(400).send({ response: "No bar of the name found." });
    }

});


module.exports = router;