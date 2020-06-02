
exports.up = function(knex) {
  
    return knex.shema
        .createTable('categories', (table) => {
            table.integer('id').unique().notNullable();
            table.string('category').unique().notNullable();
        })
        .createTable('beers', (table) => {
            table.increments('id').notNullable();
            table.string('beername').notNullable();
            table.string('brewery');
            table.string('country');
            table.double('abv');
            table.string('picture');
            
            table.integer('category_id').unsign().notNullable();
            table.foreign('category_id').refences('categories.id');
        })
        .createTable('ratings', (table) => {
            table.increments('id').notNullable();
            table.integer('ratings');

            table.integer('beer_id').unsigned().notNullable();
            table.foreign('beer_id').refences('beers.id');

            table.integer('user_id').unsigned().notNullable();
            table.foreign('user_id').refences('users.id');
        })
        .createTable('users', (table) => {
            table.increments('id').notNullable();
            table.string('username').unique().notNullable();
            table.string('email').unique().notNullable();
            table.string('password').notNullable();

            table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
            table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        })
        .createTable('bars', (table) => {
            table.increments('id').notNullable();
            table.string('name').notNullable();
            table.string('address').notNullable();
        })
        .createTable('collections', (table) => {
            table.increments('id').notNullable();
            
            table.integer('beer_id').unsigned().notNullable();
            table.foreign('beer_id').refences('beers.id');

            table.integer('bar_id').unsigned().notNullable();
            table.foreign('bar_id').refences('bars.id');
        });

};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('collections')
        .dropTableIfExists('bars')
        .dropTableIfExists('users')
        .dropTableIfExists('ratings')
        .dropTableIfExists('beers')
        .dropTableIfExists('categories');
};
      