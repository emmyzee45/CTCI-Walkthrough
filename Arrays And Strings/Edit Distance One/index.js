/*
Given two string s1 and s2, see if s1 can be converted to s2 thru zero edits or just ONE of the edits below. 

Insert a character
Remove a character
Replace a character

EXAMPLE
dog, dog --> true
dogs, dog --> true
dog, dogs --> true
dog, log --> true
dog, cat --> false
*/

function editDistanceOne(first, second) {
  if (first.length === second.length) {
    return editReplaceOne(first, second);
  } else if (first.length + 1 === second.length) {
    return editInsertOne(first, second);
  } else if (first.length - 1 === second.length) {
    return editInsertOne(second, first);
  }
  return false;
}

function editReplaceOne(s1, s2) {
  let differences = 0;

  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      if (differences >= 1) {
        return false;
      }
      differences += 1;
    }
  }

  return true;
}

// Check if you can insert a character into sl to make s2.
function editInsertOne(s1, s2) {
  let index1 = 0;
  let index2 = 0;

  while (index1 < s1.length && index2 < s2.length) {
    if (s1[index1] !== s2[index2]) {
      // This if check below runs if this is second time we do replacement
      if (index1 !== index2) {
        return false;
      }
      index2++;
    } else {
      index1++;
      index2++;
    }
  }

  return true;
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

describe("Edit Distance One", () => {
  it("returns true if no edits needed, editDistanceOne('dog', 'dog') --> true", () => {
    assert.equal(editDistanceOne("dog", "dog"), true);
  });
  it("returns true for removal of character, editDistanceOne('dogs', 'dog') --> true", () => {
    assert.equal(editDistanceOne("dogs", "dog"), true);
  });
  it("returns true for insertion of character, editDistanceOne('dog', 'dogs') --> true", () => {
    assert.equal(editDistanceOne("dog", "dogs"), true);
  });
  it("returns true for replacement of character, editDistanceOne('dog', 'log') --> true", () => {
    assert.equal(editDistanceOne("dog", "log"), true);
  });
  it("returns false correctly, editDistanceOne('dog', 'cat') --> false", () => {
    assert.equal(editDistanceOne("dog", "cat"), false);
  });
  it("returns false correctly, editDistanceOne('dog', 'dogss') --> false", () => {
    assert.equal(editDistanceOne("dog", "dogss"), false);
  });
  it("returns false correctly, editDistanceOne('dogss', 'dog') --> false", () => {
    assert.equal(editDistanceOne("dogss", "dog"), false);
  });
});

mocha.run();
