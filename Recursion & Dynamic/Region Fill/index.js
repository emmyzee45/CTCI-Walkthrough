/* 
In most editing software, we can click a pixel in a region and the color of the pixel 
and the region are replaced with a new selected color. Given a 2D array of colors, 
pixel location, and a color, implement the previous mentioned feature.
*/

function regionFill(image, startPixelRow, startPixelCol, newColor) {
  const numRows = image.length;
  const numCols = image[0].length;
  const startColor = image[startPixelRow][startPixelCol];
  if (startColor === newColor) return image;

  function dfs(row, col) {
    if (image[row][col] === startColor) {
      image[row][col] = newColor;

      if (row >= 1) dfs(row - 1, col);
      if (row + 1 < numRows) dfs(row + 1, col);
      if (col >= 1) dfs(row, col - 1);
      if (col + 1 < numCols) dfs(row, col + 1);
    }
  }

  dfs(startPixelRow, startPixelCol);
  return image;
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

describe("Region Fill", () => {
  const startingImage = [
    ["white", "white", "white", "white"],
    ["white", "black", "black", "white"],
    ["white", "black", "black", "white"],
    ["white", "white", "white", "white"],
  ];

  it("changes nothing if new color is same as color of starting pixel", () => {
    let res = regionFill(startingImage, 1, 1, "black");
    assert.equal(
      res.join(""),
      "white,white,white,whitewhite,black,black,whitewhite,black,black,whitewhite,white,white,white"
    );
    // [
    //   ["white", "white", "white", "white"],
    //   ["white", "black", "black", "white"],
    //   ["white", "black", "black", "white"],
    //   ["white", "white", "white", "white"],
    // ];
  });

  it("works", () => {
    let res = regionFill(startingImage, 1, 1, "green");
    assert.equal(
      res.join(""),
      "white,white,white,whitewhite,green,green,whitewhite,green,green,whitewhite,white,white,white"
    );
    // [
    //   ["white", "white", "white", "white"],
    //   ["white", "green", "green", "white"],
    //   ["white", "green", "green", "white"],
    //   ["white", "white", "white", "white"],
    // ];
  });
});

mocha.run();
