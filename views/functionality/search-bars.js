let url = window.location.href;
url = url.substr(url.lastIndexOf("/") + 1);
let beerID;
if (url.includes(":")) {
    beerId = url.substr(url.lastIndexOf(":") + 1);
} else {
    beerId = null;
}


let map;

function initMap() {
    const cph = { lat: 55.676098, lng: 12.568337 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: cph,
        zoom: 13
    });

}

markersList = []
infoWindowList = []

function addMarker(data) {

    let latitude = data.latitude;
    let longitude = data.longitude;

    let marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        barID: data.id,
        barName: data.name,
        barAddress: data.address
    });
    
    let infoWindow = new google.maps.InfoWindow({
        content: data.name
    });
    
    marker.addListener('click', function() {
        if (markersList) {
            closeInfoWindow();
        }
        infoWindow.open(map, marker);
        getCollections(marker.barName);
    });

    markersList.push(marker);
    infoWindowList.push(infoWindow);

}

function closeInfoWindow() {
    infoWindowList.forEach(infoWindow => infoWindow.close());
}

function openInfoWindow(barName) {
    //We cut the whitespace at the end of the barName
    barName = barName.trim();
    closeInfoWindow();
    infoWindowList.forEach((infoWindow) => {
        markersList.forEach((marker) => {
            if (marker.barName === barName && infoWindow.content === barName) {
                infoWindow.open(map, marker);
            }
        });
            
    });
}

function showAllBars(barList) {
    console.log(barList.response);
    barList.forEach((bar) => {
        infoWindowList.forEach((infoWindow) => {
            if (infoWindow.content === bar.name) {
                markersList.forEach((marker) => {
                    if (marker.barName === infoWindow.content) {
                        infoWindow.open(map, marker);
                    }   
                });
            }
        });
    });
}

function getCollections(barName) {

     // clear the table
     $('.search-bar-result').html('');

    // get the bar id
    $.ajax({
        url: `/api/shops/name/` + barName,
        type: 'GET'
    }).done(data => {
        let barID = data.response[0].id;
        console.log('bar id', barID)
    
        // get the collections and display them on the table
        $.ajax({
            url: `/api/stocks/shop/` + barID,
            type: 'GET'
        }).done(data => {
            let collection = data.response;
            for (let i = 0; i < collection.length; i++) {
                let beer = collection[i];
                
                $('.search-bar-result').append(`
                <tr class="result-row">
                    <th scope="row">${i + 1}</th>
                    <td>${beer.beername}</td>
                    <td>${beer.abv}</td>
                </tr>
                `);
            }

        }).fail(() => {
            alert("Error happened while bringing the data.");
        });
    }).fail(() => {
        alert("No bar found.");
    });
}



$(document).ready(function() {

    $.ajax({
        url: `/api/shops`,
        type: 'GET',
        dataType: 'json'
    }).done(data => {
        let bars = data.response;
        let sizeOfData = bars.length;
    
        for (let i = 0; i < sizeOfData; i++) {
    
            addMarker(bars[i]);
        }
    
    });

    if(beerId)
        $.ajax({
            url: `/api/stocks/beer/${beerId}`,
            type: 'GET',
            dataType: 'json'
        }).done(data => {
            showAllBars(data.response);
        });
    
    

    $(".btn-dark").on("click", function(){
        console.log('search-button clicked')
        const inputString = $('.search-input').val().toLowerCase();


        getCollections(inputString);

        openInfoWindow(inputString);
    });

});
