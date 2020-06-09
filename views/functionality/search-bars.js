let map;

function initMap() {
    const cph = { lat: 55.676098, lng: 12.568337 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: cph,
        zoom: 12
    });

}

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
        infoWindow.open(map, marker);
    });

}



$(document).ready(function() {

    $.ajax({
        url: `/api/bars`,
        type: 'GET',
        dataType: 'json'
    }).done(data => {
        let bars = data.response;
        let sizeOfData = bars.length;
    
        for (let i = 0; i < sizeOfData; i++) {
    
            addMarker(bars[i]);
        }
    
    })
    

    $(".btn-dark").on("click", function(){
        const inputString = $('.search-input').val().toLowerCase();

        // clear the table
        $('.search-bar-result').html('');
        
        // get the bar id
        $.ajax({
            url: `/api/bars/name/` + inputString,
            type: 'GET'
        }).done(data => {
            let barID = data.response[0].id;
        
            // get the collections and display them on the table
            $.ajax({
                url: `/api/collections/bar/` + barID,
                type: 'GET'
            }).done(data => {
                let collection = data.response;
                for (let i = 0; i < collection.length; i++) {
                    let beer = collection[i];
                    
                    $('.search-bar-result').append(`
                    <tr class="result-row">
                        <th scope="row">${i+1}</th>
                        <td>${beer.beername}</td>
                        <td>${beer.brewery}</td>
                        <td>${beer.country}</td>
                        <td>${beer.abv}</td>
                        <td>${beer.category}</td>
                    </tr>
                    `);
                }

            }).fail(() => {
                alert("Error happened while bringing the data.");
            })
        }).fail(() => {
            alert("No bar found.");
        })
    });

});