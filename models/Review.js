const { Model } = require('objection');

const User = require('./User.js');
const Beer = require('./Beer.js');

class Review extends Model {
    static tableName = 'review';

    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'review.userId',
                to: 'users.id'
            }
        },
        beer: {
            relation: Model.BelongsToOneRelation,
            modelClass: Beer,
            join: {
                from: 'review.beerId',
                to: 'beers.id'
            }
        }
    }

}

module.exports = Review;