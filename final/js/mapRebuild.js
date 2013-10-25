var map;
var markers = [];
var currentMarker = null;



function initializeMap() {
  var mapCenter , mapZoom;

  if (localStorage.mapZoom){
    mapZoom = Number(localStorage.mapZoom)
  } else {
    mapZoom = 18;
  }

  var mapOptions = {
    // center: mapCenter,
    zoom: mapZoom,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  if (localStorage.mapLatLng){
    var temp = JSON.parse(localStorage.mapLatLng);
    mapCenter = new google.maps.LatLng(temp.lat, temp.lng);
    map.setCenter(mapCenter);

    var markerData = {};
    for (i in localStorage){
      if ((i === "mapZoom") || (i === "mapLatLng")){
        continue;
      }
      markerData = JSON.parse(localStorage[i]);
      markerData.latitude = Number(markerData.latitude);
      markerData.longitude = Number(markerData.longitude); 
      var location = new google.maps.LatLng(markerData.latitude, markerData.longitude);
      addMarker("old", location, i, markerData.title, markerData.icon);
    }  

  } else {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos
        // content: 'Location found using HTML5.'
      });
      map.setCenter(pos);

      var temp = {};
      temp.lat = pos.lat();
      temp.lng = pos.lng();
      localStorage.mapLatLng = JSON.stringify(temp);

      addMarker("new", pos); 

    });
  }




  google.maps.event.addListener(map,"dragend",function(evt){
      var xyPos = map.getCenter();
      var mapLatLng = {
        lat : xyPos.lat(),
        lng : xyPos.lng()
      };
      localStorage.mapLatLng = JSON.stringify(mapLatLng);
  })

  google.maps.event.addListener(map,"zoom_changed",function(evt){
      localStorage.mapZoom = map.getZoom(); 
  })

  google.maps.event.addListener(map, 'click', function(event) {
    addMarker("new", event.latLng);
  });

}


// Add a marker to the map and push to the array.
function addMarker(state, location, index, title, icon) {
  var date;
  var marker = new google.maps.Marker({
    position: location,
    map: map,
    icon: "images/happy.png",
    draggable : true
});


  if (state === "new"){
    var markerData = {};
    markerData.latitude = marker.getPosition().lat().toString();
    markerData.longitude = marker.getPosition().lng().toString();
    markerData.icon = marker.getIcon();
    date = new Date();
    marker.setTitle(date.toString());
    markerData.title = marker.getTitle();
    // console.log(markerData.title);
    marker.storageIndex = date.getTime().toString();
    localStorage.setItem( marker.storageIndex, JSON.stringify(markerData));
    currentMarker = marker;
  }

  if (state === "old"){
    marker.storageIndex = index;
    marker.setTitle(title);
    marker.setIcon(icon);
  }

  addMarkerListener(marker);
  markers.push(marker);
} //end addMarker()

function addMarkerListener(marker){
  google.maps.event.addListener(marker, "dragend", function(evt){ 
    var markerData = JSON.parse(localStorage.getItem(marker.storageIndex));
    markerData.latitude = marker.getPosition().lat().toString();
    markerData.longitude = marker.getPosition().lng().toString();
    localStorage.setItem( marker.storageIndex, JSON.stringify(markerData));
  })

  google.maps.event.addListener(marker, "click", function(evt){
    if (marker.getIcon() === "images/happy.png") {
      marker.setIcon("images/sad.png");
      var markerData = JSON.parse(localStorage.getItem(marker.storageIndex));
      markerData.icon = "images/sad.png";
      localStorage.setItem( marker.storageIndex, JSON.stringify(markerData));

    } else if (marker.getIcon() === "images/sad.png") {
      marker.setIcon("images/happy.png");
      var markerData = JSON.parse(localStorage.getItem(marker.storageIndex));
      markerData.icon = "images/happy.png";
      localStorage.setItem( marker.storageIndex, JSON.stringify(markerData));
    }
    currentMarker = marker;

  })

  // google.maps.event.addListener(marker, "mouseover", function(evt){
  //   marker.setIcon("images/happyBig.png");
  //   console.log("mouseover");
  // })

  //  google.maps.event.addListener(marker, "mouseout", function(evt){
  //   marker.setIcon("images/happy.png");
  //   console.log("mouseover");
  // })
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
  localStorage.clear();
}

function resetAll(){
  clearMarkers();
  markers = [];
  localStorage.clear();
}

function deleteCurrentMarker(){
  if (currentMarker !== null) {
    currentMarker.setMap(null);
    localStorage.removeItem(currentMarker.storageIndex);
    currentMarker = null;
  }
}


google.maps.event.addDomListener(window, 'load', initializeMap);