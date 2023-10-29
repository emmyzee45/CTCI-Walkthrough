/* 
Create a custom Binary Search Tree (BST), which can return a random node, with all 
nodes in the tree having an equal probability of being chosen.
*/

class CustomNode {
  constructor(data) {
    this.data = data;
    this.size = 1;
    this.left = null;
    this.right = null;
  }
  insertInOrder(d) {
    if (d <= this.data) {
      if (!this.left) {
        this.left = new CustomNode(d);
      } else {
        this.left.insertInOrder(d);
      }
    } else {
      if (!this.right) {
        this.right = new CustomNode(d);
      } else {
        this.right.insertInOrder(d);
      }
    }

    this.size++;
  }
  getRandomNode() {
    const leftSize = this.left === null ? 0 : this.left.size;
    const randomIndex = Math.floor(Math.random() * this.size);

    if (randomIndex < leftSize) {
      return this.left.getRandomNode();
    } else if (randomIndex === leftSize) {
      return this;
    } else {
      return this.right.getRandomNode();
    }
  }
}

mocha.setup("bdd");
const { assert } = chai;

describe("BST Random Node", () => {
  let root;

  it("insertInOrder inserts to left and right correctly, updates size at each node.", () => {
    root = new CustomNode(8);
    root.insertInOrder(3);
    root.insertInOrder(10);
    root.insertInOrder(14);

    assert.equal(root.left.data, 3);
    assert.equal(root.right.data, 10);

    assert.equal(root.size, 4);
    assert.equal(root.left.size, 1);
    assert.equal(root.right.size, 2);
  });

  it("getRandom ensures each node has equal chance of being reached, even on unbalanced tree.", () => {
    let eightCount = 0;
    let threeCount = 0;
    let tenCount = 0;
    let fourteenCount = 0;

    for (let i = 1; i <= 1000; i++) {
      const randomNodeData = root.getRandomNode().data;

      if (randomNodeData === 8) {
        eightCount++;
      } else if (randomNodeData === 3) {
        threeCount++;
      } else if (randomNodeData === 10) {
        tenCount++;
      } else {
        fourteenCount++;
      }
    }

    assert.equal(eightCount < 300 && eightCount > 200, true);
    assert.equal(threeCount < 300 && threeCount > 200, true);
    assert.equal(tenCount < 300 && tenCount > 200, true);
    assert.equal(fourteenCount < 300 && fourteenCount > 200, true);
  });
});

mocha.run();
