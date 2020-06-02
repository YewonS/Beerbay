
exports.seed = function(knex) {
  
  return knex('collections').del()
    .then(() => {
      return knex('bars').del();
    })
    .then(() => {
      return knex('users').del();
    })
    .then(() => {
      return knex('ratings').del();
    })
    .then(() => {
      return knex('beers').del();
    })
    .then(() => {
      return knex('categories').del();
    });

};
