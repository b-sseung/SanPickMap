export default function MapPage({ $target }) {
  const mapContent = document.createElement("div");
  mapContent.id = "map";
  mapContent.className = "map";
  $target.appendChild(mapContent);

  var mapOptions = {
    center: new naver.maps.LatLng(37.3595704, 127.105399),
    mapDataControl: false,
    zoom: 10
  };

  var onSuccessGeolocation = function(position) {
    var curLoca = new naver.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map.setCenter(curLoca);
    map.setZoom(17);
    new naver.maps.Marker({
      position: curLoca,
      map: map,
    });
  }

  var map = new naver.maps.Map('map', mapOptions);

  navigator.geolocation.getCurrentPosition(onSuccessGeolocation);
}