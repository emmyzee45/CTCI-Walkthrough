/* 
Given a node in a binary search tree, find the in-order successor of that node. For
this question, each node has a link to its parent. 

class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
    this.parent
  }
}
*/

function inOrderSuccessor(node) {
  //If node has a right subtree, then successor lies on left most node in right subtree.
  if (node.right) {
    return leftMostChild(node.right);
  } else {
    let parent = node.parent;

    // Travel up until you see a node that is the left child of its parent. The parent will be the successor.
    while (parent && node === parent.right) {
      node = parent;
      parent = parent.parent;
    }

    return parent;
  }
}

function leftMostChild(node) {
  while (node.left) {
    node = node.left;
  }
  return node;
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

describe("In Order Succesor", () => {
  const BST = new BinarySearchTree();
  BST.insert(20);
  BST.insert(22);
  BST.insert(8);
  BST.insert(4);
  BST.insert(12);
  BST.insert(10);
  BST.insert(14);

  const twentyNode = BST.root;
  const twentyTwoNode = twentyNode.right;
  const eightNode = twentyNode.left;
  const fourNode = eightNode.left;
  const twelveNode = eightNode.right;
  const tenNode = twelveNode.left;
  const fourteenNode = twelveNode.right;

  twentyNode.parent = null;
  twentyTwoNode.parent = twentyNode;
  eightNode.parent = twentyNode;
  fourNode.parent = eightNode;
  twelveNode.parent = eightNode;
  tenNode.parent = twelveNode;
  fourteenNode.parent = twelveNode;

  it("Returns correct successor node.", () => {
    assert.equal(inOrderSuccessor(eightNode), tenNode);
    assert.equal(inOrderSuccessor(tenNode), twelveNode);
    assert.equal(inOrderSuccessor(fourteenNode), twentyNode);
  });

  it("Returns null if no successor node.", () => {
    assert.equal(inOrderSuccessor(twentyTwoNode), null);
  });
});

mocha.run();
