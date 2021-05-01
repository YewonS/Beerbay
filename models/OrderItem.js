const { Model } = require('objection');

const PriceHistory = require('./PriceHistory.js');
const Order = require('./Order.js')

class OrderItem extends Model {
    static tableName = 'order_item';

    static relationMappings = {
    }
}

module.exports = OrderItem;