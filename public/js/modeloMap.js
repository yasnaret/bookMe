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
  // markers.forEach((marker) => {
  //   map.removeObjects(markers);
  // });
  markers = [];
  //recorrer items para la info de los restaurantes
  Object.entries(placesList).forEach((item) => {
    var group = new H.map.Group();
    console.log(group);
    coords = {
      lng: item[2][1][1],
      lat: item[2][0][1],
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
        lng: item[2][1][1],
        lat: item[2][0][1],
      },
      "<h4>hola</h4>");
  });
}