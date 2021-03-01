const options = {
    dragging: false,
    touchZoom: false,
    doubleClickZoom: false,
    scrollWheelZoom: false,
    zoomControl: false
}

// get coordinates from html
const lat = document.querySelector('span[data-lat]').dataset.lat
const lng = document.querySelector('span[data-lng]').dataset.lng
console.log(lat,lng)

//create map
//const map = L.map('mapid', options).setView([-22.9235254,-47.0576255], 16);
const map = L.map('mapid', options).setView([lat,lng], 15);

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

//create and add marker

//L.marker([span -22.9235254,-47.0576255], { icon })
L.marker([lat, lng], { icon }).addTo(map)
    //.bindPopup(popup).openPopup();

function selectImage(event) {
    const button = event.currentTarget

    // remove todas as classes .ative
    const buttons = document.querySelectorAll('.images button')
    buttons.forEach(removeActiveClass)
    
    function removeActiveClass(botao) {
        botao.classList.remove("active")
    }
    
    // selecionar a imagem clicada
    const image = button.children[0]
    const imgContainer = document.querySelector('.orfanato-detalhes > img')  

    // atualizar o container de imagem
    imgContainer.src = image.src

    // adicionar a classe .active para esse botão
    button.classList.add('active')
}
