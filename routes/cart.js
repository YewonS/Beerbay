const router = require('express').Router();
const Order = require('../models/Order.js');
const Stock = require('../models/Stock.js');
const OrderItem = require('../models/OrderItem.js');
const User = require('../models/User.js');

router.get('/api/cart', async (req, res) => {
    req.session.cart = req.session.cart ? req.session.cart : {};
    let items = []
    for (i in req.session.cart) {
        let [shopID, beerID] = i.split(':');
        try {
            const beerBar = await Stock.query().select('stock.*', 'shop.name', 'shop.address', 'beer.beername', 'beer.abv', 'beer.picture', 'beer.category')
                .where('beer.id', '=', beerID).andWhere({ 'shop': shopID })
                .join('shop', 'stock.shop', '=', 'shop.id').join('beer', 'stock.beer', '=', 'beer.id');
            if (beerBar.length == 0) {
                throw new Error("item not found")
            }
            items.push({ beerBar:beerBar[0], amount: req.session.cart[i] });
        } catch (error) {
            console.log(error)
            delete req.session.cart[i]
        }
    }
    return res.send({ response: items });
})
router.post('/api/cart', async (req, res) => {
    req.session.cart = req.session.cart ? req.session.cart : {};
    let shopID = req.body.shopID;
    let beerID = req.body.beerID;
    let amount = req.body.amount;
    req.session.cart[`${shopID}:${beerID}`] = amount;
    console.log(req.session.cart)
    return res.send({ response: "ok" });
})
router.delete('/api/cart/:beerID/:shopID', async (req, res) => {
    delete req.session.cart[`${req.params.shopID}:${req.params.beerID}`];
    return res.send({ response: "ok" });
})
class PrintableError extends Error{

}
router.post('/api/cart/create-order', async (req, res) => {
    Stock.transaction(async trx => {
        try {
            for(i in req.session.cart) {
                let amount =  req.session.cart[i];
                let user = await User.query(trx).select('id').where({name:req.session.user}).first()
                let order = await Order.query(trx).insert({
                    user:user.id,
                    status:1
                })
                let [shopID, beerID] = i.split(':');
                let stock = await Stock.query(trx).select('stock.amount','price_history.id')
                    .where('stock.beer', '=', beerID).andWhere({ 'stock.shop': shopID })
                    .join('price_history', {'price_history.beer': 'stock.beer','price_history.shop': 'stock.shop'}).orderBy('price_history.start_date', 'desc')
                console.log(stock)
                if(stock[0].amount < amount){
                    throw new PrintableError("not in stock")
                }
                await OrderItem.query(trx).insert({
                    order:order.id,
                    price_history:stock[0].id,
                    amount
                })
            }
        } catch (error) {
            console.log(error)
            trx.rollback();
            if(error instanceof PrintableError){
                res.send({response:error.message})
            }else{
                res.send({response:"error"})
            }
        }

    });
    delete req.session.cart[`${req.params.shopID}:${req.params.beerID}`];
    return res.send({ response: "ok" });
})
module.exports = router;