const router = require('express').Router();

const Review = require('../models/Review.js');

router.get('/api/reviews', async (req, res) => {
    const allReviews = await Review.query().select();
    if(allReviews.length > 0) {
        return res.send({ response: allReviews });
    } else {
        return res.status(400).send({ response: "No reviews in the system yet." });
    }
});

router.get('/api/reviews/beerid/:id', async (req, res) => {
    const id = req.params.id;
    const ratingFound = await Review.query().select('review.*', 'beer.*', 'user.name')
        .where({ 'beer': id })
        .join('beer', 'review.beer', '=', 'beer.id')
        .join('user', 'review.user', '=', 'user.id');
    if (ratingFound.length > 0) {
        return res.send({ response: ratingFound });
    } else {
        return res.status(400).send({ response: "No ratings of the beer id found." });
    }

});


module.exports = router;
