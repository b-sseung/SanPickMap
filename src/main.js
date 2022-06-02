import ListPage from "./list.js";
import MapPage from "./map.js";
import { pickList } from "./store.js";

const target = document.querySelector(".App");
const mapPage = new MapPage({$target: target});
const listPage = new ListPage({$target: target});

const filterButton = document.querySelector(".filterBox .button");
const filter = document.querySelector(".filter");
const city = document.querySelector(".city");
const food = document.querySelector(".food");
const sort = document.querySelector(".sort");

const resetButton = document.querySelector(".reset");

filter.style.display = "none";

var cityList = new Array();
var foodList = new Array();

for (var i = 0; i < pickList.length; i++) {
    var c = pickList[i][1].split(" ");
    var cName = '';
    var f = pickList[i][2];
    var big = ["서울", "세종", "인천", "대전", "대구", "광주", "부산"];
    if (big.indexOf(c[0]) != -1) {
        cName = c[0] 
    } else {
        cName = c[1].substring(0, c[1].length-1);
    }

    if (cityList.indexOf(cName) == -1) cityList.push(cName);
    if (foodList.indexOf(f) == -1) foodList.push(f);
}

cityList.sort();
foodList.sort();

for (var i = 0; i < cityList.length; i++) {
    var temp = document.createElement('option');
    temp.value = cityList[i];
    temp.text = cityList[i];
    city.appendChild(temp);
}

for (var i = 0; i < foodList.length; i++) {
    var temp = document.createElement('option');
    temp.value = foodList[i];
    temp.text = foodList[i];
    food.appendChild(temp);
}

var openclose = true;
filterButton.addEventListener('click', function() {
    if (openclose) {
        filterButton.innerText = "검색 조건 ▲";
        filter.style.display = "flex";
    } else {
        filterButton.innerText = "검색 조건 ▼";
        filter.style.display = "none"; 
    }
    openclose = !openclose;
});

resetButton.addEventListener('click', function() {
    city.value = 'all';
    food.value = 'all';
    sort.value = 'asc';
    mapPage.createMarker('all', 'all');
    listPage.createList('all', 'all', 'asc');
});

city.addEventListener('change', function() {
    var c = city.value;
    var f = food.value;
    var s = sort.value;
    mapPage.createMarker(c, f);
    listPage.createList(c, f, s);
});

food.addEventListener('change', function() {
    var c = city.value;
    var f = food.value;
    var s = sort.value;
    mapPage.createMarker(c, f);
    listPage.createList(c, f, s);
});

sort.addEventListener('change', function() {
    var c = city.value;
    var f = food.value;
    var s = sort.value;
    mapPage.createMarker(c, f);
    listPage.createList(c, f, s);
});

// window.history.pushState(undefined, "타이틀", "/home");

