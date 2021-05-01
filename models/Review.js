const { Model } = require('objection');

const User = require('./User.js');
const Beer = require('./Beer.js');

class Review extends Model {
    static tableName = 'review';

}

module.exports = Review;