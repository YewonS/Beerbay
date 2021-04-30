const { Model } = require('objection');

const Beer = require('./Beer.js');

class Category extends Model {
    static tableName = 'category';

    static relationMappings = {
        beer: {
            relation: Model.HasManyRelation,
            modelClass: Beer,
            join: {
                from: 'category.id',
                to: 'beers.categoryId'
            }

        }
    }

}

module.exports = Category;