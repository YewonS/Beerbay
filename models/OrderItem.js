const { Model } = require('objection');

const PriceHistory = require('./PriceHistory.js');
const Order = require('./Order.js')

class OrderItem extends Model {
    static tableName = 'order_item';

    static relationMappings = {
        price_history: {
            relation: Model.HasManyRelation,
            ModelClass: PriceHistory,
            join: {
                from: 'order_item.price_history',
                to: 'price_history.id'
            }
        },
        order: {
            relation: Model.HasManyRelation,
            ModelClass: Order,
            join: {
                from: 'order_item.order',
                to: 'order.id'
            }
        }
    }
}

module.exports = OrderItem;