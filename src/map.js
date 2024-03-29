import { clickMap } from "./main.js"

export default function MapPage({ $target, pickList }) {
  var latitude, longitude;
  const mapContent = document.createElement("div");
  mapContent.id = "map";
  mapContent.className = "map";
  $target.appendChild(mapContent);

  var mapOptions = {
    mapDataControl: false,
    zoom: 10,
    minZoom: 10, //지도의 최소 줌 레벨 설정
    zoomControl: true, //줌 컨트롤의 표시 여부
    zoomControlOptions: { //줌 컨트롤의 옵션
      position: naver.maps.Position.TOP_RIGHT
    },
    logoControl: true,
    logoControlOptions: {
      position: naver.maps.Position.BOTTOM_LEFT
    },
    scaleControl: true,
    scaleControlOptions: {
      position: naver.maps.Position.BOTTOM_LEFT
    }
  };

  var onSuccessGeolocation = function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    var curLoca = new naver.maps.LatLng(latitude, longitude);
    map.setCenter(curLoca);
    map.setZoom(17);
    // new naver.maps.Marker({
    //   position: curLoca,
    //   map: map,
    // });
  }

  var onErrorGeolocation = function() {
    latitude = "35.1600320";
    longitude = "126.8513380"
    var curLoca = new naver.maps.LatLng(latitude, longitude);
    map.setCenter(curLoca);
    map.setZoom(17);
    new naver.maps.Marker({
      position: curLoca,
      map: map,
    });
  }
  var map = new naver.maps.Map('map', mapOptions);

  var locationBtnHtml = '<img class="locationBtn" src="src/img/locationButton.png">';
  naver.maps.Event.once(map, 'init', function() {
    //customControl 객체 이용하기
    var customControl = new naver.maps.CustomControl(locationBtnHtml, {
        position: naver.maps.Position.RIGHT_BOTTOM
    });

    customControl.setMap(map);

    naver.maps.Event.addDOMListener(customControl.getElement(), 'click', function() {
        map.setCenter(new naver.maps.LatLng(latitude, longitude));
    });
  });
  
  var markers = Array();
  var informs = Array();
  var datas = Array();
  this.createMarker = function(city, food) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = Array();
    datas = Array();
    informs = Array();
    for (var i = 0; i < pickList.length; i++) {
      var c = pickList[i]['address'].split(" ");
      var f = pickList[i]['type'];
      
      if (city != 'all') {
        if (c[0].indexOf(city) != 0 && c[1].indexOf(city) != 0) continue;
      }

      if (food != 'all') {
        if (f != food) continue;
      }

      var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(pickList[i]['longitude'], pickList[i]['latitude']),
        map: map
      });

      var contentString = 
        `<div class="information"><div>${pickList[i]['name']}</div></div>`;
      var infowindow = new naver.maps.InfoWindow({
        content: contentString
      });

      markers.push(marker);
      datas.push(pickList[i]);
      informs.push(infowindow);
    }
    var num = Math.floor(Math.random() * datas.length);
    map.setCenter(new naver.maps.LatLng(datas[num]['longitude'], datas[num]['latitude']));

    markers.forEach((marker, index) => {
      naver.maps.Event.addListener(marker, 'click', function() {
        if (informs[index].getMap()) {
          informs[index].close();
          var result = confirm("리스트로 이동하시겠습니까?");
          if (result) clickMap(datas[index]);
        } else {
          informs[index].open(map, marker);
        }
      });
    });
  }

  this.moveCenter = function(data) {
    map.setCenter(new naver.maps.LatLng(data['longitude'], data['latitude']));

    for (var i = 0; i < datas.length; i++) {
      if (datas[i]['address'] === data['address']) {
        if (informs[i].getMap()) {
          informs[i].close();
        } else {
          informs[i].open(map, markers[i]);
        }
      }
    }
  }

  navigator.geolocation.getCurrentPosition(onSuccessGeolocation, onErrorGeolocation);
  this.createMarker('all', 'all');
}