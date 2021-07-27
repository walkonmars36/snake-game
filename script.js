const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const score = document.getElementById("score");
let squaresArr = [];
let currentSnake = [2, 1, 0]; // position in the squaresArr
let direction = 1;

function createGrid() {
  //create 100 of these elements with a for loop
  for (let i = 0; i < 100; i++) {
    //create element
    const square = document.createElement("div");

    //add styling to the element from .square
    square.classList.add("square");
    //put element into the grid using appendchild()
    grid.appendChild(square);
    //push into a squares array
    squaresArr.push(square);
  }
}
createGrid();

currentSnake.forEach((element) => squaresArr[element].classList.add("snake"));

function moveSnake() {
  //remove last element from our currentSnake array
  const removeTail = currentSnake.pop();

  //remove .snake styling from last element
  squaresArr[removeTail].classList.remove("snake");
  //add new square in direction of movement
  currentSnake.unshift(currentSnake[0] + direction);

  //add .snake styling to new square
  squaresArr[currentSnake[0]].classList.add("snake");
}

moveSnake();

//set interval method calls a function and repeats this in whatever time interval is set (in ms)
let timerID = setInterval(moveSnake, 1000);

// KeyboardEvent: key='ArrowDown' | code='ArrowDown'

// KeyboardEvent: key='ArrowLeft' | code='ArrowLeft'

// KeyboardEvent: key='ArrowUp' | code='ArrowUp'

// KeyboardEvent: key='ArrowRight' | code='ArrowRight'
