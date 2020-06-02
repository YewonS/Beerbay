
exports.seed = function(knex) {
 
    return knex('beers').insert([
      { id: 1, beername: "1664 Blanc", brewery: "1664", country: "France", abv: 5.0, picture: "https://www.carlsberggroup.com/media/6213/kronenbourg_blanc_bottle.png?height=570&mode=max", category_id: 15 },
      { id: 2, beername: "Tuborg Green", brewery: "Tuborg", country: "Denmark", abv: 4.6, picture: "https://www.carlsberggroup.com/media/12007/global_tuborg-green.png?height=1140&mode=max", category_id: 11 },
      { id: 3, beername: "Tuborg Classic", brewery: "Tuborg", country: "Denmark", abv: 4.6, picture: "https://www.carlsberggroup.com/media/6287/103261-tuborg-classic-bottl.png?height=570&mode=max", category_id: 18 },
      { id: 4, beername: "Guld Tuborg", brewery: "Tuborg", country: "Denmark", abv: 5.8, picture: "https://www.carlsberggroup.com/media/6292/105444_guld_bottle_packshot.png?height=570&mode=max", category_id: 11 },
      { id: 5, beername: "Red Tuborg", brewery: "Tuborg", country: "Denmark", abv: 4.3, picture: "https://www.carlsberggroup.com/media/6237/roed_tuborg_33cl_vaad_cmyk.png?height=570&mode=max", category_id: 13 },
      { id: 6, beername: "Tuborg Julebryg", brewery: "Tuborg", country: "Denmark", abv: 5.6, picture: "https://www.carlsberggroup.com/media/6273/tuborg_julebryg_33cl_drople.png?height=570&mode=max", category_id: 13 },
      { id: 7, beername: "Tuborg Raw", brewery: "Tuborg", country: "Denmark", abv: 4.5, picture: "https://www.carlsberggroup.com/media/6290/104525_-_tuborg_raa_-_flaske.png?height=1140&mode=max", category_id: 9 },
      { id: 8, beername: "Carlsberg", brewery: "Carlsberg", country: "Denmark", abv: 5.0, picture: "https://www.carlsberggroup.com/media/26623/xz_carlsberg.png?height=570&mode=max", category_id: 10 },
      { id: 9, beername: "Carlsberg 1883", brewery: "Carlsberg", country: "Denmark", abv: 4.6, picture: "https://www.carlsberggroup.com/media/34895/dk_carlsberg-1883.png?height=570&mode=max", category_id: 8 },
      { id: 10, beername: "Gamle Carlsberg", brewery: "Carlsberg", country: "Denmark", abv: 4.3, picture: "https://www.carlsberggroup.com/media/6169/gamle_carlsberg_droplets.png?height=570&mode=max", category_id: 11 },
      { id: 11, beername: "Brooklyn Brown Ale", brewery: "Brooklyn", country: "United States", abv: 5.6, picture: "https://www.carlsberggroup.com/media/6137/brooklyn_brown_ale_355ml_dr.png?height=570&mode=max", category_id: 2 },
      { id: 12, beername: "CARLs Jul", brewery: "CARLs", country: "Denmark", abv: 5.6 , picture: "https://www.carlsberggroup.com/media/34893/dk_carls-jul.png?height=570&mode=max", category_id: 11 },
      { id: 13, beername: "Jacobsen Foraarsbryg", brewery: "Jacobsen", country: "Denmark", abv: 6.3, picture: "https://www.carlsberggroup.com/media/6193/jacobsen_foraarsbryg_75cl.png?height=570&mode=max", category_id: 13 },
      { id: 14, beername: "Jacobsen Julebock", brewery: "Jacobsen", country: "Denmark", abv: 6.5, picture: "https://www.carlsberggroup.com/media/6197/jacobsen_julebock_75cl.png?height=570&mode=max", category_id: 13 },
      { id: 15, beername: "Jacobsen Weissbier", brewery: "Jacobsen", country: "Denmark", abv: 5.9, picture: "https://www.carlsberggroup.com/media/32567/dk_jacobsen-weissbier.png?height=570&mode=max", category_id: 15 },
      { id: 16, beername: "Jacobsen India Pale Ale", brewery: "Jacobsen", country: "Denmark", abv: 6.6, picture: "https://www.carlsberggroup.com/media/32571/dk_jacobsen-india-pale-ale.png?height=570&mode=max", category_id: 7 },
      { id: 18, beername: "Jacobsen Porter", brewery: "Jacobsen", country: "Denmark", abv: 6.5, picture: "https://www.carlsberggroup.com/media/32569/dk_jacobsen-porter.png?height=570&mode=max", category_id: 17 },
      { id: 19, beername: "Jacobsen Pale Ale", brewery: "Jacobsen", country: "Denmark", abv: 6.4, picture: "https://www.carlsberggroup.com/media/6198/jacobsen_pale_ale_75cl_cmyk.png?height=1140&mode=max", category_id: 10 },
    ]);

};
