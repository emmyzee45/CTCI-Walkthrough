/* 
Write a function to delete a node in a singly linked list, given only access to that node.
EXAMPLE
Input: Node 3 from [1,2,3,4,5,6,7,8,9,10]
Result: New linked list looks like [1,2,4,5,6,7,8,9,10]
*/

function deleteNode(node) {
  if (!node.next) {
    return;
  }

  node.data = node.next.data;
  node.next = node.next.next;
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

describe("Delete Node", () => {
  it("deleteNode works", () => {
    const startingLL = convertArrToLL([5, 4, 3, 2, 1]);
    const threeNode = startingLL.next.next;
    deleteNode(threeNode);
    assert.equal(fetchLLVals(startingLL).join(""), "5421");
  });
  it("deleteNode does not throw error if node to remove is last node of LL", () => {
    const startingLL = convertArrToLL([1]);
    deleteNode(startingLL);
    assert.equal(fetchLLVals(startingLL).join(""), "1");
  });
});

mocha.run();
