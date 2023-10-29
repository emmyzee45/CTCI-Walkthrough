/* 
Given a stream of integers, lookup the rank of a given integer x. If an integer is 
not found in the stream, return -1. 

EXAMPLE
Stream: [20,15,10,5,13,25,23,24]
getRankOfNumber(stream, 13) --> 2
getRankOfNumber(stream, 20) --> 4
getRankOfNumber(stream, 101) --> -1
*/

class RankNode {
  constructor(d) {
    this.data = d;
    this.leftSize = 0;
    this.left;
    this.right;
  }
  insert(d) {
    let newNode = new RankNode(d);
    let current = this;

    while (true) {
      if (d < current.data) {
        current.leftSize++;
        if (!current.left) {
          current.left = newNode;
          return;
        } else {
          current = current.left;
        }
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        } else {
          current = current.right;
        }
      }
    }
  }
  getRank(d) {
    let current = this;
    let rank = 0;
    while (current) {
      if (current.data === d) {
        rank += current.leftSize;
        break;
      } else if (d < current.data) {
        if (!current.left) {
          return -1;
        } else {
          current = current.left;
        }
      } else {
        if (!current.right) {
          return -1;
        } else {
          rank += current.leftSize + 1;
          current = current.right;
        }
      }
    }
    return rank;
  }
}

function track(root, number) {
  root.insert(number);
}

function getRankOfNumber(root, number) {
  return root.getRank(number);
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

describe("Rank of Number in Stream.", () => {
  const root = new RankNode(20);
  root.insert(15);
  root.insert(10);
  root.insert(5);
  root.insert(13);
  root.insert(25);
  root.insert(23);
  root.insert(24);

  it("getRankOfNumber(root, 20) returns 4 for stream [20,15,10,5,13,25,23,24]", () => {
    assert.equal(getRankOfNumber(root, 20), 4);
  });
  it("getRankOfNumber(root, 13) returns 2 for stream [20,15,10,5,13,25,23,24]", () => {
    assert.equal(getRankOfNumber(root, 13), 2);
  });
  it("getRankOfNumber(root, 101) returns -1 for stream [20,15,10,5,13,25,23,24]", () => {
    assert.equal(getRankOfNumber(root, 101), -1);
  });
});

mocha.run();
