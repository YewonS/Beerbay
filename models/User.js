const { Model } = require('objection');

const Review = require('./Review.js');
const Order = require('./Order.js');

class User extends Model {
    static tableName = 'user';

    static relationMappings = {
        review: {
            relation: Model.HasManyRelation,
            modelClass: Review,
            join: {
                from: 'user.id',
                to: 'review.user'
            }

        },
        order: {
            relation: Model.HasManyRelation,
            modelClass: Order,
            join: {
                from: 'user.id',
                to: 'order.user'
            }
        }
    }

}

module.exports = User;