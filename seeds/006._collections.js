
exports.seed = function(knex) {
 
  return knex('bars').select().then(bars => {
    return knex('collections').insert([
      { beer_id: 1, bar_id: bars.find(bar => bar.name === 'bar37').id },
      { beer_id: 1, bar_id: bars.find(bar => bar.name === 'moonbar').id },
      { beer_id: 2, bar_id: bars.find(bar => bar.name === 'bar37').id },
      { beer_id: 2, bar_id: bars.find(bar => bar.name === 'moonbar').id },
      { beer_id: 3, bar_id: bars.find(bar => bar.name === 'bar37').id },
      { beer_id: 4, bar_id: bars.find(bar => bar.name === 'moonbar').id },
      { beer_id: 5, bar_id: bars.find(bar => bar.name === 'bar37').id },
      { beer_id: 5, bar_id: bars.find(bar => bar.name === 'moonbar').id },
      { beer_id: 7, bar_id: bars.find(bar => bar.name === 'bar37').id },
      { beer_id: 8, bar_id: bars.find(bar => bar.name === 'moonbar').id },
  
    ]);

  })

};
