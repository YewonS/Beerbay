const { Model } = require('objection');

const Order = require('./Order.js');

class OrderStatus extends Model {
    static tableName = 'order_status';

    static relationMappings = {
        order: {
            relation: Model.HasManyRelation,
            ModelClass: Order,
            join: {
                from: 'order_status.id',
                to: 'order.status'
            }
        }
    }
}

module.exports = OrderStatus;