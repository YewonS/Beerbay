const { Model } = require('objection');

const Category = require('./Category.js');
const Rating = require('./Rating.js');

class Beer extends Model {
    static tableName = 'beers';

    static relationMappings = {
        category: {
            relation: Model.BelongsToOneRelation,
            modelClass: Category,
            join: {
                from: 'beers.categoryId',
                to: 'categories.id'
            }
        },
        rating: {
            relation: Model.HasManyRelation,
            modelClass: Rating,
            join: {
                from: 'beers.id',
                to: 'ratings.beerId'
            }
        }

    }

}

module.exports = Beer;