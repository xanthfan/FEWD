
// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
var map;
var markers = [];

function initializeMap() {
  var hongKong = new google.maps.LatLng(22.29, 114.18);
  var mapOptions = {
    zoom: 11,
    center: hongKong,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var markerData = {};

  if (sessionStorage.markers){
    for (i in sessionStorage){
      markerData = JSON.parse(sessionStorage[i]);
      console.log("sessionStorage[i] : ", sessionStorage[i]);
      console.log("markerData        : ", markerData);
      location = new google.maps.LatLng(markerData.latitude, markerData.longitude);
      addMarker(location);
    }    
  } 

  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, "new");
  });
}

// Add a marker to the map and push to the array.
function addMarker(location, state) {
  var date = new Date();
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: "images/happy.png",
    draggable : true
    // ,title: date
  });

  if (state === "new"){
    var markerData = {};
    markerData.latitude = marker.getPosition().lat().toString();
    markerData.longitude = marker.getPosition().lng().toString();
    date = new Date();
    sessionStorage.setItem( date.getTime(), JSON.stringify(markerData));

    markers.push(marker);
  }
}

// Sets the map on all markers in the array.
function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
  setAllMap(null);
}

// Shows any markers currently in the array.
function showMarkers() {
  setAllMap(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
  clearMarkers();
  markers = [];
}


google.maps.event.addDomListener(window, 'load', initializeMap);

// if (sessionStorage.locations){
//   reloadMarkers();
// }
