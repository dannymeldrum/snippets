var map;
var locations = [];
var key = config.API_KEY;
var sheet = config.SHEET_ID;

window.onload = loadScript;

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3&key='+key+'&callback=initialize';
  document.body.appendChild(script);
}

function initialize() {
  $.getJSON("https://sheets.googleapis.com/v4/spreadsheets/"+sheet+"/values/Sheet1!A2:D?key="+key+"", function(data) {
    	$(data.values).each(function() {
    		var location = {};
				location.title = this[0];
        location.address = this[1];
				location.latitude = parseFloat(this[2]);
        location.longitude = parseFloat(this[3]);
        locations.push(location);
    	});

      var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(0, 0)
      };

      var map = new google.maps.Map(document.getElementById('map'), mapOptions);
      setLocations(map, locations);
  });
}

function setLocations(map, locations) {
  var bounds = new google.maps.LatLngBounds();
  var infowindow = new google.maps.InfoWindow({
    content: "Content String"
  });

  for (var i = 0; i < locations.length; i++) {
    var new_marker = createMarker(map, locations[i], infowindow);
    bounds.extend(new_marker.position);
  }
  map.fitBounds(bounds);
}

function createMarker(map, location, infowindow) {
  var position = {
    lat: parseFloat(location.latitude),
    lng: parseFloat(location.longitude)
  };

  var marker = new google.maps.Marker({
    position: position,
    map: map,
    title: location.title,
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent('<div><strong>' + location.title  + '</strong></div>' +
    '<div>' + location.address  + '</div>');
    infowindow.open(map, marker);
  });

  return marker;
}