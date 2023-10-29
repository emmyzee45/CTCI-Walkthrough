/* 
Given n pairs of parentheses, write a function to return all combinations of properly
opened and closed parentheses.
EXAMPLE
Input: 3
Output: ((())), (()()), (())(), ()(()), ()()()
*/

function generateParenthesis(n) {
  let res = [];

  function helper(curr, leftParensCount, rightParensCount) {
    if (curr.length === n * 2) {
      res.push(curr);
      return;
    }

    if (leftParensCount < n) {
      helper(curr + "(", leftParensCount + 1, rightParensCount);
    }
    if (rightParensCount < leftParensCount) {
      helper(curr + ")", leftParensCount, rightParensCount + 1);
    }
  }

  helper("", 0, 0);
  return res;
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

describe("Parentheses", () => {
  it("generateParenthesis(3) returns [((())), (()()), (())(), ()(()), ()()()]", () => {
    let res = generateParenthesis(3);

    assert.equal(res.length, 5);
    assert.equal(res.includes("((()))"), true);
    assert.equal(res.includes("(()())"), true);
    assert.equal(res.includes("(())()"), true);
    assert.equal(res.includes("()(())"), true);
    assert.equal(res.includes("()()()"), true);
  });
});

mocha.run();
