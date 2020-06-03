const { Model } = require('objection');

const Bar = require('./Bar.js');

class Collection extends Model {
    static tableName = 'collections';

    static relationMappings = {
        bar: {
            relation: Model.HasManyRelation,
            modelClass: Bar,
            join: {
                from: 'collections.barId',
                to: 'bars.id'
            }
        }

    }

}

module.exports = Collection;