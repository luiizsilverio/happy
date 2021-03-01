
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
    iconAnchor: [29,68]
    //,popupAnchor: [170,2]
})

/*
//create and add marker
L.marker([-22.9235254,-47.0576255], { icon })
    .addTo(map)
    //.bindPopup(popup)
    //.openPopup();
*/

let marcador;

// create and add marker
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    // remove icon
    marcador && map.removeLayer(marcador)

    // add icon layer
    marcador = L.marker([lat, lng], { icon }).addTo(map)

})

// adicionar o campo de fotos
function addPhotoField() {
    
    // pegar o container de fotos .images-upload
    const container = document.querySelector('.images-upload')    

    // pegar o container para duplicar .new-upload
    const newImages = document.querySelectorAll('.new-upload')

    // realizar o clone da última imagem adicionada
    const clonedImage = newImages[newImages.length - 1].cloneNode(true)
    
    // verificar se o campo está vazio. Se sim, não adicionar
    const campo = clonedImage.children[0]

    if (!campo.value) return
    
    // limpa o campo antes de adicionar ao container
    campo.value = ''

    // adicionar o clone ao container de fotos
    container.appendChild(clonedImage)    

}

function deleteField(event) {
    
    const span = event.currentTarget

    // pegar o container para duplicar .new-upload
    const newImages = document.querySelectorAll('.new-upload')

    if (newImages.length <= 1) {
        // se só tiver uma foto, limpar o valor do campo
        span.parentNode.children[0].value = ''    
        return
    }

    // deletar o campo
    span.parentNode.remove();

}

// seleciona Sim ou Não
function toggleFds(event) {

    // retirar a classe .active dos 2 botoes
    document.querySelectorAll('.button-select button')    
    .forEach( button => button.classList.remove('active') )

    // colocar a classe .active
    const button = event.currentTarget
    button.classList.add('active')

    // atualizar o input hidden com o valor selecionado
    const input = document.querySelector('[name="open-weekend"]')  
    input.value = button.dataset.value  

}

function validaCoord(event) {

    //validar se lat e lng estao preenchidos
    const lat = document.querySelector('[name="lat"]').value
    const lng = document.querySelector('[name="lng"]').value

    if (!lat || !lng) {
        event.preventDefault()
        alert('Selecione um ponto no mapa')
    }    
}
