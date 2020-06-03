
exports.seed = function(knex) {
 
  return knex('categories').insert([

    { id: 1, category: "ale" },
    { id: 2, category: "brown ale" },
    { id: 3, category: "cider" },
    { id: 4, category: "dark lager" },
    { id: 5, category: "hefeweizen" },
    { id: 6, category: "ipa" },
    { id: 7, category: "lager" }, 
    { id: 8, category: "organicc" },
    { id: 9, category: "pale ale" },
    { id: 10, category: "pilsner" },
    { id: 11, category: "red ale" },
    { id: 12, category: "seasonal brews" },
    { id: 13, category: "stout" },
    { id: 14, category: "wheat beer" }, 
    { id: 15, category: "alcohol-free" },
    { id: 16, category: "porter"},
    { id: 17, category: "vienna" }

  ]);

};
