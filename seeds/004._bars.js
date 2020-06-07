
exports.seed = function(knex) {
 
  return knex('bars').insert([
    { name: "bar37", address: "lygten 37", latitude: 55.7037834, longitude: 12.5375609 },
    { name: "moonbar", address: "lygten 16", latitude: 55.7063710, longitude: 12.5391300 }
  ]);

};
