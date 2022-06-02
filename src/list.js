import { pickList } from "./store.js";

export default function ListPage({ $target }) {

    const listBox = document.createElement('div');
    listBox.className = 'listBox';
    $target.appendChild(listBox);

    const title = document.createElement('div');
    title.className = 'title';
    const lType = document.createElement('p');
    lType.className = 'type';
    lType.innerText = '종류';
    const lName = document.createElement('p');
    lName.className = 'name';
    lName.innerText = '가게명';
    const lAddress = document.createElement('p');
    lAddress.className = 'address';
    lAddress.innerText = '주소';

    title.append(lType, lName, lAddress);
    listBox.appendChild(title);

    var lists = Array();
    var datas = Array();
    this.createList = function(city, food, sort) {
        for (var i = 0; i < lists.length; i++) {
            listBox.removeChild(lists[i]);
        }
        lists = Array();
        datas = Array();

        for (var i = 0; i < pickList.length; i++) {
            var c = pickList[i][1].split(" ");
            var f = pickList[i][2];
        
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

        for (var i = 0; i < datas.length; i++) {
            const box = document.createElement('div');
            box.className = 'list';
            const t = document.createElement('p');
            t.className = 'type';
            const n = document.createElement('p');
            n.className = 'name';
            const a = document.createElement('p');
            a.className = 'address';
            const s = document.createElement('img');
            s.className = 'search';

            t.innerText = datas[i][2];
            n.innerText = datas[i][0];
            a.innerText = datas[i][1];
            s.src = '/src/img/searchIcon.png';

            box.append(t, n, a, s);
            listBox.appendChild(box);

            lists.push(box);
        }
    }

    this.createList('all', 'all', 'asc');
//   ["카페야그", "전남 담양군 창평면 의병로 37", "카페", "35.2308827", "127.0089997"],
} 