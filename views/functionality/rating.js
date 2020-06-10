$(document).ready(function() {

    $('.add-rating-btn').on('click', function() {
        
        //TODO: get the name of the beer, user id, and make a post request. Also make the post route. And then put a new line on the table with a new data.
        $('#ratings-modal').on('show.bs.modal', function() {
            console.log("modal on");
        })

    });

    $.ajax({
        url: `/api/user/username/` + user,
        type: 'GET'
    }).done(data => {
        const user = data.response;
        const userID = user[0].id;

        $.ajax({
            url: `/api/ratings/userid/` + userID,
            type:'GET'
        }).done(data => {
            const ratings = data.response;
            
            for (let i = 0; i < ratings.length; i++) {
                let rating = ratings[i];
                
                $('.ratings-tbody').append(`
                <tr class="result-row">
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

});