


const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2VjYXNqIiwiYSI6ImNramxhazNuODA2aHcyc2w5dGkyMnIxdm8ifQ.4DHJstE7Xn_PRu1PjtwtPg';
const map = new mapboxgl.Map({
container: 'YOUR_CONTAINER_ELEMENT_ID',
style: 'mapbox://styles/mapbox/streets-v11'
});