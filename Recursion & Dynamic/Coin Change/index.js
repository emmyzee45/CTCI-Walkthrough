/* 
You have an infinite number of quarters, dimes, nickels, and pennies. Given a total 
amount of cents, return the number of combinations that make up that amount. 

Example
Input: 5 cents
Output 2 (5 pennies, 1 nickel)
*/

function makeChange(amount) {
  const coins = [1, 5, 10, 25];
  const memo = new Array(amount + 1).fill(0);
  memo[0] = 1;

  for (const coin of coins) {
    for (let amount = 1; amount < memo.length; amount++) {
      if (amount >= coin) memo[amount] += memo[amount - coin];
    }
  }

  return memo[amount];
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

describe("Coin Change", () => {
  it("returns 2 ways to make 5 cents.", () => {
    assert.equal(makeChange(5), 2);
  });
  it("returns 242 ways to make 100 cents.", () => {
    assert.equal(makeChange(100), 242);
  });
});

mocha.run();
