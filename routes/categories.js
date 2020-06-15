const router = require('express').Router();

const Category = require('../models/Category.js');

router.get('/api/categories', async (req, res) => {
    const categories = await Category.query().select();
    return res.send({ response: categories });
});

router.get('/api/categories/:id', async (req, res) => {
    const id = req.params.id;
    const categoryFound = await Category.query().select('category').where({ 'id': id }).limit(1);
    if (categoryFound.length > 0) {
        return res.send({ response: categoryFound });
    } else {
        return res.status(400).send({ response: "Cannot find category of the requested id." });
    }
});

router.get('/api/categories/name/:categoryName', async (req, res) => {
    const categoryName = req.params.categoryName;
    const categoryFound = await Category.query().select('id').where({ 'category': categoryName }).limit(1);
    if (categoryFound.length > 0) {
        return res.send({ response: categoryFound });
    } else {
        return res.status(400).send({ response: "Cannot find category of the requested name." });
    }
});


module.exports = router;