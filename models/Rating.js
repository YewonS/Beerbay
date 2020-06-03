const { Model } = require('objection');

const User = require('./User.js');
const Beer = require('./Beer.js');

class Rating extends Model {
    static tableName = 'ratings';

    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'ratings.userId',
                to: 'users.id'
            }
        },
        beer: {
            relation: Model.BelongsToOneRelation,
            modelClass: Beer,
            join: {
                from: 'ratings.beerId',
                to: 'beers.id'
            }
        }
    }

}

module.exports = Rating;