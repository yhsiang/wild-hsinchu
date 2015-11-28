L.mapbox.accessToken = 'pk.eyJ1IjoieWhzaWFuZyIsImEiOiJjaWhqMGw3ZncwNWVydGpqN2l2ajd1bnhoIn0.WSZZfcBqvSbGgtQAZK5UPw';
var map = L.mapbox.map('map', 'mapbox.comic')
    .setView([24.8047222, 120.9713889], 15);

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = [
        position.coords.latitude,
        position.coords.longitude
      ];
      map.setView(pos, 15);

    }, function() {
      alert('你的瀏覽器不支援 Geolocation');
    });
} else {
    // Browser doesn't support Geolocation
    alert('你的瀏覽器不支援 Geolocation');
}

var url = 'http://pipe.hccg.gov.tw/HCPEMS/CMMDGS/Work.ashx?callback=jQuery191032463742536492646_1448711248017&FunctionName=getWorkAreaList&_=1448711248018';
var data = [{"department":"台灣電力公司",
"location":"湳雅街313巷68號前 ",
"coordx":"120.9761284942","coordy":"24.8245604370561",
"desc":"電力電纜管路遷移",
"reasonCode":"06","startDate":"1041124","finishDate":"1041217",
"pipeType":"埋設地下管路,配合用戶線路遷移"},{"department":"台灣中油股份有限公司天燃氣事業部北區營業處","location":"美森街8巷5號、7號","coordx":"120.925164125133","coordy":"24.7920276201802","desc":"緊急搶修","reasonCode":"02","startDate":"1041126","finishDate":"1041128","pipeType":"天然氣管線"},{"department":"新竹瓦斯股份有限公司新竹服務中心","location":"光華二街７２巷４０弄２-1號至46號","coordx":"120.978993536079","coordy":"24.8177188142345","desc":"瓦斯搶修(零星)","reasonCode":"02","startDate":"1041127","finishDate":"1041130","pipeType":"瓦斯管線"}];
var markerList = document.getElementById('marker-list');

var geo_data = data.map(function(it) {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [
        it.coordx, it.coordy
      ]
    },
    properties: {
      title: it.department,
      description: it.location + " " + it.desc,
      'marker-size': 'large',
      'marker-color': '#BE9A6B',
      'marker-symbol': 'cafe'
    }
  };
});
var mylayer = L.mapbox.featureLayer(geo_data).addTo(map);

mylayer.eachLayer(function(layer) {
   var item = markerList.appendChild(document.createElement('li'));
   item.innerHTML = layer.toGeoJSON().properties.title;
   item.onclick = function() {
      map.setView(layer.getLatLng(), 14);
      layer.openPopup();
   };
});
