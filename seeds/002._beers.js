
exports.seed = function(knex) {
 
    return knex('beers').insert([
      { beername: "Gamle Carlsberg", brewery: "Carlsberg", country: "Denmark", abv: 4.3 , picture: "https://www.carlsberggroup.com/media/6169/gamle_carlsberg_droplets.png?height=570&mode=max", category_id: 11 },
      { beername: "1664 Blanc", brewery: "1664", country: "France", abv: 5.0 , picture: "https://www.carlsberggroup.com/media/6213/kronenbourg_blanc_bottle.png?height=570&mode=max", category_id: 15 },
      { beername: "Brooklyn Brown Ale", brewery: "Brooklyn", country: "United States", abv: 5.6 , picture: "https://www.carlsberggroup.com/media/6137/brooklyn_brown_ale_355ml_dr.png?height=570&mode=max", category_id: 2 },
      { beername: "CARLs Jul", brewery: "CARLs", country: "Denmark", abv: 5.6 , picture: "https://www.carlsberggroup.com/media/34893/dk_carls-jul.png?height=570&mode=max", category_id: 11 },
      { beername: "Jacobsen Foraarsbryg", brewery: "Jacobsen", country: "Denmark", abv: 6.3 , picture: "https://www.carlsberggroup.com/media/6193/jacobsen_foraarsbryg_75cl.png?height=570&mode=max", category_id: 13 },
      { beername: "Jacobsen Julebock", brewery: "Jacobsen", country: "Denmark", abv: 6.5 , picture: "https://www.carlsberggroup.com/media/6197/jacobsen_julebock_75cl.png?height=570&mode=max", category_id: 13 },
      { beername: "", brewery: "", country: "", abv: 5.0 , picture: "", category_id: 1 },
      { beername: "", brewery: "", country: "", abv: 5.0 , picture: "", category_id: 1 },
      { beername: "", brewery: "", country: "", abv: 5.0 , picture: "", category_id: 1 },
      { beername: "", brewery: "", country: "", abv: 5.0 , picture: "", category_id: 1 },
      { beername: "", brewery: "", country: "", abv: 5.0 , picture: "", category_id: 1 },
      { beername: "", brewery: "", country: "", abv: 5.0 , picture: "", category_id: 1 },
      { beername: "", brewery: "", country: "", abv: 5.0 , picture: "", category_id: 1 },


    ]);

};
