//                   Rules
// - A live cell with less than 2 living neighbours dies.
// - A live cell with 2 or 3 live neighbours survives.
// - A live cell with 4+ live neighbours dies.
// - A dead cell with 3 live neighbours comes back to life.

let rows = 20,
  cols = 20;
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
// called once at the beginning of the program
function setup() {
  createCanvas(600, 600); // created a 600*600 canvas
  console.log(grid);
}

// called repeatedly
function draw() {
  background(255); //defines canvas background color

  stroke(150); // fro light coloured lines

  // horizontal lines
  for (let i = 0; i <= rows; i++) {
    line(0, (i / rows) * height, height, (i / rows) * height); // height = 600(canvas height)
  }
  // vetical lines
  for (let i = 0; i <= cols; i++) {
    line((i / cols) * width, 0, (i / cols) * width, width); // width = 600(canvas width)
  }
}
