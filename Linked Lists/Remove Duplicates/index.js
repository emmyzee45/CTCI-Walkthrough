/*
Write a function that takes a linked list and removes duplicate nodes from the list. 
Example:
1 - 2 - 2 - 3
1 - 2 - 3
FOLLOW UP
Solve this problem without using a temporary buffer
*/

function removeDuplicates(head) {
  const map = {};

  let current = head;
  let previous = null;

  while (current) {
    if (current.data in map) {
      previous.next = current.next;
    } else {
      map[current.data] = true;
      previous = current;
    }

    current = current.next;
  }
}

//No buffer allowed
// function removeDuplicates(head) {
//   let current = head;

//   while (current) {
//     // Runner checks all nodes ahead of current
//     let runner = current;

//     while (runner.next) {
//       if (runner.next.data === current.data) {
//         // Deletes current runner node
//         runner.next = runner.next.next;
//       } else {
//         runner = runner.next;
//       }
//     }

//     current = current.next;
//   }
// }

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

describe("Remove Duplicates", () => {
  it("Removes dupes correctly, if they exist.", () => {
    let list = convertArrToLL([1, 2, 2, 3]);
    removeDuplicates(list);
    assert.equal(fetchLLVals(list).join(""), "123");

    list = convertArrToLL([2, 1, 2, 3]);
    removeDuplicates(list);
    assert.equal(fetchLLVals(list).join(""), "213");
  });
  it("does not remove dupes, if they do not exist.", () => {
    let list = convertArrToLL([1, 2, 3]);
    removeDuplicates(list);
    assert.equal(fetchLLVals(list).join(""), "123");
  });
});

mocha.run();
