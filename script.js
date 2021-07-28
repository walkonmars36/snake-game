const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const scoreDisplay = document.getElementById("score");
let squaresArr = [];
let currentSnake = [2, 1, 0]; // position in the squaresArr
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerID = 0;

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

function startGame() {
  //remove the existing snake
  currentSnake.forEach((element) => squaresArr[element].classList.remove("snake"));
  //remove the apple
  squaresArr[appleIndex].classList.remove("apple");
  clearInterval(timerID);
  currentSnake = [2, 1, 0];
  direction = 1;
  score = 0;
  scoreDisplay.textContent = score;
  intervalTime = 1000;
  generateApple();
  //re-add class of snake to new currentSnake
  currentSnake.forEach((element) => squaresArr[element].classList.add("snake"));
  timerID = setInterval(moveSnake, intervalTime);
}

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
  const tail = currentSnake.pop();

  //remove .snake styling from last element
  squaresArr[tail].classList.remove("snake");
  //add new square in direction of movement
  currentSnake.unshift(currentSnake[0] + direction);

  //what happens when the snake head gets the apple?
  if (squaresArr[currentSnake[0]].classList.contains("apple")) {
    //remove the .apple class
    squaresArr[currentSnake[0]].classList.remove("apple");
    //grow snake by adding .snake class
    squaresArr[tail].classList.add("snake");
    //grow snake array
    currentSnake.push(tail);

    //generate a new apple
    generateApple();
    //add one to the score
    score++;
    //display the score
    scoreDisplay.textContent = score;
    //speed up the snake
    clearInterval(timerID);
    intervalTime = intervalTime * speed;
    timerID = setInterval(moveSnake, intervalTime);
  }

  //add .snake styling to new square
  squaresArr[currentSnake[0]].classList.add("snake");
}

moveSnake();

//set interval method calls the function moveSnake and repeats this in whatever time interval is set (in ms) intervalTime default = 1000

function generateApple() {
  do {
    //generate random number
    appleIndex = Math.floor(Math.random() * squaresArr.length);
  } while (squaresArr[appleIndex].classList.contains("snake"));
  squaresArr[appleIndex].classList.add("apple");
}
generateApple();

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
startBtn.addEventListener("click", startGame);
