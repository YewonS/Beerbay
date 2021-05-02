const { Model } = require('objection');


class OrderItem extends Model {
    static tableName = 'order_item';

    static relationMappings = {
    }
}

module.exports = OrderItem;