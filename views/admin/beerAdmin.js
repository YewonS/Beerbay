$(document).ready(function(){

    function displayBeers(beer) {
        
        $('.beer-collection-body').append(`<tr class="result-row">
                                                        <th scope="row">${beer.beername}</th>
                                                        <td>${beer.abv}</td>
                                                        <td>${beer.amount}</td>
                                                        <td class="edit-amount"><a class="btn btn-dark" val="${beer.id}"><i class="fas fa-edit"></i></a></td>
                                                    </tr>`);

    }

    // populate beer collection table
    $.ajax({
        url: `/api/admin/beers`,
        type: 'GET'
    }).done(data => {
        const beerCollections = data.response;

        for(i=0; i<beerCollections.length; i++){
            beer = beerCollections[i];
            displayBeers(beer);
        }
        
    });

});