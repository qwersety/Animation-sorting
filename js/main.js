"use strict";

document.addEventListener("DOMContentLoaded", start);
function start() {
  let charCount=10;
  let arrayBefore=[6,5,0,9,3,1,8,7,2,6];
  let arrayPosition=bubbleSort(arrayBefore, 10);
  for (let i = 0; i <= charCount; i++) {
    arrayPosition
  let arrayBase=[
    ['itemNumber'],
    ['generatedArray'],
    ['sortPosition'],
    ['levelPosition'],
    ['leftChild'],
    ['rightChild'],
  ];
  for (let i = 1; i <= charCount; i++) {
    arrayBase[0][i]=i;
    arrayBase[1][i]=arrayBefore[i];
  }

}

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
        console.log("+");
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
