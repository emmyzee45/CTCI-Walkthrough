/* 
Given the roots of two binary trees, return true if the second tree is a subtree of 
the first one and false otherwise.

class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
*/

function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;

  if (p.data === q.data) {
    // The nodes are the same, but we still need to make sure the left and right subtrees are the same
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  } else {
    return false;
  }
}

function isSubtree(s, t) {
  // Stack used to traverse every node in S
  const stack = [s];

  while (stack.length) {
    const popped = stack.pop();

    if (isSameTree(popped, t)) return true;
    if (popped.left) stack.push(popped.left);
    if (popped.right) stack.push(popped.right);
  }

  return false;
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

describe("Is Subtree", () => {
  it("Returns true correctly.", () => {
    const bst1 = new BinarySearchTree();
    bst1.insert(8);
    bst1.insert(3);
    bst1.insert(10);
    bst1.insert(1);
    bst1.insert(6);
    bst1.insert(14);
    //         8
    //       /   \
    //      3     10
    //     / \      \
    //    1   6      14

    const bst2 = new BinarySearchTree();
    bst2.insert(3);
    bst2.insert(1);
    bst2.insert(6);
    //       3
    //      / \
    //     1   6

    assert.equal(isSubtree(bst1.root, bst2.root), true);
    assert.equal(isSubtree(bst1.root, new TreeNode(1)), true);
    assert.equal(isSubtree(bst1.root, new TreeNode(14)), true);
  });

  it("Returns false correctly for 6,5,7,2,null,null,8,1,3,null,null,-9,null,null,4,null,0 and 1", () => {
    const bst1 = new BinarySearchTree();
    bst1.insert(6);
    bst1.insert(5);
    bst1.insert(7);
    bst1.insert(2);
    bst1.insert(8);
    bst1.insert(1);
    bst1.insert(3);
    bst1.insert(-9);
    bst1.insert(4);
    bst1.insert(0);

    const bst2 = new BinarySearchTree();
    bst2.insert(1);

    assert.equal(isSubtree(bst1.root, bst2.root), false);
  });

  it("Returns false correctly for 12 and 1", () => {
    const bst1 = new BinarySearchTree();
    bst1.insert(12);

    const bst2 = new BinarySearchTree();
    bst2.insert(1);

    assert.equal(isSubtree(bst1.root, bst2.root), false);
  });

  it("Returns false correctly for 12 and 2", () => {
    const bst1 = new BinarySearchTree();
    bst1.insert(12);

    const bst2 = new BinarySearchTree();
    bst2.insert(2);

    assert.equal(isSubtree(bst1.root, bst2.root), false);
  });
});

mocha.run();
