const { Model } = require('objection');

const OrderItem = require('./OrderItem.js');
const User = require('./User.js');
const OrderStatus = require('./OrderStatus.js');

class Order extends Model {
    static tableName = 'order';

    static relationMappings = {
        order_item: {
            relation: Model.BelongsToOneRelation,
            ModelClass: OrderItem,
            join: {
                from: 'order.id',
                to: 'order_item.order'
            }
        },
        user: {
            relation: Model.HasManyRelation,
            ModelClass: User,
            join: {
                from: 'order.user',
                to: 'user.id'
            }
        },
        order_status: {
            relation: Model.HasManyRelation,
            ModelClass: OrderStatus,
            join: {
                from: 'order.status',
                to: 'order_status.id'
            }
        }
    }
}

module.exports = Order;