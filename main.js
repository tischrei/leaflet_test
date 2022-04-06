var L = require('leaflet');
var leafletDraw = require('leaflet-draw');
var map = L.map('map').setView([51.3397, 12.3731], 12);
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
}).addTo(map);

function setMouseCoords(lat, lng, zoom) {
  let div = document.getElementById('mouse_position');
  div.innerHTML = ('Zoom: ' + zoom + ', Coords: ' + lat + ', ' + lng);
}

map.on('mousemove', function (e) {
  var coord = e.latlng;
  var lat = coord.lat;
  var lng = coord.lng;
  var zoom = map.getZoom();
  setMouseCoords(lat, lng, zoom);
});
map.on('mouseout', function () {
  let div = document.getElementById('mouse_position');
  div.innerHTML = 'outside';
});

var circle = L.circle([51.3397, 12.3731], {
  color: 'red',
  fillColor: '#f03',
  fillOpacity: 0.5,
  radius: 500
}).addTo(map);


L.marker([51.3397, 12.3731]).addTo(map);

var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);


var options = {
  draw: {
    polyline: {
      shapeOptions: {
        color: '#f357a1',
        weight: 10
      }
    },
    polygon: {
      allowIntersection: false, // Restricts shapes to simple polygons
      drawError: {
        color: '#e1e100', // Color the shape will turn when intersects
        message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
      },
      shapeOptions: {
        color: '#bada55'
      }
    },
    edit: {
      featureGroup: editableLayers
    }
  }
};

  var drawControl = new L.Control.Draw(options);
  map.addControl(drawControl);

  var html_data = JSON.parse(document.getElementById('data').innerHTML);
  html_data = L.geoJSON(html_data);
  console.log(html_data);
  html_data.addTo(map);
  

  map.on(L.Draw.Event.CREATED, function (e) {
    var type = e.layerType,
      layer = e.layer;

    if (type === 'marker') {
      layer.bindPopup('A popup!');
    }

   
    editableLayers.addLayer(layer);
    var data = editableLayers.toGeoJSON();
    console.log(data);
  });


