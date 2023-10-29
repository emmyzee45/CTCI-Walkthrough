/* 
Given the head of a linked list, return the nth node from the end of the list.
Example
returnNthFromEnd([1,2,3,4,5], 2) --> 4
*/

function returnNthFromEnd(head, n) {
  let slow = head;
  let fast = head;

  //Move fast N nodes ahead of slow
  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }

  //Moves slow and fast up until fast is falsy value.
  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
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

describe("Return Nth From End", () => {
  it("returnNthFromEnd([5,4,3,2,1], 2) returns 2", () => {
    const startingLL = convertArrToLL([5, 4, 3, 2, 1]);
    assert.equal(returnNthFromEnd(startingLL, 2).data, 2);
  });
  it("returnNthFromEnd([1], 1) returns 1", () => {
    const startingLL = convertArrToLL([5, 4, 3, 2, 1]);
    assert.equal(returnNthFromEnd({ data: 1, next: null }, 1).data, 1);
  });
});

mocha.run();
