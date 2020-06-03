const { Model } = require('objection');

const Beer = require('./Beer.js');

class Category extends Model {
    static tablename = 'categories';

    static relationMappings = {
        beer: {
            relation: Model.HasManyRelation,
            modelClass: Beer,
            join: {
                from: 'categories.id',
                to: 'beers.categoryId'
            }

        }
    }

}

module.exports = Category;