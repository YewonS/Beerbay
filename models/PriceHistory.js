const { Model } = require('objection');

const Stock = require('./Stock.js');

class PriceHistory extends Model {
    static tableName = 'price_history';

    static relationMappings = {
        stock: {
            relation: Model.BelongsToOneRelation,
            modelClass: Stock,
            join: {
                from: [
                    'price_history.shop',
                    'price_history.beer'
                ],
                to: [
                    'stock.shop',
                    'stock.beer'
                ]
            }
        },
        order_item: {
            relation: Model.HasManyRelation,
            modelClass: OrderItem,
            join: {
                from: 'price_history.id',
                to: 'order_item.price_history'
            }
        }
    }
}

module.exports = PriceHistory;