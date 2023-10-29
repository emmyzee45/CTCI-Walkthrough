/* 
Given the root of a binary tree, write a function which returns an array of linked 
lists. If input tree has depth of three, returned array will have three linked lists. 
Each linked list will have a copy of all nodes at each depth, from left to 
right, level by level. 

class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class LinkedList {
  add(value) {
    ...
  }
}
*/

function levelOrder(r) {
  const res = [];

  function helper(node, depth) {
    if (!node) return;

    if (!res[depth]) {
      res[depth] = new LinkedList();
    }

    res[depth].add(node.data);
    helper(node.left, depth + 1);
    helper(node.right, depth + 1);
  }

  helper(r, 0);
  return res;
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

describe("Level Order Binary Tree Traversal", () => {
  it("works", () => {
    const BST = new BinarySearchTree();
    BST.insert(8);
    BST.insert(3);
    BST.insert(10);
    BST.insert(1);
    BST.insert(6);
    BST.insert(14);

    let res = levelOrder(BST.root);
    res = res.map((ll) => fetchLLVals(ll.head));
    for (subArr of res) {
      subArr.sort((a, b) => a - b);
    }

    assert.equal(res.length, 3);

    assert.equal(res[0][0], 8);
    assert.equal(res[1][0], 3);
    assert.equal(res[1][1], 10);
    assert.equal(res[2][0], 1);
    assert.equal(res[2][1], 6);
    assert.equal(res[2][2], 14);
  });
});

mocha.run();
