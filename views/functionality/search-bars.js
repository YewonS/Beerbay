let map;

function initMap() {
    const cph = { lat: 55.676098, lng: 12.568337 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: cph,
        zoom: 12
    });

}

let marker, infoWindow;

function addMarker(data) {

    let latitude = data.latitude;
    let longitude = data.longitude;

    marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map
    });
    
}

function addInfo(data) {

    
    infoWindow = new google.maps.infoWindow({
        content: collections
    });
    

    // TODO: make jquery listen to click events on each marker, get the bar id and then show collections.
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    })

}


$.ajax({
    url: `/api/bars`,
    type: 'GET',
    dataType: 'json'
}).done(data => {
    let bars = data.response;
    let sizeOfData = bars.length;

    for (let i = 0; i < sizeOfData; i++) {

        addMarker(bars[i]);

        let barID = bars[i].id;

        $.ajax({
            url: `/api/collections/bar/` + barID,
            type: 'GET',
            dataType: 'json'
        }).done(data => {
            console.log(data.response);
        })
    }

})


//TODO: okay, so I will show the bars on the map. Each marker holds bar info like id and name too. So whenever you click marker, you can ajax into the bar and show the collections on the table. There can also be a search bar you can search through the name of the bar and then it shows the collections on the result table.

