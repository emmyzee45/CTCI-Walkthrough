/* 
You are running up a staircase with n steps and can jump either 1, 2, or 3 steps at a
time. Write code to count all possible ways you can run up the stairs.
*/

function climbSteps(n) {
  const dp = [0, 1, 2, 4];

  for (let i = 4; i <= n; i++) {
    dp.push(dp[i - 1] + dp[i - 2] + dp[i - 3]);
  }

  return dp[n];
}

// function climbSteps(n) {
//   let ways = 0;

//   function helper(number) {
//     if (number === 0) {
//       ways += 1;
//     } else if (number > 0) {
//       helper(number - 1);
//       helper(number - 2);
//       helper(number - 3);
//     }
//   }

//   helper(n);
//   return ways;
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

describe("Climb Steps", () => {
  it("climbSteps(1) --> 1", () => {
    assert.equal(climbSteps(1), 1);
  });
  it("climbSteps(2) --> 2", () => {
    assert.equal(climbSteps(2), 2);
  });
  it("climbSteps(3) --> 4", () => {
    assert.equal(climbSteps(3), 4);
  });
  it("climbSteps(4) --> 7", () => {
    assert.equal(climbSteps(4), 7);
  });
  it("climbSteps(9) --> 149", () => {
    assert.equal(climbSteps(9), 149);
  });
});

mocha.run();
