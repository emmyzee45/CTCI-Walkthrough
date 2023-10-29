/* 
Given two strings, return true or false based on whether the strings are anagrams 
of each other. An anagram is a word or phrase formed by rearranging the letters of a 
different word or phrase, typically using all the original letters exactly once.

Examples
"rat", "tar" --> true
"rat", "tac" --> false
*/

function isAnagram(s, t) {
  if (s.length !== t.length) return false;

  return s.split("").sort().join("") === t.split("").sort().join("");
}

// function isAnagram(s, t) {
//   if (s.length !== t.length) return false;

//   const sCharCounts = {}; // {H: 1, E:1, L: 2, O: 1}

//   //Add to sCharCounts
//   for (const sChar of s) {
//     if (sChar in sCharCounts) {
//       sCharCounts[sChar] += 1;
//     } else {
//       sCharCounts[sChar] = 1;
//     }
//   }

//   //Check with AND subtract from sCharCounts
//   for (const tChar of t) {
//     if (tChar in sCharCounts === false || sCharCounts[tChar] === 0) {
//       return false;
//     } else {
//       sCharCounts[tChar] -= 1;
//     }
//   }

//   return true;
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

describe("Is Anagram", () => {
  it("isAnagram('anagram', 'nagaram') returns true", () => {
    assert.equal(isAnagram("anagram", "nagaram"), true);
  });
  it("isAnagram('', '') returns true", () => {
    assert.equal(isAnagram("", ""), true);
  });
  it("isAnagram('rat', 'car') returns false", () => {
    assert.equal(isAnagram("rat", "car"), false);
  });
});

mocha.run();
