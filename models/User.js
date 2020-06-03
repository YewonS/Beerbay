const { Model } = require('objection');

const Rating = require('./Rating.js');

class User extends Model {
    static tableName = 'users';

    static relationMappings = {
        rating: {
            relation: Model.HasManyRelation,
            modelClass: Rating,
            join: {
                from: 'users.id',
                to: 'ratings.userId'
            }

        }
    }

}

module.exports = User;