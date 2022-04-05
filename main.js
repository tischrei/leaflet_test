var L = require('leaflet');
var map = L.map('map').setView([51.3397, 12.3731], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function setMouseCoords(lat, lng) {
  let div = document.getElementById('mouse_position');
  div.innerHTML = (lat + ', ' + lng);
}

map.on('mousemove', function (e) {
  var coord = e.latlng;
  var lat = coord.lat;
  var lng = coord.lng;
  setMouseCoords(lat, lng);
});
map.on('mouseout', function () {
  let div = document.getElementById('mouse_position');
  div.innerHTML = 'outside';
});