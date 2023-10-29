/* 
Given a string of unique characters, return all the possible permutations.

Example
Input: "abc"
Output: ["abc", "acb", "bac", "bca", "cab", "cba"]
*/

function permute(str) {
  const result = [];

  function helper(current, remainder) {
    if (remainder.length === 0) result.push(current);

    const length = remainder.length;
    for (let i = 0; i < length; i++) {
      const charToAdd = remainder[i];
      const remainderLeft = remainder.substring(0, i);
      const remainderRight = remainder.substring(i + 1, length);

      helper(current + charToAdd, remainderLeft + remainderRight);
    }
  }

  helper("", str);

  return result;
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

describe("Permutations", () => {
  it("works", () => {
    const res = permute("abc");
    // res should now be ["abc", "acb", "bac", "bca", "cab", "cba"]

    assert.equal(res.length, 6);
    assert.equal(res.includes("abc"), true);
    assert.equal(res.includes("acb"), true);
    assert.equal(res.includes("bac"), true);
    assert.equal(res.includes("bca"), true);
    assert.equal(res.includes("cab"), true);
    assert.equal(res.includes("cba"), true);
  });
});

mocha.run();
