/* 
Given an array of sorted distinct integers, write code that returns the Magic index 
in the array if it exists, otherwise return a falsy value. A Magic index in an array
is an index i such that arr[i] is equal to i. 

Example
[ -1, 0, 1, 2, 4, 10 ]
Magic index is 4
*/

function magicIndex(array) {
  return helper(array, 0, array.length - 1);
}

function helper(array, start, end) {
  if (end < start) {
    return null;
  }
  const midIndex = Math.floor((start + end) / 2);
  const midValue = array[midIndex];
  if (midValue === midIndex) {
    return midIndex;
  } else if (midValue > midIndex) {
    return helper(array, start, midIndex - 1);
  } else {
    return helper(array, midIndex + 1, end);
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

describe("Magic Index", () => {
  it("works when magic index exists", () => {
    assert.equal(magicIndex([-40, -20, -1, 1, 2, 3, 5, 7, 9, 12, 13]), 7);
  });
  it("returns falsy value if magic index does not exist", () => {
    assert.equal(
      !!magicIndex([-40, -20, -1, 1, 2, 3, 5, 77, 9, 12, 13]),
      false
    );
  });
});

mocha.run();
