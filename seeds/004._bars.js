
exports.seed = function(knex) {
 
  return knex('bar').insert([
    { name: "bar37", address: "Lygten 37" },
    { name: "moonbar", address: "Lygten 16" }
  ]);

};
