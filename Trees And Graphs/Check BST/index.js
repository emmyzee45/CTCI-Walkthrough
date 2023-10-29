/* 
Given the root of a binary tree, write a function to check if it is a binary search
tree (BST).

class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
*/

function checkBST(r) {
  let validity = true;

  function helper(node, min, max) {
    if (!node || !validity) return;

    if (
      (min !== null && node.data <= min) ||
      (max !== null && node.data >= max)
    ) {
      validity = false;
      return;
    }

    helper(node.left, min, node.data);
    helper(node.right, node.data, max);
  }

  helper(r, null, null);
  return validity;
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

describe("Check BST", () => {
  it("Returns true for valid BST.", () => {
    const BST = new BinarySearchTree();
    BST.insert(8);
    BST.insert(3);
    BST.insert(10);
    BST.insert(1);
    BST.insert(6);
    BST.insert(14);
    //          8
    //        /   \
    //       3     10
    //      / \      \
    //     1   6     14
    assert.equal(checkBST(BST.root), true);
  });

  it("Returns true for empty BST.", () => {
    const BST = new BinarySearchTree();
    assert.equal(checkBST(BST.root), true);
  });

  it("Returns false for invalid BST.", () => {
    const BST = new BinarySearchTree();
    BST.insert(8);
    BST.insert(3);
    BST.insert(10);
    BST.root.right.left = new TreeNode(6);

    //          8
    //        /   \
    //       3     10
    //            /
    //           6
    assert.equal(checkBST(BST.root), false);
  });
});

mocha.run();
