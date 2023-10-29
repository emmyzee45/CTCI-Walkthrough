/* 
Write code that multiplies two number using recursion. You are not allowed to use 
either the * or / operator. 
*/

function product(a, b) {
  if (a < 0 || b < 0) {
    throw "error: a and b should only be positive integers";
  }
  let res = 0;

  function helper(a, b) {
    if (b === 0) return;
    res += a;
    helper(a, b - 1);
  }

  helper(a, b);
  return res;
}

// function product(a, b) {
//   if (a < 0 || b < 0) {
//     throw "error: a and b should only be positive integers";
//   }
//   if (b === 0) {
//     return 0;
//   } else if (b === 1) {
//     return a;
//   } else {
//     return a + product(a, b - 1);
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

describe("Multiply without Multiplication", () => {
  it("product(5, 0) --> 0", () => {
    assert.equal(product(5, 0), 0);
  });
  it("product(5, 1) --> 5", () => {
    assert.equal(product(5, 1), 5);
  });
  it("product(5, 2) --> 10", () => {
    assert.equal(product(5, 2), 10);
  });
});

mocha.run();
