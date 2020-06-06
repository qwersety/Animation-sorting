"use strict";

document.addEventListener("DOMContentLoaded", start);
function start() {
  // число цифр в сортировке
  let charCount=20;
  let levelCount=1;
  let speed=1;
  //массив для сортировки
  let arrayBefore=[];
  for (let i = 0; i < charCount; i++) {
    arrayBefore[i]=randomInteger(0,99);
  }
  // маасив для сбора данных по полученному массиву
  // itemNumber-порядковый номер; generatedArray-сам сгенерированный массив; sortPosition-позиция в отсортированном массиве;
  // levelPosition-позиция по вертикали (уровень размещения); leftChild, rightChild - дети в дереве; parent - родитель в дереве
  let arrayBase=[
    ['itemNumber    - '],
    ['generatedArray- '],
    ['sortPosition  - '],
    ['levelPosition - '],
    ['leftChild     - '],
    ['rightChild    - '],
    ['parent        - ']
  ];
  // все до след комментария - процесс заполнения "arrayBase"
  for (let i = 1; i <= charCount; i++) {
    arrayBase[0][i]=i;
    arrayBase[1][i]=arrayBefore[i-1];
    arrayBase[4][i]='';
    arrayBase[5][i]='';
    arrayBase[6][i]='';
  }
  let arrayPosition=bubbleSort(arrayBefore, charCount);
  for (let j = 0; j < charCount; j++)
    for (let i = 0; i < charCount; i++) {
      if (arrayPosition[i]+1==arrayBase[0][j+1]){
        arrayBase[2][j+1]=i+1;
        break;
    }
  }
  arrayBase=familyDistribution(arrayBase, charCount);
 // вывод в консоль сформированного массива
  for (let j = 0; j < 7; j++){
    console.log(j+' '+arrayBase[j]);
  }

  for (let i = 1; i <= charCount; i++) {
    if (arrayBase[3][i]!='' && arrayBase[3][i]>levelCount)
      levelCount=arrayBase[3][i]
  }
  document.getElementById('sortingTree').style.setProperty('grid-template-columns', `repeat(${charCount}, 1fr)`);
  document.getElementById('sortingTree').style.setProperty('grid-template-rows', `repeat(${levelCount}, 1fr)`);
  for (let i = 1; i <= charCount*levelCount+charCount; i++) {
    document.getElementById('sortingTree').innerHTML+=`<div id='cell-${i}' class='cell'></div>`;
  }
  // вставка чисел на законные места
  /*for (let i = 1; i <= charCount; i++) {
    //console.log(`cell-${(arrayBase[3][i]-1)*charCount+arrayBase[2][i]+charCount}`);
    document.getElementById(`cell-${(arrayBase[3][i]-1)*charCount+arrayBase[2][i]+charCount}`).innerHTML=`<div id='pointTest-${i}' class='pointTest'><div class='inPoint'>${arrayBase[1][i]}</div></div>`;
  }*/

  let halfCharCount=Math.trunc(charCount/2)+1;
  for (let i = 1; i <= charCount; i++) {
    document.getElementById(`cell-${halfCharCount}`).innerHTML+=`<div id='point-${i}' class='point'><div class='inPoint'>${arrayBase[1][i]}</div></div>`;
    document.getElementById(`point-${i}`).style.setProperty('z-index', `${charCount-i+5}`);

  }


    for (let i = 1; i <= charCount; i++){
      pointMove(arrayBase, i, halfCharCount, speed);

    }

}

async function pointMove(arrayBase, pointID, halfCharCount, speed) {
  let xFin=arrayBase[2][pointID]*52;
  let yFin=arrayBase[3][pointID]*52;
  let xDis=xFin-(halfCharCount)*52;
  var boxElement = document.getElementById(`point-${pointID}`);
  let promise = new Promise((resolve, reject) => {
    var animation = boxElement.animate([
      {transform: 'translate(0)'},
      {transform: `translate(${xDis}px, ${yFin}px)`}
    ], 3000/speed);
    animation.addEventListener('finish', function() {
      boxElement.style.transform = `translate(${xDis}px, ${yFin}px)`;
    });
  });
  let result = await promise;
}


// заполняем строки детей, родителей и уровни в дереве
function familyDistribution(arrayBase, charCount) {
  arrayBase[3][1]=1;
  for (let i = 2; i<= charCount; i++) {
    for (let j = 1; j <i; ) {
      if (arrayBase[1][i]<arrayBase[1][j]){
        if (arrayBase[4][j]=="") {
          arrayBase[4][j]=i;
          arrayBase[3][i]=arrayBase[3][j]+1;
          arrayBase[6][i]=j;
          break;
        } else {
          j=arrayBase[4][j];
        }
      } else{
        if (arrayBase[5][j]=="") {
          arrayBase[5][j]=i;
          arrayBase[3][i]=arrayBase[3][j]+1;
          arrayBase[6][i]=j;
          break;
        } else j=arrayBase[5][j];
      }
    }
  }
  return arrayBase;
}


// сортировка пузырьком, модернезирована под вывод результатов изменения позиций чисел (на ее основе строится sortPosition)
function bubbleSort(arr, charCount) {
  let arrayB=[];
  let arrayS=[];
  for (let i = 0; i < charCount; i++) {
    arrayB[i]=i;
    arrayS[i]=arr[i];
  }
  for (let i = 0, endI = charCount - 1; i < endI; i++) {
    let wasSwap = false;
    for (let j = 0, endJ = endI - i; j < endJ; j++) {
      if (arrayS[j] > arrayS[j + 1]){
        let swap1 = arrayB[j];
        let swap2 = arrayS[j];
        arrayB[j] = arrayB[j + 1];
        arrayB[j + 1] = swap1;
        arrayS[j] = arrayS[j + 1];
        arrayS[j + 1] = swap2;
        wasSwap = true;
      }
    }
    if (!wasSwap) break;
  }
  return arrayB;
}

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
