const { Model } = require('objection');

const Collection = require('./Collection.js');

class Bar extends Model {
    static tableName = 'bars';

    static relationMappings = {
        collection: {
            relation: Model.HasManyRelation,
            modelClass: Collection,
            join: {
                from: 'bars.id',
                to: 'collections.barId'
            }

        }
    }

}

module.exports = Bar;