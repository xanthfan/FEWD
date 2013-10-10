
// In the following example, markers appear when the user clicks on the map.
// The markers are stored in an array.
// The user can then click an option to hide, show or delete the markers.
var map;
var markers = [];

function initializeMap() {
  var mapCenter , mapZoom;

  if (sessionStorage.mapLatLng){
    var temp = JSON.parse(sessionStorage.mapLatLng);
    mapCenter = new google.maps.LatLng(temp.lat, temp.lng);
    console.log(mapCenter);
  } else {
    mapCenter = new google.maps.LatLng(22.29, 114.18);
  }

  if (sessionStorage.mapZoom){
    mapZoom = Number(sessionStorage.mapZoom)
  } else {
    mapZoom = 11;
  }

  var mapOptions = {
    zoom: mapZoom,
    center: mapCenter,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var markerData = {};



  if (sessionStorage){
    // console.log(sessionStorage);
    for (i in sessionStorage){
      if ((i === "mapZoom") || (i === "mapLatLng")){
        continue;
      }
      markerData = JSON.parse(sessionStorage[i]);
      markerData.latitude = Number(markerData.latitude);
      markerData.longitude = Number(markerData.longitude); 
      var location = new google.maps.LatLng(markerData.latitude, markerData.longitude);
      addMarker(location, "old", i);
    }    
  } 

  google.maps.event.addListener(map,"dragend",function(evt){
      var xyPos = map.getCenter();
      var mapLatLng = {
        lat : xyPos.lat(),
        lng : xyPos.lng()
      };
      sessionStorage.mapLatLng = JSON.stringify(mapLatLng);
  })

  google.maps.event.addListener(map,"zoom_changed",function(evt){
      sessionStorage.mapZoom = map.getZoom(); 
  })

  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, "new");
  });

}


// Add a marker to the map and push to the array.
function addMarker(location, state, index) {
  var date;
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: "images/happy.png",
    draggable : true,
});

  if (state === "new"){
    var markerData = {};
    markerData.latitude = marker.getPosition().lat().toString();
    markerData.longitude = marker.getPosition().lng().toString();
    date = new Date();
    marker.setTitle(date.toString());
    markerData.title = marker.getTitle();
    console.log(markerData.title);
    marker.storageIndex = date.getTime().toString();
    sessionStorage.setItem( marker.storageIndex, JSON.stringify(markerData));
  }

  if (state === "old"){
    marker.storageIndex = index;
  }

  addMarkerListener(marker);
  markers.push(marker);
}

function addMarkerListener(marker){
  google.maps.event.addListener(marker, "dragend", function(evt){ 
    var markerData = {};
    markerData.latitude = marker.getPosition().lat().toString();
    markerData.longitude = marker.getPosition().lng().toString();
    sessionStorage.setItem( marker.storageIndex, JSON.stringify(markerData));
  })

  google.maps.event.addListener(marker, "click", function(evt){
    if (marker.getIcon() === "images/happy.png") {
      marker.setIcon("images/sad.png");
    } else if (marker.getIcon() === "images/sad.png") {
      marker.setIcon("images/happy.png");
    }
    
  })
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
  sessionStorage.clear();
}

function resetAll(){
  clearMarkers();
  markers = [];
  sessionStorage.clear();
}
google.maps.event.addDomListener(window, 'load', initializeMap);

