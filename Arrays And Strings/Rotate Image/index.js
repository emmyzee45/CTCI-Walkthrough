/* 
 Given a square matrix representing an image, rotate it clockwise by 90 degrees.
Example
Input:
 1  2  3
 4  5  6
 7  8  9
Output:
 7  4  1 
 8  5  2 
 9  6  3 
 */

function rotateImage(matrix) {
  matrix.reverse();

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      if (row < col) {
        const oldCellValue = matrix[row][col];
        matrix[row][col] = matrix[col][row];
        matrix[col][row] = oldCellValue;
      }
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

describe("Rotate Image", () => {
  it("Works", () => {
    const matrix = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];

    rotateImage(matrix);

    for (let i = 0; i < matrix.length; i++) {
      matrix[i] = matrix[i].join("");
    }

    assert.equal(matrix[0], "741");
    assert.equal(matrix[1], "852");
    assert.equal(matrix[2], "963");
  });
});

mocha.run();
