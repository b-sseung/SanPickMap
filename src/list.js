import { clickList } from "./main.js";

export default function ListPage({ $target, pickList }) {

    const listBox = document.createElement('div');
    listBox.className = 'listBox';
    $target.appendChild(listBox);

    const title = `<div class="title"><p class="type">종류</p><p class="name">가게명</p><p class="address">주소</p></div>`

    var datas = Array();

    this.createList = function(city, food, sort) {
        listBox.innerHTML = '';
        datas = Array();

        for (var i = 0; i < pickList.length; i++) {
            var c = pickList[i]['address'].split(" ");
            var f = pickList[i]['type'];
        
            if (city != 'all') {
                if (c[0].indexOf(city) != 0 && c[1].indexOf(city) != 0) continue;
            }
        
            if (food != 'all') {
                if (f != food) continue;
            }
            datas.push(pickList[i]);
        }

        datas.sort(function compare(a, b) {
            var n1 = a[0];
            var n2 = b[0];

            if (sort === 'asc') {
                if (n1 > n2) {
                    return 1;
                } else {
                    return -1;
                }
            } else {
                if (n1 > n2) {
                    return -1;
                } else {
                    return 1;
                }
            }
        })

        const listData = datas.map((data, index) => {
            return  `
                <div class="list" data-index="${index}">
                    <p class="type">${data['type']}</p>
                    <p class="name">${data['name']}</p>
                    <p class="address">${data['address']}</p>
                    <img class="search" src="src/img/searchIcon.png">
                </div>
            `
        }).join('');

        listBox.innerHTML = `${title}${listData}`;

        listBox.addEventListener('click', e => {
            if (e.target.className === 'search') {
                var link = "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=";
                var big = ["서울", "세종", "인천", "대전", "대구", "광주", "부산", "울산"];
                var c = datas[index]['address'].split(" ");
                var city = big.indexOf(c[0]) == -1 ? c[1].substring(0, c[1].length-1) : c[0];
                window.open(link + encodeURI(city + " " + datas[index]['name']));
                return;
            }

            const { index } = e.target.closest('.list').dataset;
            clickList(datas[index]);
        });
    }

    this.moveList = function(data) {
        console.log(data);
        for (var i = 0; i < datas.length; i++) {
            if (datas[i]['address'] === data['address']) {
                const dom = this.changeColor(i);
                return dom.getBoundingClientRect();
            }
        }
    }

    this.changeColor = function(index) {
        const n = document.querySelectorAll('.list')[index];
        n.style.color = "red";

        setTimeout(function() {
            n.style.color = "black";
        }, 15000);

        return n;
    }
    this.createList('all', 'all', 'asc');
} 