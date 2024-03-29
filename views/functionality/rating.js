$(document).ready(function () {

    // get ratings of the user

    $.ajax({
        url: `/api/reviews/user/username/`,
        type: 'GET'
    
    }).done(data => {
        const ratings = data.response;

        for (let i = 0; i < ratings.length; i++) {
            let rating = ratings[i];


            $('.ratings-tbody').append(`<tr class="result-row">
                                                <th scope="row">${i + 1}</th>
                                                <td>${rating.beername}</td>
                                                <td>${rating.abv}</td>
                                                <td>${rating.rating}</td>
                                            </tr>
            `);
        }

    }).fail(() => {
        alert("No ratings of the user found.");
    });
    

    // add ratings

    let beerID;

    $('.add-rating-btn').on('click', function () {
        
        const beername = $('#search-beername').val();
       
        $.ajax({
            url: `/api/beers/name/` + beername,
            type: 'GET'
        }).done(data => {
            const beer = data.response;
            beerID = beer[0].id;
        
        }).fail(() => {
            alert("Please type in correct name of the beer.");
        });

    });

    let rating;

    // starts change colors when clicked

    $('#s1').on('click', function () {
        $('.fa-star').css("color", "gray");
        $('#s1').css("color", "gold");
        rating = $(this).attr('data-rating');
    });
    $('#s2').on('click', function () {
        $('.fa-star').css("color", "gray");
        $('#s1, #s2').css("color", "gold");
        rating = $(this).attr('data-rating');
    });
    $('#s3').on('click', function () {
        $('.fa-star').css("color", "gray");
        $('#s1, #s2, #s3').css("color", "gold");
        rating = $(this).attr('data-rating');
    });
    $('#s4').on('click', function () {
        $('.fa-star').css("color", "gray");
        $('#s1, #s2, #s3, #s4').css("color", "gold");
        rating = $(this).attr('data-rating');
    });
    $('#s5').on('click', function () {
        $('.fa-star').css("color", "gray");
        $('#s1, #s2, #s3, #s4, #s5').css("color", "gold");
        rating = $(this).attr('data-rating');
    });
    
    $('#save-btn').on('click', function () {

        rating = Number(rating);
        addRating(beerID, rating);

    });
    


    function addRating(beerID, rating) {

        $.ajax({
            url: `/api/username/` + user,
            type: 'GET'
        }).done(data => {
            const user = data.response;
            const userID = user[0].id;

            if (userID && beerID && rating) {
        
                const ratingData = {
                    user: userID,
                    beer: beerID,
                    rating: rating
                }
        
                $.ajax({
                    url: `/add-rating`,
                    type: "POST",
                    dataType: "json",
                    data: JSON.stringify(ratingData),
                    contentType: "application/json; charset=utf-8"
                }).done((data) => {

                    console.log("New rating added", data);
                    setTimeout(function () {
                        $('#ratings-modal').modal('hide');
                    }, 100);
                    alert("New rating added");
                     
                }).fail(() => {
                    alert("Error happened while adding rating. Please try again.");
                });
        
                    
            } else {
                alert("Information wrong.");
            }

        }).fail((error) => {
            console.log(error);
        });

    }
    
});