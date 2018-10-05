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

//add markers into heremaps on init
function displayDefaultMarker() {
  let homeIcon = new H.map.Icon('./img/marker.png');
  let Laboratoria = new H.map.Marker({lat:-33.4190702,lng:-70.6418162},{icon:homeIcon});
  let Cafe1= new H.map.Marker({lat:-33.437972,lng:-70.625154},{icon:homeIcon});
  let Cafe2= new H.map.Marker({lat:-33.423763,lng:-70.697334110},{icon:homeIcon});
  let Cafe3= new H.map.Marker({lat:-33.416695142517,lng:-70.57477276077},{icon:homeIcon});
  let Cafe4= new H.map.Marker({lat:-33.41831292672792,lng:-70.65637138999381},{icon:homeIcon});
  let Cafe5= new H.map.Marker({lat:-33.44063527065713,lng:-70.68234340023335},{icon:homeIcon});
  let Cafe6= new H.map.Marker({lat:-33.452346253623176,lng:-70.70674642090265},{icon:homeIcon});
  let Cafe7= new H.map.Marker({lat:-33.44037863058748,lng:-70.62204665614709},{icon:homeIcon});
  let Cafe8= new H.map.Marker({lat:-33.40834903465222,lng:-70.63852143876755},{icon:homeIcon});
  let Cafe9= new H.map.Marker({lat:-33.451052536170785,lng:-70.6356141241848},{icon:homeIcon});
  let Cafe10= new H.map.Marker({lat:-33.455257047408125,lng:-70.61681348990942},{icon:homeIcon});
  map.addObject( Cafe1);
  map.addObject( Cafe2);
  map.addObject( Cafe3);
  map.addObject( Cafe4);
  map.addObject( Cafe5);
  map.addObject( Cafe6);
  map.addObject( Cafe7);
  map.addObject( Cafe8);
  map.addObject( Cafe9);
  map.addObject( Cafe10);
  map.addObject( Laboratoria);
  
}

function initMap() {
  // Se inicializa el mapa
  // Inicializa el mapa
  map = new H.Map(
    mapPlaceholder,
    defaultLayers.normal.map,
    mapOptions);
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map)); // mueve el mapa, lo hace interactivo
    initUi();
    displayDefaultMarker()
  
  

 
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
      document.getElementById('inputSearching').value = '';

    }).catch(function (e) {
      console.log(e); // "oh, no!"
    });
});