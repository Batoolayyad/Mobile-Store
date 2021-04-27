'use strict';

function Mobile(name, type) {
    this.name = name;
    this.type = type;
    this.price = getRandomPrice(100, 500);
    allMobiles.push(this);
    updateData();
}
let allMobiles = [];

function getRandomPrice(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


let table = document.createElement('table');
let tableDiv = document.getElementById('table-div');
tableDiv.appendChild(table);

let headerArray = ['user', 'Type', 'Price', 'Condition'];
function tableHeader() {
    let headerRow = document.createElement('tr');
    table.appendChild(headerRow);
    for (let i = 0; i < headerArray.length; i++) {
        let th = document.createElement('th');
        headerRow.appendChild(th);
        th.textContent = headerArray[i];
    }

};
tableHeader();

let condition = ''
Mobile.prototype.render = function () {

    let dataRow = document.createElement('tr');
    table.appendChild(dataRow);

    let userTd = document.createElement('td');
    dataRow.appendChild(userTd);
    userTd.textContent = this.name;

    let typeTd = document.createElement('td');
    dataRow.appendChild(typeTd);
    typeTd.textContent = this.type;

    let priceTd = document.createElement('td');
    dataRow.appendChild(priceTd);
    priceTd.textContent = this.price;

    if (this.price > 200) {
        condition = 'new';
    } else {
        condition = 'used'
    };

    let conditionTd = document.createElement('td');
    dataRow.appendChild(conditionTd);
    conditionTd.textContent = condition;
};


let form = document.getElementById('form');
form.addEventListener('submit', submitter);

function submitter(event) {
    event.preventDefault();
    let name = event.target.user.value;
    let type = event.target.type.value;
    let addedMobile = new Mobile(name, type);
    addedMobile.render();
};

function updateData() {
    let stringArray = JSON.stringify(allMobiles);
    localStorage.setItem('Mobile', stringArray);
}

function getData() {
    let userData = localStorage.getItem('Mobile');
    let parsedObject = JSON.parse(userData);
    if (parsedObject) {
        for (let i = 0; i < parsedObject.length; i++) {
            new Mobile(parsedObject[i].name, parsedObject[i].type)
        }
    }
};
getData();

for(let i=0;i<allMobiles.length;i++){
    allMobiles[i].render();
}