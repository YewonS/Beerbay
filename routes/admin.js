const router = require('express').Router();

const Beer = require('../models/Beer.js');
const PriceHistory = require('../models/PriceHistory.js');
const Order = require('../models/Order.js');

const authorised = (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('/login');
    } else {
        next();
    }00
}

router.get('/admin/beer', authorised, async (req, res) => {
    return res.render('./admin/beerAdmin.ejs', { sessionAdmin: req.session.admin, sessionUser: req.session.user, sessionShop: req.session.shop });
});

router.get('/admin/price', authorised, async (req, res) => {
    return res.render('./admin/priceAdmin.ejs', { sessionAdmin: req.session.admin, sessionUser: req.session.user, sessionShop: req.session.shop });
});

router.get('/admin/order', authorised, async (req, res) => {
    return res.render('./admin/orderAdmin.ejs', { sessionAdmin: req.session.admin, sessionUser: req.session.user, sessionShop: req.session.shop });
});


/* admin apis */

router.get('/api/admin/beers', authorised, async (req, res) => {
    const shopID = req.session.shop;
    const beers = await Beer.query().select('beer.*', 'stock.*').where({ 'stock.shop': shopID }).join('stock', 'beer.id', '=', 'stock.beer');
    if (beers.length > 0) {
        return res.send({ response: beers });
    } else {
        return res.status(400).send({ response: "No beer of the shop found." });
    }
});

router.get('/api/admin/prices', authorised, async (req, res) => {
    const shopID = req.session.shop;
    const priceList = await PriceHistory.query().select('beer.beername', 'price_history.*').where({ 'price_history.shop': shopID }).join('beer', 'price_history.beer', '=', 'beer.id');
    if (priceList.length > 0) {
        return res.send({ response: priceList });
    } else {
        return res.status(400).send({ response: "No price history of the shop found." });
    }
});

router.get('/api/admin/orders', authorised, async (req, res) => {
    const shopID = req.session.shop;
    const orderList = await Order.query()
        .join('user', 'user.id', '=', 'order.user')
        .join('order_status', 'order_status.id', '=', 'order.status')
        .join('order_item', 'order_item.order', '=', 'order.id')
        .join('price_history', 'price_history.id', '=', 'order_item.price_history')
        .join('beer', 'beer.id', '=', 'price_history.beer')
        .select('order.*', 'order_status.name as orderStatus', 'order_item.amount', 'price_history.price', 'price_history.start_date', 'beer.beername', 'user.name')
        .where({ 'price_history.shop': shopID })
        .orderBy('order.id', 'desc');
    
    if (orderList.length > 0) {
        console.log('backend data', orderList)
        return res.send({ response: orderList });
    } else {
        return res.status(400).send({ response: "No price history of the shop found." });
    }
});


module.exports = router;