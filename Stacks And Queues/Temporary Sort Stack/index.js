/* 
Write a program to sort a stack in ascending order using another temporary stack.
*/

function sortStack(s) {
  const tempStack = new Stack();

  while (!s.isEmpty()) {
    const temp = s.pop();

    while (tempStack.peek() > temp) {
      s.push(tempStack.pop());
    }
    tempStack.push(temp);
  }

  // Pop elements from tempStack back onto s
  while (!tempStack.isEmpty()) {
    s.push(tempStack.pop());
  }
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

describe("Temporary Sort Stack", () => {
  it("sort works", () => {
    const inputStack = new Stack();
    inputStack.push(7);
    inputStack.push(10);
    inputStack.push(5);

    sortStack(inputStack);

    assert.equal(inputStack.pop(), 5);
    assert.equal(inputStack.pop(), 7);
    assert.equal(inputStack.pop(), 10);
  });
});

mocha.run();
