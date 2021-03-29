'use strict';


const names = [
  'bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass',
];

// console.log(products);

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


let container = document.getElementById('container');
let containerTwo =document.getElementById('containerTwo');
let imgOne = document.getElementById('img-One');
let imgTwo = document.getElementById('img-Two');
let imgThree = document.getElementById('img-Three');

let oneIndex;
let twoIndex;
let threeIndex;



let clickCount=0;

/////////////////////////////////////////////////////////////////////////////////////////////////


function Products(name){
  this.name = name;
  this.path = `./img/${name}.jpg`;
  this.votes = 0;
  this.views =0;
  Products.all.push(this);
}


Products.all = [];



for(let i=0; i<names.length;i++){
  new Products(names[i]);
}



function randomImg(){

  oneIndex = randomNumber(0,Products.all.length-1);

  imgOne.src = Products.all[oneIndex].path;
  imgOne.alt = Products.all[oneIndex].name;
  imgOne.title = Products.all[oneIndex].name;



  twoIndex = randomNumber(0,Products.all.length-1);
  if(oneIndex === twoIndex){
    twoIndex = randomNumber(0,Products.all.length-1);
    imgTwo.src = Products.all[twoIndex].path;
    imgTwo.alt = Products.all[twoIndex].name;
    imgTwo.title = Products.all[twoIndex].name;

  }
  else{
    imgTwo.src = Products.all[twoIndex].path;
    imgTwo.alt = Products.all[twoIndex].name;
    imgTwo.title = Products.all[twoIndex].name;
  }

  threeIndex = randomNumber(0,Products.all.length-1);
  if (threeIndex === twoIndex && threeIndex === oneIndex){
    threeIndex = randomNumber(0,Products.all.length-1);
    imgThree.src = Products.all[threeIndex].path;
    imgThree.alt = Products.all[threeIndex].name;
    imgThree.title = Products.all[threeIndex].name;
  }
  else{
    imgThree.src = Products.all[threeIndex].path;
    imgThree.alt = Products.all[threeIndex].name;
    imgThree.title = Products.all[threeIndex].name;
  }

}


randomImg();




// if(clickCount === 3){
//   const buttonEl = document.createElement('button');
//   containerTwo.appendChild(buttonEl);
// }




container.addEventListener('click', imgClick);

function imgClick(event){

  if(event.target.id !== 'container')
  {


    if(event.target.id === imgOne.id)
    {
      Products.all[oneIndex].votes++;
      Products.all[oneIndex].views++;
      Products.all[twoIndex].views++;
      Products.all[threeIndex].views++;
      clickCount++;

    }
    else if(event.target.id === imgTwo.id){
      Products.all[twoIndex].votes++;
      Products.all[oneIndex].views++;
      Products.all[twoIndex].views++;
      Products.all[threeIndex].views++;
      clickCount++;
    }
    else{
      Products.all[threeIndex].votes++;
      Products.all[oneIndex].views++;
      Products.all[twoIndex].views++;
      Products.all[threeIndex].views++;
      clickCount++;
    }

  }



  randomImg();


  if (clickCount === 3){
    buttonClick();
  }
}



imgClick();



const buttonEl = document.createElement('button');
containerTwo.appendChild(buttonEl);



buttonEl.addEventListener('click', buttonClick);




const tableEl=document.createElement('table');
containerTwo.appendChild(tableEl);


function buttonClick(event){

  let dataRaw=document.createElement('tr');
  tableEl.appendChild(dataRaw);


  let dataCells=document.createElement('td');
  dataRaw.appendChild(dataCells);
  dataCells.textContent = 'name';

  for (let i=0; i< names.length; i++)
  {
    let dataCells=document.createElement('td');
    dataRaw.appendChild(dataCells);
    dataCells.textContent = Products.all[i].name;

  }
  /////////////////
  dataRaw=document.createElement('tr');
  tableEl.appendChild(dataRaw);


  dataCells=document.createElement('td');
  dataRaw.appendChild(dataCells);
  dataCells.textContent = 'views';

  for (let i=0; i< names.length; i++)
  {
    let dataCells=document.createElement('td');
    dataRaw.appendChild(dataCells);
    dataCells.textContent = Products.all[i].views;

  }

  ///////////////////
  dataRaw=document.createElement('tr');
  tableEl.appendChild(dataRaw);


  dataCells=document.createElement('td');
  dataRaw.appendChild(dataCells);
  dataCells.textContent = 'votes';

  for (let i=0; i< names.length; i++)
  {
    let dataCells=document.createElement('td');
    dataRaw.appendChild(dataCells);
    dataCells.textContent = Products.all[i].votes;

  }
}

buttonClick();
