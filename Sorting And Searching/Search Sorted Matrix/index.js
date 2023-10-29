/* 
Given a sorted M x N matrix, write efficient code that returns if the value can be 
found.

Example
[
  [15, 20, 40, 85],
  [20, 35, 80, 95],
  [30, 55, 95, 105],
  [40, 80, 100, 120],
]
findElement(inputMatrix, 55) --> true
findElement(inputMatrix, 45) --> false
*/

function findElement(matrix, elem) {
  let row = 0;
  let col = matrix[0].length - 1;
  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] == elem) {
      return true;
    } else if (elem < matrix[row][col]) {
      // We know elem cannot be in current column. Decrease
      col--;
    } else {
      // Otherwise elem is in current column, move "down" column by increasing row
      row++;
    }
  }
  return false;
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

describe("Search Sorted Matrix", () => {
  const inputMatrix = [
    [15, 20, 40, 85],
    [20, 35, 80, 95],
    [30, 55, 95, 105],
    [40, 80, 100, 120],
  ];

  it("returns true if element found", () => {
    assert.equal(findElement(inputMatrix, 55), true);
  });
  it("returns false if element not found", () => {
    assert.equal(findElement(inputMatrix, 45), false);
  });
});

mocha.run();
