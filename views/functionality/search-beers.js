$(document).ready(function () {

    function displayBeers(i, beer) {
        
        $('.search-beer-result').append(`<tr class="result-row">
                                                        <th scope="row">1</th>
                                                        <td>${beer[i].beername}</td>
                                                        <td>${beer[i].abv}</td>
                                                        <td>${beer[i].category}</td>
                                                        <td class="find-bars"><a class="btn btn-dark" href="/show-collections:${beer[i].id}" val="${beer[i].id}"><i class="fa fa-search"></i></a></td>
                                                    </tr>`);

    }

    $.ajax({
        url: `/api/categories`,
        type: 'GET'
    }).done(data => {
        const categories = data.response;
        
        for (let x in categories) {
            $('#category').append(`<option value=${categories[x].id}>${categories[x].name}</option>`);
        }
    
    });

    $('.btn-warning').on('click', function () {
        
        let beername = $('#search-beername').val();
        let category = $('#category').val();

        // when the user searches with the beername and category
        if (beername && category) {
            $.ajax({
                url: '/api/beername/' + beername + '/category/' + category,
                type: 'GET'
            }).done(data => {
                const beer = data.response;
                $('.search-beer-result').html('');
                displayBeers(0, beer);
                
            }).fail(() => {
                alert("No beer of the name and category found.");
            });

            // when the user searches only with the beername 
        } else if (beername) {
            $.ajax({
                url: `/api/beers/name/` + beername,
                type: 'GET'
            }).done(data => {
                const beers = data.response;
                $('.search-beer-result').html('');
                for (let i in beers) {
                    displayBeers(i, beers);
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
                $('.search-beer-result').html('');
                for (let i in beers) {
                    displayBeers(i, beers);
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
                $('.search-beer-result').html('');
                for (let i in beers) {
                    displayBeers(i, beers);
                }
            }).fail(() => {
                alert("No beer found.");
            });
           
        }
    
    });
  

});
