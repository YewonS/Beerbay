$(document).ready(function() {

    $.ajax({
        url: `/api/categories`,
        type: 'GET'
    }).done(data => {
        const categories = data.response;
        
        for (let x in categories) {
            $('#category').append(`<option value=${categories[x].id}>${categories[x].category}</option>`);
        }
    
    });

    $('.btn-warning').on('click', function() {
        
        let beername = $('#search-beername').val();
        let category = $('#category').val();

        // when the user searches with the beername and category
        if (beername && category) {
            $.ajax({
                url:'/api/beername/' + beername + '/category/' + category,
                type: 'GET'
            }).done(data => {
                const beer = data.response;
                
                $('.search-beer-result').append(`<tr class="result-row">
                                                        <th scope="row">1</th>
                                                        <td>${beer[0].beername}</td>
                                                        <td>${beer[0].brewery}</td>
                                                        <td>${beer[0].country}</td>
                                                        <td>${beer[0].abv}</td>
                                                        <td>${beer[0].category}</td>
                                                        <td class="find-bars"><button class="btn btn-dark" val="${beer[0].id}"><i class="fa fa-search"></i></button></td>
                                                    </tr>`);

            }).fail(() => {
                alert("No beer of the name and category found.");
            })

        // when the user searches only with the beername 
        } else if (beername) {
            $.ajax({
                url: `/api/beers/name/` + beername,
                type: 'GET'
            }).done(data => {
                const beers = data.response;
                for (let i in beers) {
                    $('.search-beer-result').append(`<tr class="result-row">
                                                        <th scope="row">${i}</th>
                                                        <td>${beers[i].beername}</td>
                                                        <td>${beers[i].brewery}</td>
                                                        <td>${beers[i].country}</td>
                                                        <td>${beers[i].abv}</td>
                                                        <td>${beers[i].category}</td>
                                                        <td class="find-bars"><button class="btn btn-dark" val="${beers[i].id}"><i class="fa fa-search"></i></button></td>
                                                    </tr>`);
                }

            }).fail(() => {
                alert("No beer with the matching name found.");
            });

        // when the user searches only with the category   
        } else if (category) {
            $.ajax({
                url: `/api/beers/category/` + category,
                type: 'GET'
            }).done(data => {
                const beers = data.response;
                for (let i in beers) {
                    $('.search-beer-result').append(`<tr class="result-row">
                                                        <th scope="row">${i}</th>
                                                        <td>${beers[i].beername}</td>
                                                        <td>${beers[i].brewery}</td>
                                                        <td>${beers[i].country}</td>
                                                        <td>${beers[i].abv}</td>
                                                        <td>${beers[i].category}</td>
                                                        <td class="find-bars"><button class="btn btn-dark" val="${beers[i].id}"><i class="fa fa-search"></i></button></td>
                                                    </tr>`);
                }

            }).fail(() => {
                alert("No beer with the matching category found.");
            });

        // when there are no search input, just show all the beers
        } else {

            $.ajax({
                url: `/api/beers`,
                type: 'GET'
            }).done(data => {
                const beers = data.response;
                for (let i in beers) {
                    $('.search-beer-result').append(`<tr class="result-row">
                                                        <th scope="row">${i}</th>
                                                        <td>${beers[i].beername}</td>
                                                        <td>${beers[i].brewery}</td>
                                                        <td>${beers[i].country}</td>
                                                        <td>${beers[i].abv}</td>
                                                        <td>${beers[i].category}</td>
                                                        <td class="find-bars"><button class="btn btn-dark" val="${beers[i].id}"><i class="fa fa-search"></i></button></td>
                                                    </tr>`);
                }
            }).fail(() => {
                alert("No beer found.");
            })
           
        }
    
    })
  

})

//TODO: finish Find bars