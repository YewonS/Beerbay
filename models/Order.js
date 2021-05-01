const { Model } = require('objection');
const path = require("path");
const OrderItem = require('./OrderItem.js');
const User = require('./User.js');
const OrderStatus = require('./OrderStatus.js');

class Order extends Model {
    static tableName = 'order';

    static relationMappings = {
        order_item: {
            relation: Model.HasManyRelation,
            modelClass: OrderItem,
            join: {
                from: 'order.id',
                to: 'order_item.order'
            }
        },
        order_status: {
            relation: Model.BelongsToOneRelation,
            modelClass: OrderStatus,
            join: {
                from: 'order.status',
                to: 'order_status.id'
            }
        }
    }
}

module.exports = Order;