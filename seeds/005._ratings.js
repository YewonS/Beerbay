
exports.seed = function(knex) {
 
  return knex('users').select().then(users => {
    return knex('ratings').insert([
      { ratings: 5, beer_id: 2, user_id: users.find(user => user.username === 'user1').id }
    ]);
  });

};
