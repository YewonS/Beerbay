
exports.seed = function(knex) {

  //We delete the developer emails so we can keep using them for testing
  
  return knex('user').where({email: "danilaalbertthefirst@gmail.com"}).del()
    .then(() => {
      return knex('user').where({email: "fuckoff@maxc.in"}).del();
    }).then(() => {
      return knex('user').where({email: "maillard.theo@gmail.com"}).del();
    });
};
