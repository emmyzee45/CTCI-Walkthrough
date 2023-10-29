/* 
Given an m x n matrix of integers, if an element is 0, set its entire row and 
column to 0.
Example
[1, 1, 1],
[1, 0, 1],
[1, 1, 1]
should be changed to 
[1, 0, 1],
[0, 0, 0],
[1, 0, 1]
*/

function setMatrixZeros(matrix) {
  let firstColHasZero = false;
  let firstRowHasZero = false;

  // Check if first col has zero
  for (let i = 0; i < matrix.length; i++) {
    if (matrix[i][0] === 0) {
      firstColHasZero = true;
      break;
    }
  }

  // Check if first row has zero
  for (let j = 0; j < matrix[0].length; j++) {
    if (matrix[0][j] === 0) {
      firstRowHasZero = true;
      break;
    }
  }

  // Use first row and col as flags, if rest of cells have zeros
  for (let row = 1; row < matrix.length; row++) {
    for (let col = 1; col < matrix[0].length; col++) {
      if (matrix[row][col] === 0) {
        matrix[0][col] = 0;
        matrix[row][0] = 0;
      }
    }
  }

  // Zero out cells based on flags in first row and col
  for (let row = 1; row < matrix.length; row++) {
    for (let col = 1; col < matrix[0].length; col++) {
      if (matrix[row][0] === 0 || matrix[0][col] === 0) {
        matrix[row][col] = 0;
      }
    }
  }

  // Zero out first col
  if (firstColHasZero) {
    for (let i = 0; i < matrix.length; i++) {
      matrix[i][0] = 0;
    }
  }

  // Zero out first row
  if (firstRowHasZero) {
    for (let j = 0; j < matrix[0].length; j++) {
      matrix[0][j] = 0;
    }
  }
}

// _________ _______  _______ _________   _______  _______  _______  _______  _______
// \__   __/(  ____ \(  ____ \\__   __/  (  ____ \(  ___  )(  ____ \(  ____ \(  ____ \
//    ) (   | (    \/| (    \/   ) (     | (    \/| (   ) || (    \/| (    \/| (    \/
//    | |   | (__    | (_____    | |     | |      | (___) || (_____ | (__    | (_____
//    | |   |  __)   (_____  )   | |     | |      |  ___  |(_____  )|  __)   (_____  )
//    | |   | (            ) |   | |     | |      | (   ) |      ) || (            ) |
//    | |   | (____/\/\____) |   | |     | (____/\| )   ( |/\____) || (____/\/\____) |
//    )_(   (_______/\_______)   )_(     (_______/|/     \|\_______)(_______/\_______)
//                             ____       _
//                             |  _ \     | |
//                             | |_) | ___| | _____      __
//                             |  _ < / _ \ |/ _ \ \ /\ / /
//                             | |_) |  __/ | (_) \ V  V /
//                             |____/ \___|_|\___/ \_/\_/
//                         ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

//                          ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

//                          ______ ______ ______ ______ ______
//                         |______|______|______|______|______|

mocha.setup("bdd");
const { assert } = chai;

describe("Set Matrix Zeroes", () => {
  it("modifies input matrix.", () => {
    const inputMatrix = [
      [0, 1, 2, 0],
      [3, 4, 5, 2],
      [1, 3, 1, 5],
    ];
    setMatrixZeros(inputMatrix);
    assert.equal(inputMatrix[0][2], 0);
  });

  it("Works on a 3x4 and 3x3 matrix", () => {
    let inputMatrix = [
      [0, 1, 2, 0],
      [3, 4, 5, 2],
      [1, 3, 1, 5],
    ];
    setMatrixZeros(inputMatrix);
    for (let i = 0; i < inputMatrix.length; i++) {
      inputMatrix[i] = inputMatrix[i].join("");
    }
    assert.equal(inputMatrix[0], "0000");
    assert.equal(inputMatrix[1], "0450");
    assert.equal(inputMatrix[2], "0310");

    inputMatrix = [
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ];
    setMatrixZeros(inputMatrix);
    for (let i = 0; i < inputMatrix.length; i++) {
      inputMatrix[i] = inputMatrix[i].join("");
    }
    assert.equal(inputMatrix[0], "101");
    assert.equal(inputMatrix[1], "000");
    assert.equal(inputMatrix[2], "101");
  });

  it("Works on a 1 row matrix", () => {
    let inputMatrix = [[1, 0]];
    setMatrixZeros(inputMatrix);
    assert.equal(inputMatrix[0][0], 0);
    assert.equal(inputMatrix[0][1], 0);
  });

  it("Works on a 1 col matrix", () => {
    inputMatrix = [[0], [1]];
    setMatrixZeros(inputMatrix);
    assert.equal(inputMatrix[0][0], 0);
    assert.equal(inputMatrix[1][0], 0);
  });
});

mocha.run();
