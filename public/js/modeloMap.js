function addMarkerToGroup(group, coords, html) {
  addingMarkers();
  var marker = new H.map.Marker(coords);
  // add custom data to the marker
  marker.setData(html);
  group.addObject(marker);
  markers.push(marker);
}


function addInfoBubble(map) {
  addingMarkers();

  markers = [];

  var group = new H.map.Group();
  console.log(Object.entries(placesList));
  coords = {
    lng: Object.entries(placesList)[1][1],
    lat: Object.entries(placesList)[0][1],
  };
  map.addObject(group);

  // add 'tap' event listener, that opens info bubble, to the group
  group.addEventListener('tap', function (evt) {
    var ui = H.ui.UI.createDefault(map, defaultLayers, 'es-ES');
    // event target is the marker itself, group is a parent event target
    // for all objects that it contains
    var bubble = new H.ui.InfoBubble(evt.target.getPosition(), {
      // read custom data
      content: evt.target.getData()
    });
    // show info bubble
    ui.addBubble(bubble);

  }, false);

  addMarkerToGroup(group, {
      lng: Object.entries(placesList)[1][1],
      lat: Object.entries(placesList)[0][1],
    },
    "<h3>BookMe </h3>");

};