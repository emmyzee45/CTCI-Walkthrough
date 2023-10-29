/* 
Given an array of integers, sort the array into an alternating sequence of peaks and 
valleys. A peak is an element in the array which is greater than or equals its 
neighbouring elements. A valley is an element that is smaller than or equals its 
neighbouring elements.

Example
[5, 10, 5, 7, 4, 3, 5]
Peaks: 10, 7, 5 
Valley: 5, 5, 3

Input: [3,4,5,5,5,7,10]
Output: [4,3,5,5,7,5,10]
*/

function swap(array, i, j) {
  const valueI = array[i];
  const valueJ = array[j];
  array[i] = valueJ;
  array[j] = valueI;
}

function peaksAndValleys(arr) {
  let isPeak = true;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < arr[i + 1]) {
      if (isPeak) swap(arr, i, i + 1);
    } else if (arr[i] > arr[i + 1]) {
      if (!isPeak) swap(arr, i, i + 1);
    }
    isPeak = !isPeak;
  }
}

// function peaksAndValleys(arr) {
//   arr.sort((a, b) => a - b);
//   for (let i = 1; i < arr.length; i += 2) {
//     swap(arr, i, i - 1);
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

describe("Peaks And Valleys", () => {
  function checkPeaksAndValleys(arr) {
    for (let i = 1; i < arr.length; i += 2) {
      if (i % 2 !== 0) {
        if (arr[i] > arr[i - 1]) return false;
        if (arr[i + 1] !== undefined && arr[i] > arr[i + 1]) return false;
      }
    }

    return true;
  }

  function checkValleysAndPeaks(arr) {
    for (let i = 1; i < arr.length; i += 2) {
      if (i % 2 !== 0) {
        if (arr[i] < arr[i - 1]) return false;
        if (arr[i + 1] !== undefined && arr[i] < arr[i + 1]) return false;
      }
    }

    return true;
  }

  it("works", () => {
    const input = [3, 4, 5, 5, 5, 7, 10];
    let isPeaksAndValleys = false;
    peaksAndValleys(input);
    if (checkPeaksAndValleys(input) || checkValleysAndPeaks(input)) {
      isPeaksAndValleys = true;
    }
    assert.equal(isPeaksAndValleys, true);
  });
});

mocha.run();
