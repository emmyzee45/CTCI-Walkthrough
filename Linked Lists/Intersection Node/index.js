/* 
Given the heads of two singly linked-lists that eventually merge, write code that 
returns the node at which the two lists intersect. 
Example
2
 \
  5  10
   \ /
   14
    |
   29
*/

function getIntersectionNode(headA, headB) {
  let currA = headA;
  let currB = headB;
  let lengthA = 0;
  let lengthB = 0;

  //Fetches List A length
  while (currA) {
    lengthA++;
    currA = currA.next;
  }

  //Fetches List B length
  while (currB) {
    lengthB++;
    currB = currB.next;
  }

  currA = headA;
  currB = headB;

  // Advance pointer for longer list by difference in lengths
  let differenceInLength = Math.abs(lengthA - lengthB);
  while (differenceInLength > 0) {
    if (lengthA > lengthB) {
      currA = currA.next;
    } else {
      currB = currB.next;
    }

    differenceInLength--;
  }

  //Move both pointers until collision, if no collision both will eventually be null
  while (currA !== currB) {
    currA = currA.next;
    currB = currB.next;
  }

  // Return either one
  return currA;
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

describe("Intersection Node", () => {
  it("returns intersection correctly", () => {
    const oneNode = new ListNode(1);
    const twoNode = new ListNode(2);
    const threeNode = new ListNode(3);

    oneNode.next = threeNode;
    twoNode.next = threeNode;

    assert.equal(getIntersectionNode(oneNode, twoNode), threeNode);
  });
  it("returns null if no intersection", () => {
    const l1 = convertArrToLL([0, 1, 2, 1, 3]);
    const l2 = convertArrToLL([5]);
    assert.equal(getIntersectionNode(l1, l2), null);
  });
});

mocha.run();
