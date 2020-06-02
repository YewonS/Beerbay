
exports.seed = function(knex) {
 
  return knex('collections').insert([
    { beer_id: 1, bar_id: 1 },
    { beer_id: 1, bar_id: 2 },
    { beer_id: 2, bar_id: 1 },
    { beer_id: 2, bar_id: 2 },
    { beer_id: 3, bar_id: 1 },
    { beer_id: 4, bar_id: 2 },
    { beer_id: 5, bar_id: 1 },
    { beer_id: 5, bar_id: 2 },
    { beer_id: 7, bar_id: 1 },
    { beer_id: 8, bar_id: 2 },

  ]);

};
