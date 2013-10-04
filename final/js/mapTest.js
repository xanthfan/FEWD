
//======================================Helper Functions======================================


    //initialize() creates the map and the markers. It is called every time the map HTML page is revisited in its iframe.
    //The if this is a subsequent reloading of the map page, then the last position and zoom of the map and the position of the markers are recalled from objects stored with the SessionStorage variable. 
    function initialize() {
      var coords, mapOptions, map, marker1, marker2;
      var mapLatLng, mapZoom, happyLatLng, sadLatLng;
      var markerList = [];

     function initLatLng(whichMarker, index){
        if (!sessionStorage[whichMarker]){
          markerLatLng = new google.maps.LatLng(mapLatLng.lat(), mapLatLng.lng());
          return markerLatLng;
        } else {
          var coords = JSON.parse(sessionStorage[whichMarker]);
          markerLatLng = new google.maps.LatLng(coords.lat, coords.lng);
          return markerLatLng;
        }
      }

    function addMarkerListener(marker, sessionStorageMarker){
      google.maps.event.addListener(marker, "dragend", function(evt){ 
        var xyPos = marker.getPosition();
        var MarkerLatLng = {
          lat : xyPos.lat(),
          lng : xyPos.lng()
        };
        sessionStorage[sessionStorageMarker] = JSON.stringify(MarkerLatLng);
      })
    }



      if (!sessionStorage.mapLatLng){
        mapLatLng = new google.maps.LatLng(jsonstr[0].HK.x, jsonstr[0].HK.y);
      } else {
        coords = JSON.parse(sessionStorage.mapLatLng);
        mapLatLng = new google.maps.LatLng(coords.lat, coords.lng);
      }

      if (!sessionStorage.mapZoom){
        mapZoom = jsonstr[0].HK.zoom;      
      } else {
        mapZoom = Number(sessionStorage.mapZoom);
      }

      mapOptions = {
        center: mapLatLng,
        zoom: mapZoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      map = new google.maps.Map(document.getElementById("map-canvas"),
          mapOptions);

    // Creating the latitude/longitude object for each map marker
      happyLatLng = initLatLng("happy", 1);
      sadLatLng = initLatLng("sad", 2);
      funnyLatLng = initLatLng("funny", 3);

      markerList[0] = new google.maps.Marker({        
          position: happyLatLng,
          map: map,
          draggable:true,
          title:"Happy!",
          icon: "images/happy.png"
        });

      markerList[1] = new google.maps.Marker({
          position: sadLatLng,
          map: map,
          draggable:true,
          title:"Sad.",
          icon: "images/sad.png"
        });

      markerList[2] = new google.maps.Marker({
          position: funnyLatLng,
          map: map,
          draggable:true,
          title:"Funny!",
          icon: "images/happy.png"
        });

        // Record the position of the map if it gets shifted by the user
        google.maps.event.addListener(map,"dragend",function(evt){
            var xyPos = map.getCenter();
            var MapLatLng = {
              lat : xyPos.lat(),
              lng : xyPos.lng()
            };
            sessionStorage.mapLatLng = JSON.stringify(MapLatLng);
        })

        google.maps.event.addListener(map,"zoom_changed",function(evt){
            sessionStorage.mapZoom = map.getZoom(); 
        })


        addMarkerListener(markerList[0], "happy");

        addMarkerListener(markerList[1], "sad");

        addMarkerListener(markerList[2], "funny");      
    }
    // End initialize()




    function reloadPage(){
      location.reload();
    }



google.maps.event.addDomListener(window, 'load', initialize);
