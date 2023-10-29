/* 
If a stack of plates gets too high, we create a new stack of plates. Create a data 
structure PlateStacks that is composed of multiple stacks and creates a new 
stack once the previous one reaches capacity. push() and pop() should function as if 
operating on a single stack.
*/

class PlateStacks {
  constructor(capacity) {
    this.capacity = capacity; // capacity per stack in our array
    this.stacks = [];
  }
  push(value) {
    const lastStack = this.stacks[this.stacks.length - 1];

    if (!lastStack || lastStack.size() === this.capacity) {
      const newStack = new Stack();
      newStack.push(value);
      this.stacks.push(newStack);
    } else {
      lastStack.push(value);
    }
  }
  pop() {
    const lastStack = this.stacks[this.stacks.length - 1];

    if (!lastStack) {
      return undefined;
    }

    const value = lastStack.pop();

    if (lastStack.size() === 0) {
      this.stacks.pop();
    }

    return value;
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

describe("Plate Stacks", () => {
  it("push and pop works", () => {
    const sos = new PlateStacks(1);

    sos.push("Kevin");
    sos.push("Eric");

    assert.equal(sos.pop(), "Eric");
    assert.equal(sos.pop(), "Kevin");
  });

  it("pop returns undefined if set of stacks is empty", () => {
    const sos = new PlateStacks(1);
    assert.equal(sos.pop(), undefined);
  });
});

mocha.run();
