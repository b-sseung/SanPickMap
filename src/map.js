// import pickList from "./list.js";

export default function MapPage({ $target }) {
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
    new naver.maps.Marker({
      position: curLoca,
      map: map,
    });
  }

  var map = new naver.maps.Map('map', mapOptions);

  var locationBtnHtml = '<img class="locationBtn" src="/src/img/locationButton.png">';
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

  navigator.geolocation.getCurrentPosition(onSuccessGeolocation);
}