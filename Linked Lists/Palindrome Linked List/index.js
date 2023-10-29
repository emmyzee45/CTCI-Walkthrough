/* 
Given the head of a singly linked list, write a function that returns true if the 
given list is a palindrome, else false.
Example
[7,5,7] --> true
[7,5,6] --> false
*/

function isPalindrome(node) {
  let reversed = reverseAndClone(node);
  return isEqual(node, reversed);
}

function reverseAndClone(node) {
  let reversedHead = null;

  while (node) {
    let newNode = new ListNode(node.data);
    newNode.next = reversedHead;

    reversedHead = newNode;
    node = node.next;
  }

  return reversedHead;
}

function isEqual(one, two) {
  while (one && two) {
    if (one.data !== two.data) {
      return false;
    }
    one = one.next;
    two = two.next;
  }

  return !one && !two;
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

describe("Palindrome Linked List", () => {
  it("[0, 1, 2, 1, 0] returns true correctly", () => {
    const l1 = convertArrToLL([0, 1, 2, 1, 0]);
    assert.equal(isPalindrome(l1), true);
  });
  it("[0, 1, 2, 1, 3] returns false correctly", () => {
    const l1 = convertArrToLL([0, 1, 2, 1, 3]);
    assert.equal(isPalindrome(l1), false);
  });
});

mocha.run();
