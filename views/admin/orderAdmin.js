$(document).ready(function(){

    function displayOrder(orderItem) {
        
        $('.order-list-body').append(`<tr class="result-row">
                                            <th scope="row">${orderItem.id}</th>
                                            <td>${orderItem.name}</td>
                                            <td>${orderItem.beername}</td>
                                            <td>${orderItem.amount}</td>
                                            <td>${orderItem.orderStatus}</td>
                                            <td class="edit-orderStatus"><a class="btn btn-dark" val="${orderItem.id}"><i class="fas fa-edit"></i></a></td>
                                            </tr>`);

    }

    // populate order list table
    $.ajax({
        url: `/api/admin/orders`,
        type: 'GET'
    }).done(data => {
        const result = data.response;

        for(i=0; i<result.length; i++){
            orderItem = result[i];
            displayOrder(orderItem);
        }
        
    });

});