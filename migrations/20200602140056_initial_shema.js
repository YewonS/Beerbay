exports.up = function(knex) {
  
    return knex.schema
        .createTable('categories', (table) => {
            table.integer('id').unique().notNullable();
            table.string('category').unique().notNullable();
        })
        .createTable('beers', (table) => {
            table.integer('id').unique().notNullable();
            table.string('beername').notNullable();
            table.string('brewery');
            table.string('country');
            table.double('abv');
            table.string('picture');
            
            table.integer('category_id').notNullable();
            table.foreign('category_id').references('categories.id');
        })
        .createTable('users', (table) => {
            table.increments('id').notNullable();
            table.string('username').unique().notNullable();
            table.string('email').unique().notNullable();
            table.string('password').notNullable();
            
            table.dateTime('updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
            table.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        })
        .createTable('ratings', (table) => {
            table.increments('id').notNullable();
            table.integer('ratings');

            table.integer('beer_id').notNullable();
            table.foreign('beer_id').references('beers.id');

            table.integer('user_id').unsigned().notNullable();
            table.foreign('user_id').references('users.id');
        })
        .createTable('bars', (table) => {
            table.increments('id').notNullable();
            table.string('name').notNullable();
            table.string('address').notNullable();
            table.double('latitude').notNullable();
            table.double('longitude').notNullable();
        })
        .createTable('collections', (table) => {
            table.increments('id').notNullable();
            
            table.integer('beer_id').notNullable();
            table.foreign('beer_id').references('beers.id');

            table.integer('bar_id').unsigned().notNullable();
            table.foreign('bar_id').references('bars.id');
        });

};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('collections')
        .dropTableIfExists('bars')
        .dropTableIfExists('ratings')
        .dropTableIfExists('users')
        .dropTableIfExists('beers')
        .dropTableIfExists('categories');
};
      