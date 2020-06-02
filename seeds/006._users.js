
exports.seed = function(knex) {
 
  return knex('table_name').insert([
    { username: "admin", email: "yewo0003@stud.kea.dk", password: "" }, 
    { username: "user1", email: "yewonblairseo@gmail.com", password: "" }
  ]);

};
