let randomize_array = document.getElementById("randomize_array_btn");
let search_btn = document.getElementById("search_btn");
let bars_container = document.getElementById("bars_container");
let select_algo = document.getElementById("algo");
let speed = document.getElementById("speed");
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = slider.value;
let numOfBars = slider.value;
let heightFactor = 4;
let speedFactor = 100;
let unsorted_array = new Array(numOfBars);
let target = 0;

slider.addEventListener("input", function () {
  numOfBars = slider.value;
  maxRange = slider.value;
  bars_container.innerHTML = "";
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

speed.addEventListener("change", (e) => {
  speedFactor = parseInt(e.target.value);
});

let algotouse = "";

select_algo.addEventListener("change", function () {
  algotouse = select_algo.value;
});

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  }
  return array;
}

document.addEventListener("DOMContentLoaded", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

function renderBars(array) {
  target = randomNum(1,maxRange);
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement('div');
    if (i==target){
        bar.classList.add("bar");
        bar.style.backgroundColor = "#00ff00";
    }
    else{
        bar.classList.add("bar");
    }
    bar.style.height = array[i] * heightFactor + "px";
    bars_container.appendChild(bar);
  }
}

randomize_array.addEventListener("click", function () {
  unsorted_array = createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function LinearSearch(array,target){
    let bars = document.getElementsByClassName("bar");
    for (let i=0; i<array.length; i++){
        if (i===target){
            bars[i].style.backgroundColor = "#ffa333";
            break;
        }
        else{
          bars[i].style.backgroundColor = "#8b0000";
        }
        await sleep(speedFactor);
    }
    return array;
}



async function BinarySearch(array,target){
  let bars = document.getElementsByClassName("bar");
  let newTar = 0;
  let j=0;
  for (let i = 0; i < array.length; i++) {
    for (j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        if (j==target){
          newTar = i;
        }
        for (let k = 0; k < bars.length; k++) {
          if (k !== j && k !== j + 1) {
            bars[k].style.backgroundColor = "#00e6e6";
          }
        }
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
        bars[j].style.height = array[j] * heightFactor + "px";
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
      }
    }
    await sleep(1);
  }
  target = newTar;
  bars[target].style.backgroundColor = "#00ff00";
  await sleep(speedFactor+100);
  let l=0;
  let r=array.length-1;
  let mid;
  while(r>=l){
    mid = l + Math.floor((r-l)/2);
    if (mid == target){
      break;
    }
    else if (mid > target){
      r = mid-1;
    }
    else{
      l = mid+1;
    }
    bars[mid].style.backgroundColor = "red";
    await sleep(speedFactor);
  }
  return array;
}

search_btn.addEventListener("click", function () {
  switch (algotouse) {
    case "linaer":
      LinearSearch(unsorted_array,target);
      break;
    
    case "binary":
      BinarySearch(unsorted_array,target);
      break;
    
    default:
      LinearSearch(unsorted_array,target);
      break;
  }
});
