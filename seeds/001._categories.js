
exports.seed = function(knex) {
 
  return knex('categories').insert([

    { id: 1, category: "ale" },
    { id: 2, category: "brown ale" },
    { id: 3, category: "cider" },
    { id: 4, category: "dark lager" },
    { id: 5, category: "hefeweizen" },
    { id: 6, category: "ipa" },
    { id: 7, category: "ipa" },
    { id: 8, category: "lager" },
    { id: 9, category: "organicc" },
    { id: 10, category: "pale ale" },
    { id: 11, category: "pilsner" },
    { id: 12, category: "red ale" },
    { id: 13, category: "seasonal brews" },
    { id: 14, category: "stout" },
    { id: 15, category: "wheat beer" },
    { id: 16, category: "alcohol-free" }

  ]);

};
