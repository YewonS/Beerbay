const router = require('express').Router();

const OrderItem = require('../models/OrderItem.js');

router.get('/api/order-item', async (req, res) => {
    const orders = await OrderItem.query();
    return res.send({ Response: orders});
});

router.get('/api/order-item/:user', async (req, res) => {
    const username = req.params.user;
    const orders = await OrderItem.query()
        .join('order', 'order_item.order', '=', 'order.id')
        .join('user', 'order.user', '=', 'user.id')
        .join('order_status', 'order.status', '=', 'order_status.id')
        .join('price_history', 'order_item.price_history', '=', 'price_history.id')
        .join('stock', 'price_history.shop', '=', 'stock.shop')
        .join('shop', 'stock.shop', '=', 'shop.id')
        .join('beer', 'stock.beer', '=', 'beer.id')
        .join('category', 'beer.category', '=', 'category.id')
        .select('shop.name ', 'beer.beername', 'category.name as BeerType', 'price_history.price', 'order_item.amount', 'order_status.name as status', 'order.id as OrderID')
        .where('user.name', '=', username);

    return res.send({ response: orders});
})



module.exports = router;