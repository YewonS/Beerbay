$(document).ready(function(){

    function displayImage(url, beername) {
        $('.image-table-body').append(`<tr class="result-row">
                                                        <th scope="row">${beername}</th>
                                                        <td><img src="${url}" style="max-width: 200px; max-height: 200px; border: 1px solid #ddd; padding: 5px;"></td>
                                                        <td class="edit-image"><a class="btn btn-dark"><i class="fas fa-edit"></i></a></td>
                                                    </tr>`);

    }


    // populate image table
    let noOfPics, id, beername, url;
    $.ajax({
        url: `/api/image/?shopID=${shop}`,
        type: 'GET'
    }).done(data => {
        noOfPics = data.response;
        for(let i=0; i<noOfPics; i++) {

            $.ajax({
                url: `/api/image/${i}/info?shopID=${shop}`,
                type: 'GET'
            }).done(data => {
                id = data.id;
                const beerID = data.metadata.beerID;

                $.ajax({
                    url: `/api/beers/${beerID}`,
                    type: 'GET'
                }).done(data => {
                    const response = data.response;
                    beername = response[0].beername;

                    url = `/api/image/${i}?shopID=${shop}`;

                    displayImage(url, beername);
                });
                
            });

        }
        
    });

});