/* 
Given a sorted array of strings that is also filled with empty strings, write code to
return the index of a given string.
EXAMPLES
Input : ["for", "hello", "", "", "", "", "ide",  "pen", "", "", "", "quiz"]
          x = "hello"
Output : 1
*/

function search(strings, str, first, last) {
  while (first <= last) {
    let mid = Math.floor((last + first) / 2);

    // If mid is empty, make mid the closest non-empty string
    if (strings[mid] === "") {
      let left = mid - 1;
      let right = mid + 1;
      while (true) {
        //Out of bounds
        if (left < first && right > last) {
          return -1;
        } else if (right <= last && strings[right] !== "") {
          mid = right;
          break;
        } else if (left >= first && strings[left] !== "") {
          mid = left;
          break;
        }
        right++;
        left--;
      }
    }

    // Classic Binary Search
    if (strings[mid] === str) {
      return mid;
    } else if (strings[mid] < str) {
      // Search right
      first = mid + 1;
    } else {
      // Search left
      last = mid - 1;
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

describe("Binary Search with Blanks", () => {
  it("returns correct index if element found", () => {
    assert.equal(
      search(
        ["at", "", "", "", "ball", "", "", "car", "", "", "dad", "", ""],
        "ball",
        0,
        12
      ),
      4
    );

    assert.equal(
      search(
        ["for", "geeks", "", "", "", "", "ide", "practice", "", "", "", "quiz"],
        "geeks",
        0,
        12
      ),
      1
    );
  });
  it("returns -1 if element not found", () => {
    assert.equal(
      search(["", "", "", "", "", "", "", "", "", ""], "ball", 0, 9),
      -1
    );
  });
});

mocha.run();
