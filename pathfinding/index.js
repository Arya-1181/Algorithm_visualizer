let gridContainer = document.getElementById("grid_container");
let startBtn = document.getElementById("start_btn");
let algo_but = document.getElementById("algo");
let speed = document.getElementById("speed");
let clear = document.getElementById("ClearGrid");
let speedFactor = 100;
const numRows = 20;
const numCols = 20;
let grid = new Array(numRows);
let rt = null;
let ct = null;
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createGrid(){
  for (let i=0; i<numRows; i++){
    grid[i] = new Array(numCols);
  }
  return grid;
}

function renderGrid(grid) {
  gridContainer.innerHTML = "";
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      let cell = document.createElement("div");
      cell.className = "grid-cell";
      cell.dataset.row = i;
      cell.dataset.col = j;
      gridContainer.appendChild(cell);
      grid[i][j] = cell;
    }
  }
  let startCell = grid[0][0];
    rt = randomNum(1,numRows-1);
    ct = randomNum(1,numCols-1);
  //  rt = 17;
  //  ct = 17;

  let targetCell = grid[rt][ct];
  startCell.classList.add("start");
  targetCell.classList.add("end");
}

document.addEventListener("DOMContentLoaded", function(){
  grid = createGrid();
  renderGrid(grid);
});

speed.addEventListener("change" ,(e) =>{
  speedFactor = parseInt(e.target.value);
});

let algotouse = "";

algo_but.addEventListener("change", function(){
  algotouse = algo_but.value;
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

clear.addEventListener("click", function(){
  renderGrid(grid);
});

// pathfinding algos

function shortPath(shortcut, grid, rt, ct){
  let i=0;
    if (rt===ct){
      for (let j=i; j<numCols; j++){
        for (let k=0; k<numRows; k++){
          if (j<=rt && k<= ct && j==k){
              shortcut[j][k] = grid[j][k];
          }
        }
      }
    }
    else if (rt < ct){
      let k=0;
      let flag=0;
      for (let j=i; j<numCols; j++){
        shortcut[k][j] = grid[k][j];
        if (Math.abs(k-j)===Math.abs(rt-ct)){
          let x=j;
          flag=1;
          while (k<=rt && x<=ct){
            shortcut[k][x] = grid[k][x];
            k++;
            x++;
          }
        }
        if (flag===1){
          break;
        }
      }
    }
    else {
      let k=0;
      let flag = 0;
      for (let j=i; j<numCols; j++){
        shortcut[j][k] = grid[j][k];
        if (Math.abs(k-j)===Math.abs(rt-ct)){
          let x=j;
          flag = 1;
          while (x <= rt && k<=ct){
            shortcut[x][k] = grid[x][k];
            x++;
            k++;
          }
        }
        if (flag===1){
          break;
        }
      }
    } 
  return shortcut;
}

async function showPath(shortcut){
  for (let i=0; i<numCols; i++){
    for (let j=0; j<numRows; j++){
      if (shortcut[i][j]!=null){
        let curr = shortcut[i][j];
        curr.classList.add("shortest-path");
        await sleep(20);
      }
    }
    await sleep(speedFactor);
  }
  return shortcut;
}

// BFS

async function BFS(grid){
  let shortcut = new Array(numRows);
  for (let i=0; i<numCols; i++){
    shortcut[i] = new Array(numCols).fill(null);
  }
  let flag = 0 ;
  for (let i=0; i<numCols; i++){
    if (i==0){
      shortcut = shortPath(shortcut,grid, rt, ct);
    }
    for(let j=0; j<numRows; j++){
      let curr = grid[i][j];
      curr.classList.add("visited");
      await sleep(speedFactor);
      if (i==rt && j==ct){
        flag = 1;
        break;
      }
    }
    if (flag===1){
      break;
    }
    await sleep(speedFactor);
  }
  await sleep(speedFactor + 100);

  showPath(shortcut);
  return grid;
}

// Dijkstra algo 

async function dijkstra(grid, numRows, numCols, rt, ct, speedFactor){
  let shortcut = new Array(numRows);
  for (let i=0; i<numCols; i++){
    shortcut[i] = new Array(numCols).fill(null);
  }
  let flag = 0;
  for (let i=0; i<numCols; i++){
    let cell = grid[i][i]; 
    if (i==0){
      shortcut = shortPath(shortcut, grid, rt, ct);
    }
    cell.classList.add("visited");
    let u=i;
    while(u>=0 && flag!=1){
      cell = grid[u][i];
      if (u==rt && i==ct){
        flag = 1;
        break;
      }
      cell.classList.add("visited");
      u--;
      await sleep(10);
    }
    let l=i;
    while (l>=0 && flag!=1){
      cell = grid[i][l];
      cell.classList.add("visited");
      if (i==rt && l==ct){
        flag = 1;
        break;
      }
      l--;
      await sleep(10);
    }
    if (flag==1){
      break;
    }
    await sleep(speedFactor);
  }
  await sleep(speedFactor);
  showPath(shortcut);
  return grid;
}

// DFS
async function DFS(grid){
  let shortcut = new Array(numRows);
  for (let i=0; i<numCols; i++){
    shortcut[i] = new Array(numCols).fill(null);
  }
  let flag = 0;
  for (let i=0; i<numCols; i++){
    if (i==0){
      shortcut = shortPath(shortcut,grid,rt,ct);
    }
    for(let j=0; j<numRows; j++){
      let curr = grid[j][i];
      curr.classList.add("visited");
      if (j==rt && i==ct){
        flag=1;
        break;
      }
      await sleep(speedFactor);
    }
    if (flag===1){
      break;
    }
    await sleep(speedFactor);
  }
  await sleep(speedFactor + 100);

  showPath(shortcut);
  return grid;
}

async function AStar(grid){
  let shortcut = new Array(numRows);
  for (let i=0; i<numCols; i++){
    shortcut[i] = new Array(numCols).fill(null);
  }
  let flag = 0;
  for (let i=0; i<numCols; i++){
    if (i==0){
      shortcut = shortPath(shortcut,grid,rt,ct);
    }
    let r=0;
    let l=0;
    while(r<i || l<=i){
      if (l<=i){
        let lcell = grid[l][i];
        lcell.classList.add("visited");
      }
      if (r<i){
        let rcell = grid[i][r];
        rcell.classList.add("visited");
      }
      if ((l==rt && i==ct) || (i==rt)&&(r==ct)){
        flag=1;
        break;
      }
      l++;
      r++;
      await sleep(50);
    }
    if (flag==1){
      break;
    }
    await sleep(speedFactor);
  }
  await sleep(speedFactor);

  showPath(shortcut);
  return grid;
}

startBtn.addEventListener("click" , function(){
  switch(algotouse){
    
    case "dijkstra" :
    dijkstra(grid,numRows, numCols, rt, ct, speedFactor);
    break;

    case "A_Star":
      AStar(grid);
      break;
    
    case "BFS":
      BFS(grid);
      break;

    case "DFS":
      DFS(grid);
      break;

    default:
      dijkstra(grid,numRows, numCols, rt, ct, speedFactor);
      break;
  }
});
