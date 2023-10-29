/* 
Given a boolean expression and a desired boolean result, count the number of ways 
to parenthesize the expression so that the value of expression evaluates to the
desired boolean result. 
EXAMPLE
countEval('1|1', false) --> 0
countEval('0&0&0&1^1|0', true) --> 10
*/

function countEval(booleans, result) {
  const memo = {};
  return waysToGetRes(booleans, 0, booleans.length - 1, result, memo);
}

function waysToGetRes(string, i, j, res, memo) {
  if (i > j) return 0;

  // if string length is 1.
  if (i === j) {
    if (res === true) {
      return string[i] === "1" ? 1 : 0;
    } else {
      return string[i] === "0" ? 1 : 0;
    }
  }

  const key = `${i}${j}${res}`;
  if (key in memo) return memo[key];

  let ways = 0;

  for (let k = i + 1; k < j; k += 2) {
    const operator = string[k];
    const leftTrue = waysToGetRes(string, i, k - 1, true, memo);
    const leftFalse = waysToGetRes(string, i, k - 1, false, memo);
    const rightTrue = waysToGetRes(string, k + 1, j, true, memo);
    const rightFalse = waysToGetRes(string, k + 1, j, false, memo);

    if (operator === "^") {
      if (res === true) {
        ways = ways + leftTrue * rightFalse + rightTrue * leftFalse;
      } else {
        ways = ways + leftTrue * rightTrue + leftFalse * rightFalse;
      }
    } else if (operator === "|") {
      if (res === true) {
        ways =
          ways +
          leftFalse * rightTrue +
          leftTrue * rightFalse +
          leftTrue * rightTrue;
      } else {
        ways = ways + leftFalse * rightFalse;
      }
    } else if (operator === "&") {
      if (res === true) {
        ways = ways + leftTrue * rightTrue;
      } else {
        ways =
          ways +
          leftFalse * rightFalse +
          leftFalse * rightTrue +
          leftTrue * rightFalse;
      }
    }
  }

  memo[key] = ways;
  return ways;
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

describe("Boolean Parenthesization", () => {
  it("countEval('0', false) --> 1", () => {
    assert.equal(countEval("0", false), 1);
  });
  it("countEval('0', true) --> 0", () => {
    assert.equal(countEval("0", true), 0);
  });
  it("countEval('1', true) --> 1", () => {
    assert.equal(countEval("1", true), 1);
  });
  it("countEval('1', false) --> 0", () => {
    assert.equal(countEval("1", false), 0);
  });
  it("countEval('1|1', false) --> 0", () => {
    assert.equal(countEval("1|1", false), 0);
  });
  it("countEval('1^0|0|1', false) --> 2", () => {
    assert.equal(countEval("1^0|0|1", false), 2);
  });
  it("countEval('0&0&0&1^1|0', true) --> 10", () => {
    assert.equal(countEval("0&0&0&1^1|0", true), 10);
  });
});

mocha.run();
