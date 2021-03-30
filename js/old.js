'use strict';


const names = [
  'bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass',
];

// console.log(products);

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


let container = document.getElementById('container');
let containerTwo = document.getElementById('containerTwo');
let imgOne = document.getElementById('img-One');
let imgTwo = document.getElementById('img-Two');
let imgThree = document.getElementById('img-Three');

const buttonEl = document.createElement('button');

let oneIndex;
let twoIndex;
let threeIndex;


let maxClickCount = 24;
let clickCount = 0;


let viewsArr = [];
let votesArr = [];






/////////////////////////////////////////////////////////////////////////////////////////////////


function Products(name) {
  this.name = name;
  this.path = `./img/${name}.jpg`;
  this.votes = 0;
  this.views = 0;
  Products.all.push(this);

}


Products.all = [];

/////////////////////////








////////////////////////////////

for (let i = 0; i < names.length; i++) {
  new Products(names[i]);
}



function randomImg() {

  oneIndex = randomNumber(0, Products.all.length - 1);

  imgOne.src = Products.all[oneIndex].path;
  imgOne.alt = Products.all[oneIndex].name;
  imgOne.title = Products.all[oneIndex].name;
  Products.all[oneIndex].views++;

  twoIndex = randomNumber(0, Products.all.length - 1);
  if (twoIndex !== oneIndex) {

    imgTwo.src = Products.all[twoIndex].path;
    imgTwo.alt = Products.all[twoIndex].name;
    imgTwo.title = Products.all[twoIndex].name;
    Products.all[twoIndex].views++;
  }
  else {
    twoIndex = randomNumber(0, Products.all.length - 1);
    imgTwo.src = Products.all[twoIndex].path;
    imgTwo.alt = Products.all[twoIndex].name;
    imgTwo.title = Products.all[twoIndex].name;
    Products.all[twoIndex].views++;
  }

  threeIndex = randomNumber(0, Products.all.length - 1);
  if (threeIndex !== twoIndex && threeIndex !== oneIndex) {

    imgThree.src = Products.all[threeIndex].path;
    imgThree.alt = Products.all[threeIndex].name;
    imgThree.title = Products.all[threeIndex].name;
    Products.all[threeIndex].views++;
  }
  else {
    threeIndex = randomNumber(0, Products.all.length - 1);
    imgThree.src = Products.all[threeIndex].path;
    imgThree.alt = Products.all[threeIndex].name;
    imgThree.title = Products.all[threeIndex].name;
    Products.all[threeIndex].views++;
  }
  //to prevent each repet twice
  oneIndex = oneIndex +1;
  twoIndex = twoIndex +1;
  threeIndex = threeIndex +1;


}

randomImg();










container.addEventListener('click', imgClick);

function imgClick(event) {


  if (event.target.id !== 'container') {


    if (clickCount < maxClickCount) {
      clickCount++;

      if (event.target.id === imgOne.id) {
        Products.all[oneIndex].votes++;


      }
      else if (event.target.id === imgTwo.id) {
        Products.all[twoIndex].votes++;

      }
      else {

        Products.all[threeIndex].votes++;


      }
    }



    else {
      containerTwo.appendChild(buttonEl);

      container.removeEventListener('click', imgClick);
    }
  }
  randomImg();

}





function storageSitting(){
  let savedProduct=JSON.stringify(Products.all);
  localStorage.setItem('Products', savedProduct);

}


function storageGetting(){
  let gettenProduct=localStorage.getItem('Products');
  let normalGettenProduct=JSON.parse(gettenProduct);
  Products.all = normalGettenProduct;
  randomImg();
}




//////////////////////////////////////////////////

buttonEl.addEventListener('click', buttonClick);




function buttonClick() {



  storageSitting();


  const tableEl = document.createElement('table');
  containerTwo.appendChild(tableEl);

  let dataRaw = document.createElement('tr');
  tableEl.appendChild(dataRaw);


  let dataCells = document.createElement('td');
  dataRaw.appendChild(dataCells);
  dataCells.textContent = 'name';

  for (let i = 0; i < names.length; i++) {
    let dataCells = document.createElement('td');
    dataRaw.appendChild(dataCells);
    dataCells.textContent = Products.all[i].name;

  }
  /////////////////
  dataRaw = document.createElement('tr');
  tableEl.appendChild(dataRaw);


  dataCells = document.createElement('td');
  dataRaw.appendChild(dataCells);
  dataCells.textContent = 'views';

  for (let i = 0; i < names.length; i++) {
    viewsArr.push(Products.all[i].views);
    let dataCells = document.createElement('td');
    dataRaw.appendChild(dataCells);
    dataCells.textContent = Products.all[i].views;


  }

  ///////////////////
  dataRaw = document.createElement('tr');
  tableEl.appendChild(dataRaw);


  dataCells = document.createElement('td');
  dataRaw.appendChild(dataCells);
  dataCells.textContent = 'votes';

  for (let i = 0; i < names.length; i++) {
    votesArr.push(Products.all[i].votes);

    // let savedResults=JSON.stringify(votesArr.push(Products.all[i].votes));
    // localStorage.setItem('results', savedResults);

    let dataCells = document.createElement('td');
    dataRaw.appendChild(dataCells);
    dataCells.textContent = Products.all[i].votes;

  }

  barChart();

}






function barChart (){
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
  // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: names,
      datasets: [{
        label: 'votes',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: votesArr,
      },
      {
        label: 'views',
        backgroundColor: 'rgb(135, 99, 255)',
        borderColor: 'rgb(255, 99, 132)',
        data: viewsArr,
      }]
    },

    // Configuration options go here
    options: {}
  });
}

///////////////////////////////////////////////////////////////////




storageGetting();




