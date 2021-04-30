const { Model } = require('objection');

const Category = require('./Category.js');
const Review = require('./Review.js');
const Stock = require('./Stock.js');

class Beer extends Model {
    static tableName = 'beer';

    static relationMappings = {
        category: {
            relation: Model.BelongsToOneRelation,
            modelClass: Category,
            join: {
                from: 'beer.category',
                to: 'category.id'
            }
        },
        review: {
            relation: Model.HasManyRelation,
            modelClass: Review,
            join: {
                from: 'beer.id',
                to: 'review.beer'
            }
        },
        stock: {
            relation: Model.HasManyRelation,
            modelClass: Stock,
            join: {
                from: 'beer.id',
                to: 'stock.beer'
            }
        }

    }

}

module.exports = Beer;