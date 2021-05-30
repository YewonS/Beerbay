$(document).ready(function(){

    function displayPrices(priceItem) {
        
        $('.price-list-body').append(`<tr class="result-row">
                                                        <th scope="row">${priceItem.beername}</th>
                                                        <td>${priceItem.startDate}</td>
                                                        <td>${priceItem.price}</td>
                                                    </tr>`);

    }

    // populate price list table
    $.ajax({
        url: `/api/admin/prices`,
        type: 'GET'
    }).done(data => {
        const result = data.response;

        for(i=0; i<result.length; i++){
            priceItem = result[i];
            displayPrices(priceItem);
        }
        
    });

});