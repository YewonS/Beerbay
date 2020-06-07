console.log("data loaded");

let map;

function initMap() {
    const cph = { lat: 55.676098, lng: 12.568337 };
    map = new google.maps.Map(document.getElementById('map'), {
        center: cph,
        zoom: 12
    });

}

function addMarker(bar) {
    let infoWindow;
    let marker = new google.maps.Marker({
        position: bar.coordinates,
        map: map
    });

    if (bar.collection) {
        infoWindow = new google.maps.infoWindow({
            content: bar.collection
        });
    }

    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    })

}



// $.ajax(`/api/bars`).done(bars => {
//     console.log(bars);
// })