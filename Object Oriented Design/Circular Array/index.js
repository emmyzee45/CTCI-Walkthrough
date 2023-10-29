class CircularArray {
  constructor() {
    this.items = [];
    this.head = 0;
  }
  convert(index) {
    if (index < 0) {
      index += this.items.length;
    }
    return (this.head + index) % this.items.length;
  }
  rotate(shiftRight) {
    this.head = this.convert(shiftRight);
  }
  get(i) {
    if (i < 0 || i >= this.items.length) {
      throw new Error("Out of bounds");
    }
    return this.items[this.convert(i)];
  }
  set(i, item) {
    if (i < 0 || i >= this.items.length) {
      throw new Error("Out of bounds");
    }
    this.items[this.convert(i)] = item;
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

describe("Circular Array", () => {
  const cc = new CircularArray();
  cc.items = [0, 1, 2, 3, 4, 5];

  it("get(i) works as intended", () => {
    assert.equal(cc.get(1), 1);
    assert.equal(cc.get(5), 5);
  });
  it("rotate(shiftRight) works as intended", () => {
    assert.equal(cc.get(0), 0);
    cc.rotate(1);
    assert.equal(cc.get(0), 1);
  });
  it("set(i, item) works as intended", () => {
    assert.equal(cc.get(0), 1);
    cc.set(0, 0);
    assert.equal(cc.get(0), 0);
  });
});

mocha.run();
