const router = require('express').Router();

const User = require('../models/User.js');

const goToLoginPage = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
}

router.get('/api/order-item', goToLoginPage,  async (req, res) => {
    const username = req.session.user;
    const orders = await User.query()
        .join('order', 'user.id', '=', 'order.user')
        .join('order_status', 'order.status', '=', 'order_status.id')
        .join('order_item', 'order.id', '=', 'order_item.order')
        .join('price_history', 'order_item.price_history', '=', 'price_history.id')
        .join('shop', 'price_history.shop', '=', 'shop.id')
        .join('beer', 'price_history.beer', '=', 'beer.id')
        .join('category', 'beer.category', '=', 'category.id')
        .select('shop.name ', 'beer.beername', 'category.name as BeerType', 'price_history.price', 'order_item.amount', 'order_status.name as status', 'order.id as OrderID')
        .where('user.name', '=', username)
        .orderBy('order.id', 'desc');
        
    if (orders.length > 0) {
        return res.send({ response: orders });
    } else {
        return res.status(400).send({ response: "Cannot find orders of the requested user." });
    }
})



module.exports = router;