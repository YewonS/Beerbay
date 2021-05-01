let url = window.location.href;
url = url.substr(url.lastIndexOf("/") + 1);
let beerID;
if (url.includes(":")) {
    beerID = url.substr(url.lastIndexOf(":") + 1);
} else {
    beerID = null;
}

function populateCollection(collection) {
    console.log(collection)
    $('.show-collections-result').append(`
        <tr class="result-row">
            <th scope="row">${collection.beername}</th>
            <td>${collection.name}</td>
            <td>${collection.address}</td>
            <td>${collection.price}</td>
            <td><input type="text" class="amount-input" id="amount-input-${collection.name}" value="1"></td>
            <td class="add-to-cart-btn"><a class="btn btn-dark" href="" val="${collection}"><i class="fas fa-shopping-cart"></i></a></td>
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

            populateCollection(firstCollection);

            for (let i = 1; i < collections.length - 1; i++) {
                let collectionToCompare = collections[i];
                let nextCollection = collections[i+1];
                let shop1 = collectionToCompare.name;
                let shop2 = nextCollection.name;

                if (firstShop === shop1 && shop1 !== shop2) {
                    populateCollection(nextCollection);
                } 
            }

        }  else {
            for (let i = 0; i < collections.length; i++) {
                let collectionToCompare = collections[i];
                let nextCollection = collections[i+1];
                let shop1 = collectionToCompare.name;
                let shop2 = nextCollection.name;

                if (shop1 !== shop2) {
                    populateCollection(collectionToCompare);
                    populateCollection(nextCollection);
                } 
            }
        }
        
    });

})