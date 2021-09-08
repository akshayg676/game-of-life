/*                  Rules
- A live cell with less than 2 living neighbours dies.
- A live cell with 2 or 3 live neighbours survives.
- A live cell with 4+ live neighbours dies.
- A dead cell with 3 live neighbour000s comes back to life. */

let rows = 20,
  cols = 20;
let play = false;
let grid = createGrid();

function createGrid() {
  let result = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      row.push(false);
    }
    result.push(row);
  }
  return result;
}

function nextGeneration() {
  let newGrid = createGrid();
  for (i = 0; i < rows; i++) {
    for (j = 0; j < cols; j++) {
      //to get the number of alive neighbour
      let directions = [
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
      ];
      let aliveNeighbour = 0;
      for (d of directions) {
        let neighbourRow = i + d[0];
        let neighbourCol = j + d[1];
        if (
          neighbourRow >= 0 &&
          neighbourCol >= 0 &&
          neighbourRow < rows &&
          neighbourCol < cols
        )
          if (grid[neighbourRow][neighbourCol]) {
            aliveNeighbour++;
          }
      }

      //to check the new cell is dead or alive
      if (grid[i][j]) {
        newGrid[i][j] = aliveNeighbour == 2 || aliveNeighbour == 3;
      } else {
        newGrid[i][j] = aliveNeighbour == 3;
      }
    }
  }
  grid = newGrid;
}

// called once at the beginning of the program
function setup() {
  createCanvas(600, 600); // created a 600*600 canvas
  frameRate(5); // 5 frames per second
}

// called repeatedly
function draw() {
  background(255); //defines canvas background color

  //display grid
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j]) {
        fill(0);
        rect(
          (j / cols) * width,
          (i / rows) * height,
          width / cols,
          height / rows
        );
      }
    }
  }

  stroke(150); // fro light coloured lines

  // horizontal lines
  for (let i = 0; i <= rows; i++) {
    line(0, (i / rows) * height, height, (i / rows) * height); // height = 600(canvas height)
  }
  // vetical lines
  for (let i = 0; i <= cols; i++) {
    line((i / cols) * width, 0, (i / cols) * width, width); // width = 600(canvas width)
  }

  if (play) {
    nextGeneration();
  }
}

// mouse click interaction
function mouseClicked() {
  let row = Math.floor((mouseY / height) * rows);
  let col = Math.floor((mouseX / width) * cols);
  if (row >= 0 && col >= 0 && row < rows && col < cols) {
    grid[row][col] = !grid[row][col];
  }
}

let playButton = document.querySelector(".playMe");
playButton.addEventListener("click", function () {
  play = !play;
  if (play) {
    playButton.innerHTML = "Pause";
  } else {
    playButton.innerHTML = "Play";
  }
});

let clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", function () {
  grid = createGrid();
});
