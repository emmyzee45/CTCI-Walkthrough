/* 
Write code that solves placing eight queens on an 8×8 chessboard such that none of 
them attack one another (no two are in the same row, column, or diagonal).
*/

const GRID_SIZE = 8;

function placeQueens(row, columns, results) {
  // Found valid placement
  if (row === GRID_SIZE) {
    results.push([...columns]);
  } else {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (checkValid(columns, row, col)) {
        columns[row] = col; // Place queen
        placeQueens(row + 1, columns, results);
      }
    }
  }
}

function checkValid(columns, row, col) {
  // Check Queens in previous row
  for (let prevRow = 0; prevRow < row; prevRow++) {
    // Check if previous rows have a queen in the same column
    const prevCol = columns[prevRow];

    // There is a Queen from a previous row in the same column
    if (col == prevCol) return false;

    /* Check diagonals: if the distance between the columns equals the distance
     * between the rows, then they’re in the same diagonal. */
    const columnDistance = Math.abs(prevCol - col);
    const rowDistance = row - prevRow; // row > prevRow, so no need to use absolute value
    if (columnDistance == rowDistance) return false;
  }
  return true;
}

const results = [];
const columns = [];
for (let i = 0; i < GRID_SIZE; i++) {
  columns[i] = -1;
}
placeQueens(0, columns, results);
console.log(results.length);
