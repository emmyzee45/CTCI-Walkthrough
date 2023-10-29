/* 
Given a string whose characters are not necessarily unique, return all possible 
unique permutations.

Example
Input: 'aab'
Output: ['aab', 'aba', 'baa']
*/

function permuteUnique(str) {
  const result = [];

  function helper(current, remainder) {
    if (remainder.length === 0) result.push(current);

    const length = remainder.length;
    for (let i = 0; i < length; i++) {
      if (remainder[i] === remainder[i + 1]) continue;

      const charToAdd = remainder[i];
      const remainderLeft = remainder.substring(0, i);
      const remainderRight = remainder.substring(i + 1, length);

      helper(current + charToAdd, remainderLeft + remainderRight);
    }
  }

  const strSorted = str.split("").sort().join("");

  helper("", strSorted);
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

describe("Unique Permutations", () => {
  it("permuteUnique('aab') returns ['aab', 'aba', 'baa']", () => {
    const res = permuteUnique("aab");
    assert.equal(res.length, 3);
    assert.equal(res.includes("aab"), true);
    assert.equal(res.includes("aba"), true);
    assert.equal(res.includes("baa"), true);
  });
  it("permuteUnique('aaaa') returns ['aaaa']", () => {
    const res = permuteUnique("aaaa");
    assert.equal(res.length, 1);
    assert.equal(res.includes("aaaa"), true);
  });
});

mocha.run();
