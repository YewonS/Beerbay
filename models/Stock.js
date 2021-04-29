const { Model } = require('objection');

const Beer = require('./Beer.js');
const Shop = require('./Shop.js');
const PriceHistory = require('./PriceHistory.js');

class Stock extends Model {
    static tableName = 'stock';

    static relationMappings = {
        beer: {
            relation: Model.BelongsToOneRelation,
            modelClass: Beer,
            join: {
                from: 'stock.beer',
                to: 'beer.id'
            }
        },
        shop: {
            relation: Model.BelongsToOneRelation,
            modelClass: Shop,
            join: {
                from: 'stock.shop',
                to: 'shop.id'
            }
        },
        price_history: {
            relation: Model.HasManyRelation,
            modelClass: PriceHistory,
            join: {
                from: [
                    'stock.shop',
                    'stock.beer'
                ],
                to: [
                    'price_history.shop',
                    'price_history.beer'
                ]
            }
        }
    }
}

module.exports = Stock;