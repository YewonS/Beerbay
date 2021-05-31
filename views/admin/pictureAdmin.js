$(document).ready(function(){

    function displayImage(image) {
        
        $('.beer-collection-body').append(`<tr class="result-row">
                                                        <th scope="row">${image.beername}</th>
                                                        <td>${image.picture}</td>
                                                        <td class="edit-image"><a class="btn btn-dark" val="${image.id}"><i class="fas fa-edit"></i></a></td>
                                                    </tr>`);

    }

    // populate image table
    $.ajax({
        url: `/api/admin/images`,
        type: 'GET'
    }).done(data => {
        const result = data.response;

        for(i=0; i<result.length; i++){
            image = result[i];
            displayImage(image);
        }
        
    });

});