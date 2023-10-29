/* 
Given a grid of size m * n, you start at the top left cell and must reach the bottom
right cell. At any cell, you can go right or down. Some obstacles on certain cells 
prevent the cell form being traversed, and are marked with a falsy value. Return a 
possible path from top left to bottom right.
*/

function validPath(maze) {
  if (!maze || maze.length === 0) return null;

  const path = [];
  const failedPoints = {};

  // Helper function starts out at bottom right
  if (helper(maze.length - 1, maze[0].length - 1)) {
    return path;
  }

  // Helper function was not able to find path from bottom right to top left
  return null;

  function helper(row, col) {
    if (row < 0 || col < 0 || !maze[row][col]) return false;

    const p = `${row},${col}`;

    if (p in failedPoints) {
      return false;
    }

    const isAtOrigin = row === 0 && col === 0;

    if (isAtOrigin || helper(row, col - 1) || helper(row - 1, col)) {
      path.push(p);
      return true;
    }

    failedPoints[p] = true;
    return false;
  }
}

// function validPath(maze) {
//   if (!maze || maze.length === 0) return null;
//   const path = [];

//   // Helper function starts out at bottom right
//   if (helper(maze.length - 1, maze[0].length - 1)) {
//     return path;
//   }

//   // Helper function was not able to find path from bottom right to top left
//   return null;

//   function helper(row, col) {
//     if (row < 0 || col < 0 || !maze[row][col]) return false;

//     const isAtOrigin = row === 0 && col === 0;

//     if (isAtOrigin || helper(row, col - 1) || helper(row - 1, col)) {
//       const p = `${row},${col}`;
//       path.push(p);
//       return true;
//     }

//     return false;
//   }
// }

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

describe("Valid Path", () => {
  const grid = [
    [true, true, true, true],
    [true, false, true, false],
    [false, true, true, true],
  ];

  it("works", () => {
    assert.equal(validPath(grid).join(""), "0,00,10,21,22,22,3");
    // ["0,0", "0,1", "0,2", "1,2", "2,2", "2,3"]
  });
});

mocha.run();
