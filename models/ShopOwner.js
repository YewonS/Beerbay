const { Model } = require('objection');

const User = require('./User.js');
const Shop = require('./Shop.js');

class ShopOwner extends Model {
    static tableName = 'shop_owner';

    static relationMappings = {
        user: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'shop_owner.user',
                to: 'user.id'
            }
        },
        shop: {
            relation: Model.BelongsToOneRelation,
            modelClass: Shop,
            join: {
                from: 'shop_owner.shop',
                to: 'shop.id'
            }
        }
    }

}

module.exports = ShopOwner;