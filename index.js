
// Map via Mapbox GL
mapboxgl.accessToken = "pk.eyJ1IjoiYWxpbm94aW91cyIsImEiOiJjajd1dzJoZno2N2l6MnhxdWxnbGI4cnVpIn0.ozx-ZBw2k_jmShmQ5NpnCg";

  // initialize map
  var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
      center: [-122.613, 45.628], // starting position
      zoom: 10 // starting zoom
  });

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
});

document.getElementById('geocoder').appendChild(geocoder.onAdd(map))

var url = 'https://raw.githubusercontent.com/apence23/Ada1/master/wells.geojson';






map.on('load', function(){

 var layers = ['wetlands', 'wells'];
 var layerList = document.getElementById('menu');
 var inputs = layerList.getElementsByTagName('input');

 function switchLayer(layer) {
	var layerId = layer.target.id;
	map.setStyle('mapbox://styles/mapbox/' + layerId + '-v9');
	map.on('style.load', function() {
		loadwetlands();
	});

	}

	for (var i = 0; i < inputs.length; i++) {
            inputs[i].onclick = switchLayer; 
    }

	loadwetlands()
});
		
  function loadwetlands() {
	  map.addSource('wetlands', {
		type: 'vector',
		url: 'mapbox://alinoxious.77c6oux0'
		});

	   map.addLayer({
			"id": "wetlands",
			"type": "fill",
			"source": "wetlands",
			"source-layer" : "Wetlands_new2-7htuzl",
			"layout": {
            'visibility': 'visible'
					}
  });
	map.addSource('wells', {
        type: 'geojson',
        data: url
    });
    map.addLayer({
        'id': 'wells',
        'type': 'circle',
        'source': 'wells',
        'layout': {
            'visibility': 'visible'
            
        },
        
    });

}



var toggleableLayerIds = ['wetlands','wells'];
for (var i = 0; i < toggleableLayerIds.length; i++) {
    var id = toggleableLayerIds[i];

    var link = document.createElement('a');
    link.href = '#';
    link.className = 'active';
    link.textContent = id;

    link.onclick = function (e) {
        var clickedLayer = this.textContent;
        e.preventDefault();
        e.stopPropagation();

        var visibility = map.getLayoutProperty(clickedLayer, 'visibility');

        if (visibility === 'visible') {
            map.setLayoutProperty(clickedLayer, 'visibility', 'none');
            this.className = '';
        } else {
            this.className = 'active';
            map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
        }
    };

    var layers = document.getElementById('toggle');
    layers.appendChild(link);
}





