exports.up = function(knex) {
  
    return knex.schema
        .createTable('category', (table) => {
            table.increments('id').unique().primary();
            table.string('name');
        })
        .createTable('beer', (table) => {
            table.increments('id').unique().primary();
            table.string('beername');
            table.double('abv');            
            table.integer('category');
            table.foreign('category').references('category.id');
        })
        .createTable('order_status', (table) => {
            table.increments('id').unique().primary();
            table.string('name');
        })
        .createTable('shop', (table) => {
            table.increments('id').unique().primary();
            table.string('name').notNullable();
            table.string('address').notNullable();
        })
        .createTable('stock', (table) => {
            table.integer('shop').notNullable();
            table.foreign('shop').references('shop.id');

            table.integer('beer').notNullable();
            table.foreign('beer').references('beer.id');

            table.integer('amount').notNullable();

            table.primary(['shop', 'beer']);
        })
        .createTable('price_history', (table) => {
            table.increments('id').unique().primary();
            table.integer('beer');
            table.foreign('beer').references('stock.beer');

            table.integer('shop');
            table.foreign('shop').references('stock.shop');

            table.integer('price');
            table.dateTime('start_date').defaultTo(knex.raw('CURRENT_TIMESTAMP'));
        })
        .createTable('user', (table) => {
            table.increments('id').unique().primary();
            table.string('name');
            table.string('email').unique().notNullable();
            table.string('password').notNullable();            
        })
        .createTable('order', (table) => {
            table.increments('id').unique().primary();
            table.integer('status');
            table.foreign('status').references('order_status.id');

            table.integer('user');
            table.foreign('user').references('user.id');
        })
        .createTable('order_item', (table) => {
            table.integer('order').notNullable();
            table.foreign('order').references('order.id');

            table.integer('price_history').notNullable();
            table.foreign('price_history').references('price_history.id');

            table.integer('amount').notNullable();

            table.primary(['order', 'price_history']);
        })
        .createTable('review', (table) => {
            table.increments('id').unique().primary();

            table.integer('beer').notNullable();
            table.foreign('beer').references('beer.id');
            
            table.integer('rating');

            table.integer('user');
            table.foreign('user').references('user.id');
        })
        .createTable('shop_owner', (table) => {
            table.increments('id').unique.primary();

            table.integer('user');
            table.foreign('user').references('user.id');

            table.integer('shop');
            table.foreign('shop').references('shop.id');
        });
        

};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('review')
        .dropTableIfExists('order_item')
        .dropTableIfExists('order')
        .dropTableIfExists('shop_owner')
        .dropTableIfExists('user')
        .dropTableIfExists('price_history')
        .dropTableIfExists('stock')
        .dropTableIfExists('shop')
        .dropTableIfExists('order_status')
        .dropTableIfExists('beer')
        .dropTableIfExists('category');
};
      