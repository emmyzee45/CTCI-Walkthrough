/* 
Given a linked list and a value x, partition it such that all nodes less than x come 
first, then all nodes with a value greater than or equal to x.
EXAMPLE
Input: [1,4,3,2,5,2], partition = 3
Output: [1,2,2,4,3,5]
*/

function partition(node, x) {
  const beforeHead = new ListNode("Filler");
  const afterHead = new ListNode("Filler");

  let before = beforeHead;
  let after = afterHead;

  while (node) {
    if (node.data < x) {
      before.next = node;
      before = before.next;
    } else {
      after.next = node;
      after = after.next;
    }

    node = node.next;
  }

  before.next = afterHead.next;
  after.next = null;

  return beforeHead.next;
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

describe("Partition Linked List", () => {
  it("partition works", () => {
    const input = convertArrToLL([3, 5, 8, 5, 10, 2, 1]);

    const res = partition(input, 5);
    let current = res;

    const firstHalf = [];
    for (let i = 1; i <= 3; i++) {
      firstHalf.push(current.data);
      current = current.next;
    }
    firstHalf.sort();
    assert.equal(firstHalf.join(""), "123");

    current = res.next.next.next;
    const secondHalf = fetchLLVals(current);
    secondHalf.sort((a, b) => a - b);
    assert.equal(secondHalf.join(""), "55810");
  });
  it("works if passed LL of length 1", () => {
    const input = convertArrToLL([5]);
    const res = partition(input, 5);
    assert.equal(fetchLLVals(res)[0], 5);
  });
});

mocha.run();
