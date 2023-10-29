/* 
Implement three stacks using just one array.
*/

class ThreeStacks {
  constructor(stackCapacity) {
    this.stackCapacity = stackCapacity;
    this.values = [];
    this.sizes = [0, 0, 0];
  }
  push(stackNum, value) {
    if (this.isFull(stackNum) || stackNum > 2) {
      return false;
    }

    this.sizes[stackNum]++;
    this.values[this.indexOfTop(stackNum)] = value;
  }
  pop(stackNum) {
    if (this.isEmpty(stackNum) || stackNum > 2) {
      return false;
    }

    const topIndex = this.indexOfTop(stackNum);
    const value = this.values[topIndex];
    this.values[topIndex] = undefined; //clear
    this.sizes[stackNum]--; //shrink

    return value;
  }
  peek(stackNum) {
    if (this.isEmpty(stackNum) || stackNum > 2) {
      return false;
    }

    return this.values[this.indexOfTop(stackNum)];
  }
  indexOfTop(stackNum) {
    const offset = stackNum * this.stackCapacity;
    const size = this.sizes[stackNum];
    return offset + size - 1;
  }
  isEmpty(stackNum) {
    return this.sizes[stackNum] === 0;
  }
  isFull(stackNum) {
    return this.sizes[stackNum] === this.stackCapacity;
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

describe("push(stackNum, value)", () => {
  const threeStacksFromArray = new ThreeStacks(1);

  it("returns false if specified stack is full or is invalid!", () => {
    threeStacksFromArray.push(0, "Kevin");
    assert.equal(threeStacksFromArray.push(0, "Kevin"), false);

    threeStacksFromArray.push(1, "Kevin");
    assert.equal(threeStacksFromArray.push(1, "Kevin"), false);

    assert.equal(threeStacksFromArray.push(100000, "Kevin"), false);
  });
});

describe("pop(stackNum)", () => {
  const threeStacksFromArray = new ThreeStacks(3);

  threeStacksFromArray.push(0, "b");

  threeStacksFromArray.push(1, "a");
  threeStacksFromArray.push(1, "b");
  threeStacksFromArray.push(1, "c");

  it("returns correct value and shrinks correct stack.", () => {
    assert.equal(threeStacksFromArray.pop(0), "b");

    assert.equal(threeStacksFromArray.pop(1), "c");
    assert.equal(threeStacksFromArray.pop(1), "b");
    assert.equal(threeStacksFromArray.pop(1), "a");
  });
  it("returns false if specified stack is empty or is invalid", () => {
    assert.equal(threeStacksFromArray.pop(1), false);
    assert.equal(threeStacksFromArray.pop(100000), false);
  });
});

describe("peek(stackNum)", () => {
  const threeStacksFromArray = new ThreeStacks(3);

  threeStacksFromArray.push(0, "b");

  threeStacksFromArray.push(1, "a");
  threeStacksFromArray.push(1, "b");
  threeStacksFromArray.push(1, "c");

  it("returns top value for the right stack.", () => {
    assert.equal(threeStacksFromArray.peek(0), "b");

    assert.equal(threeStacksFromArray.peek(1), "c");
    threeStacksFromArray.pop(1);
    assert.equal(threeStacksFromArray.peek(1), "b");
    threeStacksFromArray.pop(1);
    assert.equal(threeStacksFromArray.peek(1), "a");
  });
  it("returns false if specified stack is empty or is invalid", () => {
    threeStacksFromArray.pop(1);
    assert.equal(threeStacksFromArray.peek(1), false);
    assert.equal(threeStacksFromArray.peek(100000), false);
  });
});

mocha.run();
