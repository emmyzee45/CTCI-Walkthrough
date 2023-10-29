/*
Implement a queue using just two stacks.
*/

class QueueFromStacks {
  constructor() {
    this.pushStack = new Stack();
    this.popStack = new Stack();
  }
  size() {
    return this.pushStack.size() + this.popStack.size();
  }
  enqueue(value) {
    this.pushStack.push(value);
  }
  dequeue() {
    if (this.popStack.size() === 0) {
      while (this.pushStack.size() > 0) {
        this.popStack.push(this.pushStack.pop());
      }
    }

    return this.popStack.pop();
  }
  peek() {
    if (this.popStack.size() === 0) {
      while (this.pushStack.size() > 0) {
        this.popStack.push(this.pushStack.pop());
      }
    }

    return this.popStack.peek();
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

describe("Queue From Stacks", () => {
  it("size works", () => {
    const queue = new QueueFromStacks();
    assert.equal(queue.size(), 0);
  });

  it("enqueue exists", () => {
    const queue = new QueueFromStacks();
    queue.enqueue("Dummy info");
  });

  it("dequeue has FIFO behavior", () => {
    const queue = new QueueFromStacks();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    assert.equal(queue.dequeue(), 1);
    assert.equal(queue.dequeue(), 2);
    assert.equal(queue.dequeue(), 3);
  });

  it("peek works", () => {
    const queue = new QueueFromStacks();

    queue.enqueue(1);
    queue.enqueue(2);
    assert.equal(queue.peek(), 1);
    assert.equal(queue.dequeue(), 1);
  });
});

mocha.run();
