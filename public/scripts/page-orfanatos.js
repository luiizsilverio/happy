
//create map
const map = L.map('mapid').setView([-22.9235254,-47.0576255], 16);

//create and add tileLayer
L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
    /*
    {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
    */
).addTo(map);

//create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg", //iconUrl: "./public/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29,68],
    popupAnchor: [170,2]
})

function addMarker({id, name, lat, lng}) {

    //create popup overlay
    const popup = L.popup({
        closeButton: false,
        className: 'map-popup',
        minWidth: 240,
        minHeight: 240
    }).setContent(`${name} <a href="orfanato?id=${id}"><img src="/images/arrow-white.svg"/></a>`)

    //create and add marker
    L.marker([lat,lng], { icon })
        .addTo(map)
        .bindPopup(popup)
        //.openPopup();
}

const span = document.querySelectorAll('.orphanages span')

span.forEach( item => {
    const orphanage = {
        id: item.dataset.id,
        name: item.dataset.name,
        lat: item.dataset.lat,
        lng: item.dataset.lng
    }
    addMarker(orphanage)
})