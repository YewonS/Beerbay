
exports.seed = function(knex) {
 
  return knex('users').insert([
    { username: "admin", email: "yewo0003@stud.kea.dk", password: "$2b$12$.D3JZK2yaa8ayLjlNNkccec2hNqCowvZx17c6reqCEhXAtGRTBtrO" }, 
    { username: "user1", email: "yewonblairseo@gmail.com", password: "$2b$12$D/JBPzPg23t8Aky3LY6B8.B/EFKdMgY1nWam5/cW0tEFgTfM2Ts.y" }
  ]);

};
