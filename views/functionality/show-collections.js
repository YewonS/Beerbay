let url = window.location.href;
url = url.substr(url.lastIndexOf("/") + 1);
let beerID;
if (url.includes(":")) {
    beerID = url.substr(url.lastIndexOf(":") + 1);
} else {
    beerID = null;
}

function populateCollection(collection, beerID) {
    console.log(collection)
    $('.show-collections-result').append(`
        <tr class="result-row">
            <th scope="row">${collection.beername}</th>
            <td>${collection.name}</td>
            <td>${collection.address}</td>
            <td>${collection.price}</td>
            <td><input type="text" class="amount-input" id="amount-input-${collection.id}" value="1"></td>
            <td><a class="btn btn-dark" id="add-to-cart-btn" data-beer="${beerID}" data-shop="${collection.id}"><i class="fas fa-shopping-cart"></i></a></td>
        </tr>
    `);
}

$(document).ready(function() {

    $('.show-collections-result').html('');

    $.ajax({
        url: `/api/stocks/beer/` + beerID,
        type: 'GET'
    }).done(data => {
        const collections = data.response;

        if (collections.length > 2) {
            let firstCollection = collections[0];
            let firstShop = firstCollection.name;

            populateCollection(firstCollection, beerID);

            for (let i = 1; i < collections.length - 1; i++) {
                let collectionToCompare = collections[i];
                let nextCollection = collections[i+1];
                let shop1 = collectionToCompare.name;
                let shop2 = nextCollection.name;

                if (firstShop === shop1 && shop1 !== shop2) {
                    populateCollection(nextCollection, beerID);
                } 
            }

        }  else {
            for (let i = 0; i < collections.length; i++) {
                let collectionToCompare = collections[i];
                let nextCollection = collections[i+1];
                let shop1 = collectionToCompare.name;
                let shop2 = nextCollection.name;

                if (shop1 !== shop2) {
                    populateCollection(collectionToCompare, beerID);
                    populateCollection(nextCollection, beerID);
                } 
            }
        }
        
    });

    $('.show-collections-result').on('click', '#add-to-cart-btn', function(e) {
        let shopID = $(this).attr('data-shop');
        let beerID = $(this).attr('data-beer');
        
        let amountID = "#amount-input-" + shopID;
        let amountSelected = $(amountID).val();

        let cartItem = {
            shopID,
            beerID,
            amount: amountSelected
        }

        $.ajax({
            url: `/api/cart`,
            type: "POST",
            dataType: "json",
            data: JSON.stringify(cartItem),
            contentType: "application/json; charset=utf-8"
        }).done((data) => {

            console.log("New item added to cart", data);
            alert("Item added to cart.");
        
        }).fail(() => {
            alert("Error happened while adding item into the cart. Please try again.");
        });

        
    })


})