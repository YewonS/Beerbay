$(document).ready(function () {

    // get ratings of the user

    update()
});
function update(){
    $.ajax({
        url: `/api/cart/`,
        type: 'GET'

    }).done(data => {
        const cart = data.response;
        $(".cart-tbody").empty();
        for (let i = 0; i < cart.length; i++) {
            let item = cart[i];
            let row = $(`<tr class="result-row">
                    <td>${item.beerBar.name}</td>
                    <td>${item.beerBar.beername}</td>
                    <td>${item.beerBar.amount}</td>
            </tr>`)
            row.append($("<td></td>").append($(`<button class="btn btn-warning">Delete</button>`).click(deleteAction(item.beerBar.beer,item.beerBar.shop))))
            $('.cart-tbody').append(row);
        }
    }).fail(() => {
        alert("No items of the user found.");
    });
    $(".checkout-button").click(function(e){
        e.preventDefault();
        $.ajax({
            url: `/api/cart/create-order`,
            type: "POST"
        }).done((data) => {
            update();
            window.location = "/order-history"
        }).fail(() => {
            alert("Error happened while creating order. Please try again.");
        });
    });
}
function deleteAction(beerID,shopID){
    return function(e){
        e.preventDefault();
        $.ajax({
            url: `/api/cart/${beerID}/${shopID}`,
            type: "DELETE"
        }).done((data) => {
            update();
        }).fail(() => {
            alert("Error happened while removing item. Please try again.");
        });
    }
}
