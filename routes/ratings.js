const router = require('express').Router();

const Rating = require('../models/Rating.js');

router.get('/ratings', async(req, res) => {
    const ratings = await Rating.query().select();
    return res.send({ response: ratings });
})

router.get('/ratings/beerid/:id', async(req, res)=> {
    const id = req.params.id;
    const ratingFound = await Rating.query().select().where({ 'beerId': id });
    if (ratingFound.length > 0) {
        return res.send({ response: ratingFound });
    } else {
        return res.status(400).send({ response: "No ratings of the beer id found."});
    }

})

router.get('/ratings/userid/:id', async(req, res) => {
    const id = req.params.id;
    const ratingFound = await Rating.query().select().where({ 'userId': id });
    if (ratingFound.length > 0) {
        return res.send({ response: ratingFound });
    } else {
        return res.status(400).send({ response: "No ratings of the user id found."});
    }

})


module.exports = router;
