
exports.seed = function(knex) {
 
  return knex('ratings').insert([
    { ratings: 5, beer_id: 2, user_id: 2 }
  ]);

};
