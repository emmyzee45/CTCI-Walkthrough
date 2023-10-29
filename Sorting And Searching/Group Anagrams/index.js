/* 
Given an array of strings, modify the array so that all anagrams are next to each 
other.

Example
Input: ["lawl", "ate", "awll", "eat", "llwa"]
Output 
["ate", "eat", "lawl", "awll", "llwa"] OR 
["lawl", "awll", "llwa", "ate", "eat"]
*/

function sortAnagrams(arr) {
  const mapList = {};
  for (const word of arr) {
    const key = sortChars(word);
    if (key in mapList === false) {
      mapList[key] = [];
    }
    mapList[key].push(word);
  }

  let index = 0;
  for (const subArr of Object.values(mapList)) {
    for (const word of subArr) {
      arr[index] = word;
      index++;
    }
  }
}

function sortChars(s) {
  const arrOfChars = s.split("");
  arrOfChars.sort();
  return arrOfChars.join("");
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

describe("Group Anagrams", () => {
  it("works", () => {
    const words = ["lawl", "ate", "awll", "eat", "llwa"];
    sortAnagrams(words);
    const threeLettersAtStart = words[0].length === 3;
    const strLength3 = threeLettersAtStart ? words.slice(0, 2) : words.slice(3);
    const strLength4 = threeLettersAtStart ? words.slice(2) : words.slice(0, 3);

    assert.equal(strLength3.length, 2);
    assert.equal(strLength3.includes("ate"), true);
    assert.equal(strLength3.includes("eat"), true);

    assert.equal(strLength4.length, 3);
    assert.equal(strLength4.includes("lawl"), true);
    assert.equal(strLength4.includes("awll"), true);
    assert.equal(strLength4.includes("llwa"), true);
  });
});

mocha.run();
