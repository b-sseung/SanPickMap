function searchAddressToCoordinate(address) {
    naver.maps.Service.geocode({
        query: address
      }, function(status, response) {
        if (status === naver.maps.Service.Status.ERROR) {
          if (!address) {
            return alert('주소를 확인하세요');
          }
          return alert('Geocode Error, address:' + address);
        }
    
        var item = response.v2.addresses[0];
        
        // resultBox.innerHTML = '';

        const box = document.createElement("div");
        box.className = "inResult";
        const title = document.createElement("div");
        title.className = "title";
        title.innerText = address + " : ";
        
        const result = document.createElement("div");
        result.className = "result";
        result.innerText = "\"" + item.y + "\", " + "\"" + item.x + "\"";

        box.appendChild(title);
        box.appendChild(result);
        resultBox.appendChild(box);

        var text = result.innerText;
        const textarea = document.createElement('textarea');
        textarea.value = text;
        resultBox.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        resultBox.removeChild(textarea);

        console.log(item);

        input.focus();

    });
}

const input = document.getElementById("input");
const button = document.querySelector(".button");

const resultBox = document.querySelector(".resultBox");

button.addEventListener('click', function(){
    if (!input.value) return alert("주소를 입력해주세요");
    searchAddressToCoordinate(input.value);
    input.value = '';
});

input.addEventListener('keydown', function(e) {
    if (e.keyCode != 13) return;

    if (!input.value) return alert("주소를 입력해주세요");
    searchAddressToCoordinate(input.value);
    input.value = '';
});