const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const score = document.getElementById("score");
let squaresArr = [];
let currentSnake = [2, 1, 0]; // position in the squaresArr
let direction = 1;
const width = 10;
let apple = 0;

function createGrid() {
  //create 100 of these elements with a for loop
  for (let i = 0; i < width * width; i++) {
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
  if (
    (currentSnake[0] + width >= width * width && direction === width) || //if snake has hit bottom
    (currentSnake[0] % width === width - 1 && direction === 1) || //if snake has hit right wall
    (currentSnake[0] % width === 0 && direction === -1) || //if snake has hit left wall
    (currentSnake[0] - width <= 0 && direction === -width) || //if snake has hit top
    squaresArr[currentSnake[0] + direction].classList.contains("snake")
  )
    return clearInterval(timerID);

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

//set interval method calls the function moveSnake and repeats this in whatever time interval is set (in ms)
let timerID = setInterval(moveSnake, 1000);

function generateApples() {
  do {
    //something
  } while (squaresArr[appleIndex].classList.contains("snake"));
  squaresArr[appleIndex].classList.add("apple");
}

function controlSnake(e) {
  switch (e.key) {
    case "w":
    case "ArrowUp":
      //move up for up arrow or w key press
      direction = -width;
      break;
    case "a":
    case "ArrowLeft":
      //move left for left arrow or a key press
      direction = -1;
      break;
    case "s":
    case "ArrowDown":
      //move down for down arrow or s key press
      direction = +width;
      break;
    case "d":
    case "ArrowRight":
      //move right for right arrow or d key press
      direction = 1;
      break;
  }
}

document.addEventListener("keydown", controlSnake);
