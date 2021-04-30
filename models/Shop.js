const { Model } = require('objection');

const Stock = require('./Stock.js');

class Shop extends Model {
    static tableName = 'shop';

    static relationMappings = {
        stock: {
        relation: Model.HasManyRelation,
            modelClass: Stock,
            join:{
                from: 'shop.id',
                to: 'stock.shop'
            }
        }
    }
}

module.exports = Shop;