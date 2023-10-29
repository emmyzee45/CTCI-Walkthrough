/* 
Given an input file containing four billion integers, return the integer not contained in
the file. You only have 1 GB of memory available.
*/

function missingNo(ints) {
  const booleanArray = new Array(ints.length).fill(false);

  for (const int of ints) {
    booleanArray[int] = true;
  }

  for (let i = 0; i < booleanArray.length; i++) {
    if (booleanArray[i] === false) return i;
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

describe("Find Missing Number", () => {
  it("missingNo([0, 1, 2, 3, 4, 5, 6, 7, 9, 10]) returns 8", () => {
    assert.equal(missingNo([0, 1, 2, 3, 4, 5, 6, 7, 9, 10]), 8);
  });
});

mocha.run();
