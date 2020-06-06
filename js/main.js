"use strict";

document.addEventListener("DOMContentLoaded", start);
function start() {
  // число цифр в сортировке
  let charCount=10;
  //массив для сортировки
  let arrayBefore=[6,5,0,9,3,1,8,7  ,2,6];
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
  let arrayPosition=bubbleSort(arrayBefore, 10);
  for (let j = 0; j < charCount; j++)
    for (let i = 0; i < charCount; i++) {
      if (arrayPosition[i]+1==arrayBase[0][j+1]){
        arrayBase[2][j+1]=i+1;
        break;
    }
  }
  arrayBase=familyDistribution(arrayBase, charCount);
 // вывод в консоль сформированного массива
  for (let j = 0; j < 7; j++)
    console.log(j+' '+arrayBase[j]);


}

// заполняем строки детей и уровня в дереве. родителей не заполняю, пока без надобноси
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
