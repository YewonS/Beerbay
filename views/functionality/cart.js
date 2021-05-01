$(document).ready(function () {

    // get ratings of the user

    $.ajax({
        url: `/api/cart/`,
        type: 'GET'
    
    }).done(data => {
        const cart = data.response;

        for (let i = 0; i < cart.length; i++) {
            let item = cart[i];

            $('.ratings-tbody').append(`<tr class="result-row">
                                                <th scope="row">${i}</th>
                                                <td>${item.name}</td>
                                        </tr>
            `);
        }
    }).fail(() => {
        alert("No items of the user found.");
    });
    
});