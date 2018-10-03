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

var AUTOCOMPLETION_URL = 'https://autocomplete.geocoder.api.here.com/6.2/suggest.json',
  ajaxRequest = new XMLHttpRequest(),
  query = '';

/**
 * If the text in the text box  has changed, and is not empty,
 * send a geocoding auto-completion request to the server.
 *
 * @param {Object} inputSearching the textBox DOM object linked to this event
 * @param {Object} event the DOM event which fired this listener
 */
function autoCompleteListener(inputSearching, event) {

  if (query != inputSearching.value) {
    if (inputSearching.value.length >= 1) {

      /**
       * A full list of available request parameters can be found in the Geocoder Autocompletion
       * API documentation.
       *
       */
      var params = '?' +
        'query=' + encodeURIComponent(inputSearching.value) + // The search text which is the basis of the query
        '&beginHighlight=' + encodeURIComponent('<mark>') + //  Mark the beginning of the match in a token. 
        '&endHighlight=' + encodeURIComponent('</mark>') + //  Mark the end of the match in a token. 
        '&maxresults=5' + // The upper limit the for number of suggestions to be included 
        // in the response.  Default is set to 5.
        '&app_id=' + '5juCnYkKrxY6fDsLciaz' +
        '&app_code=' + 'ReOKXUXIoviZ2qsPWn16_g';
      ajaxRequest.open('GET', AUTOCOMPLETION_URL + params);
      ajaxRequest.send();
    }
  }
  query = inputSearching.value;
}


/**
 *  This is the event listener which processes the XMLHttpRequest response returned from the server.
 */
function onAutoCompleteSuccess() {
  /*
   * The styling of the suggestions response on the map is entirely under the developer's control.
   * A representitive styling can be found the full JS + HTML code of this example
   * in the functions below:
   */
  clearOldSuggestions();
  addSuggestionsToPanel(this.response); // In this context, 'this' means the XMLHttpRequest itself.
  addSuggestionsToMap(this.response);
  console.log(this.response);
}


/**
 * This function will be called if a communication error occurs during the XMLHttpRequest
 */
function onAutoCompleteFailed() {
  alert('Ooops!');
}

// Attach the event listeners to the XMLHttpRequest object
ajaxRequest.addEventListener("load", onAutoCompleteSuccess);
ajaxRequest.addEventListener("error", onAutoCompleteFailed);
ajaxRequest.responseType = "json";







searchBtn.addEventListener('click', () => {


  fetch(`https://geocoder.api.here.com/6.2/geocode.json?searchtext=${encodeURI(inputSearching.value)}&mapview=-15.3052%2C-78.6127%3B-56.6682%2C-64.1986&gen=9&app_id=wmLh9WIylelp0l6KdZF9&app_code=vXvdui0ls0FvJ0DrA7PY5g`)
    .then(response => response.json())
    .then(explorer => {
      placesList = explorer.Response.View[0].Result[0].Location.DisplayPosition;

      addingMarkers();
      console.log(Object.entries(placesList));
      addInfoBubble(map);

      coordsMarkers = {
        lng: Object.entries(placesList)[1][1],
        lat: Object.entries(placesList)[0][1],
      }
      map.setCenter(coordsMarkers);

    }).catch(function (e) {
      console.log(e); // "oh, no!"
    });
});