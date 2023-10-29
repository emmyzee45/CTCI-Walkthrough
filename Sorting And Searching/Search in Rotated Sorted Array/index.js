/* 
Given a rotated sorted array and a number to find, return the index of the number or 
-1 if it cannot be found.
It MUST run in O(log n) Time Complexity

Example
search([3,5,1], 1) --> 2
*/

function findMinIdx(rotatedSortedArr) {
  let left = 0;
  let right = rotatedSortedArr.length - 1;

  if (
    rotatedSortedArr.length === 1 ||
    rotatedSortedArr[left] < rotatedSortedArr[right]
  ) {
    return 0;
  }

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    // [6,1,2]
    if (rotatedSortedArr[mid] < rotatedSortedArr[mid - 1]) {
      return mid;
    }

    // [5,6,4]
    if (rotatedSortedArr[mid] > rotatedSortedArr[mid + 1]) {
      return mid + 1;
    }

    if (rotatedSortedArr[mid] < rotatedSortedArr[left]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
}

function binarySearch(nums, target, left, right) {
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

function search(nums, target) {
  const minIdx = findMinIdx(nums);

  const left = binarySearch(nums, target, 0, minIdx - 1);
  const right = binarySearch(nums, target, minIdx, nums.length - 1);

  return Math.max(left, right);
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

describe("Search in Rotated Sorted Array", () => {
  it("search([3,1], 1) returns 1", () => {
    assert.equal(search([3, 1], 1), 1);
  });

  it("search([3,1,1], 3) returns 0", () => {
    assert.equal(search([3, 1, 1], 3), 0);
  });

  it("search([3,5,1], 1) returns 2", () => {
    assert.equal(search([3, 5, 1], 1), 2);
  });

  it("search([1,3,5], 5) returns 2", () => {
    assert.equal(search([1, 3, 5], 5), 2);
  });

  it("search([5,1,3], 5) returns 0", () => {
    assert.equal(search([5, 1, 3], 5), 0);
  });

  it("search([1,1,3,1], 3) returns 2", () => {
    assert.equal(search([1, 1, 3, 1], 3), 2);
  });

  it("search([1, 3, 5], 1) returns 0", () => {
    assert.equal(search([1, 3, 5], 1), 0);
  });

  it("search([1, 3, 1, 1, 1], 3) returns 1", () => {
    assert.equal(search([1, 3, 1, 1, 1], 3), 1);
  });

  it("search([1, 3, 1, 1, 1], 33) returns -1", () => {
    assert.equal(search([1, 3, 1, 1, 1], 33), -1);
  });

  it("Long case", () => {
    const res = search(
      [
        10, 10, 10, -10, -10, -10, -10, -9, -9, -9, -9, -9, -9, -9, -8, -8, -8,
        -8, -8, -8, -8, -8, -7, -7, -7, -7, -6, -6, -6, -5, -5, -5, -4, -4, -4,
        -4, -3, -3, -2, -2, -2, -2, -2, -2, -2, -2, -1, -1, -1, -1, -1, 0, 0, 0,
        0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5,
        5, 6, 6, 6, 7, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 9, 9, 9, 10, 10,
      ],
      -6
    );
    assert.equal(res <= 28 && res >= 26, true);
  });
});

mocha.run();
