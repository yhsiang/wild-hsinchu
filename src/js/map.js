L.mapbox.accessToken = 'pk.eyJ1IjoieWhzaWFuZyIsImEiOiJjaWhqMGw3ZncwNWVydGpqN2l2ajd1bnhoIn0.WSZZfcBqvSbGgtQAZK5UPw';
var map = L.mapbox.map('map', 'mapbox.comic')
    .setView([24.8047222, 120.9713889], 15);
var features = [];
// var data = [{"department":"台灣電力公司","location":"湳雅街313巷68號前 ","coordx":"120.9761284942","coordy":"24.8245604370561","desc":"電力電纜管路遷移","reasonCode":"06","startDate":"1041124","finishDate":"1041217","pipeType":"埋設地下管路,配合用戶線路遷移"},{"department":"台灣中油股份有限公司天燃氣事業部北區營業處","location":"美森街8巷5號、7號","coordx":"120.925164125133","coordy":"24.7920276201802","desc":"緊急搶修","reasonCode":"02","startDate":"1041126","finishDate":"1041128","pipeType":"天然氣管線"},{"department":"新竹瓦斯股份有限公司新竹服務中心","location":"光華二街７２巷４０弄２-1號至46號","coordx":"120.978993536079","coordy":"24.8177188142345","desc":"瓦斯搶修(零星)","reasonCode":"02","startDate":"1041127","finishDate":"1041130","pipeType":"瓦斯管線"}];
var markerList = document.getElementById('marker-list');
var icons = {
  "warn": {
    "iconUrl": "/images/contruction/2.png",
    "iconSize": [32, 32],
    "className": "dot"
  },
  "pipe": {
    "iconUrl": "/images/contruction/1.png",
    "iconSize": [32, 32],
    "className": "dot"
  },
  "danger": {
    "iconUrl": "/images/contruction/4.png",
    "iconSize": [32, 32],
    "className": "dot"
  },
  "cover": {
    "iconUrl": "/images/contruction/3.png",
    "iconSize": [32, 32],
    "className": "dot"
  }
};
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = [
        position.coords.latitude,
        position.coords.longitude,
      ];
      features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [
            position.coords.longitude,
            position.coords.latitude,
          ]
        },
        properties: {
          title: "您所在的位置",
          'marker-size': 'large',
          'marker-color': '#FFDF26',
          'marker-symbol': 'star'
        }
      });
      map.setView(pos, 15);
      $.ajax('https://hsinchu.herokuapp.com/road')
        .then(function(res) {
          generate(res.results);
        });
    }, function() {
      alert('你的瀏覽器不支援 Geolocation');
    });
} else {
    // Browser doesn't support Geolocation
    alert('你的瀏覽器不支援 Geolocation');
}


function generate(data) {


  data.forEach(function(it) {
    var icon = icons['warn'];

    if (it.pipeType.match(/自來水|污水/)) {
      icon = icons['pipe'];
    }
    if (it.pipeType.match(/埋設|遷移/)) {
      icon = icons['danger'];
    }
    if (it.pipeType.match(/手孔|孔蓋/)) {
      icon = icons['cover'];
    }

    features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          it.coordx, it.coordy
        ]
      },
      properties: {
        title:  it.desc,
        description: it.location,
        icon: icon
      }
    });
  });

  var mylayer = L.mapbox.featureLayer(features).addTo(map);

  mylayer.eachLayer(function(layer) {
    var properties = layer.toGeoJSON().properties;
     var item = markerList.appendChild(document.createElement('li'));


     item.onclick = function() {
        map.setView(layer.getLatLng(), 15);
        layer.openPopup();
     };
     if (properties.title === '您所在的位置') {
       item.innerHTML = properties.title;
       layer.openPopup();
     } else {
       var img = item.appendChild(document.createElement('img'));
       img.src = properties.icon.iconUrl;
       var text = item.appendChild(document.createElement('span'));
       text.innerHTML = properties.description;
       layer.setIcon(L.icon(properties.icon));
     }
  });
}
