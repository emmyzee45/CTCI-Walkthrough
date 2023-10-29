/* 
Perform Binary Search on a sorted array that you do not know the size of. 
You will simulate not knowing the size of the sorted array by not being allowed to 
use ".length" anywhere in your code.

Example
search([2, 3, 4, 6, 10], 4) --> 2)
search([2, 3, 4, 6, 10], 44) --> -1)
*/

function search(sortedArr, value) {
  let index = 1;
  // Get estimate of sortedArr length in O(log N) time.
  while (sortedArr[index] !== undefined && sortedArr[index] < value) {
    index *= 2;
  }
  return binarySearch(sortedArr, value, Math.floor(index / 2), index);
}

function binarySearch(sortedArr, value, low, high) {
  let mid;

  while (low <= high) {
    mid = Math.floor((low + high) / 2);
    const middle = sortedArr[mid];
    if (middle > value || middle === undefined) {
      high = mid - 1;
    } else if (middle < value) {
      low = mid + 1;
    } else {
      return mid;
    }
  }
  return -1;
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

describe("Binary Search No Size!", () => {
  it("returns correct index if element found in array with an even length", () => {
    assert.equal(search([2, 3, 4, 6], 2), 0);
    assert.equal(search([2, 3, 4, 6], 3), 1);
    assert.equal(search([2, 3, 4, 6], 4), 2);
    assert.equal(search([2, 3, 4, 6], 6), 3);
  });
  it("returns correct index if element found in array with an odd length", () => {
    assert.equal(search([2], 2), 0);
    assert.equal(search([2, 3, 4, 6, 10], 2), 0);
    assert.equal(search([2, 3, 4, 6, 10], 3), 1);
    assert.equal(search([2, 3, 4, 6, 10], 4), 2);
    assert.equal(search([2, 3, 4, 6, 10], 6), 3);
    assert.equal(search([2, 3, 4, 6, 10], 10), 4);
  });
  it("returns -1 if element cannot be found", () => {
    assert.equal(search([], 1), -1);
    assert.equal(search([2, 3, 4, 6], 1), -1);
    assert.equal(search([2, 3, 4, 6], 5), -1);
    assert.equal(search([2, 3, 4, 6], 10), -1);
  });
});

mocha.run();
