$(document).ready(function () {

    // get ratings of the user
    $.ajax({
        url: `/api/user/username/` + user,
        type: 'GET'
    }).done(data => {
        const user = data.response;
        const userID = user[0].id;

        $.ajax({
            url: `/api/ratings/userid/` + userID,
            type: 'GET'
        }).done(data => {
            const ratings = data.response;

            for (let i = 0; i < ratings.length; i++) {
                let rating = ratings[i];

                $('.ratings-tbody').append(`<tr class="result-row">
                                                    <th scope="row">${i+1}</th>
                                                    <td>${rating.beername}</td>
                                                    <td>${rating.brewery}</td>
                                                    <td>${rating.country}</td>
                                                    <td>${rating.abv}</td>
                                                    <td>${rating.category}</td>
                                                    <td>${rating.ratings}</td>
                                                </tr>
                    `);
            }

        }).fail(() => {
            alert("No ratings of the user found.");
        })

    }).fail(() => {
        alert("Error happened while bringing the data.");
    })
    
    // add ratings

    const beer = $('#search-beername').val();
    
    $('.add-rating-btn').on('click', function() {
       
        const beername = $('#search-beername').val();
        const beerID = 0;

        $.ajax({
            url: `/api/beers/name/` + beername,
            type: 'GET'
        }).done(data => {
            const beer = data.response;
            beerID = beer[0].id;            
            console.log("beerId", beerID);
        }).fail(() => {
            alert("Please type in correct name of the beer.");
        });

        $('.star').on('click', function () {

            console.log("rating button clicked");

            const rating = $(this).val();
            $('.star').html('<i class="fas fa-star"></i>');

            $('.save-btn').on('click', function () {

                console.log("save button clicked");
                if (rating) {
                    console.log("add rating");
                    addRating(beerID, rating);
                } else {
                    alert("Please choose rating.");
                }

            });

        });
    });


    function addRating(beerID, rating) {
        const userID;

        $.ajax({
            url: `/api/user/username/` + user,
            type: 'GET'
        }).done(data => {
            const user = data.response;
            userID = user[0].id;

            const data = {
                userID: userID,
                beerID: beerID,
                rating: rating
            }

            $.post('/add-rating', { data }).done(function () { 
                console.log("New rating added", data);
                
            }).fail(() => { 
                alert("Error happened while adding rating. Please try again.");
            })

        }).fail(() => { 
            alert("Please log in to add a new rating.");
        })


    }
    
});

//TODO: fix this......