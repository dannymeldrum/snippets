var map;
var locations = [];

function initialiseMap() {
  $.getJSON("https://sheets.googleapis.com/v4/spreadsheets/{{SHEET_ID}}/values/Sheet1!A2:D?key={{API_KEY}}", function(data) {
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