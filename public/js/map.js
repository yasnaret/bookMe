let placesList = null;
let watchPosition = null;
let HEREHQcoordinates = null;
let map;
let markers;


var platform = new H.service.Platform({
  app_id: '5juCnYkKrxY6fDsLciaz', // // <-- ENTER YOUR APP ID HERE
  app_code: 'ReOKXUXIoviZ2qsPWn16_g', // <-- ENTER YOUR APP CODE HERE
  useHTTPS: true
});



window.onload = () => {
  initMap();

};

// Ajusta el mapa al tamaño de la pantalla

window.addEventListener('resize', function () {
  map.getViewPort().resize();
});

// Establecemos las coordenadas del mapa

var coordinates = {
  lat: -33.43727, // Plaza de Armas
  lng: -70.65056
};

var mapOptions = {
  center: coordinates,
  zoom: 14
};


let defaultLayers = platform.createDefaultLayers();
let mapPlaceholder = document.getElementById('mapContainer');

function initMap() {
  // Se inicializa el mapa
  // Inicializa el mapa
  map = new H.Map(
    mapPlaceholder,
    defaultLayers.normal.map,
    mapOptions);

  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map)); // mueve el mapa, lo hace interactivo
  initUi();
  addingMarkers();
}
// Agrego un marcador


var iconUrl = '../css/imagenes/if_Map_-_Location_Solid_Style_26_2216336.png';


var iconOptions = {
  // The icon's size in pixel:
  size: new H.math.Size(26, 34),
  // The anchorage point in pixel, 
  // defaults to bottom-center
  anchor: new H.math.Point(14, 34)
};

var markerOptions = {
  icon: new H.map.Icon(iconUrl, iconOptions)
};

function initUi() {
  // Se inicializa la UI
  var ui = H.ui.UI.createDefault(map, defaultLayers, 'es-ES');
}

function addingMarkers() {
  var markers = [];
  var marker = new H.map.Marker(coordinates, markerOptions);
  map.addObject(marker);
  map.removeObjects(markers); // remueve marcadores cuando cambias de geolocalización
  markers = []; // almacena los marcadores
}

function updatePosition(event) {
  HEREHQcoordinates = {
    lat: event.coords.latitude,
    lng: event.coords.longitude
  };

  let marker = new H.map.Marker(HEREHQcoordinates);
  map.addObject(marker);
  map.setCenter(HEREHQcoordinates);
}
navigator.geolocation.watchPosition(updatePosition);

searchBtn.addEventListener('click', () => {
  addingMarkers();


  fetch(`https://geocoder.api.here.com/6.2/geocode.json?searchtext=${encodeURI(inputSearching.value)}&mapview=-15.3052%2C-78.6127%3B-56.6682%2C-64.1986&gen=9&app_id=wmLh9WIylelp0l6KdZF9&app_code=vXvdui0ls0FvJ0DrA7PY5g`)
    .then(response => response.json())
    .then(explorer => {
      placesList = explorer.Response.View[0].Result[0].Location.DisplayPosition;

      console.log(Object.entries(placesList));
      addInfoBubble(map);
    }).catch(function (e) {
      console.log(e); // "oh, no!"
    });
});