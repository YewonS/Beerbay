
$(document).ready(function () {

    function displayOrders(i, order) {
        
        $('.order-list').append(`<tr class="result-row">
                                                        <td>${order[i].name}</td>
                                                        <td>${order[i].beername}</td>
                                                        <td>${order[i].beerType}</td>
                                                        <td>${order[i].price}</td>
                                                        <td>${order[i].amount}</td>
                                                        <td>${order[i].status}</td>
                                                        <td>${order[i].orderId}</td>
                                                    </tr>`);

    }

    $.ajax({
        url: `/api/order-item`,
        type: 'GET'
    }).done(data => {
        const orders = data.response;
        for (let i in orders){
            displayOrders(i, orders);
        }
    });
});