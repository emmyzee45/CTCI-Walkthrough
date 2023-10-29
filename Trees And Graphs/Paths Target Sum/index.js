/* 
Given the root of a binary tree and a targetSum, return the number of paths that sum 
to targetSum. A path can start from any node and end at any node, and
must go downwards.

class TreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
*/

function numPathsTargetSum(root, targetSum) {
  if (!root) return 0;

  const numPathsRoot = numPathsTargetSumFromNode(root, targetSum, 0);
  const numPathsLeft = numPathsTargetSum(root.left, targetSum);
  const numPathsRight = numPathsTargetSum(root.right, targetSum);

  return numPathsRoot + numPathsLeft + numPathsRight;
}

function numPathsTargetSumFromNode(node, targetSum, currentSum) {
  if (!node) return 0;

  currentSum += node.data;

  let totalPaths = 0;
  if (currentSum === targetSum) totalPaths++;
  totalPaths += numPathsTargetSumFromNode(node.left, targetSum, currentSum);
  totalPaths += numPathsTargetSumFromNode(node.right, targetSum, currentSum);
  return totalPaths;
}

mocha.setup("bdd");
const { assert } = chai;

describe("Paths Target Sum", () => {
  //        1
  //      /
  //      3
  //    /   \
  //   2     1
  const rootNode = new TreeNode(1);
  const threeNode = new TreeNode(3);
  const twoNode = new TreeNode(2);
  const oneNode = new TreeNode(1);

  rootNode.left = threeNode;
  threeNode.left = twoNode;
  threeNode.right = oneNode;

  it("Returns 2 paths correctly", () => {
    assert.equal(numPathsTargetSum(rootNode, 5), 2);
  });
  it("Returns 1 path correctly", () => {
    assert.equal(numPathsTargetSum(rootNode, 6), 1);
  });
  it("Returns 0 paths correctly", () => {
    assert.equal(numPathsTargetSum(rootNode, 13), 0);
  });
});

mocha.run();
