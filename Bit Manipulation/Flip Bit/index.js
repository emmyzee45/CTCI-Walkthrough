/* 
Given an integer, we can flip one bit. Return the maximum number of consecutive 1s 
after flipping a bit.

Example
Input : 1775 (11011101111)
Output : 8   (11011111111)
                    ^
*/

function flipBit(a) {
  let currLength = 0;
  let prevLength = 0;
  let maxLength = 0;

  while (a !== 0) {
    // If current bit is a 1, increase current length
    if ((a & 1) === 1) {
      currLength++;
      // If current bit is a 0
    } else if ((a & 1) === 0) {
      // If the bit to the left is a 0, then we can’t merge these sequences together. Set the previous length to 0.
      // If the bit to the left is a 1, set the previous length to the current Length.
      prevLength = (a & 2) === 0 ? 0 : currLength;
      // Reset currLength
      currLength = 0;
    }

    // Add 1 for flip bit count
    maxLength = Math.max(prevLength + currLength + 1, maxLength);
    // Right shift 1
    a >>= 1;
  }

  return maxLength;
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

describe("Flip Bit", () => {
  it("works", () => {
    assert.equal(flipBit(1775), 8);
    assert.equal(flipBit(12), 3);
    assert.equal(flipBit(15), 5);
    assert.equal(flipBit(71), 4);
  });
});

mocha.run();
